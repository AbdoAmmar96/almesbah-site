import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",
    timeout: 30_000,
    use: {
        baseURL: process.env.APP_URL ?? "http://localhost:8000",
        screenshot: "only-on-failure",
    },
    webServer: process.env.CI
        ? undefined
        : { command: "php artisan serve", url: "http://localhost:8000", reuseExistingServer: true },
});
