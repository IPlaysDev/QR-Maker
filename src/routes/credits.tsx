import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Capacitor } from "@capacitor/core";
import { QrLogo, QrWordmark } from "@/components/QrLogo";
import { Github, Instagram, Youtube } from "lucide-react";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { title: "Credits – QR Maker" },
      { name: "description", content: "QR Maker – Developed by IPlaysDev, an Onix Labs Project." },
      { property: "og:title", content: "Credits – QR Maker" },
      { property: "og:description", content: "QR Maker – Developed by IPlaysDev, an Onix Labs Project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Credits,
});

async function openLink(e: React.MouseEvent, url: string) {
  if (Capacitor.isNativePlatform()) {
    e.preventDefault();
    const { Browser } = await import("@capacitor/browser");
    await Browser.open({ url });
  }
}

type SocialLink = {
  label: string;
  handle: string;
  url: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const LINKS: SocialLink[] = [
  {
    label: "GitHub",
    handle: "github.com/IPlaysDev",
    url: "https://github.com/IPlaysDev",
    Icon: Github,
  },
  {
    label: "Instagram",
    handle: "@onix.labs.official",
    url: "https://www.instagram.com/onix.labs.official",
    Icon: Instagram,
  },
  {
    label: "YouTube",
    handle: "@onix.labs.official",
    url: "https://youtube.com/@onix.labs.official",
    Icon: Youtube,
  },
];

function Credits() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  function goBack(e: React.MouseEvent) {
    e.preventDefault();
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate({ to: "/" }), 300);
  }

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden px-5 py-8 flex flex-col items-center ${
        exiting ? "animate-page-out-right" : "animate-page-in-right"
      }`}
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl animate-float-slower" />

      <header className="relative w-full max-w-md flex items-center justify-between mb-8">
        <a
          href="/"
          onClick={goBack}
          className="glass-card px-3 py-1.5 text-xs font-medium rounded-full active:scale-95 transition hover:scale-105"
        >
          ← Back
        </a>
        <h1 className="text-sm font-semibold tracking-[0.3em] uppercase text-foreground/80">Credits</h1>
        <div className="w-14" />
      </header>

      <main className="relative w-full max-w-md flex flex-col gap-5 items-center text-center">
        <section className="glass-card glow-primary p-8 w-full flex flex-col items-center gap-5 animate-in fade-in zoom-in-95 duration-500">
          <div className="relative h-28 w-28 rounded-3xl glass-card grid place-items-center animate-breathe p-2 overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-white/5 blur-md" />
            <QrLogo className="relative h-full w-full object-contain" />
          </div>

          <QrWordmark size="lg" />

          <div className="flex flex-col gap-2 items-center">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Developed by</p>
            <h2 className="text-3xl font-extrabold text-gradient tracking-tight">IPlaysDev</h2>
          </div>

          <div className="h-px w-16 bg-white/15" />

          <div className="flex flex-col gap-1 items-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">An</p>
            <h3 className="text-xl font-bold text-gradient tracking-tight">Onix Labs</h3>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Project</p>
          </div>
        </section>

        <section className="w-full flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-3 duration-500">
          {LINKS.map(({ label, handle, url, Icon }, i) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => openLink(e, url)}
              style={{ animationDelay: `${100 + i * 80}ms` }}
              className="glass-card p-4 flex items-center gap-4 active:scale-[0.99] transition hover:scale-[1.02] hover:border-white/30 animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500"
            >
              <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/15 grid place-items-center shrink-0">
                <Icon className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground truncate">{handle}</p>
              </div>
              <span className="text-muted-foreground">↗</span>
            </a>
          ))}
        </section>

        <p className="text-center text-[11px] text-muted-foreground mt-3 tracking-wider">
          QR Maker · Generate &amp; Share QR Codes Instantly
        </p>
      </main>
    </div>
  );
}
