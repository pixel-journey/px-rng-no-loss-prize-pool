import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  emptyPool,
  deposit,
  creditYield,
  awardYield,
  withdrawPrincipal,
  totalPrincipal,
  MAX_DEPOSITORS,
} from "./noloss.ts";

const entropy = "ab".repeat(32);

describe("deposit and yield", () => {
  it("stacks principal and leaves the yield pot alone", () => {
    let p = deposit(emptyPool(), "alice", 1_000n);
    p = deposit(p, "bob", 500n);
    p = deposit(p, "alice", 25n);
    assert.equal(totalPrincipal(p), 1_525n);
    assert.equal(p.yieldPot, 0n);
    assert.equal(p.deposits.find((d) => d.owner === "alice")?.principal, 1_025n);
  });

  it("only treasury credits yield", () => {
    let p = deposit(emptyPool(), "alice", 100n);
    assert.throws(() => creditYield(p, 10n, "alice", "treasury"), /treasury/);
    p = creditYield(p, 40n, "treasury", "treasury");
    assert.equal(p.yieldPot, 40n);
    assert.equal(totalPrincipal(p), 100n);
  });

  it("refuses zero deposit and a 33rd depositor", () => {
    assert.throws(() => deposit(emptyPool(), "alice", 0n), /positive/);
    let p = emptyPool();
    for (let i = 0; i < MAX_DEPOSITORS; i++) {
      const name = "a".repeat(1) + "b".repeat(Math.min(i, 4)) + String(i % 5);
      // names must match the account regex; use generated valid names
    }
    const names = [
      "a1","a2","a3","a4","a5","b1","b2","b3","b4","b5",
      "c1","c2","c3","c4","c5","d1","d2","d3","d4","d5",
      "e1","e2","e3","e4","e5","f1","f2","f3","f4","f5",
      "g1","g2",
    ];
    for (const n of names) p = deposit(p, n, 1n);
    assert.equal(p.deposits.length, 32);
    assert.throws(() => deposit(p, "h1", 1n), /too many/);
  });
});

describe("awardYield", () => {
  it("pays only the yield pot and keeps principal", () => {
    let p = deposit(emptyPool(), "alice", 1_000n);
    p = deposit(p, "bob", 1_000n);
    p = creditYield(p, 250n, "treasury", "treasury");
    const before = totalPrincipal(p);
    const award = awardYield(p, entropy);
    assert.equal(award.paid, 250n);
    assert.equal(award.principalBefore, before);
    assert.equal(award.principalAfter, before);
    assert.equal(award.pool.yieldPot, 0n);
    assert.ok(award.winner === "alice" || award.winner === "bob");
  });

  it("refuses an empty pot and a second award before new yield", () => {
    let p = deposit(emptyPool(), "alice", 10n);
    assert.throws(() => awardYield(p, entropy), /no yield/);
    p = creditYield(p, 5n, "treasury", "treasury");
    const first = awardYield(p, entropy);
    assert.throws(() => awardYield(first.pool, entropy), /no yield/);
  });

  it("refuses bad entropy and an empty pool", () => {
    const p = creditYield(deposit(emptyPool(), "alice", 10n), 1n, "treasury", "treasury");
    assert.throws(() => awardYield(p, "zz"), /hex/);
    assert.throws(() => awardYield(creditYield(emptyPool(), 1n, "treasury", "treasury"), entropy), /no depositors/);
  });
});

describe("withdrawPrincipal", () => {
  it("returns the depositor's principal after an award", () => {
    let p = deposit(emptyPool(), "alice", 800n);
    p = deposit(p, "bob", 200n);
    p = creditYield(p, 50n, "treasury", "treasury");
    p = awardYield(p, entropy).pool;
    const out = withdrawPrincipal(p, "alice");
    assert.equal(out.amount, 800n);
    assert.equal(totalPrincipal(out.pool), 200n);
    assert.equal(out.pool.yieldPot, 0n);
  });

  it("refuses a stranger", () => {
    const p = deposit(emptyPool(), "alice", 10n);
    assert.throws(() => withdrawPrincipal(p, "bob"), /no principal/);
  });
});
