import { NextResponse } from "next/server";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

type SubmissionStat = {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
  submissions: number;
};

type ContestRanking = {
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  totalParticipants: number;
  topPercentage: number;
  badge: {
    name: string;
  } | null;
};

type LeetCodeGraphQLResponse = {
  data?: {
    matchedUser?: {
      username: string;

      profile: {
        realName: string;
        userAvatar: string;
        ranking: number;
        reputation: number;
      };

      submitStatsGlobal: {
        acSubmissionNum: SubmissionStat[];
      };

      submissionCalendar: string | null;
    } | null;

    userContestRanking?: ContestRanking | null;
  };

  errors?: Array<{
    message: string;
  }>;
};

const LEETCODE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username

      profile {
        realName
        userAvatar
        ranking
        reputation
      }

      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }

      submissionCalendar
    }

    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage

      badge {
        name
      }
    }
  }
`;

function getDifficultyStat(
  statistics: SubmissionStat[],
  difficulty: SubmissionStat["difficulty"],
) {
  return (
    statistics.find(
      (statistic) => statistic.difficulty === difficulty,
    ) ?? {
      difficulty,
      count: 0,
      submissions: 0,
    }
  );
}

function calculateAcceptanceRate(
  accepted: number,
  submissions: number,
) {
  if (submissions === 0) {
    return 0;
  }

  return Number(
    ((accepted / submissions) * 100).toFixed(2),
  );
}

function parseSubmissionCalendar(
  calendar: string | null,
) {
  if (!calendar) {
    return [];
  }

  try {
    const parsedCalendar = JSON.parse(calendar) as Record<
      string,
      number
    >;

    return Object.entries(parsedCalendar)
      .map(([timestamp, count]) => ({
        date: new Date(
          Number(timestamp) * 1000,
        ).toISOString(),
        count,
      }))
      .sort(
        (firstEntry, secondEntry) =>
          new Date(firstEntry.date).getTime() -
          new Date(secondEntry.date).getTime(),
      );
  } catch {
    return [];
  }
}

function calculateCurrentStreak(
  calendar: Array<{
    date: string;
    count: number;
  }>,
) {
  if (calendar.length === 0) {
    return 0;
  }

  const activeDates = new Set(
    calendar
      .filter((entry) => entry.count > 0)
      .map((entry) =>
        new Date(entry.date).toISOString().slice(0, 10),
      ),
  );

  let streak = 0;
  const currentDate = new Date();

  while (true) {
    const dateKey = currentDate
      .toISOString()
      .slice(0, 10);

    if (!activeDates.has(dateKey)) {
      break;
    }

    streak += 1;
    currentDate.setUTCDate(
      currentDate.getUTCDate() - 1,
    );
  }

  return streak;
}

function calculateLongestStreak(
  calendar: Array<{
    date: string;
    count: number;
  }>,
) {
  if (calendar.length === 0) {
    return 0;
  }

  const activeDates = calendar
    .filter((entry) => entry.count > 0)
    .map((entry) =>
      new Date(entry.date).toISOString().slice(0, 10),
    )
    .sort();

  if (activeDates.length === 0) {
    return 0;
  }

  let longestStreak = 1;
  let currentStreak = 1;

  for (
    let index = 1;
    index < activeDates.length;
    index += 1
  ) {
    const previousDate = new Date(
      `${activeDates[index - 1]}T00:00:00.000Z`,
    );

    const currentDate = new Date(
      `${activeDates[index]}T00:00:00.000Z`,
    );

    const differenceInDays =
      (currentDate.getTime() -
        previousDate.getTime()) /
      (1000 * 60 * 60 * 24);

    if (differenceInDays === 1) {
      currentStreak += 1;
      longestStreak = Math.max(
        longestStreak,
        currentStreak,
      );
    } else if (differenceInDays > 1) {
      currentStreak = 1;
    }
  }

  return longestStreak;
}

export async function GET() {
  try {
    const username =
      process.env.LEETCODE_USERNAME?.trim();

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          message:
            "LEETCODE_USERNAME is missing from .env.local.",
        },
        {
          status: 500,
        },
      );
    }

    const response = await fetch(
      LEETCODE_GRAPHQL_URL,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: `https://leetcode.com/u/${username}/`,
          "User-Agent":
            "Mozilla/5.0 Portfolio LeetCode Statistics",
        },

        body: JSON.stringify({
          query: LEETCODE_QUERY,
          variables: {
            username,
          },
        }),

        next: {
          revalidate: 900,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `LeetCode request failed with status ${response.status}.`,
      );
    }

    const result =
      (await response.json()) as LeetCodeGraphQLResponse;

    if (result.errors?.length) {
      throw new Error(
        result.errors
          .map((error) => error.message)
          .join(", "),
      );
    }

    const user = result.data?.matchedUser;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: `LeetCode user "${username}" was not found.`,
        },
        {
          status: 404,
        },
      );
    }

    const submissionStatistics =
      user.submitStatsGlobal?.acSubmissionNum ?? [];

    const all = getDifficultyStat(
      submissionStatistics,
      "All",
    );

    const easy = getDifficultyStat(
      submissionStatistics,
      "Easy",
    );

    const medium = getDifficultyStat(
      submissionStatistics,
      "Medium",
    );

    const hard = getDifficultyStat(
      submissionStatistics,
      "Hard",
    );

    const submissionCalendar =
      parseSubmissionCalendar(
        user.submissionCalendar,
      );

    const contest =
      result.data?.userContestRanking ?? null;

    return NextResponse.json({
      success: true,

      profile: {
        username: user.username,
        realName:
          user.profile.realName || user.username,
        avatarUrl: user.profile.userAvatar,
        profileUrl: `https://leetcode.com/u/${user.username}/`,
        ranking: user.profile.ranking,
        reputation: user.profile.reputation,
      },

      stats: {
        totalSolved: all.count,
        totalSubmissions: all.submissions,

        acceptanceRate:
          calculateAcceptanceRate(
            all.count,
            all.submissions,
          ),

        easy: {
          solved: easy.count,
          submissions: easy.submissions,
        },

        medium: {
          solved: medium.count,
          submissions: medium.submissions,
        },

        hard: {
          solved: hard.count,
          submissions: hard.submissions,
        },
      },

      contest: {
        attendedContests:
          contest?.attendedContestsCount ?? 0,

        rating: contest?.rating
          ? Math.round(contest.rating)
          : 0,

        globalRanking:
          contest?.globalRanking ?? 0,

        totalParticipants:
          contest?.totalParticipants ?? 0,

        topPercentage:
          contest?.topPercentage ?? 0,

        badge: contest?.badge?.name ?? null,
      },

      activity: {
        currentStreak:
          calculateCurrentStreak(
            submissionCalendar,
          ),

        longestStreak:
          calculateLongestStreak(
            submissionCalendar,
          ),

        activeDays:
          submissionCalendar.filter(
            (entry) => entry.count > 0,
          ).length,

        totalCalendarSubmissions:
          submissionCalendar.reduce(
            (total, entry) =>
              total + entry.count,
            0,
          ),

        calendar: submissionCalendar.slice(-365),
      },

      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("LeetCode API error:", error);

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load LeetCode statistics.",
      },
      {
        status: 500,
      },
    );
  }
}