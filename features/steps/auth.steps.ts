import { When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import type { PwWorld } from "../../support/world";
import { HomePage } from "../../pages/HomePage";

When("I go to Signup Login", async function (this: PwWorld) {
  const home = new HomePage(this.page!);
  await home.goToSignupLogin();
});

Then("I should see the login form", async function (this: PwWorld) {
  // Titre "Login to your account"
  await expect(
    this.page!.getByRole("heading", { name: /login to your account/i })
  ).toBeVisible();
  // Champ email + bouton Login visibles
  await expect(
    this.page!.getByRole("textbox", { name: /email address/i })
  ).toBeVisible();
  await expect(
    this.page!.getByRole("button", { name: /^login$/i })
  ).toBeVisible();
});
