import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    // The formatPostDate guard in src/lib/__tests__/posts.test.ts only catches a
    // dropped `timeZone: "UTC"` pin when the runner is west of UTC. On a UTC CI
    // box the test would pass either way and stop guarding, so pin the zone.
    env: { TZ: "America/Toronto" },
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
