# No-loss yield raffle: principal stays, yield pays out

> **Domain:** RNG-backed yield raffle  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** A raffle where **principal stays escrowed** and **only an explicitly credited yield pot** is paid to one depositor.

**Code under test:** `npm test`. Winner index is a deterministic hex stand-in. This repo does not call `orng.wax`, does not accrue yield by itself, and does not move tokens.

## What is true (executed)

| Rule | Result |
|------|--------|
| `deposit` | stacks principal; yield pot unchanged |
| `creditYield` | treasury only |
| `awardYield` | pays the whole pot; principal before === principal after; pot becomes 0 |
| Empty pot / second award with no new yield | refused |
| `withdrawPrincipal` | returns that owner's principal, including after an award |
| Depositors | max 32 |

## Scope honesty

| Name | Status |
|------|--------|
| `orng.wax::requestrand` / `randnotify` | not called; entropy is a local stand-in |
| Token `transfer` of principal into the pool | not modeled; `deposit` is an in-memory credit |
| Interest math | yield only appears via `creditYield` |
| On-chain escrow account | not deployed |

Sibling: [px-rng-crosschain-solana-pyth](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth). Native WAX RNG hygiene stays in the `px-orng-*` repos. Prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) for production entropy.

```bash
npm test
```

MIT — Pixel Journey
