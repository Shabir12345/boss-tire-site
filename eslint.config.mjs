import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16 ships native flat configs. The old FlatCompat bridge
// crashed ESLint ("Converting circular structure to JSON"), so lint never ran.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Copy-heavy marketing pages: apostrophes in JSX text render fine, and
    // escaping every one as &apos; makes the copy unreadable to edit.
    rules: { "react/no-unescaped-entities": "off" },
  },
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts"]),
]);

export default eslintConfig;
