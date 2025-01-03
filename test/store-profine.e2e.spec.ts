import { test, expect } from "@playwright/test";

test("update profile success", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByText("Perfil da loja").click();
  await page.getByLabel("Nome").fill("Pizza Shop 2");
  await page.getByLabel("Descrição").fill("minha pizza favorita");
  await page.getByRole("button", { name: "Salvar" }).click();

  const toast = page.getByText("Informações atualizadas com");

  expect(toast).toBeVisible();

  expect(page.getByRole("button", { name: "Pizza Shop" })).toBeVisible();

  await page.waitForTimeout(3000);
});
