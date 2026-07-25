import OpenAI from "openai";
import { NextResponse } from "next/server";

import { portfolioContext } from "@/data/portfolio-context";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type RequestBody = {
  messages?: ChatMessage[];
};

function createFallbackReply(question: string): string {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("skill")) {
    return "Priyanshu's skills include Java, JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, Tailwind CSS, Git and GitHub.";
  }

  if (lowerQuestion.includes("project")) {
    return "Priyanshu is working on DevFlow AI, his developer portfolio, an AI portfolio assistant and Java DSA solutions.";
  }

  if (
    lowerQuestion.includes("learn") ||
    lowerQuestion.includes("currently")
  ) {
    return "Priyanshu is currently learning Java DSA, full-stack development, React, Next.js and backend development.";
  }

  return "I can answer questions about Priyanshu's skills, projects, learning journey and availability.";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;

    if (
      !Array.isArray(body.messages) ||
      body.messages.length === 0
    ) {
      return NextResponse.json(
        {
          error: "Messages are required.",
        },
        {
          status: 400,
        }
      );
    }

    const latestUserMessage = [...body.messages]
      .reverse()
      .find((message) => message.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json(
        {
          error: "A user message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: createFallbackReply(
          latestUserMessage.content
        ),
        source: "fallback",
      });
    }

    const openai = new OpenAI({
      apiKey,
    });

    try {
      const response = await openai.responses.create({
        model:
          process.env.OPENAI_MODEL ||
          "gpt-4.1-mini",
        instructions: portfolioContext,
        input: body.messages
          .slice(-10)
          .map(
            (message) =>
              `${message.role}: ${message.content}`
          )
          .join("\n"),
        max_output_tokens: 300,
      });

      const reply = response.output_text.trim();

      return NextResponse.json({
        reply:
          reply ||
          createFallbackReply(
            latestUserMessage.content
          ),
        source: reply ? "openai" : "fallback",
      });
    } catch (openAIError) {
      console.error(
        "OpenAI request failed:",
        openAIError
      );

      return NextResponse.json({
        reply: createFallbackReply(
          latestUserMessage.content
        ),
        source: "fallback",
      });
    }
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request.",
      },
      {
        status: 400,
      }
    );
  }
}