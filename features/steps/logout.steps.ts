// features/steps/logout.steps.ts
import { When } from "@cucumber/cucumber";
import type { PwWorld } from "../../support/world";

When("I logout", async function (this: PwWorld) {
  const page = this.page!;
  const logoutLink = page.getByRole("link", { name: /logout/i }).first();

  await logoutLink.waitFor({ state: "visible", timeout: 20000 });
  await logoutLink.click({ timeout: 20000 });

  // Retour attendu sur la page de login
  await page.waitForLoadState("domcontentloaded");
  await page.waitForURL("**/login", { timeout: 20000 }).catch(() => {});
});
