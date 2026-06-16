# foosiee.github.io

Cole Foos's personal portfolio site — a software-engineering resume styled like a
1990s desktop operating system. Each section (About, Resume, Projects, Skills,
Contact) opens as a draggable "window," and a built-in Cedar lab runs the
[Cedar](https://www.cedarpolicy.com/) policy language entirely in the browser via
WebAssembly.

## Tech stack

- **[Vite](https://vitejs.dev/)** + **[React 18](https://react.dev/)** + **TypeScript**
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** for the in-browser Cedar editor
- **[Cedar language server](https://github.com/foosiee/cedar)** compiled to WebAssembly (vendored as a git submodule under `vendor/cedar`)
- **Prettier** for formatting (enforced on build and via a Husky pre-commit hook)
- Deployed on **Netlify** (build output: `dist/`)

## Prerequisites

- **Node.js 20+** and npm
- For the Cedar lab WASM build only:
  - **Rust** (toolchain pinned to `1.95.0` in `rust-toolchain.toml`)
  - The **`wasm32-unknown-unknown`** target: `rustup target add wasm32-unknown-unknown`
  - `cargo` available on your `PATH` (the build installs the matching `wasm-bindgen-cli` automatically)

The Cedar lab imports its WASM module from `src/generated/`, which is **not**
checked into git — it's produced by the build. Run `npm run build` once (which
requires the Rust toolchain above) to generate it before the dev server can load
the Cedar lab. After that, `npm run dev` reuses the generated artifacts and only
rebuilds them when the `vendor/cedar` source changes.

## Getting started

```bash
# 1. Clone with submodules (or init them after cloning)
git clone --recurse-submodules https://github.com/foosiee/foosiee.github.io.git
cd foosiee.github.io

# If you already cloned without --recurse-submodules:
git submodule update --init --recursive

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:5173)
npm run dev
```

## Scripts

| Command           | Description                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot-module reload.                                                                                   |
| `npm start`       | Alias for `npm run dev`.                                                                                                            |
| `npm run build`   | Production build via `scripts/build.mjs` — rebuilds Cedar WASM (if stale), runs Prettier `--check`, then `vite build` into `dist/`. |
| `npm run preview` | Serve the production build locally.                                                                                                 |

### About the build step

`npm run build` runs `scripts/build.mjs`, which:

1. Ensures the Cedar WASM artifacts in `src/generated/cedar-language-server/` are up
   to date. If the `vendor/cedar` source is newer than the generated output, it
   rebuilds with `cargo build --release --target wasm32-unknown-unknown` and
   `wasm-bindgen` (installing the pinned `wasm-bindgen-cli` if needed).
2. Runs `prettier --check .` (the build fails on any formatting issue).
3. Runs `vite build`, emitting the static site to `dist/`.

## Editing content

Almost all resume content is data-driven from a single file:

### `src/config.json`

- `jobs` — work experience (company, location, title, date, bulleted `details`)
- `education` — schools (school, location, date, `awarded`, `details`)
- `skills` — string list rendered as the Skills "tool cloud"
- `projects` — project cards (title, description, optional `link`)
- `email`, `linkedin`, `github` — contact links
- `resume` — path to the downloadable résumé PDF (see below)

Editing this file updates the Resume, Skills, Projects, and Contact windows
automatically. Type definitions for the config live in `src/types.ts`.

### Résumé PDF

The downloadable résumé lives at `public/Cole_Foos_Resume.pdf`. Files in `public/`
are served from the site root, so the **Download Resume** button references it with
the relative path `"/Cole_Foos_Resume.pdf"` (set as `resume` in `config.json`). To
update the résumé, replace that PDF (keeping the filename, or update the `resume`
path to match).

### Other copy

A few narrative blurbs are hardcoded in their components rather than `config.json`:

- About-page summary text: `src/pages/home/apps/about-app.tsx`
- "Extra highlights," "currently exploring," and the boot sequence: `src/pages/home/home-data.ts`

## Project structure

```
.
├── index.html                  # App entry; loads fonts and the Netlify contact form
├── public/                     # Static assets served at the site root
│   ├── Cole_Foos_Resume.pdf    # Downloadable résumé
│   ├── favicon.ico
│   └── robots.txt
├── scripts/
│   └── build.mjs               # Cedar WASM rebuild + prettier check + vite build
├── src/
│   ├── App.tsx                 # Root component
│   ├── index.tsx               # React entry point
│   ├── config.json             # All resume content (data-driven)
│   ├── types.ts                # Config/Job/Education/Project types
│   ├── context/                # React context for the config
│   ├── components/cedarLab/    # Cedar editor + lab UI
│   ├── lib/                    # Cedar LSP / Monaco glue code
│   ├── generated/              # Cedar language-server WASM (build output, not committed)
│   └── pages/home/
│       ├── home.tsx            # Desktop shell, window management
│       ├── home-data.ts        # App definitions, window layouts, boot sequence
│       └── apps/               # About, Resume, Projects, Skills, Contact, Terminal windows
├── vendor/
│   └── cedar/                  # Git submodule: Cedar language server source
├── vite.config.ts              # Vite + React + WASM + top-level-await plugins
├── rust-toolchain.toml         # Pinned Rust toolchain for the WASM build
└── netlify.toml                # Deploy config (publishes dist/)
```

## Deployment

Netlify builds with `rustup target add wasm32-unknown-unknown && npm run build`
(Node 20) and publishes the `dist/` directory. The contact form is handled by
Netlify Forms (the hidden `<form name="contact" netlify>` in `index.html`).
