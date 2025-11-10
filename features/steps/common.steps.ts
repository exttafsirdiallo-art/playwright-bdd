// features/steps/common.steps.ts
import { Given } from "@cucumber/cucumber";
import type { PwWorld } from "../../support/world";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "https://automationexercise.com";

// Filet de sécurité : garantit qu'on a une page, même si hooks/world n'ont pas initialisé
async function ensurePage(world: PwWorld) {
  if (world.page) return world.page;

  // crée un browser/page minimal au cas où (headed si HEADLESS=false)
  const headless = (process.env.HEADLESS ?? "true").toLowerCase() !== "false";
  const browser = await chromium.launch({ headless });
  const context = await browser.newContext();
  const page = await context.newPage();

  // attache au world (et marque qu'on possède ces objets)
  world.browser = browser;
  world.context = context;
  world.page = page;
  // @ts-ignore
  world.__ownsBrowser = true;

  return page;
}

Given("I navigate to the home page", async function (this: PwWorld) {
  const page = await ensurePage(this);
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

  // tente de fermer rapidement les éventuelles bannières de consentement
  await page
    .locator('button:has-text("OK")')
    .click({ timeout: 1000 })
    .catch(() => {});
  await page
    .locator(
      'button.fc-button.fc-cta-consent[aria-label="Autoriser"], button.fc-button.fc-cta-consent:has-text("Autoriser")'
    )
    .click({ timeout: 1000 })
    .catch(() => {});
});
