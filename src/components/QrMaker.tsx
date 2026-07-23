import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { generateQrDataUrl, isValidUrl, normalizeUrl } from "@/lib/qr";
import { Capacitor } from "@capacitor/core";

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
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function handleGenerate() {
    setError(null);
    setToast(null);
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      setQr(null);
      return;
    }
    setBusy(true);
    try {
      const data = await generateQrDataUrl(normalizeUrl(url));
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
    <div className="min-h-screen w-full px-5 py-8 flex flex-col items-center">
      <header className="w-full max-w-md flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="glass-card glow-primary h-11 w-11 grid place-items-center rounded-2xl">
            <QrLogo className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-gradient">QR Maker</h1>
            <p className="text-[11px] text-muted-foreground -mt-0.5">
              Generate & Share QR Codes Instantly
            </p>
          </div>
        </div>
        <Link
          to="/credits"
          className="glass-card px-3 py-1.5 text-xs font-medium text-foreground/90 rounded-full active:scale-95 transition"
        >
          Credits
        </Link>
      </header>

      <main className="w-full max-w-md flex flex-col gap-6">
        <section className="glass-card p-5 flex flex-col gap-4">
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
            <p className="text-xs text-destructive font-medium">{error}</p>
          )}
          <button
            onClick={handleGenerate}
            disabled={busy}
            className="gradient-primary glow-primary text-primary-foreground font-semibold py-3.5 rounded-xl active:scale-[0.98] transition disabled:opacity-60"
          >
            {busy ? "Generating…" : "Generate QR"}
          </button>
        </section>

        {qr && (
          <section className="glass-card p-6 flex flex-col items-center gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-2xl bg-white p-4 glow-primary">
              <img src={qr} alt="Generated QR code" className="w-56 h-56 block" />
            </div>
            <p className="text-xs text-muted-foreground text-center break-all px-2">
              {normalizeUrl(url)}
            </p>
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={handleSave}
                className="glass-card py-3 text-sm font-medium active:scale-[0.98] transition"
              >
                Save QR
              </button>
              <button
                onClick={handleShare}
                className="gradient-primary text-primary-foreground py-3 rounded-2xl text-sm font-semibold active:scale-[0.98] transition"
              >
                Share QR
              </button>
            </div>
          </section>
        )}
      </main>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-card px-5 py-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
    </div>
  );
}

function QrLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="14" width="3" height="3" fill="currentColor" />
      <rect x="18" y="18" width="3" height="3" fill="currentColor" />
      <rect x="14" y="18" width="3" height="3" fill="currentColor" />
      <rect x="18" y="14" width="3" height="3" fill="currentColor" />
    </svg>
  );
}
