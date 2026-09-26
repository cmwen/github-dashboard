# GitHub Project Control

A Deno-powered monorepo for a static GitHub dashboard PWA. It ships a React/Vite UI, a shared domain
package, mock data for Pages-safe deployments, and optional live GitHub API access through Octokit
when a token is available in the browser or at build time.

## Stack

- **Runtime/tooling:** Deno 2, Vite 7
- **UI:** React 19, React Router 7, TanStack Query 5
- **GitHub integration:** Octokit
- **Observability:** browser console logging through pino
- **PWA:** `vite-plugin-pwa`
- **Quality:** Deno fmt/lint/check, Deno tests, Vitest, Testing Library, Playwright
- **Delivery:** GitHub Actions CI and GitHub Pages deploy

## Monorepo layout

```text
.
├── apps/
│   └── web/             # React PWA
├── packages/
│   └── domain/          # Shared types, mock data, selectors, metrics
├── e2e/                 # Playwright coverage
└── .github/workflows/   # CI + Pages deployment
```

## Local development

1. Copy `apps/web/.env.example` if you want build-time defaults.
2. Set `VITE_GITHUB_TOKEN` to enable live GitHub data locally. Without it, the app runs against
   bundled mock data.
3. Run:

```bash
deno task dev
```

The app stores theme, queue filters, and token settings in `localStorage`. For Pages deployments,
mock data remains the safe default because build-time browser secrets are public by nature. Prefer
pasting a personal access token into the app locally after the page loads.

## GitHub personal access token setup

Use a fine-grained personal access token when possible:

- **Repository access:** select only the owners/repositories you want the dashboard to manage.
- **Pull requests: read/write:** required to read PR metadata and send merge requests.
- **Contents: read/write:** required by some merge paths and branch protection configurations.
- **Actions: read:** lets the dashboard explain workflow state and blocked merge candidates.
- **Metadata: read:** included by GitHub automatically and used to identify repositories.

Classic token fallback:

- Use `public_repo` for public repositories only.
- Use `repo` if you need private repositories.
- Add `read:org` so organization repositories can be discovered.
- Add `workflow` only if your organization requires workflow access for status visibility.

Never commit a PAT. Avoid setting `VITE_GITHUB_TOKEN` in GitHub Pages builds because the token would
be shipped to every browser that loads the site.

### GitHub token permissions

For all current live-data features, create a **fine-grained personal access token**, select the
repositories the dashboard should access, and grant these repository permissions:

| Permission     | Access                             | Used for                                         |
| -------------- | ---------------------------------- | ------------------------------------------------ |
| Metadata       | Read-only (included automatically) | Identify and list repositories                   |
| Actions        | Read-only                          | Read recent workflow runs                        |
| Administration | Read and write                     | Edit repository topics used as repository labels |

The app currently searches for pull requests through GitHub's search endpoint, which does not
require Issues or Pull requests permissions for fine-grained tokens. If you only need to view data,
omit Administration write; editing repository labels/topics will then be unavailable.

The token owner must already have access to the selected repositories. Editing topics also requires
sufficient repository privileges.

Repository labels in this dashboard are GitHub **repository topics**. They can be applied from the
dashboard, used to filter repositories, and grouped so a repository with multiple topics appears in
each matching group. GitHub issue/PR labels are separate: the dashboard reads PR labels but does not
apply them. The classic-token alternative is the broad `repo` scope for private repositories (or
`public_repo` for public repositories only); fine-grained tokens are recommended.

> **Pages security:** A token entered in this browser app is stored in browser local storage and is
> sent directly to GitHub. Never put a personal token in `VITE_GITHUB_TOKEN` for a public Pages
> deployment: build-time environment values are embedded in the public JavaScript bundle. Use mock
> mode for a public deployment, or run the app privately and enter the token in Settings.

## Commands

```bash
deno task dev
deno task build
deno task preview
deno task check
deno task test:unit
deno task test:integration
deno task install:browsers
deno task test:e2e
deno task test
```

## Why `package.json` exists in a Deno repo

Yes, it makes sense here. The runtime and task runner are Deno, but the app depends on npm-native
tooling and libraries such as Vite, React, Vitest, Playwright, and pino. Keeping a `package.json`
gives the repo:

- clean interoperability with the frontend toolchain,
- reliable dependency metadata for editors and CI,
- grouped Dependabot updates for npm packages.

If this were a pure Deno app without the npm-based frontend toolchain, `package.json` would be
unnecessary.

## GitHub Pages

`pages.yml` builds the static UI and publishes `apps/web/dist`. The workflow sets `VITE_BASE_PATH`
to the repository name so asset paths resolve correctly on project pages.

## Dependabot

`.github/dependabot.yml` groups npm updates into one weekly PR and GitHub Actions updates into one
weekly PR so dependency maintenance stays low-noise.
