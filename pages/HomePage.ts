import { Page } from "playwright";

export class HomePage {
  constructor(private page: Page) {}

  async open(baseURL: string) {
    await this.page.goto(baseURL);
  }

  logo() {
    return this.page.locator('img[alt="Website for automation practice"]');
  }
  // 👉 lien "Signup / Login" dans le header
  signupLoginLink() {
    return this.page.getByRole("link", { name: /signup \/ login/i });
  }

  async goToSignupLogin() {
    await this.signupLoginLink().click();
  }
}
