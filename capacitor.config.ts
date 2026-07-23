import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.iplays.qrmaker",
  appName: "QR Maker",
  webDir: "dist",
  backgroundColor: "#0b1020",
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#0b1020",
      androidSplashResourceName: "splash",
      showSpinner: false,
    },
  },
};

export default config;
