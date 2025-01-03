import { test, expect } from "@playwright/test";

test("display  orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  expect(
    page.getByRole("cell", { name: "order-1", exact: true }),
  ).toBeVisible();
  expect(page.getByRole("cell", { name: "order-10" })).toBeVisible();

  await page.waitForTimeout(3000);
});

test("display  filtered orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await page.getByPlaceholder("ID do pedido").fill("order-1");
  await page.getByRole("button", { name: "Filtrar" }).click();
  await page.getByRole("button", { name: "Remover filtros" }).click();

  await page.waitForTimeout(16000);
});
