# Security — no-loss prize pool

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Non-treasury creditYield | throws |
| Award empties yield only | principal unchanged |
| Second award without yield | refused |
| 33rd depositor | refused |
| Zero deposit | refused |
| Stranger withdraw | refused |

## Not closed

| Concern | Guidance |
| --- | --- |
| Auth | Real `require_auth` on deposit/withdraw/treasury |
| Entropy integrity | Oracle-delivered randomness; once-resolve |
| Custody | Token notify in; transfer out on withdraw |
| Solvency of yield | Treasury must actually fund the pot |

No wasm or live transfers in this repository.
