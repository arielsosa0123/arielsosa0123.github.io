# Ariel Sosa's Portfolio

Personal website built with React and JavaScript (JSX), using Vite for development
and production builds. Profile information follows `CurrentResum2026.pdf`,
including education, technical skills, projects, experience, and activities.
A compact top bar links to the embedded resume viewer and certifications.
Every page includes labeled contact logos, and the homepage retains the hobbies and octopus animation.

## Run locally

Use Node.js 24 LTS (or a version supported by `package.json`).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use this command instead of VS Code Live
Server or opening `index.html` directly: React's JSX requires Vite to compile it.
The npm scripts invoke Vite through Node so they also work with the `&` character
in this folder's Windows path.

## Production build

```sh
npm run build
npm run preview
```

The deployable site is generated in `dist/`. Preview serves that build locally.

## Project structure

- `src/main.jsx`: React entry point and stylesheet import.
- `src/App.jsx`: navigation, routes, profile content, and contact interactions.
- `src/profile.js`: resume-derived profile facts, contact details, and PDF path.
- `src/routes.js`: navigation labels and internal route paths.
- `src/pages/ResumePage.jsx`: scrollable PDF viewer with zoom controls.
- `src/pages/CertificationsPage.jsx`: CodePath credentials with course summaries and scrollable certificate viewers.
- `src/certifications.js`: certificate metadata and course descriptions.
- `src/styles.css`: site styling, responsive layout, and animations.
- `public/`: images and `CurrentResum2026-public.pdf`, copied into each build.
- `index.html`: document metadata and React mount point.
- `vite.config.js`: Vite and React configuration.
- `.github/workflows/deploy.yml`: build and deployment for GitHub Pages.

Edit resume-derived content in `src/profile.js`, page structure and hobbies in
`src/App.jsx`, and styles in `src/styles.css`. The site's PDF is
`public/CurrentResum2026-public.pdf`: the phone-number outlines have been removed
and replaced by a blurred patch inside the PDF, which stays in place during
scrolling and zooming. The original resume remains outside the site in Downloads.
For future resume updates, prepare a copy with the phone number hidden before
placing it in `public/`; update `profile.resumePath` if its filename changes.
The email button reports successful copying or displays the address if clipboard
access fails. Clipboard copying requires HTTPS or localhost.

## Navigation

React Router uses hash routes so direct links and refreshes work on GitHub Pages
without server rewrites. For example, the resume is at `/#/resume`.

- `/`: home; click the Ariel Sosa name in the top bar to return here.
- `/resume`: scrollable resume with zoom controls and a download button for the public PDF.
- `/certifications`: CodePath certificates, descriptions, and scrollable viewers.

The labeled LinkedIn and GitHub logos at the bottom of every page open profile
URLs from `src/profile.js` directly in new tabs. The Email logo copies the address
and displays a confirmation box for seven seconds, or the address if copying fails.
There are no separate LinkedIn, GitHub, or Email pages or routes.
PDF annotations are disabled. The current PDF has no selectable text; the viewer
supports text selection if it is replaced with a PDF containing text.
The viewer and its worker load only when Resume is visited.

References: [React Router hash routing](https://reactrouter.com/api/declarative-routers/HashRouter)
and [React-PDF](https://github.com/wojtekmaj/react-pdf).

## GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, select
**GitHub Actions** as the source. Push the changes to `main` to run the included
build and deployment workflow, or run it manually from the Actions tab.
These local changes do not publish the site until you push them.

The app uses root-relative asset URLs for `https://arielsosa0123.github.io/`.
See the [Vite GitHub Pages guide](https://vite.dev/guide/static-deploy#github-pages)
for deployment details.
