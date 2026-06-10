import { ImageResponse } from "next/og";

// Apple touch icon (iOS home screen). The minimal angular ALBARAA "A" mark on
// the navy app surface — generated as a 180×180 PNG via next/og (no binary
// asset to maintain). iOS applies its own rounded mask, so the tile is a full
// square here. Not theme-aware (a home-screen icon is fixed); uses the navy
// default to match the brand surface.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0e27",
      }}
    >
      <svg
        width="118"
        height="118"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#F4EFE4"
          fillRule="evenodd"
          d="M32 8 L57 56 L42 56 L38.2 43 L25.8 43 L22 56 L7 56 Z M32 22 L36.4 37 L27.6 37 Z"
        />
      </svg>
    </div>,
    { ...size }
  );
}
