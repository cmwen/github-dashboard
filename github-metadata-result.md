# GitHub metadata result

Completed: 2026-09-24. Inventory and verification used GitHub CLI/API for repositories owned by
`cmwen`.

## Summary

- Scanned 116 owned repositories, including private and archived repositories; collaborator-only
  repositories were excluded.
- Applied metadata updates to 10 repositories: `ai-portfolio`, `github-dashboard`,
  `coding-agent-orchestrator`, `locallink`, `min-kb-app`, `model-eval`, `project-initiator`,
  `podcast-pwa`, `novated-lease-calculator`, and `pwa-api-lab`.
- Updated descriptions and topics for all 10. Set the homepage for `pwa-api-lab` to
  `https://cmwen.github.io/pwa-api-lab/` because its README and Pages workflow identify that
  deployment and its homepage was empty.
- Re-fetched and verified descriptions, topics, and homepages for all 10. No update failed.
- Preserved all existing non-empty homepages. No source files, names, visibility, branches, Pages
  configuration, or archive states were changed.

## Successful updates

The exact descriptions, topics, and homepage action are recorded in
[github-metadata-plan.md](github-metadata-plan.md), under “High-confidence changes queued for
application.” All listed values were confirmed through the GitHub API after applying them.

## Skipped repositories

106 repositories were not changed. Their current metadata is preserved in the plan table. Most were
skipped because a README/manifest review was not completed or the project purpose could not be
determined confidently from the inventory alone. Existing descriptions and homepages were not
overwritten.

Archived repositories were included in the inventory and classified as `archived-legacy` for
reporting where they were not an upstream fork. No archive or unarchive action was taken.
GitHub-marked upstream forks and likely upstream copies were left untouched so their original
identity remains clear.

## Manual review

- Review the 106 unchanged rows in the plan, especially rows with missing descriptions/topics and
  the prioritized repositories whose README checks were not completed.
- Confirm descriptions/topics for private workspace, backup, and infrastructure repositories from
  their README/configuration before making them searchable with public-facing wording.
- Investigate repositories with blank or unusual default-branch metadata (`repo-apps` reported an
  empty branch name) before proposing content-derived metadata.
- Decide individually whether archived legacy repositories need descriptions/topics. Their archived
  status should remain a human decision.
- Fork metadata shows 17 forks. Fork identity evidence includes `AntennaPod`, `DefinitelyTyped`,
  `keepassxc`, `koreader`, `logseq`, and `opencode`; these were not modified. `open-design` and
  additional GitHub-marked forks also retain their upstream metadata.

## Taxonomy inconsistencies found

- The suggested vocabulary mixes singular `personal-app` and `developer-tools`; use exact spellings
  from the controlled list and avoid singular `developer-tool`.
- Some useful topics mentioned in examples are absent from the controlled taxonomy, including
  `github`, `deno`, `tmux`, `rss`, `testing`, `markdown`, `docker`, and `pm2`. Existing examples
  also combine purpose, platform, technology, and implementation-specific tags. The applied sets use
  supplied topics where applicable and a small number of direct technology/domain topics.
- Avoid treating repository names as sufficient evidence for category; several uninspected rows have
  provisional categories in the plan.
- Fork/upstream is a classification, but `upstream-fork` is not included in the topic taxonomy. It
  was not added as a topic.

## Keeping metadata consistent

- Keep descriptions to one factual sentence, ideally under 100 characters.
- Use 5–8 topics from a documented vocabulary; normalize spelling and use GitHub's lowercase topic
  format.
- Review README, manifests, and deployment workflows before assigning categories or Pages homepages.
- Treat fork/upstream repositories separately and preserve upstream descriptions, homepage, and
  topics.
- Add metadata review to the repository creation checklist and revisit it when the README or product
  purpose changes.
- Keep archive decisions explicit and separate from metadata cleanup.
