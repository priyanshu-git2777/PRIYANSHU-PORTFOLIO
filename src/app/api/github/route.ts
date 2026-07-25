import { NextResponse } from "next/server";

const GITHUB_USERNAME = "priyanshu-git2777";

const GITHUB_API_URL = "https://api.github.com";

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

type GitHubRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  fork: boolean;
  language: string | null;
  updated_at: string;
};

type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
};

type ActivityDay = {
  date: string;
  count: number;
};

function getGitHubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "priyanshu-portfolio",
  };

  const token = process.env.GITHUB_TOKEN;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchGitHubData<T>(
  endpoint: string
): Promise<T> {
  const response = await fetch(
    `${GITHUB_API_URL}${endpoint}`,
    {
      headers: getGitHubHeaders(),
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub request failed with status ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}

function formatEventType(eventType: string): string {
  const eventNames: Record<string, string> = {
    CreateEvent: "Created something",
    DeleteEvent: "Deleted a Git reference",
    ForkEvent: "Forked a repository",
    IssuesEvent: "Updated an issue",
    IssueCommentEvent: "Commented on an issue",
    PullRequestEvent: "Updated a pull request",
    PullRequestReviewEvent: "Reviewed a pull request",
    PushEvent: "Pushed code",
    ReleaseEvent: "Published a release",
    WatchEvent: "Starred a repository",
  };

  return eventNames[eventType] ?? "GitHub activity";
}

function calculateActivityByDay(
  events: GitHubEvent[]
): ActivityDay[] {
  const activityMap = new Map<string, number>();

  for (const event of events) {
    const date = event.created_at.slice(0, 10);
    const currentCount = activityMap.get(date) ?? 0;

    activityMap.set(date, currentCount + 1);
  }

  return Array.from(activityMap.entries())
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((first, second) =>
      first.date.localeCompare(second.date)
    );
}

function calculateCurrentActivityStreak(
  activityDays: ActivityDay[]
): number {
  if (activityDays.length === 0) {
    return 0;
  }

  const activityDates = new Set(
    activityDays.map((day) => day.date)
  );

  const latestDate = new Date(
    `${activityDays[activityDays.length - 1].date}T00:00:00Z`
  );

  let streak = 0;
  const currentDate = new Date(latestDate);

  while (true) {
    const dateKey = currentDate
      .toISOString()
      .slice(0, 10);

    if (!activityDates.has(dateKey)) {
      break;
    }

    streak += 1;
    currentDate.setUTCDate(currentDate.getUTCDate() - 1);
  }

  return streak;
}

export async function GET() {
  if (!GITHUB_USERNAME) {
    return NextResponse.json(
      {
        error:
          "Add your GitHub username inside src/app/api/github/route.ts.",
      },
      {
        status: 400,
      }
    );
  }

  
  try {
    const user = await fetchGitHubData<GitHubUser>(
      `/users/${GITHUB_USERNAME}`
    );

    const repositories =
      await fetchGitHubData<GitHubRepository[]>(
        `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
      );

    const events = await fetchGitHubData<GitHubEvent[]>(
      `/users/${GITHUB_USERNAME}/events/public?per_page=100`
    );

    const originalRepositories = repositories.filter(
      (repository) => !repository.fork
    );

    const totalStars = originalRepositories.reduce(
      (total, repository) =>
        total + repository.stargazers_count,
      0
    );

    const activityByDay = calculateActivityByDay(events);

    const mostActiveDay =
      activityByDay.length > 0
        ? activityByDay.reduce((bestDay, currentDay) =>
            currentDay.count > bestDay.count
              ? currentDay
              : bestDay
          )
        : null;

    const recentPushEvents = events.filter(
      (event) => event.type === "PushEvent"
    ).length;

    const recentActivity = events.slice(0, 6).map((event) => ({
      id: event.id,
      type: formatEventType(event.type),
      repository: event.repo.name,
      createdAt: event.created_at,
    }));

    const popularRepositories = originalRepositories
      .sort(
        (first, second) =>
          second.stargazers_count -
          first.stargazers_count
      )
      .slice(0, 4)
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        url: repository.html_url,
        description: repository.description,
        stars: repository.stargazers_count,
        language: repository.language,
        updatedAt: repository.updated_at,
      }));

    return NextResponse.json({
      profile: {
        username: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        profileUrl: user.html_url,
        bio: user.bio,
        publicRepositories: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      statistics: {
        originalRepositories:
          originalRepositories.length,
        totalStars,
        recentPublicEvents: events.length,
        recentPushEvents,
        recentActivityStreak:
          calculateCurrentActivityStreak(activityByDay),
        mostActiveDay,
      },
      activityByDay: activityByDay.slice(-14),
      recentActivity,
      popularRepositories,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("GitHub API error:", error);

    return NextResponse.json(
      {
        error:
          "GitHub statistics could not be loaded at the moment.",
      },
      {
        status: 500,
      }
    );
  }
}