import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Priyanshu Jaggi software developer portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 48%, #172554 100%)",
          color: "white",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "440px",
            height: "440px",
            borderRadius: "9999px",
            background:
              "rgba(34, 211, 238, 0.18)",
            filter: "blur(70px)",
            top: "-160px",
            right: "-80px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "9999px",
            background:
              "rgba(139, 92, 246, 0.18)",
            filter: "blur(70px)",
            bottom: "-180px",
            left: "-60px",
          }}
        />

        <div
          style={{
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "76px",
                height: "76px",
                borderRadius: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #3b82f6, #22d3ee, #8b5cf6)",
                fontSize: "30px",
                fontWeight: 800,
              }}
            >
              PJ
            </div>

            <div
              style={{
                fontSize: "30px",
                color: "#cbd5e1",
              }}
            >
              Developer Portfolio
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "76px",
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-3px",
              }}
            >
              Priyanshu Jaggi
            </div>

            <div
              style={{
                marginTop: "24px",
                maxWidth: "900px",
                fontSize: "34px",
                lineHeight: 1.35,
                color: "#cbd5e1",
              }}
            >
              Java DSA • Full-Stack Development •
              React • Next.js
            </div>
          </div>

          <div
            style={{
              fontSize: "25px",
              color: "#67e8f9",
            }}
          >
            Building practical software and learning
            every day.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}