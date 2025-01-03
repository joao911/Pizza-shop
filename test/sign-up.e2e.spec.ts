import { test, expect } from "@playwright/test";

test("navigate to login page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Ir para login" }).click();
  expect(page.url()).toContain("/login");
  await page.waitForTimeout(5000);
});

test("create a new restaurant", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("Nome do restaurante").fill("Pizza Shop");
  await page.getByPlaceholder("Seu nome").fill("João Paulo Duarte");
  await page.getByPlaceholder("Seu telefone").fill("11970154082");
  await page.getByLabel("Email").fill("joaopaulolacerda911@gmail.com");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();
  const toast = page.getByText("Cadastrado com sucesso");

  expect(toast).toBeVisible();
  await page.waitForTimeout(5000);
});

test("error creating new restaurant", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByLabel("Nome do restaurante")
    .fill("Pizza da esquina da cidade");
  await page.getByPlaceholder("Seu nome").fill("João Paulo Duarte");
  await page.getByPlaceholder("Seu telefone").fill("11970154082");
  await page.getByLabel("Email").fill("joaopaulolacerda911@gmail.com");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();
  const toast = page.getByText("Erro ao cadastrar");

  expect(toast).toBeVisible();
  await page.waitForTimeout(5000);
});
