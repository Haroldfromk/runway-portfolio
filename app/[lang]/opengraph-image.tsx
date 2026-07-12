import { ImageResponse } from "next/og";

export const alt = "RunWay - Turn Every Run Into A Flight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadOrbitron(text: string) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=Orbitron:wght@800&text=${encodeURIComponent(text)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
        },
      }
    )
  ).text();
  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) throw new Error("failed to resolve Orbitron font URL");
  const res = await fetch(match[1]);
  return res.arrayBuffer();
}

export default async function Image() {
  const text = "RUNWAYTurn Every Run Into A Flight.";
  const orbitron = await loadOrbitron(text);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0b0e14",
          padding: "90px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#64ffda" }} />
          <div
            style={{
              fontFamily: "Orbitron",
              fontSize: 30,
              letterSpacing: 6,
              color: "#e6edf3",
            }}
          >
            RUNWAY
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Orbitron",
            fontSize: 76,
            lineHeight: 1.15,
            color: "#e6edf3",
          }}
        >
          <div style={{ display: "flex" }}>Turn Every</div>
          <div style={{ display: "flex" }}>
            Run Into A&nbsp;<span style={{ color: "#64ffda" }}>Flight.</span>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 44, fontSize: 26, color: "#88949e" }}>
          An iOS running tracker designed by an ex-aircraft mechanic
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Orbitron", data: orbitron, weight: 800, style: "normal" }],
    }
  );
}
