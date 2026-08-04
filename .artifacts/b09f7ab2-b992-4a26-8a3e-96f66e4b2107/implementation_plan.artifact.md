# Implementation Plan: Rewrite QR Maker in Native Kotlin

We are pivoting to a **100% Native Android** app using **Kotlin** and **Jetpack Compose**. This removes the "web bridge" entirely, making the app much faster, more reliable, and fixing all input/logo issues.

## User Review Required

> [!IMPORTANT]
> This will replace the "Web-based" logic with pure Kotlin code. You will no longer need `npm run build` or `npx cap sync`. You will build the app directly in Android Studio.

## Proposed Changes

### 1. New Project Foundation
-   I will set up the **Jetpack Compose** environment within your existing `android/` folder.
-   I will add the **ZXing** library for high-quality QR code generation.

### 2. Native UI Implementation (Jetpack Compose)

#### [NEW] `MainActivity.kt`
The brain of the app. It will handle:
-   **Glassmorphism Theme**: A custom "Apple-style" glassy theme with real background blurs.
-   **QR Logic**: Instant generation as you type.
-   **Native Paste**: A button that talks directly to the Android Clipboard.

#### [NEW] `CreditsActivity.kt`
A beautiful native credits screen with social links that open directly in your apps.

### 3. Functional Features
-   **Native Share**: Uses the standard Android share sheet for images.
-   **Native Save**: Saves the QR code directly to your phone's Gallery/Downloads.
-   **Centered Icon**: We will use the black-background icon we already perfected.

### 4. Cleanup
-   I will remove the old `public/`, `dist/`, and web-related scripts to keep the project clean.

## Execution Steps

1.  **Dependencies**: Add Compose and QR libraries to `build.gradle`.
2.  **Logic**: Implement the `QrGenerator` Kotlin class.
3.  **UI**: Build the Main and Credits screens in Compose.
4.  **Wiring**: Connect the Paste, Save, and Share actions.
5.  **Final Build**: You will build the APK one last time in Android Studio.

## Verification Plan

### Manual Verification
- You will build the APK and verify:
    -   The app opens instantly (no blank screen).
    -   Typing and Pasting works perfectly.
    -   QR code generates correctly.
    -   The UI looks "Premium Glassy" and matches the Apple aesthetic.
