// features/steps/login.ts
import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { PwWorld } from "../../support/world";
import userData from "../../data/users.json";
import { chromium } from "playwright";

// ---------- STEP 1 : remplir le formulaire ----------
When("I enter correct email and password", async function (this: PwWorld) {
  const page = this.page!;
  const u = (userData as any).newUser || {};

  if (!u.email || !u.password) {
    throw new Error(
      "❌ Missing credentials in data/users.json → newUser.email / newUser.password"
    );
  }

  const emailInput = page.locator('[data-qa="login-email"]');
  const pwdInput = page.locator('[data-qa="login-password"]');

  await emailInput.waitFor({ state: "visible", timeout: 10000 });
  await pwdInput.waitFor({ state: "visible", timeout: 10000 });

  await emailInput.fill(u.email);
  await pwdInput.fill(u.password);
});

// ---------- STEP 2 : vérifier que le login a réussi ----------
Then("I should be logged in", async function (this: PwWorld) {
  const page = this.page!;

  // Vérifie si un message d'erreur de login s'affiche
  const errorMsg = page.getByText(/your email or password is incorrect/i);
  if (await errorMsg.isVisible().catch(() => false)) {
    const txt = await errorMsg
      .first()
      .innerText()
      .catch(() => "");
    throw new Error(`Login failed: ${txt}`);
  }

  // Attendre que la page ait rechargé
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(300);

  // Vérifie le header "Logged in as"
  const loggedInBadge = page.locator('li:has-text("Logged in as")');
  const logoutLink = page.getByRole("link", { name: /logout/i });

  await expect(loggedInBadge).toBeVisible({ timeout: 15000 });
  await expect(logoutLink).toBeVisible({ timeout: 15000 });
});

// Pour le feature login  negatif
When(
  "I overwrite the password with {string}",
  async function (this: PwWorld, badPwd: string) {
    const page = this.page!;
    await page.locator('[data-qa="login-password"]').fill(badPwd);
  }
);
