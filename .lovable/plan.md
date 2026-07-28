# Push QR Maker to GitHub Using a PAT

## Goal
Push the existing QR Maker project from your local machine to GitHub using a Personal Access Token (PAT) for authentication.

---

## Step 1: Create a GitHub Personal Access Token

1. Go to **github.com** and sign in.
2. Click your profile picture → **Settings**.
3. Scroll down and click **Developer settings** (left sidebar).
4. Click **Personal access tokens → Tokens (classic)**.
5. Click **Generate new token (classic)**.
6. Enter a note, e.g. `QR Maker laptop`.
7. Set an expiration (e.g. 90 days).
8. Check the **`repo`** scope box.
9. Click **Generate token**.
10. **Copy the token immediately** and save it somewhere safe — GitHub will not show it again.

---

## Step 2: Make sure Git knows your identity

Open a terminal in your project root (the folder with `package.json` and `android/`) and run:

```bash
git config user.name "Your Name"
git config user.email "your@email.com"
```

Use the same email associated with your GitHub account.

---

## Step 3: Check your repository connection

Run:

```bash
git remote -v
```

You should see something like:

```text
origin  https://github.com/YOUR_USERNAME/YOUR_REPO.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_REPO.git (push)
```

If nothing appears, link the repo first:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

---

## Step 4: Stage and commit your changes

In the project root terminal, run:

```bash
git add .
git commit -m "QR Maker updates"
```

If Git says "nothing to commit", your files are already committed and you can skip to Step 5.

---

## Step 5: Push to GitHub using your PAT

Run:

```bash
git push origin main
```

When prompted for a password, paste your **PAT** instead of your GitHub password.

If your default branch is called `master`, use:

```bash
git push origin master
```

---

## Step 6: Save the PAT so you do not have to paste it every time

Run this once, replacing the placeholders:

```bash
git remote set-url origin https://YOUR_PAT@github.com/YOUR_USERNAME/YOUR_REPO.git
```

After this, `git push` will work without asking for a password.

---

## Step 7: Verify the push

1. Open your repo page on GitHub.
2. Refresh the page.
3. Confirm your latest commit message appears.
4. Confirm the `android/` folder and all project files are visible.

---

## Quick command summary

```bash
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "QR Maker updates"
git push origin main
```

Use your PAT when asked for a password.

---

## Optional: Using Android Studio's Git UI instead of terminal

1. Go to **Git → Commit** in Android Studio.
2. Select the files, enter a commit message, and click **Commit**.
3. Go to **Git → Push** and click **Push**.
4. If prompted for credentials, enter your GitHub username and paste your PAT as the password.

---

## Notes

- Keep your PAT private — do not paste it into chat or commit it to the repo.
- If Git says "Support for password authentication was removed", it means you must use a PAT, not your GitHub password.
- If you use two-factor authentication (2FA) on GitHub, a PAT is required for command-line pushes.