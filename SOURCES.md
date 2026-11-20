# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | Token custody patterns |
| [eosio.token](https://github.com/eosio/eosio.contracts) | Transfer primitives |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Random winner selection on WAX |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample dapp path |

## Product facts locked by tests

- Awards never reduce **principal**. `principalBefore === principalAfter` on every award path.
- Yield is funded only by a **trusted treasury** `creditYield` — not by depositors.
- After award, `yieldPot` is **0**. Second award without new yield is refused.
- Users may withdraw principal independently of raffles.
- MAX_DEPOSITORS **32** is a teaching RAM cap.
- This is **not** [elimination](https://github.com/pixel-journey/px-rng-russian-roulette-elimination). There buy-ins form the pot and principal is at risk.
- This is **not** [FT vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault). Vault shares reprice; this lab keeps principal fixed and raffles only yield.

## Related labs

| Lab | Topic |
| --- | --- |
| [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) | Conservation of balances |
| [FT vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault) | Share reprice (different product) |
| [elimination](https://github.com/pixel-journey/px-rng-russian-roulette-elimination) | Buy-in at risk (opposite promise) |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve before award |
| [fee splitter](https://github.com/pixel-journey/px-treasury-incoming-fee-splitter) | Yield funding source |
| `px-contract-examples-vault` (private index; not this public course) | Curriculum order |
