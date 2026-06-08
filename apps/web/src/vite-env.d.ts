/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_GITHUB_TOKEN?: string;
  readonly VITE_OPENOBSERVE_ACCESS_KEY?: string;
  readonly VITE_OPENOBSERVE_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
