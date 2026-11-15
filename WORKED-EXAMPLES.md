# Worked examples — no-loss yield raffle

## Principal vs yield

Deposit alice 1000, bob 500, alice +25 → total principal **1525**, yieldPot **0**, alice principal **1025**.

Only account `treasury` may `creditYield`. Alice calling credit throws. After credit 40, yieldPot 40, principal still 100 (on that smaller pool).

MAX_DEPOSITORS **32**; 33rd deposit refused. Zero deposit refused.

## awardYield

Alice 1000 + bob 1000, yield 250:

| Field | Value |
| --- | --- |
| paid | 250 |
| principalBefore | principalAfter (unchanged) |
| yieldPot after | 0 |
| winner | alice or bob |

Empty pot and second award without new yield refused. Bad entropy / no depositors refused.

## withdrawPrincipal

After award, alice withdraws **800**; remaining principal **200**; yieldPot stays 0. Stranger withdraw refused.

**Invariant:** awards never touch principal.
