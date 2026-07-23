import QRCode from "qrcode";

export function isValidUrl(input: string): boolean {
  if (!input) return false;
  const trimmed = input.trim();
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const u = new URL(withProto);
    return !!u.hostname && u.hostname.includes(".");
  } catch {
    return false;
  }
}

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export async function generateQrDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 1024,
    color: { dark: "#0b1020", light: "#ffffff" },
  });
}
