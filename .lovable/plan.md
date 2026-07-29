Update Credits page social links and branding

1. Edit `src/routes/credits.tsx`:
   - Remove the "An Onix Labs Project" text block.
   - Replace the Instagram link with `https://www.instagram.com/iplaysdev`.
   - Replace the YouTube link with `https://www.youtube.com/@IPlaysDev`.
   - Keep the GitHub link unchanged (`https://github.com/IPlaysDev`).
   - Ensure all social links remain clickable and use the existing `openLink` helper for native in-app browser support.

2. Verify the change:
   - Run `bun run build` to confirm no TypeScript/JSX errors.
   - Check the preview to confirm the Credits page shows only the logo, "Developed by IPlaysDev", GitHub, Instagram, and YouTube links, and that the new links open correctly.