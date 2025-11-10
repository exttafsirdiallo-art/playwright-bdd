import { When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import type { PwWorld } from "../../support/world";

import userData from "../../data/users.json";
import {
  email,
  motDePasse,
  prenom,
  nom,
  address,
  city,
  state,
  zipCode,
  phone,
} from "../../data/faker-data";

const u1 = userData.newUser; // ex: { country: "Canada" }

// ---------- HOME ----------
Then("I should see the home page loaded", async function (this: PwWorld) {
  const page = this.page!;
  await expect(
    page.locator('img[alt="Website for automation practice"]')
  ).toBeVisible();
});

// ---------- CLICK (générique) ----------
When("I click on {string}", async function (this: PwWorld, label: string) {
  const page = this.page!;
  const normalized = label.replace(/\\\//g, "/").trim().toLowerCase();

  if (normalized === "signup / login") {
    const link = page.locator('a[href="/login"]');
    await link.first().waitFor({ state: "visible", timeout: 15000 });
    await link.first().click();
    await page.waitForURL("**/login", { timeout: 15000 });
    return;
  }

  if (normalized === "create account") {
    await page.click('[data-qa="create-account"]');
    return;
  }

  if (normalized === "delete account") {
    await page.getByRole("link", { name: /delete account/i }).click();
    return;
  }

  // Fallbacks génériques
  const byButton = page.getByRole("button", { name: new RegExp(label, "i") });
  if (
    await byButton
      .first()
      .isVisible()
      .catch(() => false)
  ) {
    await byButton.first().click();
    return;
  }
  const byLink = page.getByRole("link", { name: new RegExp(label, "i") });
  if (
    await byLink
      .first()
      .isVisible()
      .catch(() => false)
  ) {
    await byLink.first().click();
    return;
  }
  await page.getByText(new RegExp(label, "i")).first().click();
});

// ---------- ASSERT TEXT (générique) ----------
Then("I should see {string} text", async function (this: PwWorld, txt: string) {
  const page = this.page!;
  await expect(page.getByText(new RegExp(txt, "i"))).toBeVisible({
    timeout: 15000,
  });
});

// ---------- LOGIN FORM ----------
Then("I should see the login form", async function (this: PwWorld) {
  const page = this.page!;
  await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
});

// ---------- SIGNUP NAME + EMAIL ----------
When("I enter name and email address", async function (this: PwWorld) {
  const page = this.page!;
  await page.fill('[data-qa="signup-name"]', prenom);
  await page.fill('[data-qa="signup-email"]', email);
});

// ---------- SIGNUP BUTTON ----------
When('I click the "Signup" button', async function (this: PwWorld) {
  const page = this.page!;
  await page.click('[data-qa="signup-button"]');
});

// ---------- ACCOUNT INFO ----------
When("I fill in account information", async function (this: PwWorld) {
  const page = this.page!;
  await page
    .locator("#id_gender2")
    .check()
    .catch(() => {});
  await page.fill("#password", motDePasse);
});

// ---------- NEWSLETTERS ----------
When("I select newsletters options", async function (this: PwWorld) {
  const page = this.page!;
  await page
    .locator("#newsletter")
    .check()
    .catch(() => {});
  await page
    .locator("#optin")
    .check()
    .catch(() => {});
});

// ---------- ADDRESS DETAILS ----------
When("I fill in address details", async function (this: PwWorld) {
  const page = this.page!;
  await page.fill('[data-qa="first_name"]', prenom);
  await page.fill('[data-qa="last_name"]', nom);
  await page.fill('[data-qa="address"]', address);
  await page.selectOption('[data-qa="country"]', { label: u1.country });
  await page.fill('[data-qa="state"]', state);
  await page.fill('[data-qa="city"]', city);
  await page.fill('[data-qa="zipcode"]', zipCode);
  await page.fill('[data-qa="mobile_number"]', phone);
});

// ---------- CONTINUE ----------
When(
  'I click "Continue" after account creation',
  async function (this: PwWorld) {
    const page = this.page!;
    await page.click('[data-qa="continue-button"]');
  }
);

// ---------- LOGGED IN AS ----------
Then('I should see "Logged in as username"', async function (this: PwWorld) {
  const page = this.page!;
  await expect(
    page.locator(`li:has-text("Logged in as ${prenom}")`)
  ).toBeVisible({ timeout: 15000 });
});

// ---------- ACCOUNT DELETED ----------
// ❌ SUPPRIMÉ: le step spécifique "I should see "ACCOUNT DELETED!" text"
// On utilise l'assertion générique: Then I should see "ACCOUNT DELETED!" text

// ---------- CONTINUE after deletion (pour la dernière ligne du .feature) ----------
When('I click "Continue" after deletion', async function (this: PwWorld) {
  const page = this.page!;
  await page.click('[data-qa="continue-button"]').catch(() => {});
});
