import qrLogoAsset from "@/assets/qr-logo.png.asset.json";

// New brand mark: glass QR icon (uploaded artwork).
export function QrLogo({ className }: { className?: string }) {
  return (
    <img
      src={qrLogoAsset.url}
      alt="QR Maker logo"
      className={className}
      draggable={false}
    />
  );
}

// "QR MAKER" wordmark rendered with the Orbitron display font.
export function QrWordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg"
      ? "text-2xl tracking-[0.32em]"
      : size === "sm"
        ? "text-[11px] tracking-[0.36em]"
        : "text-base tracking-[0.34em]";
  return (
    <span
      className={`font-display uppercase leading-none text-foreground ${sizeClass} ${className ?? ""}`}
      style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
    >
      QR Maker
    </span>
  );
}
