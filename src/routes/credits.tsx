import { createFileRoute, Link } from "@tanstack/react-router";
import { Capacitor } from "@capacitor/core";
import { QrLogo } from "@/components/QrLogo";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { title: "Credits – QR Maker" },
      { name: "description", content: "Credits for QR Maker – made by IPlaysDev." },
      { property: "og:title", content: "Credits – QR Maker" },
      { property: "og:description", content: "Credits for QR Maker – made by IPlaysDev." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Credits,
});

async function openGithub(e: React.MouseEvent) {
  const url = "https://github.com/IPlaysDev";
  if (Capacitor.isNativePlatform()) {
    e.preventDefault();
    const { Browser } = await import("@capacitor/browser");
    await Browser.open({ url });
  }
}

function Credits() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden px-5 py-8 flex flex-col items-center">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float-slower" />

      <header className="relative w-full max-w-md flex items-center justify-between mb-8">
        <Link
          to="/"
          className="glass-card px-3 py-1.5 text-xs font-medium rounded-full active:scale-95 transition hover:scale-105"
        >
          ← Back
        </Link>
        <h1 className="text-sm font-semibold text-gradient">Credits</h1>
        <div className="w-14" />
      </header>

      <main className="relative w-full max-w-md flex flex-col gap-5">
        <section className="glass-card glow-primary p-8 flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="relative h-24 w-24 rounded-3xl glass-card grid place-items-center animate-breathe">
            <div className="absolute inset-0 rounded-3xl gradient-primary opacity-30 blur-md" />
            <QrLogo className="relative h-12 w-12 text-primary" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary/90 font-semibold">
            Made by
          </p>
          <h2 className="text-4xl font-extrabold text-gradient tracking-tight">IPlaysDev</h2>
          <p className="text-xs text-muted-foreground max-w-[220px]">
            Crafted with care · Premium QR generation for Android
          </p>
        </section>

        <a
          href="https://github.com/IPlaysDev"
          target="_blank"
          rel="noreferrer"
          onClick={openGithub}
          className="glass-card p-5 flex items-center justify-between active:scale-[0.99] transition hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-3 duration-500"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary grid place-items-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.55v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold">GitHub</p>
              <p className="text-xs text-muted-foreground">github.com/IPlaysDev</p>
            </div>
          </div>
          <span className="text-muted-foreground">↗</span>
        </a>

        <p className="text-center text-xs text-muted-foreground mt-2">
          QR Maker · Generate &amp; Share QR Codes Instantly
        </p>
      </main>
    </div>
  );
}

