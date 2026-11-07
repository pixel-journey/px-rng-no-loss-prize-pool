# Education

A no-loss prize pool is not a wager. Depositors must be able to leave with the same principal they put in. The prize is **yield** that some other flow credited (staking rewards, fees, a treasury top-up).

```text
award pays yieldPot
principal total is unchanged
yieldPot becomes 0
```

If the code pays the prize by reducing someone's deposit, it is a loss pool, not this quest.

## What a future agent should not invent

- Do not treat the hex entropy as `orng.wax` output or a VRF proof.
- Do not document automatic interest. This lab never increases `yieldPot` except through `creditYield`.
- Do not let a non-depositor win. The index is `entropy % depositorCount` over the current table only.
- Do not let `withdrawPrincipal` pay the yield pot. Yield is awarded separately, or it stays in the pot.
