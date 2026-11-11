import { expect, test } from "@playwright/test";

test("dashboard loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);
  await expect(page.locator("body")).toBeVisible();
});
