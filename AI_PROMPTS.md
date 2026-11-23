# AI handoff — no-loss prize pool

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Random winner on WAX |
| [elimination](https://github.com/pixel-journey/px-rng-russian-roulette-elimination) | Opposite: principal at risk |
| [FT vault](https://github.com/pixel-journey/px-stake-ft-single-sided-vault) | Share reprice (different product) |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve before award |

## Non-negotiables

1. Awards never reduce **principal**. `principalBefore === principalAfter` on every award path.
2. Yield is funded only by a **trusted treasury** `creditYield` — not by depositors.
3. After award, `yieldPot` is **0**. Second award without new yield is refused.
4. Users may withdraw principal independently of raffles.
5. MAX_DEPOSITORS **32** is a teaching RAM cap.
6. **Not** elimination (buy-ins at risk). **Not** FT vault (shares reprice).
7. Prefer orng once-resolve on WAX. No broadcast in this pure lab.

## Prompt seeds

- "Award 250 yield — principal before vs after?"
- "Second award with empty yieldPot — refused?"
- "Contrast with russian-roulette elimination pot."
- "Who may creditYield — depositors or treasury?"

## Do not

- Debit principal on award.
- Merge with elimination buy-in rules.
- Claim live orng from this pure book.
