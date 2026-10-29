# Frame Cinema

A fictional, static cinema booking site. No accounts, payments, database or API keys.

## Preview

Requires Node.js 22 or newer.

```sh
npm ci
npm start
```

Open http://localhost:4173. The server exposes only the `site` directory.

## Free GitHub Pages hosting

1. Create a **public** GitHub repository. GitHub Free supports Pages for public repositories. Do not upload this whole folder through the browser; use Git so the exclusions apply.
2. From this folder, run `git init -b main`, then `git add .`. Before committing, run `git diff --cached --name-only` and check that no private/local files are listed.
3. Run `git commit -m "Add Frame Cinema"`.
4. Copy the new repository's HTTPS URL, then run `git remote add origin YOUR_REPOSITORY_URL` and `git push -u origin main`. GitHub may ask you to sign in.
5. In GitHub, open **Settings > Pages > Build and deployment > Source** and select **GitHub Actions**.
6. Open **Actions > Publish cinema > Run workflow**. After it finishes, the deployment link appears in the run and under **Settings > Pages**.

The address is normally `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`. Relative asset paths support project subdirectories. The workflow uploads **only `site/`**, not the repository root. No paid services or custom domain are needed. GitHub usage limits and terms still apply.

The public repository's source is inspectable even when only one folder is deployed. Keep private assessment material outside Git. `.gitignore` does not protect files uploaded manually or already tracked by Git.

## Automation starter

`candidate-starter/` is a standalone Playwright project. Copy **its contents**, including its `.github` folder, into a separate candidate-owned repository. Its README covers running tests and publishing the HTML report. Do not enable its workflow in this cinema repository.

## Site checks

```sh
npm run check
```

## Images

Fictional film artwork uses downloaded Unsplash photographs: [space](https://unsplash.com/photos/space-sky-illustration-oMpAz-DN-9I), [ocean](https://images.unsplash.com/photo-1518837695005-2083093ee35b), and [forest](https://images.unsplash.com/photo-1448375240586-882707db888b). No real film titles or posters are used. Fonts are served by Google Fonts; local fallbacks are available.