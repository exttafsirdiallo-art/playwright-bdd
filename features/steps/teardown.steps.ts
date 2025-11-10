import { Then } from "@cucumber/cucumber";
import type { PwWorld } from "../../support/world";

Then("I close the browser", async function (this: PwWorld) {
  // ferme la page + contexte (si présents)
  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});

  // ferme un navigateur “ad hoc” éventuellement ouvert par ensurePage()
  if (this.browser) {
    await this.browser.close().catch(() => {});
    this.browser = undefined;
  }
});
