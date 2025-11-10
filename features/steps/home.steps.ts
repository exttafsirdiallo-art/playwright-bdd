console.log("✅ home.steps.ts loaded");

import { Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import type { PwWorld } from "../../support/world";
import { HomePage } from "../../pages/HomePage";

console.log("✅ home.steps.ts loaded");

Then("I should see the logo displayed", async function (this: PwWorld) {
  const home = new HomePage(this.page!);
  await expect(home.logo()).toBeVisible();
});
