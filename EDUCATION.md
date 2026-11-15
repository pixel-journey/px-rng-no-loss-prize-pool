# Education — no-loss prize pool

## Beginner

Players deposit principal. A treasury adds yield. A raffle pays **only the yield**. Everyone can still withdraw their principal. That is the "no loss" claim this lab tests.

## Intermediate

| Invariant | Test |
| --- | --- |
| Principal conserved across award | `principalBefore === principalAfter` |
| Yield pot cleared on award | ends at 0 |
| Only treasury credits yield | non-treasury refused |
| Cap 32 depositors | 33rd refused |

## Masterclass (not in this repo)

- Automatic interest from a real strategy vault.
- Weighted draws by principal size (this lab's winner pick is whatever the implementation does; tests only require alice or bob).
- Token custody and wasm.

## Outcomes

1. Show an award that does not change total principal.
2. Show a second award fails until new yield is credited.
3. Withdraw principal after the raffle.
