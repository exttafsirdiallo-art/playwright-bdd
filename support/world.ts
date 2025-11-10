// features/support/world.ts
import {
  setWorldConstructor,
  setDefaultTimeout,
  World,
} from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "playwright";

setDefaultTimeout(60_000);

export class PwWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
}

setWorldConstructor(PwWorld);
