# GitHub Project Control

A Deno-powered monorepo for a static GitHub dashboard PWA. It ships a React/Vite UI, a shared domain
package, mock data for Pages-safe deployments, and optional live GitHub API access through Octokit
when a token is available in the browser or at build time.

## Stack

- **Runtime/tooling:** Deno 2, Vite 7
- **UI:** React 19, React Router 7, TanStack Query 5
- **GitHub integration:** Octokit
- **Observability:** pino with optional OpenObserve shipping to a local endpoint
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
2. Set `VITE_GITHUB_TOKEN` to enable live GitHub data. Without it, the app runs against bundled mock
   data.
3. To ship browser logs to a local OpenObserve instance, set:

```bash
VITE_OPENOBSERVE_ENDPOINT=http://localhost:5080/api/default/nodejs/_json
VITE_OPENOBSERVE_ACCESS_KEY=...
```

4. Run:

```bash
deno task dev
```

The app stores theme and token settings in `localStorage`. For Pages deployments, mock data remains
the safe default because browser-delivered secrets are public by nature.

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
