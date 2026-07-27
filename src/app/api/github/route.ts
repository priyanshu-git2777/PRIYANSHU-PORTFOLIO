import { NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com";

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
};

type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;

  repo: {
    name: string;
  };

  payload?: {
    action?: string;
    ref?: string;

    commits?: Array<{
      sha: string;
      message: string;
    }>;
  };
};

function getGitHubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN?.trim();

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Priyanshu-Portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchGitHub<T>(
  endpoint: string
): Promise<{
  data: T;
  remainingRequests: string | null;
}> {
  const response = await fetch(
    `${GITHUB_API_URL}${endpoint}`,
    {
      headers: getGitHubHeaders(),
      next: {
        revalidate: 900,
      },
    }
  );

  const remainingRequests = response.headers.get(
    "x-ratelimit-remaining"
  );

  if (!response.ok) {
    let errorMessage = "GitHub request failed.";

    try {
      const errorData = (await response.json()) as {
        message?: string;
      };

      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // GitHub did not return JSON.
    }

    throw new Error(
      `GitHub API returned ${response.status}: ${errorMessage}`
    );
  }

  const data = (await response.json()) as T;

  return {
    data,
    remainingRequests,
  };
}

function calculateLanguages(
  repositories: GitHubRepository[]
) {
  const languageCounts = new Map<string, number>();

  for (const repository of repositories) {
    if (
      repository.fork ||
      repository.archived ||
      !repository.language
    ) {
      continue;
    }

    const previousCount =
      languageCounts.get(repository.language) ?? 0;

    languageCounts.set(
      repository.language,
      previousCount + 1
    );
  }

  const total = Array.from(
    languageCounts.values()
  ).reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return [];
  }

  return Array.from(languageCounts.entries())
    .map(([name, repositoryCount]) => ({
      name,
      repositoryCount,
      percentage: Math.round(
        (repositoryCount / total) * 100
      ),
    }))
    .sort(
      (first, second) =>
        second.repositoryCount -
        first.repositoryCount
    )
    .slice(0, 6);
}

export async function GET() {
  try {
    const username =
      process.env.GITHUB_USERNAME?.trim();

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GITHUB_USERNAME is missing from .env.local.",
        },
        {
          status: 500,
        }
      );
    }

    const encodedUsername =
      encodeURIComponent(username);

    const [
      profileResult,
      repositoriesResult,
      eventsResult,
    ] = await Promise.all([
      fetchGitHub<GitHubUser>(
        `/users/${encodedUsername}`
      ),

      fetchGitHub<GitHubRepository[]>(
        `/users/${encodedUsername}/repos?per_page=100&sort=updated&type=owner`
      ),

      fetchGitHub<GitHubEvent[]>(
        `/users/${encodedUsername}/events/public?per_page=30`
      ),
    ]);

    const originalRepositories =
      repositoriesResult.data.filter(
        (repository) => !repository.fork
      );

    const activeRepositories =
      originalRepositories.filter(
        (repository) => !repository.archived
      );

    const totalStars =
      activeRepositories.reduce(
        (total, repository) =>
          total + repository.stargazers_count,
        0
      );

    const totalForks =
      activeRepositories.reduce(
        (total, repository) =>
          total + repository.forks_count,
        0
      );

    const featuredRepositories = [
      ...activeRepositories,
    ]
      .sort((first, second) => {
        const starsDifference =
          second.stargazers_count -
          first.stargazers_count;

        if (starsDifference !== 0) {
          return starsDifference;
        }

        return (
          new Date(second.pushed_at).getTime() -
          new Date(first.pushed_at).getTime()
        );
      })
      .slice(0, 6)
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        fullName: repository.full_name,
        description: repository.description,
        url: repository.html_url,
        homepage: repository.homepage,
        language:
          repository.language ?? "Other",
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        openIssues:
          repository.open_issues_count,
        topics: repository.topics ?? [],
        createdAt: repository.created_at,
        updatedAt: repository.updated_at,
        pushedAt: repository.pushed_at,
      }));

    const recentEvents =
      eventsResult.data.slice(0, 10).map((event) => ({
        id: event.id,
        type: event.type,
        repository: event.repo.name,
        createdAt: event.created_at,
        action: event.payload?.action ?? null,
        branch: event.payload?.ref ?? null,
        commits:
          event.payload?.commits?.length ?? 0,
        commitMessage:
          event.payload?.commits?.[0]?.message ??
          null,
      }));

    return NextResponse.json({
      success: true,

      profile: {
        username: profileResult.data.login,
        name:
          profileResult.data.name ??
          profileResult.data.login,
        avatarUrl: profileResult.data.avatar_url,
        profileUrl: profileResult.data.html_url,
        bio: profileResult.data.bio,
        location: profileResult.data.location,
        company: profileResult.data.company,
        website: profileResult.data.blog,
        publicRepositories:
          profileResult.data.public_repos,
        followers: profileResult.data.followers,
        following: profileResult.data.following,
        joinedAt: profileResult.data.created_at,
        updatedAt: profileResult.data.updated_at,
      },

      summary: {
        repositoryCount:
          activeRepositories.length,
        totalStars,
        totalForks,
        recentPublicEvents:
          eventsResult.data.length,
      },

      languages:
        calculateLanguages(activeRepositories),

      featuredRepositories,

      recentEvents,

      api: {
        authenticated: Boolean(
          process.env.GITHUB_TOKEN?.trim()
        ),
        remainingRequests:
          profileResult.remainingRequests,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("GitHub route error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to retrieve GitHub information.",
      },
      {
        status: 500,
      }
    );
  }
}