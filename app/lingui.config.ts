import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "zh",
  fallbackLocales: {
    default: "zh",
  },
  locales: ["zh", "ja", "en"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  compileNamespace: "ts",
});
