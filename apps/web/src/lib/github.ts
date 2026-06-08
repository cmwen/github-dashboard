import { Octokit } from "octokit";

import {
  calculateMetrics,
  createMockDashboardData,
  type DashboardData,
  type PullRequestSummary,
  type RepositorySummary,
  type ReviewState,
  sortRepositoriesByAttention,
  type WorkflowAlert,
  type WorkflowState,
} from "../../../../packages/domain/src/mod.ts";

import { logger } from "./logger.ts";
import type { AppSettings } from "./settings.ts";

interface SearchIssueLabel {
  readonly name?: string | null;
}

interface SearchPullRequestIssue {
  readonly id: number;
  readonly number: number;
  readonly title: string;
  readonly updated_at: string;
  readonly state: string;
  readonly html_url: string;
  readonly repository_url: string;
  readonly user?: {
    readonly login?: string;
  } | null;
  readonly labels: readonly SearchIssueLabel[];
  readonly draft?: boolean | null;
  readonly pull_request?: object;
}

function withStatus(error: unknown): { status?: number } {
  return typeof error === "object" && error !== null ? error as { status?: number } : {};
}

export async function loadDashboardData(settings: AppSettings): Promise<DashboardData> {
  logger.info(
    {
      dataSource: settings.dataSource,
      repositoryScope: settings.repositoryScope,
    },
    "Loading dashboard data",
  );

  if (settings.dataSource === "mock") {
    return applyRepositoryScope(createMockDashboardData(), settings);
  }

  if (!settings.token) {
    throw new Error("A GitHub token is required before live mode can be enabled.");
  }

  return await loadLiveDashboardData(settings);
}

async function loadLiveDashboardData(settings: AppSettings): Promise<DashboardData> {
  const token = settings.token;
  const octokit = new Octokit({ auth: token });
  const { data: viewer } = await octokit.request("GET /user");
  const [{ data: repositoriesResponse }, { data: searchResponse }] = await Promise.all([
    octokit.request("GET /user/repos", {
      sort: "updated",
      affiliation: "owner,collaborator,organization_member",
      per_page: 24,
    }),
    octokit.request("GET /search/issues", {
      q: `is:pr state:open archived:false involves:${viewer.login}`,
      sort: "updated",
      order: "desc",
      per_page: 30,
    }),
  ]);

  const repositoryNames = new Set(repositoriesResponse.map((repository) => repository.full_name));
  const pullRequests = searchResponse.items
    .filter((item) =>
      !!item.pull_request && repositoryNames.has(parseRepositoryFullName(item.repository_url))
    )
    .map((item) => mapPullRequest(item));

  const pullRequestCounts = new Map<string, number>();
  for (const pullRequest of pullRequests) {
    pullRequestCounts.set(
      pullRequest.repositoryFullName,
      (pullRequestCounts.get(pullRequest.repositoryFullName) ?? 0) + 1,
    );
  }

  const repositories = repositoriesResponse.map((repository): RepositorySummary => {
    const approximateOpenIssues = Math.max(
      repository.open_issues_count - (pullRequestCounts.get(repository.full_name) ?? 0),
      0,
    );

    return {
      id: repository.node_id,
      fullName: repository.full_name,
      name: repository.name,
      owner: repository.owner.login,
      description: repository.description ?? "No description provided.",
      group: repository.owner.type === "Organization"
        ? "organization"
        : repository.permissions?.admin
        ? "personal"
        : "contributing",
      primaryLanguage: repository.language ?? "Mixed",
      defaultBranch: repository.default_branch,
      lastCommitAt: repository.updated_at ?? repository.created_at ?? new Date().toISOString(),
      openPrCount: pullRequestCounts.get(repository.full_name) ?? 0,
      openIssueCount: approximateOpenIssues,
      reviewRequests: pullRequestCounts.get(repository.full_name) ?? 0,
      workflowState: "healthy",
      stars: repository.stargazers_count,
    };
  });

  const scopedRepositories = filterRepositoriesByScope(repositories, settings.repositoryScope);
  const scopedRepositoryNames = new Set(
    scopedRepositories.map((repository) => repository.fullName),
  );
  const scopedPullRequests = pullRequests.filter((pullRequest) =>
    scopedRepositoryNames.has(pullRequest.repositoryFullName)
  );
  const workflows = (
    await Promise.all(
      scopedRepositories.slice(0, 8).map((repository) =>
        readWorkflowAlert(octokit, repository.owner, repository.name, repository.fullName)
      ),
    )
  ).filter((workflow): workflow is WorkflowAlert => workflow !== undefined);

  const workflowByRepository = new Map(
    workflows.map((workflow) => [workflow.repositoryFullName, workflow.status] as const),
  );

  const enrichedRepositories = scopedRepositories.map((repository) => ({
    ...repository,
    workflowState: workflowByRepository.get(repository.fullName) ?? "healthy",
  }));

  return {
    profile: {
      login: viewer.login,
      name: viewer.name ?? viewer.login,
      avatarUrl: viewer.avatar_url,
    },
    repositories: sortRepositoriesByAttention(enrichedRepositories),
    pullRequests: scopedPullRequests,
    workflows,
    metrics: calculateMetrics(scopedPullRequests, enrichedRepositories, workflows),
    generatedAt: new Date().toISOString(),
  };
}

async function readWorkflowAlert(
  octokit: Octokit,
  owner: string,
  repo: string,
  fullName: string,
): Promise<WorkflowAlert | undefined> {
  try {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}/actions/runs", {
      owner,
      repo,
      per_page: 1,
    });
    const latestRun = data.workflow_runs[0];

    if (!latestRun) {
      return undefined;
    }

    const status = mapWorkflowState(latestRun.conclusion, latestRun.status ?? "queued");

    if (status === "healthy") {
      return undefined;
    }

    return {
      id: latestRun.node_id,
      repositoryFullName: fullName,
      workflowName: latestRun.name ?? "GitHub Actions",
      branch: latestRun.head_branch ?? "unknown",
      status,
      summary: latestRun.display_title,
      updatedAt: latestRun.updated_at,
      url: latestRun.html_url,
    };
  } catch (error) {
    const { status } = withStatus(error);

    if (status === 403 || status === 404) {
      return undefined;
    }

    throw error;
  }
}

function parseRepositoryFullName(repositoryUrl: string): string {
  return repositoryUrl.replace("https://api.github.com/repos/", "");
}

function mapPullRequest(item: SearchPullRequestIssue): PullRequestSummary {
  const labels = item.labels.flatMap((label) => label.name ? [label.name] : []);
  const titleLowerCase = item.title.toLowerCase();

  return {
    id: item.id,
    repositoryFullName: parseRepositoryFullName(item.repository_url),
    title: item.title,
    number: item.number,
    author: item.user?.login ?? "unknown",
    updatedAt: item.updated_at,
    reviewState: deriveReviewState(labels, item.draft ?? false, titleLowerCase),
    checksSummary: labels.includes("ci-failing")
      ? "Checks require attention"
      : labels.includes("ready-to-merge")
      ? "Ready to merge"
      : "Review activity available in GitHub",
    labelNames: labels,
    draft: item.draft ?? false,
    mergeConflict: labels.includes("merge-conflict") || titleLowerCase.includes("conflict"),
    url: item.html_url,
  };
}

function deriveReviewState(
  labels: readonly string[],
  isDraft: boolean,
  titleLowerCase: string,
): ReviewState {
  if (isDraft) {
    return "draft";
  }

  if (labels.includes("changes-requested") || titleLowerCase.includes("follow-up")) {
    return "changes-requested";
  }

  if (labels.includes("ready-to-merge") || labels.includes("approved")) {
    return "ready-to-merge";
  }

  return "needs-review";
}

function mapWorkflowState(
  conclusion: string | null,
  status: string,
): WorkflowState {
  if (status !== "completed") {
    return "warning";
  }

  if (conclusion === "success") {
    return "healthy";
  }

  if (conclusion === "failure" || conclusion === "timed_out" || conclusion === "cancelled") {
    return "failing";
  }

  return "warning";
}

function applyRepositoryScope(data: DashboardData, settings: AppSettings): DashboardData {
  const repositories = filterRepositoriesByScope(data.repositories, settings.repositoryScope);
  const repositoryNames = new Set(repositories.map((repository) => repository.fullName));
  const pullRequests = data.pullRequests.filter((pullRequest) =>
    repositoryNames.has(pullRequest.repositoryFullName)
  );
  const workflows = data.workflows.filter((workflow) =>
    repositoryNames.has(workflow.repositoryFullName)
  );

  return {
    ...data,
    repositories,
    pullRequests,
    workflows,
    metrics: calculateMetrics(pullRequests, repositories, workflows),
  };
}

function filterRepositoriesByScope(
  repositories: readonly RepositorySummary[],
  scope: AppSettings["repositoryScope"],
): readonly RepositorySummary[] {
  if (scope === "all") {
    return repositories;
  }

  return repositories.filter((repository) => repository.group === scope);
}
