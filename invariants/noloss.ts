/**
 * No-loss yield raffle (educational).
 * Principal stays escrowed. Only an explicitly credited yield pot is awarded.
 * Winner selection is a deterministic stand-in, not orng.wax and not a proof.
 */

export const MAX_DEPOSITORS = 32;
export const MAX_AMOUNT = 4_611_686_018_427_387_903n;

export type Deposit = {
  owner: string;
  principal: bigint;
};

export type Pool = {
  deposits: Deposit[];
  yieldPot: bigint;
  /** Round that has already paid its pot. null = none yet. */
  awardedRound: number | null;
  round: number;
};

const NAME = /^[a-z1-5.]{1,12}$/;

export function emptyPool(): Pool {
  return { deposits: [], yieldPot: 0n, awardedRound: null, round: 1 };
}

export function assertName(name: string): string {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad account name");
  }
  return name;
}

export function assertPositive(amount: bigint, label: string): bigint {
  if (typeof amount !== "bigint" || amount <= 0n) throw new Error(`${label} must be positive`);
  if (amount > MAX_AMOUNT) throw new Error(`${label} exceeds MAX_AMOUNT`);
  return amount;
}

export function totalPrincipal(pool: Pool): bigint {
  return pool.deposits.reduce((a, d) => a + d.principal, 0n);
}

/** Add principal. Same owner stacks. Yield pot is untouched. */
export function deposit(pool: Pool, owner: string, amount: bigint): Pool {
  assertName(owner);
  assertPositive(amount, "deposit");
  const existing = pool.deposits.find((d) => d.owner === owner);
  if (!existing && pool.deposits.length >= MAX_DEPOSITORS) {
    throw new Error("too many depositors");
  }
  const next = totalPrincipal(pool) + amount;
  if (next > MAX_AMOUNT) throw new Error("principal exceeds MAX_AMOUNT");
  const deposits = existing
    ? pool.deposits.map((d) =>
        d.owner === owner ? { ...d, principal: d.principal + amount } : d
      )
    : [...pool.deposits, { owner, principal: amount }];
  return { ...pool, deposits };
}

/** Treasury credits yield. Does not move principal. */
export function creditYield(pool: Pool, amount: bigint, caller: string, treasury: string): Pool {
  assertPositive(amount, "yield");
  assertName(caller);
  assertName(treasury);
  if (caller !== treasury) throw new Error("only treasury may credit yield");
  const next = pool.yieldPot + amount;
  if (next > MAX_AMOUNT) throw new Error("yield exceeds MAX_AMOUNT");
  return { ...pool, yieldPot: next };
}

/**
 * Pick a depositor index from a 64-hex stand-in.
 * Not a VRF. Not orng.wax.
 */
export function winnerIndex(depositorCount: number, entropy: string): number {
  if (!Number.isInteger(depositorCount) || depositorCount < 1) {
    throw new Error("no depositors");
  }
  if (!/^[0-9a-f]{64}$/i.test(entropy)) throw new Error("entropy must be 64 hex chars");
  const n = BigInt("0x" + entropy.slice(0, 16));
  return Number(n % BigInt(depositorCount));
}

export type Award = {
  pool: Pool;
  winner: string;
  paid: bigint;
  principalBefore: bigint;
  principalAfter: bigint;
};

/**
 * Pay the entire current yield pot to one depositor.
 * Principal totals are unchanged. Pot becomes 0. Round increments.
 */
export function awardYield(pool: Pool, entropy: string): Award {
  if (pool.deposits.length === 0) throw new Error("no depositors");
  if (pool.yieldPot === 0n) throw new Error("no yield to award");
  if (pool.awardedRound === pool.round) throw new Error("round already awarded");
  const idx = winnerIndex(pool.deposits.length, entropy);
  const winner = pool.deposits[idx].owner;
  const paid = pool.yieldPot;
  const principalBefore = totalPrincipal(pool);
  const next: Pool = {
    ...pool,
    yieldPot: 0n,
    awardedRound: pool.round,
    round: pool.round + 1,
  };
  const principalAfter = totalPrincipal(next);
  if (principalAfter !== principalBefore) throw new Error("internal: principal moved");
  return { pool: next, winner, paid, principalBefore, principalAfter };
}

/** Owner withdraws their full principal. Cannot withdraw yield (already paid out or still in pot). */
export function withdrawPrincipal(pool: Pool, owner: string): { pool: Pool; amount: bigint } {
  assertName(owner);
  const row = pool.deposits.find((d) => d.owner === owner);
  if (!row) throw new Error("no principal");
  if (row.principal <= 0n) throw new Error("no principal");
  return {
    amount: row.principal,
    pool: { ...pool, deposits: pool.deposits.filter((d) => d.owner !== owner) },
  };
}
