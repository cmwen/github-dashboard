import { type Logger, pino } from "pino";

import type { AppSettings } from "./settings.ts";

type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";
type LogFields = Record<string, unknown>;

interface OpenObserveConfig {
  endpoint: string;
  accessKey: string;
}

interface BrowserLogRecord extends LogFields {
  level?: number;
  msg?: string;
  time?: number;
}

const DEFAULT_ENDPOINT = import.meta.env.VITE_OPENOBSERVE_ENDPOINT?.trim() ??
  "http://localhost:5080/api/default/nodejs/_json";

let openObserveConfig: OpenObserveConfig = {
  endpoint: DEFAULT_ENDPOINT,
  accessKey: import.meta.env.VITE_OPENOBSERVE_ACCESS_KEY?.trim() ?? "",
};

let globalErrorHandlersInstalled = false;

export const logger = createLogger();

export function configureLogger(settings: AppSettings): void {
  openObserveConfig = {
    endpoint: settings.openObserveEndpoint.trim(),
    accessKey: settings.openObserveAccessKey.trim(),
  };
}

export function installGlobalErrorHandlers(): void {
  if (globalErrorHandlersInstalled || typeof globalThis === "undefined") {
    return;
  }

  globalErrorHandlersInstalled = true;

  globalThis.addEventListener("error", (event) => {
    logger.error(
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
      event.message || "Unhandled window error",
    );
  });

  globalThis.addEventListener("unhandledrejection", (event) => {
    logger.error(
      {
        reason: stringifyUnknown(event.reason),
      },
      "Unhandled promise rejection",
    );
  });
}

export function createAuthorizationHeader(accessKey: string): string {
  return `Basic ${accessKey}`;
}

export function isOpenObserveEnabled(config: OpenObserveConfig): boolean {
  return config.endpoint.trim().length > 0 && config.accessKey.trim().length > 0;
}

function createLogger(): Logger {
  return pino({
    name: "github-dashboard",
    level: "info",
    base: {
      service: "github-dashboard",
      runtime: "browser",
    },
    browser: {
      asObject: true,
      write: (record: object) => {
        const normalizedRecord = normalizeBrowserRecord(record);
        writeToConsole(normalizedRecord);
        void writeToOpenObserve(normalizedRecord);
      },
    },
  });
}

async function writeToOpenObserve(record: BrowserLogRecord): Promise<void> {
  if (!isOpenObserveEnabled(openObserveConfig)) {
    return;
  }

  const payload = {
    ...record,
    level_name: mapLevelNumberToLabel(record.level),
    timestamp: new Date(record.time ?? Date.now()).toISOString(),
  };

  try {
    const response = await fetch(openObserveConfig.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: createAuthorizationHeader(openObserveConfig.accessKey),
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    if (!response.ok) {
      console.error("OpenObserve log shipping failed", {
        status: response.status,
        statusText: response.statusText,
      });
    }
  } catch (error) {
    console.error("OpenObserve log shipping failed", error);
  }
}

function writeToConsole(record: BrowserLogRecord): void {
  if (import.meta.env.MODE === "test") {
    return;
  }

  const level = mapLevelNumberToLabel(record.level);
  const consoleMethod = mapLevelToConsoleMethod(level);
  const message = record.msg ?? "Application log";

  consoleMethod(message, record);
}

function mapLevelNumberToLabel(level?: number): LogLevel {
  if (!level) {
    return "info";
  }

  if (level >= 60) {
    return "fatal";
  }
  if (level >= 50) {
    return "error";
  }
  if (level >= 40) {
    return "warn";
  }
  if (level >= 30) {
    return "info";
  }
  if (level >= 20) {
    return "debug";
  }
  return "trace";
}

function mapLevelToConsoleMethod(level: LogLevel): (...data: unknown[]) => void {
  switch (level) {
    case "fatal":
    case "error":
      return console.error;
    case "warn":
      return console.warn;
    case "debug":
      return console.debug;
    case "trace":
      return console.trace;
    case "info":
    default:
      return console.info;
  }
}

function stringifyUnknown(value: unknown): string {
  if (value instanceof Error) {
    return `${value.name}: ${value.message}`;
  }

  return typeof value === "string" ? value : JSON.stringify(value);
}

function normalizeBrowserRecord(record: object): BrowserLogRecord {
  return Object.fromEntries(Object.entries(record)) as BrowserLogRecord;
}
