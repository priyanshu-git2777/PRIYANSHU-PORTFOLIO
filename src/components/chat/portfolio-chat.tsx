"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  MessageCircleMore,
  X,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "priyanshu-portfolio-chat";

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hello! I am Priyanshu's portfolio assistant. Ask me about his skills, projects or learning journey.",
  },
];

export function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] =
    useState<Message[]>(initialMessages);

  useEffect(() => {
    try {
      const savedMessages =
        window.sessionStorage.getItem(STORAGE_KEY);

      if (!savedMessages) {
        return;
      }

      const parsedMessages = JSON.parse(
        savedMessages
      ) as Message[];

      if (
        Array.isArray(parsedMessages) &&
        parsedMessages.length > 0
      ) {
        setMessages(parsedMessages);
      }
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    );
  }, [messages]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const question = input.trim();

    if (!question || isLoading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    const nextMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          data.error ||
            "The assistant could not respond."
        );
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I could not generate a response.",
        },
      ]);
    } catch (error) {
      const errorText =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: errorText,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        className="ai-chat-float fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 px-5 py-3 text-white shadow-[0_10px_0_#312e81,0_18px_35px_rgba(59,130,246,0.55)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_0_#312e81,0_24px_45px_rgba(34,211,238,0.65)] active:translate-y-1 active:shadow-[0_5px_0_#312e81,0_10px_20px_rgba(59,130,246,0.45)]"
        aria-label={
          isOpen
            ? "Close portfolio assistant"
            : "Open portfolio assistant"
        }
      >
        {isOpen ? (
          <>
            <X className="h-6 w-6" />
            <span className="font-semibold">
              Close
            </span>
          </>
        ) : (
          <>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 shadow-inner backdrop-blur-sm">
              <MessageCircleMore className="h-6 w-6" />
            </span>

            <span className="font-semibold tracking-wide">
              AI Chat
            </span>
          </>
        )}
      </button>

      {isOpen && (
        <section className="fixed bottom-24 right-4 z-[9998] flex h-[520px] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-slate-950 text-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div>
              <h2 className="font-bold">
                Portfolio Assistant
              </h2>

              <p className="text-xs text-slate-400">
                Ask about Priyanshu
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-1 text-xl hover:bg-white/10"
              aria-label="Close assistant"
            >
              ×
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map(
              (message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600 px-4 py-3 text-sm"
                      : "mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-800 px-4 py-3 text-sm"
                  }
                >
                  {message.content}
                </div>
              )
            )}

            {isLoading && (
              <div className="mr-auto rounded-2xl bg-slate-800 px-4 py-3 text-sm text-slate-300">
                Typing...
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-white/10 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ask about skills or projects..."
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={
                isLoading || !input.trim()
              }
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      )}
    </>
  );
}