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
      ? "text-3xl tracking-[0.12em]"
      : size === "sm"
        ? "text-xs tracking-[0.14em]"
        : "text-lg tracking-[0.13em]";
  return (
    <span
      className={`font-display leading-none text-foreground ${sizeClass} ${className ?? ""}`}
      style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
    >
      QR Maker
    </span>

  );
}
