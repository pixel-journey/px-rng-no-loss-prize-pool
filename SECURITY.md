# Security notes — no-loss raffle

| Mitigated | Behavior |
| --- | --- |
| Non-treasury yield credit | refused |
| Award empty pot / double | refused |
| Principal change on award | internal assert |
| Max depositors | 32 |

Production: real escrow token, oracle once-only, treasury msig.
