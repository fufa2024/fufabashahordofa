# Fufa Basha Hordofa — Personal Portfolio

A production-ready personal portfolio for **Fufa Basha Hordofa** — Statistician, Policy Analyst,
Researcher, and Data Analyst — built with plain HTML5, CSS3, and vanilla JavaScript (ES6), plus
Bootstrap 5, Font Awesome, and AOS. No build step, no backend, no database.

**Design system:** "Field Notes" — a statistician's grid-paper texture, a sparkline-inspired stat
strip, and a mono/serif type pairing (JetBrains Mono for data, Fraunces for headlines, Inter for
body copy). Palette follows the brief exactly: primary `#0F172A`, secondary `#2563EB`, accent
`#F59E0B`, light background `#FFFFFF`, dark background `#020617`.

---

## 1. Running locally

No installation required.

1. Download or clone this folder.
2. Double-click `index.html`, or open it from your browser with `File → Open`.
3. That's it — every page, animation, and interaction works entirely client-side.

Optional (recommended for accurate relative-path testing): serve it with a tiny local server instead
of the `file://` protocol:

```bash
# Python 3
cd fufa-portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 2. Folder structure

```
fufa-portfolio/
├── index.html          Home — hero, stats, featured research, ministry teaser
├── about.html           Biography, mission/vision/values, timeline, skills, languages
├── research.html         10 research project cards (objectives, methods, tools, PDF)
├── projects.html          Field/implementation projects (settlement planning, thesis support…)
├── publications.html      Searchable, sortable publications table
├── services.html          14 consulting services + process steps
├── portfolio.html         Filterable gallery with modal preview
├── blog.html              Filterable blog post grid (6 categories)
├── ministry.html           Christian / Afaan Oromoo ministry content
├── contact.html            Contact form, info, map placeholder
├── 404.html                 Custom not-found page
├── sitemap.xml
├── robots.txt
├── README.md
└── assets/
    ├── css/style.css        All design tokens + component styles (single file)
    ├── js/main.js            Theme toggle, preloader, counters, filters, forms, particles…
    ├── images/                Add your photos here (hero portrait, OG cover, etc.)
    ├── documents/             CV + downloadable PDFs (placeholder CV included)
    └── icons/favicon.svg       Brand monogram favicon
```

---

## 3. Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `fufa-portfolio`) and push this folder's contents to it:
   ```bash
   cd fufa-portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/fufa-portfolio.git
   git push -u origin main
   ```
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save. Your site will be live at `https://<your-username>.github.io/fufa-portfolio/` within a minute or two.

---

## 4. Deploying to Netlify

**Option A — drag and drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the entire `fufa-portfolio` folder onto the page.
3. Netlify assigns a live URL immediately.

**Option B — Git-connected:**
1. Push the folder to a GitHub/GitLab repo (see above).
2. In Netlify, click **Add new site → Import an existing project** and select the repo.
3. Leave the build command empty and set the publish directory to `/` (root), since this is a static site with no build step.

---

## 5. Deploying to Vercel

1. Push the folder to a GitHub repo.
2. In Vercel, click **Add New → Project** and import the repo.
3. Framework preset: **Other**. Build command: none. Output directory: `.` (root).
4. Deploy — Vercel serves the static files directly.

---

## 6. Custom domain setup

- **GitHub Pages:** Settings → Pages → Custom domain → enter your domain, then add a `CNAME` file
  at the project root containing that domain. Point your DNS provider's A/ALIAS/CNAME records at
  GitHub Pages per [GitHub's documentation](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
- **Netlify / Vercel:** Site settings → Domain management → Add domain, then follow the DNS
  instructions each platform provides (usually a CNAME or two A records).
- After connecting a domain, update the `SITE` constant used when generating meta tags (search for
  `fufabasha.com` across the HTML files) to your real domain, and regenerate `sitemap.xml` /
  `robots.txt` accordingly.

---

## 7. Customization guide

| What to change | Where |
|---|---|
| Name, role, bio copy | Directly in each `.html` file — content is plain text, no templating engine |
| Colors | CSS variables at the top of `assets/css/style.css` (`:root` and `[data-theme="dark"]`) |
| Fonts | `<link>` tag in each page `<head>` (Google Fonts: Fraunces / Inter / JetBrains Mono) and the `--font-*` variables in `style.css` |
| CV file | Replace `assets/documents/Fufa-Basha-Hordofa-CV.pdf` with your real CV, same filename |
| Research/publication PDFs | Add real files to `assets/documents/` matching the filenames referenced in `research.html` and `publications.html`, or update the links |
| Photos | Add images to `assets/images/` and swap the SVG placeholder in the hero section of `index.html` for an `<img>` tag |
| Social links | Update the `href` values in the navbar/footer/contact sections (search for `fufabasha` placeholders) |
| Contact form backend | The form in `contact.html` is static. Connect it to [Formspree](https://formspree.io), [Netlify Forms](https://docs.netlify.com/forms/setup/), or your own endpoint by setting the form's `action`/`method` and removing the JS `preventDefault` short-circuit in `assets/js/main.js` if you want a real network submission |
| Google Map | Replace `.map-placeholder` in `contact.html` with a real embedded `<iframe>` from Google Maps |
| Analytics/SEO domain | Search and replace `fufabasha.com` across all files with your live domain |

### Dark mode
Toggled via the moon/sun icon in the navbar, persisted in `localStorage` under the key
`fufa-theme`, and applied before first paint via an inline script in `<head>` to avoid a flash of
the wrong theme.

### Accessibility notes
- Skip-to-content link on every page.
- Visible focus states inherited from Bootstrap defaults; do not remove `:focus` outlines without
  replacing them.
- `prefers-reduced-motion` is respected — animations and the particle background shorten or pause.
- All interactive icons include `aria-label`s.

---

## 8. Content disclaimer

All biographical details, statistics, publication citations, and project descriptions in this
build are **illustrative placeholders** written to be realistic and non-generic, not verified
facts. Replace them with your real CV data, publication DOIs, and project outcomes before
publishing live.

---

Built for Fufa Basha Hordofa. No React, no backend, no database — just fast, semantic, accessible
static HTML.
