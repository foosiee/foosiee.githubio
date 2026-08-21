/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** PostHog project key. Unset (the default) disables analytics entirely. */
  readonly VITE_POSTHOG_KEY?: string;
  /** PostHog ingest host; defaults to US cloud. Use the EU host if the
   * project lives there. */
  readonly VITE_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
