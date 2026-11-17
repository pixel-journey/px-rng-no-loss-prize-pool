# Security — no-loss prize pool

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Non-treasury `creditYield` | throws |
| Award empties yield only | **principal unchanged** |
| Second award without yield | refused |
| 33rd depositor | refused |
| Zero deposit | refused |
| Stranger withdraw | refused |

CI should keep asserting `principalBefore === principalAfter` on every award path.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Auth | Real `require_auth` on deposit / withdraw / treasury |
| Entropy | Oracle-delivered randomness; once-resolve |
| Custody | Token notify in; transfer out on withdraw |
| Yield solvency | Treasury must actually fund the pot |
| Deposit map RAM | Cap is a teaching limit; re-budget for production |

## Attack angles

1. Paying the prize from principal "temporarily."
2. Letting any user credit yield.
3. Locking principal until raffle end when the product said withdraw anytime.
4. Confusing this with share-price vault math ([FT vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault)).

## Honesty limits

No wasm or live transfers. Related: [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent).
