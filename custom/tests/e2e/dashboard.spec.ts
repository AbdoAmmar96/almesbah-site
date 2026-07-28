import { expect, test } from "@playwright/test";

test.describe("dashboard", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/dashboard");
        await page.locator('input[type="email"]').fill("admin@almesbah-eg.com");
        await page.locator('input[type="password"]').fill("password");
        await page.getByRole("button", { name: /Sign in/i }).click();
        await expect(page.locator("h1")).toContainText("Overview");
    });

    test("overview shows stats", async ({ page }) => {
        await expect(page.locator(".stat").first()).toBeVisible();
    });

    test("products list and edit", async ({ page }) => {
        await page.locator(".side").getByRole("link", { name: "Products" }).click();
        await page.getByRole("link", { name: "Scutched Flax" }).click();
        await expect(page.locator(".form input").nth(1)).toHaveValue("scutched-flax");
        await page.getByRole("button", { name: "Save" }).click();
        await expect(page.locator(".toast")).toBeVisible();
    });

    test("inquiry status flow", async ({ page }) => {
        await page.locator(".side").getByRole("link", { name: "Inquiries" }).click();
        await page.waitForURL("**/dashboard/inquiries");
        await expect(page.locator("table")).toBeVisible();
    });
});
