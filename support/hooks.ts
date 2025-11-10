// features/support/hooks.ts
import { After } from "@cucumber/cucumber";
import type { PwWorld } from "./world";

After(async function (this: PwWorld) {
  // Fermer la page/contexte si présents
  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});

  // Fermer le navigateur "de secours" ouvert par ensurePage()
  // (tu mets ce flag dans common.steps.ts via: (world as any).__ownsBrowser = true)
  // @ts-ignore
  if ((this as any).__ownsBrowser && this.browser) {
    await this.browser.close().catch(() => {});
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    // @ts-ignore
    (this as any).__ownsBrowser = undefined;
  }
});
