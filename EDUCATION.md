# Education — no-loss yield raffle

> **Rung:** `npm test` passes. Principal is **invariant** under award.  
> Yield only appears via explicit `creditYield`. Entropy is a local stand-in, not orng.wax.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Deposit stacks principal; yield pot separate |
| Intermediate | Award pays entire pot; principal before === after |
| Masterclass | Why second award needs new yield; treasury-only credit |

## Beginner

Players deposit principal (in-memory credit). Treasury credits a yield pot. Awarding picks one depositor index and pays **only** the pot.

## Intermediate

`awardYield` refuses empty pot and already-awarded round. `withdrawPrincipal` returns that owner's principal even after awards.

## Masterclass

Production must separate real yield sources (lending, fees) from raffle accounting, and use real oracle entropy. This lab proves the **conservation story**, not the yield engine.

## Will not teach

Interest formulas, token custody, or live RNG.
