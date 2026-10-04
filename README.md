# Pivot

A responsive, concept-stage hardware landing page for urban cyclists and e-scooter riders. React, Vite, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide. No backend, routing dependency, or fabricated product claims.

## Develop and build

Use Node.js 22 or newer.

```sh
npm install
cp .env.example .env.local
npm run dev
npm run build
npm run preview
```

On PowerShell, use `Copy-Item .env.example .env.local`. The build outputs `dist/`. `npm run build` checks TypeScript before compiling. Commit `package-lock.json` for repeatable CI installs.

## Enable beta signups

1. Create a form in Formspree and set `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/yourActualId` in `.env.local`.
2. For GitHub deployment, add the same value under **Settings → Secrets and variables → Actions → Variables**, as `VITE_FORMSPREE_ENDPOINT`.
3. Rebuild after changing the variable. Vite embeds public configuration at build time; do not put API secrets in `VITE_` variables.
4. Configure the form's recipient, allowed domains, spam protection, and a monitored reply address. Review retention settings and update the privacy disclosure in `src/App.tsx` for your actual practices before collecting data.
5. Test a real submission, delivery, and unsubscribe/deletion process before launch.

The form uses native required/email validation, rejects blank names/cities, includes a honeypot, prevents duplicate submissions, and presents sending, success, and error states. Missing/placeholder configuration never sends data or pretends to save a signup. Failed requests preserve entered values. This list registers interest; it does not promise a beta place or accept payment.

## GitHub Pages

Repository: [Abulala1/pivot](https://github.com/Abulala1/pivot). Temporary website address: **https://abulala1.github.io/pivot/**. You do not need to buy a domain.

1. This project is configured to deploy from `main`, including the lockfile.
2. In [Settings → Pages](https://github.com/Abulala1/pivot/settings/pages) → **Build and deployment**, choose **GitHub Actions** if it is not already selected. Leave **Custom domain** empty until you own a domain.
3. The included `.github/workflows/deploy.yml` builds and publishes `dist/` on pushes to `main`. You can also run the workflow manually.
4. Open the URL reported by the deployment job and test anchor links and asset loading.

Vite uses `base: './'`; image paths use `import.meta.env.BASE_URL`. Assets work at both the repository URL and a custom-domain root. Navigation uses section anchors, so no SPA fallback is required. No CNAME is committed. Canonical, social metadata, robots.txt, and sitemap currently use `https://abulala1.github.io/pivot/`.

### Manual setup checklist

- If Pages is not enabled, choose **GitHub Actions** in the Pages settings above, then open [Actions](https://github.com/Abulala1/pivot/actions), select **Deploy Pivot to GitHub Pages**, and click **Run workflow** on `main`. The deployment should appear at the temporary address after the workflow completes. If Actions are disabled, enable them under repository Settings → Actions → General.
- To accept real signups, create your Formspree form and add the endpoint as the repository Actions variable `VITE_FORMSPREE_ENDPOINT`. Then run the deployment workflow again. See **Enable beta signups** above. Until configured, the form clearly reports that registration is being set up and does not save data.
- Review the privacy wording and configure your update emails before collecting signups.
- Buying and connecting a domain is optional; the free GitHub Pages address works on its own.

## Connect pivotride.us

1. In repository **Settings → Pages → Custom domain**, enter `pivotride.us` and save. For this Actions deployment, manage the domain through that setting.
2. After you buy the domain, at your DNS provider, point the apex (`@`) to GitHub Pages using the A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`, or a provider-supported ALIAS/ANAME to `abulala1.github.io`.
3. Optionally set a `www` CNAME to `abulala1.github.io` (without the repository name). Remove conflicting records for these hosts. Verify the domain in your GitHub account using GitHub's supplied TXT record.
4. Wait for DNS and certificate provisioning, then enable **Enforce HTTPS** in Pages settings. Test apex/www redirect behavior.
5. Replace `https://abulala1.github.io/pivot/` with `https://pivotride.us/` in `index.html`, `public/robots.txt`, and `public/sitemap.xml`, then commit and push. Ensure the social image is publicly reachable after deployment. Update the footer website text in `src/App.tsx` too.

Confirm current DNS requirements against [GitHub's custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Images and content

The supplied product visuals are optimized as WebP files in `public/images/`. Replace `rider.webp` and `product.webp` there, or change `src/lib/config.ts`. Keep the declared image dimensions/aspect ratios aligned with replacements and update descriptive alt text in `src/App.tsx`. `social.jpg` is the social sharing asset. These visuals are explicitly labeled as illustrative concepts.

- `src/components/`: shared navigation and reduced-motion-aware reveal animation.
- `src/sections/Beta.tsx`: static-host-compatible Formspree form.
- `src/App.tsx`: page content, FAQ, privacy disclosure, footer.
- `src/styles.css`: Tailwind import, design tokens, responsive layout, focus states.
- `public/`: favicon, images, robots.txt, sitemap.xml.

Fonts use Google Fonts with local sans-serif fallbacks. Self-host licensed Geist/Inter font files if you need to avoid third-party font requests. Animations use opacity/transform, run once, and respect reduced-motion preferences. Product images have reserved dimensions; the hero loads eagerly and the studio image lazily.
