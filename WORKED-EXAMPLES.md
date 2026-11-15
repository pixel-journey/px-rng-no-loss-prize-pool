# Worked examples — no-loss yield raffle

Principal stays escrowed. Only the yield pot is awarded. Entropy is 64 hex (`ab` × 32).

## Deposit

```text
deposit alice 1000, bob 500, alice +25
→ totalPrincipal 1525, yieldPot 0, alice principal 1025
```

Zero deposit refused. 33rd distinct depositor refused (`MAX_DEPOSITORS` 32).

## Yield credit

Only caller `treasury` with trusted minter `treasury` may `creditYield`. Alice calling throws `/treasury/`. Principal unchanged when yield is credited (`100` principal, `40` yield).

## Award

Alice 1000 + Bob 1000, yield 250:

| Field | Value |
| --- | --- |
| paid | 250 |
| principalBefore | 2000 |
| principalAfter | 2000 |
| yieldPot after | 0 |
| winner | alice or bob |

Empty pot → `no yield`. Second award before new credit → `no yield`. Bad entropy `zz` → `/hex/`. Yield with no depositors → `no depositors`.

## Withdraw

After an award, alice withdraws `800` and leaves bob's `200`. Stranger bob on alice-only pool → `no principal`.

No `orng.wax` job. Entropy is an argument for winner selection among depositors.
