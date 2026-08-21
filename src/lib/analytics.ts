import posthog from 'posthog-js';

/**
 * Product analytics: a thin, fail-quiet wrapper over PostHog.
 *
 * The site is a single page, so PostHog's automatic pageview plus autocapture
 * cover the shallow end. What this module adds is the deep end — named events
 * for the things that mean someone actually engaged with the work (opened the
 * Cedar demo, typed into the language server, evaluated a request) rather than
 * just scrolled past it.
 *
 * Nothing here throws: analytics must never be able to break the page.
 */

/**
 * Read at build time from the environment — set `VITE_POSTHOG_KEY` in
 * `.env.local` for local builds and in the Netlify site's environment for
 * deploys. See `.env.example`.
 *
 * Vite inlines this into the bundle, so it is public either way; the PostHog
 * project key is write-only ingest and safe to expose. The env var is about
 * keeping deploy config out of the source tree, not about secrecy.
 *
 * Unset means analytics stays off, which is the right default for a fork or a
 * preview build.
 */
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST =
  import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com';

/** Console-only in `vite dev`, so local clicking never pollutes real data. */
const DEBUG_ONLY = import.meta.env.DEV;

let live = false;

/** Events already sent this page load, for `captureOnce`. */
const seen = new Set<string>();

type Props = Record<string, string | number | boolean | null | undefined>;

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  if (DEBUG_ONLY) {
    // eslint-disable-next-line no-console
    console.debug('[analytics] dev mode — events log here, nothing is sent');
    return;
  }

  if (!POSTHOG_KEY) return;

  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      // Pin the behaviour snapshot instead of inheriting posthog-js's legacy
      // pre-`defaults` settings. Among other things this snapshot treats
      // localhost as an internal/test host, so `npm run preview` runs are
      // tagged rather than mixed into real traffic. Bump deliberately.
      defaults: '2026-08-29',
      // Everyone here is anonymous, so no visitor should count against the
      // billed MAU tier. Also the library default — stated because it is a
      // deliberate choice, not an accident.
      person_profiles: 'identified_only',
      respect_dnt: true,
      autocapture: true,
    });
    live = true;
  } catch {
    live = false;
  }
}

export function capture(event: string, props?: Props) {
  if (DEBUG_ONLY) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, props ?? {});
    return;
  }

  if (!live) return;

  try {
    posthog.capture(event, props);
  } catch {
    // Swallow: a dropped event is never worth a broken page.
  }
}

/**
 * Send `event` at most once per page load. Use for depth signals that would
 * otherwise fire on every keystroke — the interesting fact is *that* someone
 * edited the policy, not how many times the onChange handler ran.
 *
 * `key` disambiguates when the same event is fired for different subjects
 * (e.g. one `cedar_lsp_edited` per document).
 */
export function captureOnce(event: string, props?: Props, key?: string) {
  const dedupeKey = key ? `${event}:${key}` : event;
  if (seen.has(dedupeKey)) return;
  seen.add(dedupeKey);
  capture(event, props);
}
