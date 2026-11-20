# Tips — no-loss prize pool

Principal stays escrowed. Only the **yield pot** is awarded. That is the product promise; CI must prove it.

## Do

- Assert `principalBefore === principalAfter` on every award path.
- Credit yield only from a **trusted** treasury (or protocol revenue) account — not from depositors.
- Cap the depositor map for RAM.
- Let users withdraw principal independently of raffles.

## Don't

- Pay the prize from principal "temporarily."
- Let any user call `creditYield`.
- Leave `yieldPot` uncleared after award without an explicit multi-winner design.

## Common mistakes

1. Calling this "no loss" while the award path can debit principal on a bug.
2. Using the same account for deposits and yield funding (blurred audit).
3. Locking principal until the raffle ends when the product said withdraw anytime.
4. Confusing this with [FT vault shares](https://github.com/pixel-journey/px-stake-ft-single-sided-vault). Vault shares reprice; this lab keeps principal fixed and raffles only yield.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Weighted tickets by deposit size | New draw math; still no principal touch |
| Streaming yield from a fee splitter | [fee splitter](https://github.com/pixel-journey/px-treasury-incoming-fee-splitter) |
| Once-resolve winner via orng | [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) |

Related: [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) · [FT vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault) · `px-contract-examples-vault` (private index; not this public course)
