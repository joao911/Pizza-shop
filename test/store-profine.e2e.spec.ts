import { test, expect } from "@playwright/test";

test("sign is invalid", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Email").fill("j3eJp@examplesdsdrfsdf.com");
  await page.getByRole("button", { name: "Acessar painel" }).click();
  const toast = page.getByText("Credenciais inválidas");

  expect(toast).toBeVisible();
  await page.waitForTimeout(5000);
});
