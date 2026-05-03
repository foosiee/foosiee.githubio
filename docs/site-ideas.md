# Site Ideas

## Desktop UX

- Persist open windows, minimized state, and positions in `localStorage`
- Add selective resize handles for `terminal`, `projects`, and `work`
- Add a boot sequence before the desktop appears
- Add sound and CRT-style effects carefully, with an easy mute toggle
- Make `Projects` feel like an explorer window rather than a static list
- Tighten window layout constraints so content stays inside the faux OS chrome
- Audit mobile and mid-width desktop behavior for stacked-window readability

## Cedar Integration

- Add a Cedar playground window directly inside the desktop
- Run Cedar parsing/validation in-browser through WASM
- Use `cedar-language-server` browser support for hover, completion, and diagnostics
- Modernize the frontend/tooling first so Monaco workers and WASM bundling are straightforward
- Decide whether Cedar is consumed via published package(s) or vendored/submoduled source
- Improve Cedar completion docs and hover rendering inside Monaco
- Add debounce and small caching for Cedar language-service diagnostics

## Content Ideas

- Turn projects into individual desktop apps/windows
- Use project-specific windows as the default showcase surface
- Classify projects as `embedded`, `external`, or `case-study`
- Let `Launch` open embedded apps directly when possible
- For external projects, prefer a native detail window first, then `Visit Site` / `Open Repo`
- Connect the Cedar case-study window to the live in-site Cedar Lab app
- Add a richer “about” profile with engineering philosophy and current interests
- Add a timeline or system-log view for experience
  /
