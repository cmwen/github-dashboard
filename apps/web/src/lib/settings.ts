import type { RepoGroup } from "../../../../packages/domain/src/mod.ts";

export type ThemeMode = "system" | "light" | "dark";
export type DataSourceMode = "mock" | "live";
export type PullRequestCreatorFilter = "dependabot" | "all" | "me";
export type PullRequestSortOrder = "urgent" | "updated" | "created";
export type WorkflowAlertThreshold = "failed" | "warn" | "all";

export interface AppSettings {
  readonly theme: ThemeMode;
  readonly dataSource: DataSourceMode;
  readonly token: string;
  readonly repositorySearch: string;
  readonly repositoryGroup: RepoGroup | "all";
  readonly pullRequestCreator: PullRequestCreatorFilter;
  readonly pullRequestSort: PullRequestSortOrder;
  readonly repositoryScope: RepoGroup | "all";
  readonly workflowAlertThreshold: WorkflowAlertThreshold;
  readonly openObserveEndpoint: string;
  readonly openObserveAccessKey: string;
}

export const SETTINGS_STORAGE_KEY = "github-dashboard.settings";
const DEFAULT_OPENOBSERVE_ENDPOINT = import.meta.env.VITE_OPENOBSERVE_ENDPOINT?.trim() ??
  "http://localhost:5080/api/default/nodejs/_json";

export function createDefaultSettings(): AppSettings {
  const envToken = import.meta.env.VITE_GITHUB_TOKEN?.trim() ?? "";
  const envOpenObserveAccessKey = import.meta.env.VITE_OPENOBSERVE_ACCESS_KEY?.trim() ?? "";

  return {
    theme: "system",
    dataSource: envToken.length > 0 ? "live" : "mock",
    token: envToken,
    repositorySearch: "",
    repositoryGroup: "all",
    pullRequestCreator: "dependabot",
    pullRequestSort: "urgent",
    repositoryScope: "all",
    workflowAlertThreshold: "failed",
    openObserveEndpoint: DEFAULT_OPENOBSERVE_ENDPOINT,
    openObserveAccessKey: envOpenObserveAccessKey,
  };
}

export function loadSettings(): AppSettings {
  const defaults = createDefaultSettings();
  const rawValue = globalThis.localStorage?.getItem(SETTINGS_STORAGE_KEY);

  if (!rawValue) {
    return defaults;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<AppSettings>;

    return {
      ...defaults,
      ...parsed,
      token: parsed.token?.trim() ?? defaults.token,
      openObserveEndpoint: parsed.openObserveEndpoint?.trim() ?? defaults.openObserveEndpoint,
      openObserveAccessKey: parsed.openObserveAccessKey?.trim() ?? defaults.openObserveAccessKey,
    };
  } catch {
    return defaults;
  }
}

export function saveSettings(settings: AppSettings): void {
  globalThis.localStorage?.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function updateSettings(
  settings: AppSettings,
  patch: Partial<AppSettings>,
): AppSettings {
  return {
    ...settings,
    ...patch,
    token: patch.token?.trim() ?? settings.token,
    openObserveEndpoint: patch.openObserveEndpoint?.trim() ?? settings.openObserveEndpoint,
    openObserveAccessKey: patch.openObserveAccessKey?.trim() ?? settings.openObserveAccessKey,
  };
}
