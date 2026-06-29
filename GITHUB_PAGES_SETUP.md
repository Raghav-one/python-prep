# GitHub Pages Deployment Guide

## What's Been Configured

Your Next.js project is now set up for static export and GitHub Pages hosting:

- ✅ Static export enabled in `next.config.ts` (`output: "export"`)
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ✅ Automatic deployment on push to `main` branch

## Setup Instructions

### 1. Push to GitHub

Make sure your repository is on GitHub:

```bash
git init
git add .
git commit -m "Configure GitHub Pages deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Interview-Motherlode.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - The workflow will automatically appear as an option

### 3. Configure Custom Domain (Optional)

If you have a custom domain:

1. In **Settings** → **Pages**, add your domain under "Custom domain"
2. Update your domain's DNS settings (GitHub provides instructions)
3. Check "Enforce HTTPS" once DNS is verified

## How It Works

1. **You push** to the `main` branch
2. **GitHub Actions** automatically:
   - Installs dependencies
   - Builds the static site (`npm run build` → outputs to `/out`)
   - Deploys to GitHub Pages
3. **Site is live** at `https://YOUR_USERNAME.github.io/Interview-Motherlode/`

## Build Locally Before Pushing

To test locally:

```bash
npm run build
npx serve out
```

Then visit `http://localhost:3000` to preview the static build.

## If You Use a Custom Domain

If your repo is not at the root, update `basePath` in `next.config.ts`:

```typescript
basePath: "/Interview-Motherlode"  // if repo is named "Interview-Motherlode"
```

Or use `process.env.BASE_PATH` to make it dynamic.

## Cost

✅ **Free** — GitHub Pages is included with free GitHub accounts with unlimited traffic.

## Troubleshooting

- **Build fails**: Check the Actions tab in GitHub for error logs
- **Site shows 404**: Ensure GitHub Pages is enabled in Settings
- **Content not updating**: Clear browser cache (Ctrl+Shift+Delete)
- **Custom domain not working**: Wait up to 24 hours for DNS propagation, then verify HTTPS is enforced

## When to Use a Different Host

If you later need:
- Server-side rendering
- API endpoints
- Real-time features

Switch to **Vercel** (same GitHub push workflow, but with serverless functions).
