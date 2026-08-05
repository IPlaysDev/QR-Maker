# Implementation Plan: Fix Native Kotlin App Issues

The goal is to fix the broken logic in the native Kotlin app, specifically addressing the non-functional QR generation, the broken input field, and the unexpected scrolling behavior.

## User Review Required

> [!IMPORTANT]
> The current Kotlin code contains React/JavaScript syntax errors that were accidentally introduced. I will be replacing these with correct Jetpack Compose logic to fix the typing, pasting, and QR generation.

## Proposed Changes

### 1. Fix Input & Typing Issues

#### [MODIFY] [MainActivity.kt](file:///C:/Users/NMKRV/StudioProjects/QR-Maker/android/app/src/main/java/dev/iplays/qrmaker/MainActivity.kt)
-   **Remove React Syntax**: Replace `useRef`, `inputRef.current?.focus()`, and `ref={inputRef}` with proper Compose `FocusRequester`.
-   **Fix Paste Logic**: Use the native `ClipboardManager` correctly within the `IconButton` click listener.
-   **Fix Text Colors**: Ensure the text color is clearly visible (White) and the cursor is working.
-   **Disable Horizontal Scroll**: Ensure the main layout doesn't exceed screen width to prevent side-scrolling.

### 2. Fix QR Generation

#### [MODIFY] [QRCodeGenerator.kt](file:///C:/Users/NMKRV/StudioProjects/QR-Maker/android/app/src/main/java/dev/iplays/qrmaker/QRCodeGenerator.kt)
-   **Fix BitMatrix Access**: Change `bitMatrix[x, y]` to `bitMatrix.get(x, y)` which is the correct method for the ZXing library.
-   **Optimize Bitmap Creation**: Ensure the QR code has high contrast (Pure Black on Pure White).

### 3. Layout Cleanup

#### [MODIFY] [MainActivity.kt](file:///C:/Users/NMKRV/StudioProjects/QR-Maker/android/app/src/main/java/dev/iplays/qrmaker/MainActivity.kt)
-   **Remove side-scrolling**: Use `Modifier.fillMaxWidth()` carefully and ensure no fixed-width components are wider than the screen.
-   **Improve Touch Targets**: Ensure the input field and buttons are easy to tap.

## Execution Steps

1.  **Clean MainActivity**: Remove all non-Kotlin code and implement proper Compose state and focus management.
2.  **Repair QrGenerator**: Fix the ZXing integration logic.
3.  **Refine UI**: Adjust padding and widths to prevent side-scrolling.
4.  **Final Build**: Provide the user with the command to build the fixed APK.

## Verification Plan

### Manual Verification
- You will build the APK and verify:
    -   You can tap the box and the keyboard appears.
    -   You can type "https://google.com" and see the letters.
    -   The "Paste" button successfully inserts text from your clipboard.
    -   The QR code appears instantly when you click "Generate".
    -   The screen stays fixed and doesn't wiggle side-to-side.
