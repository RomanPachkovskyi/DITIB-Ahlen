import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/test",
  use: {
    baseURL: "http://localhost:8082",
    ...devices["Desktop Chrome"],
  },
});
