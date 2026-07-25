import { createFileRoute } from "@tanstack/react-router";
import { QrMaker } from "@/components/QrMaker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QR Maker – Generate & Share QR Codes Instantly" },
      {
        name: "description",
        content:
          "QR Maker is a premium dark glassmorphism QR code generator for Android. Paste any URL, generate a high-resolution QR, then save or share instantly.",
      },
      { property: "og:title", content: "QR Maker – Generate & Share QR Codes Instantly" },
      {
        property: "og:description",
        content: "QR Maker is a premium dark glassmorphism QR code generator for Android. Paste any URL, generate a high-resolution QR, then save or share instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QrMaker,
});
