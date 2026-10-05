# Pivot

**Navigate without looking down.**

A concept-stage wearable for urban cyclists and e-scooter riders. This landing page introduces the product and collects early interest through Formspree.

**Website:** [pivotride.work](https://pivotride.work/)

Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide. Hosted on GitHub Pages.

## Local development

Use Node.js 22 or newer.

```sh
npm install
npm run dev
```

To enable local signups, create `.env.local` with your public Formspree submission URL:

```dotenv
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Restart the development server after changing this file. `.env.local` is ignored by Git.

## Build and check

```sh
npm test
npm run build
npm run verify-build
npm run preview
```

The production output is `dist/`. Tests check signup validation; production checks verify the content policy, assets, fonts, and deployment action pins.

## Deployment

Push changes to `main` to deploy automatically. Track progress in [GitHub Actions](https://github.com/Abulala1/pivot/actions).

For a new repository, select **GitHub Actions** under **Settings > Pages > Build and deployment**. To redeploy manually, open the **Deploy Pivot to GitHub Pages** workflow and select **Run workflow**.

Relative asset paths and section anchors work at the repository URL without a routing fallback. No purchased domain is required.

## Beta signup configuration

The live Formspree endpoint is already configured as a repository Actions variable:

- **Name:** `VITE_FORMSPREE_ENDPOINT`
- **Value:** the public submission URL from your Formspree dashboard
- **Location:** **Settings > Secrets and variables > Actions > Variables**

After changing the variable, rerun deployment. Confirm delivery by submitting your own signup and checking Formspree and your inbox.

In Formspree, verify your recipient email and keep spam filtering enabled. If your plan supports domain restrictions, allow `pivotride.work`. Review the privacy disclosure and configure a monitored reply address for update emails. Enabling CAPTCHA requires updating the site's content policy for the provider and testing the integration.

## Connect pivotride.work

The website metadata and footer use `https://pivotride.work/`. GitHub Pages manages the custom domain through repository **Settings > Pages**.

At your domain provider, remove the existing parking A records for `@` and add:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | abulala1.github.io |

The `www` record is optional. Remove conflicting records only for the website hosts; keep email MX/TXT records. Turn off registrar URL forwarding for these hosts. Use the provider's default TTL.

After DNS propagates, check repository **Settings > Pages**, wait for certificate provisioning, and enable **Enforce HTTPS**. Update any Formspree domain restriction to `pivotride.work` and test a signup. Verify domain ownership under your GitHub account **Settings > Pages** using GitHub's supplied TXT record.

See GitHub's [custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). This Actions deployment uses the Pages setting; a committed CNAME file is not required.

## Editing the site

| Content | File or directory |
| --- | --- |
| Sections, FAQ, privacy, footer | `src/App.tsx` |
| Navbar and logo | `src/components/Navbar.tsx` |
| Signup form | `src/sections/Beta.tsx` |
| Signup validation | `src/lib/signup.ts` |
| Styling | `src/styles.css` |
| Product images and logo | `public/images/` |
| Favicon | `public/favicon.svg` |
| Local fonts and licenses | `src/assets/fonts/` |

When replacing images, update their alt text and dimensions. Product visuals represent the concept; avoid claims of availability or validated protective performance.

## Security

- The Formspree submission URL is public, not a private API key. Never put passwords or private keys in `VITE_` variables: those values are bundled into the website.
- Private environment files are ignored by Git.
- Production uses a restrictive content policy, local fonts, and HTTPS. Inline style attributes remain allowed for animation; inline scripts are blocked.
- Form checks and honeypots help reduce unwanted submissions; Formspree provides server-side filtering.
- Deployment actions are pinned, permissions are limited, and CI checks dependencies before publishing.
- GitHub secret scanning, push protection, dependency alerts, and security-update PRs are enabled. Review alerts and Dependabot PRs regularly.
- Enable two-factor authentication for GitHub and Formspree. If a real secret leaks, revoke or rotate it; deleting a file does not revoke it or remove Git history.

GitHub Pages does not support custom response headers. Controls such as `frame-ancestors` require a host or proxy that supports them.
