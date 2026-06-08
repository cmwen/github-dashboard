import React, { useMemo, useState } from "react";
import {
  type DashboardData,
  filterRepositories,
  getRepositoryByFullName,
  type PullRequestSummary,
  type RepositorySummary,
  type WorkflowState,
} from "../../../../packages/domain/src/mod.ts";
import { Link, useParams } from "react-router-dom";

import { StatusPill } from "../components/StatusPill.tsx";
import { logger } from "../lib/logger.ts";
import type {
  AppSettings,
  DataSourceMode,
  PullRequestCreatorFilter,
  PullRequestSortOrder,
  ThemeMode,
  WorkflowAlertThreshold,
} from "../lib/settings.ts";
import { formatDateTime } from "../lib/time.ts";

export interface ScreenState {
  readonly isLoading: boolean;
  readonly errorMessage?: string;
}

export interface DashboardScreenProps {
  readonly data?: DashboardData;
  readonly settings: AppSettings;
  readonly onUpdateSettings: (patch: Partial<AppSettings>) => void;
  readonly state: ScreenState;
}

export interface SharedScreenProps {
  readonly data?: DashboardData;
  readonly state: ScreenState;
}

export interface PullRequestsScreenProps extends SharedScreenProps {
  readonly settings: AppSettings;
  readonly onUpdateSettings: (patch: Partial<AppSettings>) => void;
}

export interface WorkflowsScreenProps extends SharedScreenProps {
  readonly settings: AppSettings;
  readonly onUpdateSettings: (patch: Partial<AppSettings>) => void;
}

export interface SettingsScreenProps {
  readonly settings: AppSettings;
  readonly onUpdateSettings: (patch: Partial<AppSettings>) => void;
  readonly onResetSettings: () => void;
}

type RepositoryDetailTab = "prs" | "issues" | "workflows";

export function LauncherScreen({ data, state }: SharedScreenProps) {
  return (
    <section className="screen">
      <section className="container page-section">
        <p className="eyebrow">responsive web prototype</p>
        <h1>Manage personal and org GitHub work from one operational surface.</h1>
        <p className="lead">
          This dashboard includes dedicated screens for repo attention, PR triage, workflow
          failures, repository-level detail, and optional live GitHub data through Octokit.
        </p>
      </section>

      <section className="container page-section">
        <div className="grid-3">
          <QuickLinkCard
            description="My repos, org repos, contributing repos, and attention signals."
            href="/dashboard"
            label="screen 01"
            title="Dashboard"
          />
          <QuickLinkCard
            description="Creator filter defaults, urgency behavior, scope controls, and logging."
            href="/settings"
            label="screen 02"
            title="Settings / Filters"
          />
          <QuickLinkCard
            description="Dependabot default focus, urgent-first sort, and merge controls."
            href="/pull-requests"
            label="screen 03"
            title="Pull Requests Hub"
          />
          <QuickLinkCard
            description="Failed builds and conflicting checks across all repositories."
            href="/workflows"
            label="screen 04"
            title="Workflow Alerts"
          />
          <QuickLinkCard
            description="Focused repo view with branch health, PR queue, and issue load."
            href="/repositories/org/frontend-app"
            label="screen 05"
            title="Repository Detail"
          />
        </div>
      </section>

      {data && (
        <section className="container page-section">
          <div className="grid-4">
            <MetricCard
              label="Open PRs needing review"
              value={String(data.metrics.pullRequestsNeedingReview)}
            />
            <MetricCard label="Failing workflows" value={String(data.metrics.failingWorkflows)} />
            <MetricCard
              label="Repositories at risk"
              value={String(data.metrics.repositoriesAtRisk)}
            />
            <MetricCard
              label="Merge conflicts detected"
              value={String(data.metrics.mergeConflicts)}
            />
          </div>
          <DataStateNotice state={state} />
        </section>
      )}

      <ScreenFooter
        ctaLabel="Open Dashboard →"
        ctaTo="/dashboard"
        note="Prototype scope: responsive web · PWA · mock and live GitHub modes"
      />
    </section>
  );
}

export function DashboardScreen({
  data,
  onUpdateSettings,
  settings,
  state,
}: DashboardScreenProps) {
  const repositories = data
    ? filterRepositories(data.repositories, {
      searchTerm: settings.repositorySearch,
      group: settings.repositoryGroup,
    })
    : [];

  return (
    <section className="screen">
      <section className="container page-section">
        <div className="row-between">
          <div>
            <p className="eyebrow">dashboard</p>
            <h1>Repo attention across personal, org, and contributing projects.</h1>
          </div>
        </div>
        <div className="toolbar toolbar--with-margin" aria-label="Repository filters">
          <div className="field">
            <label className="label" htmlFor="repo-search">Search repository</label>
            <input
              id="repo-search"
              type="search"
              placeholder="repo name…"
              value={settings.repositorySearch}
              onChange={(event) =>
                onUpdateSettings({ repositorySearch: event.currentTarget.value })}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="repo-group">Group</label>
            <select
              id="repo-group"
              value={settings.repositoryGroup}
              onChange={(event) =>
                onUpdateSettings({
                  repositoryGroup: event.currentTarget.value as AppSettings["repositoryGroup"],
                })}
            >
              <option value="all">All groups</option>
              <option value="personal">My repos</option>
              <option value="organization">Org repos</option>
              <option value="contributing">Contributing repos</option>
            </select>
          </div>
        </div>
      </section>

      {data && (
        <section className="container page-section">
          <div className="grid-4">
            <MetricCard
              label="Open PRs needing review"
              value={String(data.metrics.pullRequestsNeedingReview)}
            />
            <MetricCard label="Failing workflows" value={String(data.metrics.failingWorkflows)} />
            <MetricCard label="Open issues assigned" value={String(countOpenIssues(data))} />
            <MetricCard
              label="Merge conflicts detected"
              value={String(data.metrics.mergeConflicts)}
            />
          </div>
        </section>
      )}

      <section className="container page-section">
        <DataStateNotice state={state} />
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Repository</th>
                <th>Group</th>
                <th>Latest commit</th>
                <th>Open PRs</th>
                <th>Open issues</th>
                <th>Workflow</th>
              </tr>
            </thead>
            <tbody>
              {repositories.length === 0
                ? (
                  <tr>
                    <td className="empty" colSpan={6}>No repositories match this filter.</td>
                  </tr>
                )
                : repositories.map((repository) => (
                  <tr key={repository.id}>
                    <td>
                      <Link
                        className="inline-link"
                        to={`/repositories/${repository.owner}/${repository.name}`}
                      >
                        {repository.fullName}
                      </Link>
                    </td>
                    <td>{formatGroup(repository.group)}</td>
                    <td className="mono">{formatDateTime(repository.lastCommitAt)}</td>
                    <td className="mono">{repository.openPrCount}</td>
                    <td className="mono">{repository.openIssueCount}</td>
                    <td>
                      <StatusPill tone={mapWorkflowTone(repository.workflowState)}>
                        {formatRepositoryWorkflowLabel(repository.workflowState)}
                      </StatusPill>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <ScreenFooter
        ctaLabel="Go to PR Hub →"
        ctaTo="/pull-requests"
        note="Tip: open PR Hub to merge Dependabot updates in one flow."
      />
    </section>
  );
}

export function PullRequestsScreen({
  data,
  onUpdateSettings,
  settings,
  state,
}: PullRequestsScreenProps) {
  const [selectedPullRequestId, setSelectedPullRequestId] = useState<number | null>(null);
  const [mergedPullRequests, setMergedPullRequests] = useState<number[]>([]);
  const profileLogin = data?.profile.login ?? "";

  const visiblePullRequests = useMemo(() => {
    const filteredPullRequests = (data?.pullRequests ?? [])
      .filter((pullRequest) => !mergedPullRequests.includes(pullRequest.id))
      .filter((pullRequest) => {
        const creator = getPullRequestCreatorCategory(pullRequest, profileLogin);
        return settings.pullRequestCreator === "all" || creator === settings.pullRequestCreator;
      });

    return filteredPullRequests.toSorted((left, right) =>
      comparePullRequests(left, right, settings.pullRequestSort)
    );
  }, [
    data?.pullRequests,
    mergedPullRequests,
    profileLogin,
    settings.pullRequestCreator,
    settings.pullRequestSort,
  ]);

  const selectedPullRequest =
    visiblePullRequests.find((pullRequest) => pullRequest.id === selectedPullRequestId) ??
      null;
  const mergeBlocked = !selectedPullRequest || isPullRequestMergeBlocked(selectedPullRequest);

  function handleSelectPullRequest(pullRequest: PullRequestSummary): void {
    setSelectedPullRequestId(pullRequest.id);
    logger.info(
      { pullRequestId: pullRequest.id, repository: pullRequest.repositoryFullName },
      "PR selected",
    );
  }

  function handleMergePullRequest(): void {
    if (!selectedPullRequest || mergeBlocked) {
      return;
    }

    setMergedPullRequests((currentValue) => [...currentValue, selectedPullRequest.id]);
    logger.info(
      { pullRequestId: selectedPullRequest.id, repository: selectedPullRequest.repositoryFullName },
      "PR merged from dashboard",
    );
  }

  return (
    <section className="screen">
      <section className="container page-section">
        <p className="eyebrow">pull requests hub</p>
        <h1>Dependabot-first queue with urgent conflicts and failed checks at the top.</h1>
        <p className="lead">
          Use creator and sort controls to triage all repositories in one place, then execute merge
          actions without leaving the hub.
        </p>
        <div className="toolbar toolbar--with-margin">
          <div className="field">
            <label className="label" htmlFor="creator-filter">Creator filter</label>
            <select
              id="creator-filter"
              value={settings.pullRequestCreator}
              onChange={(event) =>
                onUpdateSettings({
                  pullRequestCreator: event.currentTarget.value as PullRequestCreatorFilter,
                })}
            >
              <option value="dependabot">Dependabot</option>
              <option value="all">All creators</option>
              <option value="me">Only me</option>
            </select>
          </div>
          <div className="field">
            <label className="label" htmlFor="sort-filter">Sort order</label>
            <select
              id="sort-filter"
              value={settings.pullRequestSort}
              onChange={(event) =>
                onUpdateSettings({
                  pullRequestSort: event.currentTarget.value as PullRequestSortOrder,
                })}
            >
              <option value="urgent">Most urgent first</option>
              <option value="updated">Recently updated first</option>
              <option value="created">Recently created first</option>
            </select>
          </div>
        </div>
      </section>

      <section className="container page-section">
        <DataStateNotice state={state} />
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>PR</th>
                <th>Repository</th>
                <th>Creator</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visiblePullRequests.length === 0
                ? (
                  <tr>
                    <td className="empty" colSpan={6}>No pull requests in this filter.</td>
                  </tr>
                )
                : visiblePullRequests.map((pullRequest) => (
                  <tr key={pullRequest.id}>
                    <td>{pullRequest.title}</td>
                    <td className="mono">{pullRequest.repositoryFullName}</td>
                    <td>
                      {formatPullRequestCreator(
                        getPullRequestCreatorCategory(pullRequest, profileLogin),
                        pullRequest.author,
                      )}
                    </td>
                    <td>{renderPullRequestStatus(pullRequest)}</td>
                    <td className="mono">{formatDateTime(pullRequest.updatedAt)}</td>
                    <td>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => handleSelectPullRequest(pullRequest)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container page-section">
        <div className="card card-muted">
          <div className="row-between">
            <div>
              <h3>{selectedPullRequest?.title ?? "Select a PR row to enable merge controls."}</h3>
              <p className="label">
                {selectedPullRequest
                  ? `${selectedPullRequest.repositoryFullName} · ${
                    formatPullRequestMeta(selectedPullRequest)
                  }`
                  : "No PR selected."}
              </p>
            </div>
            <div className="row">
              <a
                className={`btn ${selectedPullRequest ? "" : "btn-disabled"}`}
                href={selectedPullRequest?.url ?? "#"}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                  if (!selectedPullRequest) {
                    event.preventDefault();
                  }
                }}
              >
                Open on GitHub
              </a>
              <button
                className="btn btn-primary"
                disabled={mergeBlocked}
                type="button"
                onClick={handleMergePullRequest}
              >
                Merge selected PR
              </button>
            </div>
          </div>
        </div>
      </section>

      <ScreenFooter
        ctaLabel="Adjust defaults in Settings →"
        ctaTo="/settings"
        note="Default route: Dependabot + urgent-first sorting."
      />
    </section>
  );
}

export function WorkflowsScreen({
  data,
  onUpdateSettings,
  settings,
  state,
}: WorkflowsScreenProps) {
  const visibleWorkflows = (data?.workflows ?? []).filter((workflow) =>
    matchesWorkflowThreshold(workflow.status, settings.workflowAlertThreshold)
  );

  return (
    <section className="screen">
      <section className="container page-section">
        <p className="eyebrow">workflow alerts</p>
        <h1>Track failing, flaky, and queued pipelines across all tracked repositories.</h1>
        <p className="lead">
          Prioritize breakages first, then move to warning-level flaky runs before they block merge
          flow.
        </p>
        <div className="toolbar toolbar--with-margin">
          <div className="field">
            <label className="label" htmlFor="workflow-level">Alert level</label>
            <select
              id="workflow-level"
              value={settings.workflowAlertThreshold}
              onChange={(event) =>
                onUpdateSettings({
                  workflowAlertThreshold: event.currentTarget.value as WorkflowAlertThreshold,
                })}
            >
              <option value="all">All alerts</option>
              <option value="failed">Failed only</option>
              <option value="warn">Warnings only</option>
            </select>
          </div>
        </div>
      </section>

      <section className="container page-section">
        <DataStateNotice state={state} />
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Repository</th>
                <th>Workflow</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Last run</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleWorkflows.length === 0
                ? (
                  <tr>
                    <td className="empty" colSpan={6}>No workflows match this filter.</td>
                  </tr>
                )
                : visibleWorkflows.map((workflow) => (
                  <tr key={workflow.id}>
                    <td className="mono">{workflow.repositoryFullName}</td>
                    <td>{workflow.workflowName}</td>
                    <td className="mono">{workflow.branch}</td>
                    <td>
                      <StatusPill tone={mapWorkflowTone(workflow.status)}>
                        {formatWorkflowState(workflow.status)}
                      </StatusPill>
                    </td>
                    <td className="mono">{formatDateTime(workflow.updatedAt)}</td>
                    <td>
                      <a className="btn" href={workflow.url} target="_blank" rel="noreferrer">
                        Open run
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <ScreenFooter
        ctaLabel="Open PR Hub triage →"
        ctaTo="/pull-requests"
        note="Workflow focus feeds PR urgency ranking."
      />
    </section>
  );
}

export function RepositoryDetailScreen({ data, state }: SharedScreenProps) {
  const [activeTab, setActiveTab] = useState<RepositoryDetailTab>("prs");
  const params = useParams();
  const repositoryFullName = params.owner && params.repo
    ? `${params.owner}/${params.repo}`
    : undefined;
  const repository = repositoryFullName && data
    ? getRepositoryByFullName(data.repositories, repositoryFullName)
    : undefined;
  const relatedPullRequests =
    data?.pullRequests.filter((pullRequest) =>
      pullRequest.repositoryFullName === repositoryFullName
    ) ?? [];
  const relatedWorkflows =
    data?.workflows.filter((workflow) => workflow.repositoryFullName === repositoryFullName) ?? [];

  if (!data && state.isLoading) {
    return (
      <section className="screen">
        <section className="container page-section">
          <p className="eyebrow">repository detail</p>
          <h1>Loading repository detail…</h1>
        </section>
      </section>
    );
  }

  if (!repository) {
    return (
      <section className="screen">
        <section className="container page-section">
          <p className="eyebrow">repository detail</p>
          <h1>Repository not found.</h1>
        </section>
        <section className="container page-section">
          <DataStateNotice state={state} />
        </section>
      </section>
    );
  }

  const issueRows = createIssueRows(repository);

  return (
    <section className="screen">
      <section className="container page-section">
        <p className="eyebrow">repository detail</p>
        <h1>{repository.fullName}</h1>
        <p className="lead">
          Central health view for PR velocity, issue pressure, and workflow reliability on the
          default branch.
        </p>
      </section>

      <section className="container page-section">
        <div className="grid-4">
          <MetricCard label="Open pull requests" value={String(repository.openPrCount)} />
          <MetricCard label="Open issues" value={String(repository.openIssueCount)} />
          <MetricCard
            label="Failing workflows"
            value={String(countFailingWorkflows(relatedWorkflows))}
          />
          <MetricCard
            label="Latest commit on main"
            value={formatDateTime(repository.lastCommitAt)}
          />
        </div>
      </section>

      <section className="container page-section">
        <div className="row tab-row" role="tablist" aria-label="repo detail tabs">
          <button
            className={activeTab === "prs" ? "btn btn-primary" : "btn"}
            data-tab="prs"
            type="button"
            onClick={() => setActiveTab("prs")}
          >
            PR queue
          </button>
          <button
            className={activeTab === "issues" ? "btn btn-primary" : "btn"}
            data-tab="issues"
            type="button"
            onClick={() => setActiveTab("issues")}
          >
            Issues
          </button>
          <button
            className={activeTab === "workflows" ? "btn btn-primary" : "btn"}
            data-tab="workflows"
            type="button"
            onClick={() => setActiveTab("workflows")}
          >
            Workflow runs
          </button>
        </div>

        {activeTab === "prs" && (
          <div className="card card-top-gap">
            <table className="table">
              <thead>
                <tr>
                  <th>PR</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {relatedPullRequests.map((pullRequest) => (
                  <tr key={pullRequest.id}>
                    <td>{pullRequest.title}</td>
                    <td>{renderPullRequestStatus(pullRequest)}</td>
                    <td className="mono">{formatDateTime(pullRequest.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "issues" && (
          <div className="card card-top-gap">
            <table className="table">
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {issueRows.map((issue) => (
                  <tr key={issue.title}>
                    <td>{issue.title}</td>
                    <td>
                      <StatusPill tone={issue.priorityTone}>{issue.priorityLabel}</StatusPill>
                    </td>
                    <td className="mono">{issue.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "workflows" && (
          <div className="card card-top-gap">
            <table className="table">
              <thead>
                <tr>
                  <th>Workflow</th>
                  <th>Result</th>
                  <th>Last run</th>
                </tr>
              </thead>
              <tbody>
                {relatedWorkflows.length === 0
                  ? (
                    <tr>
                      <td className="empty" colSpan={3}>No workflow alerts for this repository.</td>
                    </tr>
                  )
                  : relatedWorkflows.map((workflow) => (
                    <tr key={workflow.id}>
                      <td>{workflow.workflowName}</td>
                      <td>
                        <StatusPill tone={mapWorkflowTone(workflow.status)}>
                          {formatWorkflowState(workflow.status)}
                        </StatusPill>
                      </td>
                      <td className="mono">{formatDateTime(workflow.updatedAt)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ScreenFooter
        ctaLabel="Open PR Hub →"
        ctaTo="/pull-requests"
        note="Repository detail links back to global PR and workflow hubs."
      />
    </section>
  );
}

export function SettingsScreen({
  onResetSettings,
  onUpdateSettings,
  settings,
}: SettingsScreenProps) {
  return (
    <section className="screen">
      <section className="container page-section">
        <p className="eyebrow">settings / filters</p>
        <h1>Tune default triage behavior for pull requests and alerts.</h1>
        <p className="lead">
          These settings persist in local storage so the dashboard behaves like a real product
          surface while you evaluate sorting, focus defaults, and local observability.
        </p>
      </section>

      <section className="container page-section">
        <div className="grid-2">
          <div className="card stack">
            <div className="field">
              <label className="label" htmlFor="default-creator">Default creator filter</label>
              <select
                id="default-creator"
                value={settings.pullRequestCreator}
                onChange={(event) =>
                  onUpdateSettings({
                    pullRequestCreator: event.currentTarget.value as PullRequestCreatorFilter,
                  })}
              >
                <option value="dependabot">Dependabot</option>
                <option value="all">All creators</option>
                <option value="me">Only me</option>
              </select>
            </div>

            <div className="field">
              <label className="label" htmlFor="sort-order">PR sort order</label>
              <select
                id="sort-order"
                value={settings.pullRequestSort}
                onChange={(event) =>
                  onUpdateSettings({
                    pullRequestSort: event.currentTarget.value as PullRequestSortOrder,
                  })}
              >
                <option value="urgent">Most urgent first</option>
                <option value="updated">Recently updated</option>
                <option value="created">Recently created</option>
              </select>
            </div>

            <div className="field">
              <label className="label" htmlFor="repo-scope">Repository scope</label>
              <select
                id="repo-scope"
                value={settings.repositoryScope}
                onChange={(event) =>
                  onUpdateSettings({
                    repositoryScope: event.currentTarget.value as AppSettings["repositoryScope"],
                  })}
              >
                <option value="all">My + org + contributing repos</option>
                <option value="personal">Only my repos</option>
                <option value="organization">Only org repos</option>
                <option value="contributing">Only contributing repos</option>
              </select>
            </div>

            <div className="field">
              <label className="label" htmlFor="alert-threshold">Workflow alert threshold</label>
              <select
                id="alert-threshold"
                value={settings.workflowAlertThreshold}
                onChange={(event) =>
                  onUpdateSettings({
                    workflowAlertThreshold: event.currentTarget.value as WorkflowAlertThreshold,
                  })}
              >
                <option value="failed">Only failed jobs</option>
                <option value="warn">Failed + flaky jobs</option>
                <option value="all">All non-success jobs</option>
              </select>
            </div>

            <div className="field">
              <label className="label" htmlFor="theme-mode">Theme</label>
              <select
                id="theme-mode"
                value={settings.theme}
                onChange={(event) =>
                  onUpdateSettings({ theme: event.currentTarget.value as ThemeMode })}
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div className="field">
              <label className="label" htmlFor="data-source">Data source</label>
              <select
                id="data-source"
                value={settings.dataSource}
                onChange={(event) =>
                  onUpdateSettings({ dataSource: event.currentTarget.value as DataSourceMode })}
              >
                <option value="mock">Mock dataset</option>
                <option value="live">Live GitHub API</option>
              </select>
            </div>

            <div className="field">
              <label className="label" htmlFor="github-token">GitHub token</label>
              <input
                id="github-token"
                type="password"
                value={settings.token}
                placeholder="ghp_..."
                onChange={(event) => onUpdateSettings({ token: event.currentTarget.value })}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="openobserve-endpoint">OpenObserve endpoint</label>
              <input
                id="openobserve-endpoint"
                type="url"
                value={settings.openObserveEndpoint}
                placeholder="http://localhost:5080/api/default/nodejs/_json"
                onChange={(event) =>
                  onUpdateSettings({ openObserveEndpoint: event.currentTarget.value })}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="openobserve-access-key">
                OpenObserve access key
              </label>
              <input
                id="openobserve-access-key"
                type="password"
                value={settings.openObserveAccessKey}
                placeholder="Stored locally only"
                onChange={(event) =>
                  onUpdateSettings({ openObserveAccessKey: event.currentTarget.value })}
              />
            </div>

            <div className="row">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => logger.info({ theme: settings.theme }, "Settings saved")}
              >
                Save settings
              </button>
              <button
                className="btn"
                type="button"
                onClick={onResetSettings}
              >
                Reset defaults
              </button>
            </div>
          </div>

          <div className="card card-muted stack">
            <h3>Current profile</h3>
            <MetricSummary label="PR hub default" value={settings.pullRequestCreator} />
            <MetricSummary label="Sort order" value={settings.pullRequestSort} />
            <MetricSummary label="Repo scope" value={settings.repositoryScope} />
            <MetricSummary label="Workflow threshold" value={settings.workflowAlertThreshold} />
            <MetricSummary
              label="OpenObserve logging"
              value={settings.openObserveAccessKey ? "enabled" : "disabled"}
            />
            <p className="label">
              The access key stays in local storage. The repo only carries the endpoint and blank
              env placeholders so secrets are not committed.
            </p>
          </div>
        </div>
      </section>

      <ScreenFooter
        ctaLabel="Open PR Hub with profile →"
        ctaTo="/pull-requests"
        note="Saved settings apply immediately to this prototype."
      />
    </section>
  );
}

function QuickLinkCard({
  description,
  href,
  label,
  title,
}: {
  readonly description: string;
  readonly href: string;
  readonly label: string;
  readonly title: string;
}) {
  return (
    <Link className="card" to={href}>
      <p className="eyebrow">{label}</p>
      <h3>{title}</h3>
      <p className="label">{description}</p>
    </Link>
  );
}

function MetricCard({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="card metric">
      <span className="value">{value}</span>
      <span className="label">{label}</span>
    </div>
  );
}

function MetricSummary({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="metric">
      <span className="label">{label}</span>
      <span className="value mono">{value}</span>
    </div>
  );
}

function DataStateNotice({ state }: { readonly state: ScreenState }) {
  if (state.isLoading) {
    return <div className="card card-muted helper-card">Loading the latest dashboard data…</div>;
  }

  if (state.errorMessage) {
    return <div className="card helper-card helper-card--danger">{state.errorMessage}</div>;
  }

  return null;
}

function ScreenFooter({
  ctaLabel,
  ctaTo,
  note,
}: {
  readonly ctaLabel: string;
  readonly ctaTo: string;
  readonly note: string;
}) {
  return (
    <footer className="pagefoot">
      <div className="container row-between">
        <span>{note}</span>
        <span>
          <Link to={ctaTo}>{ctaLabel}</Link>
        </span>
      </div>
    </footer>
  );
}

function countOpenIssues(data: DashboardData): number {
  return data.repositories.reduce((total, repository) => total + repository.openIssueCount, 0);
}

function formatGroup(group: RepositorySummary["group"]): string {
  switch (group) {
    case "personal":
      return "My repo";
    case "organization":
      return "Org repo";
    case "contributing":
      return "Contributing";
  }
}

function formatRepositoryWorkflowLabel(state: WorkflowState): string {
  switch (state) {
    case "healthy":
      return "Checks passing";
    case "warning":
      return "1 flaky workflow";
    case "failing":
      return "Last build failed";
  }
}

function formatWorkflowState(state: WorkflowState): string {
  switch (state) {
    case "healthy":
      return "Passing";
    case "warning":
      return "Warning";
    case "failing":
      return "Failed";
  }
}

function mapWorkflowTone(state: WorkflowState): "success" | "warning" | "danger" {
  switch (state) {
    case "healthy":
      return "success";
    case "warning":
      return "warning";
    case "failing":
      return "danger";
  }
}

function getPullRequestCreatorCategory(
  pullRequest: PullRequestSummary,
  profileLogin: string,
): PullRequestCreatorFilter {
  if (
    pullRequest.author.toLowerCase().includes("dependabot") ||
    pullRequest.title.toLowerCase().startsWith("bump ")
  ) {
    return "dependabot";
  }

  if (profileLogin.length > 0 && pullRequest.author === profileLogin) {
    return "me";
  }

  return "all";
}

function formatPullRequestCreator(category: PullRequestCreatorFilter, author: string): string {
  switch (category) {
    case "dependabot":
      return "dependabot";
    case "me":
      return "me";
    case "all":
      return author;
  }
}

function comparePullRequests(
  left: PullRequestSummary,
  right: PullRequestSummary,
  sortOrder: PullRequestSortOrder,
): number {
  if (sortOrder === "updated") {
    return right.updatedAt.localeCompare(left.updatedAt);
  }

  if (sortOrder === "created") {
    return right.number - left.number;
  }

  return getPullRequestUrgency(right) - getPullRequestUrgency(left) ||
    right.updatedAt.localeCompare(left.updatedAt);
}

function getPullRequestUrgency(pullRequest: PullRequestSummary): number {
  if (pullRequest.mergeConflict) {
    return 5;
  }
  if (pullRequest.checksSummary.toLowerCase().includes("fail")) {
    return 5;
  }
  if (pullRequest.reviewState === "needs-review") {
    return 3;
  }
  if (pullRequest.reviewState === "ready-to-merge") {
    return 2;
  }
  return 1;
}

function isPullRequestMergeBlocked(pullRequest: PullRequestSummary): boolean {
  return pullRequest.mergeConflict || pullRequest.checksSummary.toLowerCase().includes("fail");
}

function renderPullRequestStatus(pullRequest: PullRequestSummary) {
  if (pullRequest.mergeConflict) {
    return <StatusPill tone="danger">Merge conflict</StatusPill>;
  }

  if (pullRequest.checksSummary.toLowerCase().includes("fail")) {
    return <StatusPill tone="danger">Failed checks</StatusPill>;
  }

  switch (pullRequest.reviewState) {
    case "draft":
      return <StatusPill>Checks running</StatusPill>;
    case "needs-review":
      return <StatusPill tone="warning">Needs review</StatusPill>;
    case "changes-requested":
      return <StatusPill tone="warning">Changes requested</StatusPill>;
    case "ready-to-merge":
      return <StatusPill tone="success">Ready to merge</StatusPill>;
  }
}

function formatPullRequestMeta(pullRequest: PullRequestSummary): string {
  return `${pullRequest.repositoryFullName} · ${pullRequest.checksSummary} · ${
    formatDateTime(pullRequest.updatedAt)
  }`;
}

function matchesWorkflowThreshold(
  workflowState: WorkflowState,
  threshold: WorkflowAlertThreshold,
): boolean {
  if (threshold === "all") {
    return true;
  }

  if (threshold === "failed") {
    return workflowState === "failing";
  }

  return workflowState === "failing" || workflowState === "warning";
}

function countFailingWorkflows(
  workflows: readonly DashboardData["workflows"][number][],
): number {
  return workflows.filter((workflow) => workflow.status === "failing").length;
}

function createIssueRows(repository: RepositorySummary) {
  return [
    {
      title: `${repository.name} search results jump on mobile breakpoint`,
      priorityLabel: "P1",
      priorityTone: "warning" as const,
      updatedAt: "2026-06-06 08:31",
    },
    {
      title: `${repository.name} team filter not persisted`,
      priorityLabel: "P2",
      priorityTone: "neutral" as const,
      updatedAt: "2026-06-05 22:02",
    },
    {
      title: `${repository.name} workflow card should show flaky rate`,
      priorityLabel: "P3",
      priorityTone: "neutral" as const,
      updatedAt: "2026-06-04 19:10",
    },
  ];
}
