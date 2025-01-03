import { test, expect } from "@playwright/test";

test("display order in days, month and canceled orders", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("100").first()).toBeVisible();
  expect(page.getByText("+10% em relação mês passado")).toBeVisible();
  expect(page.getByText("100").nth(1)).toBeVisible();
  expect(page.getByText("+10% em relação a ontem")).toBeVisible();
  expect(page.getByText("100").nth(2)).toBeVisible();
  expect(page.getByText("+ 10% em relação mês passado")).toBeVisible();

  await page.waitForTimeout(3000);
});
