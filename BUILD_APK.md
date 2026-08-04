# Building QR Maker as an Android APK

QR Maker is packaged with **Capacitor** so the same codebase runs as a web preview and as a native Android app.

## Prerequisites

- **Node.js 20+** and `npm`
- **Android Studio** (Hedgehog or newer) with:
  - Android SDK Platform 34+
  - Android SDK Build-Tools
  - A configured emulator or a physical device with USB debugging
- Java 17 (bundled with recent Android Studio)

## 1. Install dependencies

```bash
npm install
```

## 2. Build the web assets

Capacitor copies the contents of `dist/` into the Android project.

```bash
npm run build
```

## 3. Android platform (already included)

The `android/` folder is committed to the repository, so you can skip
`npx cap add android`. If you ever need to regenerate it from scratch, delete
the folder and run:

```bash
npx cap add android
```

## 4. Sync web assets into Android

Run this after every web build:

```bash
npx cap sync android
```

## 5. Open in Android Studio

```bash
npx cap open android
```

In Android Studio:

1. Wait for Gradle sync to finish.
2. Select a device / emulator.
3. Press **Run ▶** to install a debug APK, **or**
4. **Build → Build Bundle(s) / APK(s) → Build APK(s)** to produce a release-style APK at
   `android/app/build/outputs/apk/debug/app-debug.apk`.

## 6. Producing a signed release APK / AAB (Play Store)

1. In Android Studio: **Build → Generate Signed Bundle / APK…**
2. Choose **Android App Bundle** (recommended for Play Store) or **APK**.
3. Create a new keystore (save the `.jks` and passwords safely) or use an existing one.
4. Select the **release** build variant.
5. Android Studio outputs the signed artifact under
   `android/app/release/` (`app-release.aab` or `app-release.apk`).

## App identity

- App ID: `dev.iplays.qrmaker`
- App Name: `QR Maker`
- Background: `#0b1020` (dark, matches glass UI)

Edit these in `capacitor.config.ts`, then re-run `npx cap sync android`.

## Icons & splash screens

The launcher icon is generated from `assets/icon.png` (the glass QR block logo you uploaded). If you ever replace it, use a 1024×1024 PNG and run:

```bash
npx capacitor-assets generate --android
```

This regenerates all Android launcher icons and splash densities. The current icon has already been generated and synced into `android/app/src/main/res/`.

## Permissions

The app only uses:

- Storage / Documents (via `@capacitor/filesystem`) to save the PNG
- Native share sheet (via `@capacitor/share`) — no extra permission needed
- In-app browser (via `@capacitor/browser`) to open the GitHub credits link

No camera, location, or network permissions beyond the default INTERNET are required.
