# Education — no-loss yield raffle

> **Rung:** `npm test` passes. Principal is escrowed in a book; yield is credited by a **treasury** account only; awards pay from the yield pot only. No token broadcast.  
> **The test is the rule.**

This is **not** a lossy casino stake. Players keep a withdrawable principal. Randomness selects who receives the accumulated yield.

For fair sampling after entropy arrives, pair with ORNG game labs (dice/coinflip) or rejection-sampled helpers — this lab focuses on the **principal invariant**.

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Deposit increases principal only; yield starts at 0 |
| Intermediate | Only treasury credits yield; award leaves principal unchanged |
| Masterclass | Cap depositors; separate yield pot from user balances |

---

## Beginner

Alice deposits 1000, Bob 500, Alice +25 → total principal **1525**, yieldPot **0**, Alice principal **1025**.

## Intermediate

Only account `treasury` may `creditYield`. Alice calling credit throws. After credit 40, yieldPot 40; principals unchanged.

`awardYield` on Alice 1000 + Bob 1000 with yield 250 pays **250** to one winner; principalBefore === principalAfter; yieldPot ends **0**. Empty pot or second award without new yield refused.

## Masterclass

`MAX_DEPOSITORS` **32** — 33rd deposit refused (RAM discipline teaching). Zero deposit refused. After award, withdrawPrincipal (e.g. 800 of Alice's remaining) does not touch yieldPot.

**Invariant to tattoo on the design:** awards never reduce principal.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

### What this is not

- Live ORNG delivery (entropy is an argument in tests)
- Interest rate model (yield appears via treasury credit)
- A share vault ([FT vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault) is different math)
