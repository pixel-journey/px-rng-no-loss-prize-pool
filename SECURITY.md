# Security notes

| Issue | Lab mitigation |
|-------|----------------|
| Prize paid from deposits | `awardYield` checks principal before === after |
| Anyone mints yield | caller must equal treasury |
| Empty-pot award | refused |
| Replay award with an empty pot | refused |
| Stranger withdraw | refused |
| Unbounded depositor table | max 32 |

Production still needs real token custody, a yield source that cannot be spoofed by a memo, and a published-after-bet entropy source. None of that is claimed here.
