# GitHub metadata plan

Inventory date: 2026-09-24. Source: `gh repo list cmwen --limit 1000`; owned repositories only. Includes public and private repositories.

## Dry-run summary

- Total repositories scanned: **116**
- Original projects (not marked as forks; includes archived): **99**
- Probable forks/upstream repositories: **17**
- Archived repositories: **8**
- Repositories missing descriptions: **74**
- Repositories missing topics: **113**
- Repositories missing a homepage but apparently deployed to Pages: **1 (pwa-api-lab)**
- Proposed high-confidence metadata updates: **10**

Only the high-confidence rows below are eligible for automatic application. Existing non-empty homepages are preserved. Archived status is reported only; no archive action is proposed.

## Repository-by-repository proposal

| Repository | Category | Current Description | Proposed Description | Current Topics | Proposed Topics | Homepage Change | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|
| [`logseq-pwa`](https://github.com/cmwen/logseq-pwa) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`cmwen.github.io`](https://github.com/cmwen/cmwen.github.io) | other | Min's portfolio  | — | `blog`, `public`, `pwa`, `website` | — | — | medium | Needs README/config review before proposing metadata. |
| [`locallink`](https://github.com/cmwen/locallink) | developer-tool | — | Local-first control plane for managing developer services and AI-agent tooling. | — | `developer-tools`, `local-first`, `docker`, `mcp`, `ai-agents`, `typescript`, `observability` | — | high | README confirms proposed purpose and topic set. |
| [`locallink-workflow-studio`](https://github.com/cmwen/locallink-workflow-studio) | automation | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`locallink-automation`](https://github.com/cmwen/locallink-automation) | automation | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`locallink-workspace`](https://github.com/cmwen/locallink-workspace) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`prompt-loop-app`](https://github.com/cmwen/prompt-loop-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`quick-log-app`](https://github.com/cmwen/quick-log-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`ai-portfolio`](https://github.com/cmwen/ai-portfolio) | other | AI-built media and experiment portfolio | Static Astro portfolio for AI generated designs, media, and interactive 3D work. | — | `ai`, `astro`, `typescript`, `static-site`, `github-pages`, `experiment` | — | high | README confirms proposed purpose and topic set. |
| [`jlearn-app`](https://github.com/cmwen/jlearn-app) | learning-project | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`ebook-dedrm`](https://github.com/cmwen/ebook-dedrm) | developer-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`robot-simulator`](https://github.com/cmwen/robot-simulator) | personal-app | Celestial Guardian: a PlayCanvas and TypeScript mecha platformer with manual locomotion, themed stages, and destructible environments. | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`gemma-agent-pwa`](https://github.com/cmwen/gemma-agent-pwa) | ai-agent | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-node-app-template`](https://github.com/cmwen/min-node-app-template) | template | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`github-dashboard`](https://github.com/cmwen/github-dashboard) | developer-tool | — | Personal GitHub project dashboard for discovering and managing repositories. | — | `personal-app`, `developer-tools`, `pwa`, `react`, `typescript`, `github-pages`, `deno` | — | high | README confirms proposed purpose and topic set. |
| [`loqseq-backup`](https://github.com/cmwen/loqseq-backup) | other | — | — | `backup`, `data` | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`coding-agent-orchestrator`](https://github.com/cmwen/coding-agent-orchestrator) | ai-agent | — | Local-first PWA for orchestrating coding-agent CLI sessions through tmux. | — | `coding-agents`, `ai-agents`, `developer-tools`, `local-first`, `pwa`, `typescript` | — | high | README confirms proposed purpose and topic set. |
| [`min-android-app-template`](https://github.com/cmwen/min-android-app-template) | template | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`podcasts`](https://github.com/cmwen/podcasts) | automation | Podcast audio, RSS feeds, transcripts, and Kokoro TTS generator for cmwen.github.io | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-quick-log-app`](https://github.com/cmwen/min-quick-log-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`ContextBench`](https://github.com/cmwen/ContextBench) | benchmark | An experiment measuring how architecture affects AI coding-agent context and reliability. | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`private-chat-hub-tauri`](https://github.com/cmwen/private-chat-hub-tauri) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`repo-apps`](https://github.com/cmwen/repo-apps) | learning-project | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-kb-mcp`](https://github.com/cmwen/min-kb-mcp) | developer-tool | Minimalist Knowledge Base MCP | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-browser-extensions`](https://github.com/cmwen/min-browser-extensions) | developer-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-kb-app`](https://github.com/cmwen/min-kb-app) | ai-agent | — | Local-first AI workspace for chatting with and managing a Markdown knowledge store. | — | `ai-agents`, `local-first`, `pwa`, `typescript`, `llm`, `knowledge-base`, `knowledge-management` | — | high | README confirms proposed purpose and topic set. |
| [`term-dock`](https://github.com/cmwen/term-dock) | developer-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-kb-store`](https://github.com/cmwen/min-kb-store) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`wsl-server-pwa`](https://github.com/cmwen/wsl-server-pwa) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`min-webview-browser`](https://github.com/cmwen/min-webview-browser) | developer-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`read-forge-app`](https://github.com/cmwen/read-forge-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`every-pay-app`](https://github.com/cmwen/every-pay-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`script-librarian`](https://github.com/cmwen/script-librarian) | developer-tool | Docs-first direction for a local script library shared by humans and AI assistants | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-script-launcher`](https://github.com/cmwen/min-script-launcher) | archived-legacy | Archived: replaced by script-librarian | — | — | — | — | low | Archived; retain status, metadata review only. Needs README/config review before proposing metadata. |
| [`private-chat-hub`](https://github.com/cmwen/private-chat-hub) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`care-ledger-app`](https://github.com/cmwen/care-ledger-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`miband-7-notifier`](https://github.com/cmwen/miband-7-notifier) | automation | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`open-design`](https://github.com/cmwen/open-design) | fork-upstream | 🎨 Local-first, open-source Claude Design alternative. 🖥️ Native desktop app. ⚡ 259+ Skills · ✨ 142+ Design Systems 🖼️ Web · desktop · mobile prototypes · slides · images · videos · HyperFrames 📦 Sandboxed preview · HTML/PDF/PPTX/MP4 export 🤖 Claude Code / OpenClaw / Codex / Cursor / OpenCode / Qwen / Copilot / Hermes / Kimi & 17+ CLIs. | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`model-eval`](https://github.com/cmwen/model-eval) | benchmark | — | Promptfoo benchmark suite for evaluating local and hosted language models. | — | `llm`, `benchmark`, `ai`, `prompt-engineering` | — | high | README confirms proposed purpose and topic set. |
| [`private-chat-hub-v3`](https://github.com/cmwen/private-chat-hub-v3) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`receipt-quest-app`](https://github.com/cmwen/receipt-quest-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`local-service-scripts`](https://github.com/cmwen/local-service-scripts) | automation | Private launcher scripts and docs for local service stack | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`min-speech-service`](https://github.com/cmwen/min-speech-service) | developer-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-second-brain`](https://github.com/cmwen/min-second-brain) | knowledge-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`min-book-pwa`](https://github.com/cmwen/min-book-pwa) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`aegis-input`](https://github.com/cmwen/aegis-input) | other | Privacy-first Android IME built with Kotlin, Compose, and Librime | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`skill-forge-app`](https://github.com/cmwen/skill-forge-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`lan-game-app`](https://github.com/cmwen/lan-game-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`opencode-chat`](https://github.com/cmwen/opencode-chat) | archived-legacy | — | — | — | — | — | low | Archived; retain status, metadata review only. Needs README/config review before proposing metadata. Private repository. |
| [`min-copilot-plugins`](https://github.com/cmwen/min-copilot-plugins) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`pwa-api-showcase`](https://github.com/cmwen/pwa-api-showcase) | benchmark | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`pwa-api-lab`](https://github.com/cmwen/pwa-api-lab) | benchmark | React PWA compatibility test lab for desktop and mobile browsers | React test lab for exploring PWA API support across desktop and mobile browsers. | — | `developer-tools`, `experiment`, `pwa`, `react`, `typescript`, `github-pages` | Set `https://cmwen.github.io/pwa-api-lab/` | high | README confirms proposed purpose and topic set. |
| [`own-browse`](https://github.com/cmwen/own-browse) | developer-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`ng-sonnets`](https://github.com/cmwen/ng-sonnets) | archived-legacy | — | — | — | — | — | low | Archived; retain status, metadata review only. Needs README/config review before proposing metadata. |
| [`blog`](https://github.com/cmwen/blog) | archived-legacy | — | — | — | — | — | low | Archived; retain status, metadata review only. Needs README/config review before proposing metadata. |
| [`korea-metro-compass`](https://github.com/cmwen/korea-metro-compass) | archived-legacy | — | — | — | — | — | low | Archived; retain status, metadata review only. Needs README/config review before proposing metadata. |
| [`stash-it-app`](https://github.com/cmwen/stash-it-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`novated-lease-calculator`](https://github.com/cmwen/novated-lease-calculator) | other | — | Educational Australian novated lease guide and calculator. | — | `personal-app`, `personal-finance`, `pwa`, `react`, `typescript`, `github-pages` | — | high | README confirms proposed purpose and topic set. |
| [`logseq`](https://github.com/cmwen/logseq) | fork-upstream | A privacy-first, open-source platform for knowledge management and collaboration. Download link:  http://github.com/logseq/logseq/releases. roadmap: https://discuss.logseq.com/t/logseq-product-roadmap/34267 | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`copilot-web-news-plugins`](https://github.com/cmwen/copilot-web-news-plugins) | ai-agent | GitHub Copilot CLI marketplace and plugin for trusted AI and web news aggregation | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`voice-clone-qwen3-tts`](https://github.com/cmwen/voice-clone-qwen3-tts) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`smart-home-web`](https://github.com/cmwen/smart-home-web) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`dotfiles`](https://github.com/cmwen/dotfiles) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`home-energy-simulator`](https://github.com/cmwen/home-energy-simulator) | other | Home Energy Simulator | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`n8n-opencode`](https://github.com/cmwen/n8n-opencode) | archived-legacy | — | — | — | — | — | low | Archived; retain status, metadata review only. Needs README/config review before proposing metadata. |
| [`logseq-opencode`](https://github.com/cmwen/logseq-opencode) | ai-agent | Opencode setup for logseq | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`oh-my-opencode`](https://github.com/cmwen/oh-my-opencode) | fork-upstream | The Best Agent Harness. Meet Sisyphus: The Batteries-Included Agent that codes like you. | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`opencode`](https://github.com/cmwen/opencode) | fork-upstream | The open source coding agent. | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`n8n-backup`](https://github.com/cmwen/n8n-backup) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`my-resume`](https://github.com/cmwen/my-resume) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`min-activity-tracker`](https://github.com/cmwen/min-activity-tracker) | archived-legacy | — | — | — | — | — | low | Archived; retain status, metadata review only. Needs README/config review before proposing metadata. |
| [`syncthing-android-fork`](https://github.com/cmwen/syncthing-android-fork) | fork-upstream | Wrapper of syncthing for Android. | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`sdlc-agents`](https://github.com/cmwen/sdlc-agents) | ai-agent | Repository for SDLC agents | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`gamify-tax-deduction`](https://github.com/cmwen/gamify-tax-deduction) | other | Gamify Tax Deduction | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-n8n-mcp`](https://github.com/cmwen/min-n8n-mcp) | developer-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`text-editor-pwa`](https://github.com/cmwen/text-editor-pwa) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-pmt`](https://github.com/cmwen/min-pmt) | other | Mininum Project Management Tool | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`klecks`](https://github.com/cmwen/klecks) | fork-upstream | Community-funded painting tool powering Kleki.com | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`mcp-dev-env-setup`](https://github.com/cmwen/mcp-dev-env-setup) | developer-tool | MCP server for automating local development environment setup (Python, Node, Flutter, Android) | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`code-agent-benchmark`](https://github.com/cmwen/code-agent-benchmark) | benchmark | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`project-initiator`](https://github.com/cmwen/project-initiator) | developer-tool | — | Static app for creating structured, vendor-neutral project prompts for coding agents. | — | `coding-agents`, `prompt-engineering`, `developer-tools`, `static-site`, `typescript`, `github-pages` | — | high | README confirms proposed purpose and topic set. |
| [`podcast-pwa`](https://github.com/cmwen/podcast-pwa) | personal-app | Podcast PWA project from local workspace | Offline-capable podcast player built as a lightweight Progressive Web App. | — | `podcast`, `pwa`, `preact`, `typescript`, `offline-first`, `github-pages` | — | high | README confirms proposed purpose and topic set. |
| [`wuxai-game`](https://github.com/cmwen/wuxai-game) | other | A 武俠-inspired 2D action-platformer (Castlevania-like) — vertical slice prototype and vision. | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`copilot-cli`](https://github.com/cmwen/copilot-cli) | fork-upstream | GitHub Copilot CLI brings the power of Copilot coding agent directly to your terminal.  | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`AntennaPod`](https://github.com/cmwen/AntennaPod) | fork-upstream | A podcast manager for Android | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`koreader`](https://github.com/cmwen/koreader) | fork-upstream | An ebook reader application supporting PDF, DjVu, EPUB, FB2 and many more formats, running on Cervantes, Kindle, Kobo, PocketBook and Android devices | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`keepassxc`](https://github.com/cmwen/keepassxc) | fork-upstream | KeePassXC is a cross-platform community-driven port of the Windows application “Keepass Password Safe”. | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`todo-app`](https://github.com/cmwen/todo-app) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`min-copilot`](https://github.com/cmwen/min-copilot) | ai-agent | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`learn-japanese`](https://github.com/cmwen/learn-japanese) | learning-project | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`aussie-super-calc-2025`](https://github.com/cmwen/aussie-super-calc-2025) | other | Australian Super vs Mortgage Offset Calculator for FY 2024/25 | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`logseq-to-vectordb`](https://github.com/cmwen/logseq-to-vectordb) | knowledge-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`foam-kb`](https://github.com/cmwen/foam-kb) | knowledge-tool | — | — | — | — | — | medium | Needs README/config review before proposing metadata. Private repository. |
| [`bootstrap-in-shadow-dom`](https://github.com/cmwen/bootstrap-in-shadow-dom) | learning-project | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`vite-react-test`](https://github.com/cmwen/vite-react-test) | learning-project | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`cmwen`](https://github.com/cmwen/cmwen) | other | Min's public Github profile | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`exercise-1`](https://github.com/cmwen/exercise-1) | learning-project | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`getflix`](https://github.com/cmwen/getflix) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`nx-monorepo`](https://github.com/cmwen/nx-monorepo) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`scala-seed.g8`](https://github.com/cmwen/scala-seed.g8) | fork-upstream | Giter8 template for a simple hello world app in Scala. | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`micro-fe-wp`](https://github.com/cmwen/micro-fe-wp) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`components`](https://github.com/cmwen/components) | fork-upstream | Component infrastructure and Material Design components for Angular | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`image-transformer`](https://github.com/cmwen/image-transformer) | archived-legacy | — | — | — | — | — | low | Archived; retain status, metadata review only. Needs README/config review before proposing metadata. |
| [`itermocil`](https://github.com/cmwen/itermocil) | fork-upstream | Create pre-defined window/pane layouts and run commands in iTerm | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`node-replay`](https://github.com/cmwen/node-replay) | fork-upstream | When API testing slows you down: record and replay HTTP responses like a boss | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`html5_fun`](https://github.com/cmwen/html5_fun) | fork-upstream | — | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`melting-pod`](https://github.com/cmwen/melting-pod) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`cell-dojo`](https://github.com/cmwen/cell-dojo) | learning-project | Try out cell.js | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`mins-toolset`](https://github.com/cmwen/mins-toolset) | developer-tool | Collection of tools for developers | — | `presentation`, `toolset` | — | — | medium | Needs README/config review before proposing metadata. |
| [`elm-dojo`](https://github.com/cmwen/elm-dojo) | learning-project | Project to practice elm | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`dojo`](https://github.com/cmwen/dojo) | learning-project | Personal project that I can use to practice javascript skills | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`resty`](https://github.com/cmwen/resty) | fork-upstream | Little command line REST client that you can use in pipelines (bash or zsh). | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`DefinitelyTyped`](https://github.com/cmwen/DefinitelyTyped) | fork-upstream | The repository for high quality TypeScript type definitions. | — | — | — | — | low | Upstream identity retained; no custom description/topics proposed. Needs README/config review before proposing metadata. |
| [`iflocation`](https://github.com/cmwen/iflocation) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`html5test`](https://github.com/cmwen/html5test) | learning-project | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |
| [`CanIMakeIt`](https://github.com/cmwen/CanIMakeIt) | other | — | — | — | — | — | medium | Needs README/config review before proposing metadata. |

## Priority findings

- `github-dashboard`, `coding-agent-orchestrator`, `locallink`, `min-kb-app`, `model-eval`, `project-initiator`, `podcast-pwa`, `novated-lease-calculator`, `pwa-api-lab`, and `ai-portfolio` inspected via README. Their proposed descriptions/topics are grounded in those files.
- `pwa-api-lab` has a GitHub Pages workflow and no homepage; the inferred URL follows the repository Pages URL pattern.
- Fork metadata identifies 17 upstream copies. Reported upstream candidates AntennaPod, DefinitelyTyped, KeePassXC, KOReader, Logseq, and OpenCode are all GitHub-marked forks. Several more upstream forks appear in the inventory. No fork metadata is changed.
- Repositories outside the priority group need file-level inspection; their classifications are provisional where the repository name/description alone is insufficient.

## Taxonomy notes

- Use `developer-tools` consistently (avoid singular `developer-tool`).
- The requested taxonomy groups do not include all useful project tags (for example `github`, `deno`, `tmux`, `rss`, `testing`, or `markdown`). Keep repo-specific topics only when they add search value; the high-confidence sets use the supplied vocabulary where applicable.
- GitHub has no topic equivalent for every inferred characteristic. `upstream-fork` is omitted to avoid modifying fork metadata without a controlled vocabulary requirement.

## High-confidence changes queued for application

- `ai-portfolio`: description → “Static Astro portfolio for AI generated designs, media, and interactive 3D work.”; topics → `ai`, `astro`, `typescript`, `static-site`, `github-pages`, `experiment`.
- `github-dashboard`: description → “Personal GitHub project dashboard for discovering and managing repositories.”; topics → `personal-app`, `developer-tools`, `pwa`, `react`, `typescript`, `github-pages`, `deno`.
- `coding-agent-orchestrator`: description → “Local-first PWA for orchestrating coding-agent CLI sessions through tmux.”; topics → `coding-agents`, `ai-agents`, `developer-tools`, `local-first`, `pwa`, `typescript`.
- `locallink`: description → “Local-first control plane for managing developer services and AI-agent tooling.”; topics → `developer-tools`, `local-first`, `docker`, `mcp`, `ai-agents`, `typescript`, `observability`.
- `min-kb-app`: description → “Local-first AI workspace for chatting with and managing a Markdown knowledge store.”; topics → `ai-agents`, `local-first`, `pwa`, `typescript`, `llm`, `knowledge-base`, `knowledge-management`.
- `model-eval`: description → “Promptfoo benchmark suite for evaluating local and hosted language models.”; topics → `llm`, `benchmark`, `ai`, `prompt-engineering`.
- `project-initiator`: description → “Static app for creating structured, vendor-neutral project prompts for coding agents.”; topics → `coding-agents`, `prompt-engineering`, `developer-tools`, `static-site`, `typescript`, `github-pages`.
- `podcast-pwa`: description → “Offline-capable podcast player built as a lightweight Progressive Web App.”; topics → `podcast`, `pwa`, `preact`, `typescript`, `offline-first`, `github-pages`.
- `novated-lease-calculator`: description → “Educational Australian novated lease guide and calculator.”; topics → `personal-app`, `personal-finance`, `pwa`, `react`, `typescript`, `github-pages`.
- `pwa-api-lab`: description → “React test lab for exploring PWA API support across desktop and mobile browsers.”; topics → `developer-tools`, `experiment`, `pwa`, `react`, `typescript`, `github-pages`; homepage → `https://cmwen.github.io/pwa-api-lab/`.
