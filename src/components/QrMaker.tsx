import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { generateQrDataUrl, isValidUrl, normalizeUrl } from "@/lib/qr";
import { Capacitor } from "@capacitor/core";
import { QrLogo, QrWordmark } from "@/components/QrLogo";
import { sfx } from "@/lib/sfx";

async function saveQr(dataUrl: string) {
  const filename = `qrmaker-${Date.now()}.png`;
  if (Capacitor.isNativePlatform()) {
    const { Filesystem, Directory } = await import("@capacitor/filesystem");
    const base64 = dataUrl.split(",")[1];
    await Filesystem.writeFile({
      path: filename,
      data: base64,
      directory: Directory.Documents,
      recursive: true,
    });
    return "Saved to Documents";
  }
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
  return "Downloaded";
}

async function shareQr(dataUrl: string) {
  if (Capacitor.isNativePlatform()) {
    const { Filesystem, Directory } = await import("@capacitor/filesystem");
    const { Share } = await import("@capacitor/share");
    const filename = `qrmaker-${Date.now()}.png`;
    const base64 = dataUrl.split(",")[1];
    const written = await Filesystem.writeFile({
      path: filename,
      data: base64,
      directory: Directory.Cache,
    });
    await Share.share({
      title: "QR Code",
      text: "Scan this QR code",
      url: written.uri,
      dialogTitle: "Share QR Code",
    });
    return;
  }
  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], "qrcode.png", { type: "image/png" });
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: "QR Code" });
  } else {
    await saveQr(dataUrl);
  }
}

export function QrMaker() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [exiting, setExiting] = useState(false);

  function goToCredits(e: React.MouseEvent) {
    e.preventDefault();
    if (exiting) return;
    sfx.click();
    setExiting(true);
    setTimeout(() => navigate({ to: "/credits" }), 300);
  }

  async function handleGenerate() {
    setError(null);
    setToast(null);
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      setQr(null);
      return;
    }
    setBusy(true);
    setQr(null);
    try {
      // Give the shimmer a beat so the animation reads as intentional.
      const [data] = await Promise.all([
        generateQrDataUrl(normalizeUrl(url)),
        new Promise((r) => setTimeout(r, 650)),
      ]);
      setQr(data);
    } catch {
      setError("Could not generate QR code");
    } finally {
      setBusy(false);
    }
  }

  async function handleSave() {
    if (!qr) return;
    try {
      const msg = await saveQr(qr);
      setToast(msg);
      setTimeout(() => setToast(null), 2200);
    } catch {
      setToast("Save failed");
    }
  }

  async function handleShare() {
    if (!qr) return;
    try {
      await shareQr(qr);
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden px-5 py-8 flex flex-col items-center ${
        exiting ? "animate-page-out-left" : "animate-page-in-left"
      }`}
    >
      {/* Ambient glass orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-primary/15 blur-3xl animate-float-slow" />

      <header className="relative w-full max-w-md flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="glass-card glow-primary h-12 w-12 grid place-items-center rounded-2xl animate-breathe overflow-hidden p-0">
            <QrLogo className="h-full w-full object-contain" />
          </div>
          <div>
            <QrWordmark size="md" />
          </div>

        </div>
        <Link
          to="/credits"
          onClick={goToCredits}
          className="glass-card px-3 py-1.5 text-xs font-medium text-foreground/90 rounded-full active:scale-95 transition hover:scale-105"
        >
          Credits
        </Link>
      </header>

      <main className="relative w-full max-w-md flex flex-col gap-6">
        <section className="glass-card p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Enter URL
          </label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="https://example.com"
            inputMode="url"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full rounded-xl bg-input px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 outline-none border border-glass-border focus:border-primary/60 focus:ring-2 focus:ring-primary/30 transition"
          />
          {error && (
            <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}
          <button
            onClick={handleGenerate}
            disabled={busy}
            className="relative overflow-hidden gradient-primary glow-primary text-primary-foreground font-semibold py-3.5 rounded-xl active:scale-[0.98] transition disabled:opacity-70"
          >
            <span className="relative z-10">{busy ? "Generating…" : "Generate QR"}</span>
            <span
              className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent ${
                busy ? "animate-shimmer" : ""
              }`}
            />
          </button>
        </section>

        {/* Preview area – always visible */}
        <section className="glass-card p-6 flex flex-col items-center gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-glass-border bg-gradient-to-br from-primary/25 via-accent/15 to-primary/10">
            {/* Soft glow blob */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="h-3/4 w-3/4 rounded-full bg-primary/30 blur-3xl animate-pulse-slow" />
            </div>

            {/* Placeholder */}
            {!qr && !busy && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
                <div className="glass-card h-24 w-24 grid place-items-center rounded-3xl animate-breathe overflow-hidden p-2">
                  <QrLogo className="h-full w-full object-contain" />
                </div>
                <p className="text-sm text-foreground/70 font-medium">
                  Your QR code will appear here
                </p>
              </div>
            )}

            {/* Loading state */}
            {busy && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 rounded-3xl border-2 border-primary/30" />
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent border-t-primary animate-spin" />
                  <div className="absolute inset-2 glass-card rounded-2xl grid place-items-center overflow-hidden p-1">
                    <QrLogo className="h-full w-full object-contain animate-pulse" />
                  </div>
                </div>
                <p className="text-sm text-foreground/70 font-medium tracking-wide">
                  Crafting your QR…
                </p>
              </div>
            )}

            {/* Generated QR */}
            {qr && !busy && (
              <div className="absolute inset-0 flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="rounded-2xl bg-white p-4 shadow-2xl glow-primary">
                  <img src={qr} alt="Generated QR code" className="w-full h-full max-w-56 max-h-56 block" />
                </div>
              </div>
            )}
          </div>

          {qr && !busy && (
            <p className="text-xs text-muted-foreground text-center break-all px-2 animate-in fade-in duration-500">
              {normalizeUrl(url)}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={handleSave}
              disabled={!qr}
              className="glass-card py-3 text-sm font-medium active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              Save QR
            </button>
            <button
              onClick={handleShare}
              disabled={!qr}
              className="gradient-primary text-primary-foreground py-3 rounded-2xl text-sm font-semibold active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              Share QR
            </button>
          </div>
        </section>
      </main>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-card px-5 py-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-2 z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
