# No-loss yield raffle: principal stays, yield pays out

> **Domain:** RNG-backed yield raffle  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Principal stays escrowed; **only** an explicitly credited yield pot is paid to one depositor. Winner index is a deterministic hex stand-in — not orng.wax.

**Code under test:** `npm test`. No token transfers, no live yield accrual.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Deposit, credit, award, withdraw |
| [TIPS.md](TIPS.md) | Principal never is the prize |
| [SECURITY.md](SECURITY.md) | Treasury + conservation |
| [SOURCES.md](SOURCES.md) | Official |

## What is true (executed)

| Rule | Result |
|------|--------|
| deposit | stacks principal; pot unchanged |
| creditYield | treasury only |
| awardYield | pot → winner; principal invariant |
| withdrawPrincipal | owner principal after award |

```bash
npm test
```

MIT — Pixel Journey
