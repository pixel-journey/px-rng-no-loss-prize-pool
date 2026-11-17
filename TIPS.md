# Tips — no-loss prize pool

## Do

- Assert `principalBefore === principalAfter` on every award path in CI.  
- Credit yield only from a **trusted** treasury (or protocol revenue) account.  
- Cap the depositor map for RAM.  
- Let users withdraw principal independently of raffles.

## Don't

- Pay the prize from principal "temporarily."  
- Let any user call `creditYield`.  
- Leave yieldPot uncleared after award without an explicit multi-winner design.

## Related

[token ledger](https://github.com/pixel-journey/px-token-balance-ledger) · [FT vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault) · [ORNG dual callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent)
