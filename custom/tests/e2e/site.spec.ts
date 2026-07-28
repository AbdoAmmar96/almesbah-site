import { expect, test } from "@playwright/test";

const pages = ["/en", "/en/about", "/en/products", "/en/industries", "/en/export",
    "/en/gallery", "/en/blog", "/en/certifications", "/en/contact"];

for (const path of pages) {
    test(`renders ${path}`, async ({ page }) => {
        const res = await page.goto(path);
        expect(res?.status()).toBe(200);
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("footer")).toContainText("Business Partner");
    });
}

test("product detail shows specs and RFQ", async ({ page }) => {
    await page.goto("/en/products/scutched-flax");
    await expect(page.locator("h1")).toContainText("Scutched Flax");
    await expect(page.locator(".specs")).toBeVisible();
    await expect(page.getByRole("link", { name: /Request a Quote/i }).first()).toBeVisible();
});

test("blog article renders markdown", async ({ page }) => {
    await page.goto("/en/blog/scutched-vs-hackled-flax");
    await expect(page.locator(".prose h2").first()).toBeVisible();
});

test("legacy URLs 301 to new structure", async ({ request }) => {
    const res = await request.get("/producti78", { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    expect(res.headers()["location"]).toContain("/en/products/scutched-flax");
});

test("casino spam URLs die with 410 Gone", async ({ request }) => {
    const res = await request.get("/some-online-casino-bonus-page", { maxRedirects: 0 });
    expect(res.status()).toBe(410);
});

test("robots.txt welcomes Baiduspider", async ({ request }) => {
    const res = await request.get("/robots.txt");
    const body = await res.text();
    expect(body).toContain("Allow: /");
    expect(body).not.toContain("Baiduspider\nDisallow");
});

test("sitemap lists products and articles", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    expect(body).toContain("/en/products/cottonised-flax");
    expect(body).toContain("/en/blog/scutched-vs-hackled-flax");
});

test("RFQ form submits", async ({ page }) => {
    await page.goto("/en/contact");
    await page.locator('input[name="name"]').fill("Playwright Buyer");
    await page.locator('input[name="email"]').fill("qa@example.com");
    await page.locator('textarea[name="message"]').fill("Trial order — 2 tonnes scutched Grade A to Antwerp.");
    await page.getByRole("button", { name: /Send inquiry/i }).click();
    await expect(page.locator(".form-ok")).toBeVisible();
});
