# Plan: Use uploaded glass QR logo as Android launcher icon

## Goal
Replace the default Android robot launcher icon with the uploaded glass QR block logo so it appears on the Android home screen and app drawer.

## Steps

1. **Prepare a source icon image**
   - Download the existing `qr-logo.png` asset from the Lovable CDN.
   - Use ImageMagick to pad it to a square, remove any background, and resize to 1024×1024 px so it works cleanly as an Android adaptive icon foreground.
   - Save the processed source under `src/assets/icon.png`.

2. **Generate Android icon resources**
   - Install `@capacitor/assets` as a dev dependency.
   - Run `npx capacitor-assets generate --android` to produce all required `mipmap-*/ic_launcher.png`, `mipmap-*/ic_launcher_foreground.png`, `mipmap-*/ic_launcher_round.png`, and `mipmap-anydpi-v26/ic_launcher.xml` resources.
   - This will overwrite the default robot drawables in `android/app/src/main/res/`.

3. **Verify Android manifest references**
   - Confirm `AndroidManifest.xml` still points to `@mipmap/ic_launcher` and `@mipmap/ic_launcher_round`.
   - Confirm `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml` uses the generated foreground/background layers.

4. **Sync and document**
   - Run `npx cap sync android` so Capacitor picks up the new resources.
   - Update `BUILD_APK.md` to mention that the launcher icon is generated from `src/assets/icon.png`.

5. **Visual verification**
   - Build the debug APK (`Build → Build APK(s)` in Android Studio) and check the app icon in the device/ emulator app drawer.

## Out of scope
- No changes to the in-app UI or the Credits page.
- No changes to the splash screen unless explicitly requested.
