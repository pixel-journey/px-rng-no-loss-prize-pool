# Worked examples — no-loss pool

## Example A — deposit

Two owners deposit; totalPrincipal grows; yieldPot stays 0.

## Example B — credit yield

Only treasury caller may `creditYield`.

## Example C — award

`awardYield` pays full pot to one owner; principalBefore === principalAfter; pot 0; round increments.

## Example D — refuse double award

Second award same round without new yield → refused.

## Example E — withdraw after award

Owner still withdraws full principal; not reduced by loss.
