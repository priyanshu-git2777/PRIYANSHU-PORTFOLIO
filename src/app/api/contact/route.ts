import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactRequest = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
};

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as ContactRequest;

    const name = cleanText(body.name);
    const email = cleanText(body.email);
    const subject = cleanText(body.subject);
    const message = cleanText(body.message);
    const company = cleanText(body.company);

    // Hidden spam-protection field.
    if (company) {
      return NextResponse.json({
        success: true,
      });
    }

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid name between 2 and 80 characters.",
        },
        {
          status: 400,
        }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      subject.length < 3 ||
      subject.length > 120
    ) {
      return NextResponse.json(
        {
          error:
            "Please enter a subject between 3 and 120 characters.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      message.length < 10 ||
      message.length > 3000
    ) {
      return NextResponse.json(
        {
          error:
            "Please enter a message between 10 and 3000 characters.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey =
      process.env.RESEND_API_KEY;

    const contactEmail =
      process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      console.error(
        "Missing RESEND_API_KEY or CONTACT_EMAIL."
      );

      return NextResponse.json(
        {
          error:
            "The contact service is not configured yet.",
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);

    const safeMessage = escapeHtml(
      message
    ).replaceAll("\n", "<br />");

    const { data, error } =
      await resend.emails.send({
        from:
          "Priyanshu Portfolio <onboarding@resend.dev>",

        to: [contactEmail],

        replyTo: email,

        subject:
          `Portfolio message: ${subject}`,

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 640px;
              margin: 0 auto;
              padding: 24px;
              color: #0f172a;
            "
          >
            <h1
              style="
                font-size: 24px;
                margin-bottom: 24px;
              "
            >
              New portfolio message
            </h1>

            <div
              style="
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 20px;
              "
            >
              <p>
                <strong>Name:</strong>
                ${safeName}
              </p>

              <p>
                <strong>Email:</strong>
                ${safeEmail}
              </p>

              <p>
                <strong>Subject:</strong>
                ${safeSubject}
              </p>

              <div
                style="
                  margin-top: 20px;
                  padding-top: 20px;
                  border-top: 1px solid #e2e8f0;
                "
              >
                <strong>Message:</strong>

                <p
                  style="
                    line-height: 1.7;
                    white-space: normal;
                  "
                >
                  ${safeMessage}
                </p>
              </div>
            </div>
          </div>
        `,
      });

    if (error) {
      console.error(
        "Resend email error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "The message could not be sent. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your message was sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error(
      "Contact form error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while sending the message.",
      },
      {
        status: 500,
      }
    );
  }
}