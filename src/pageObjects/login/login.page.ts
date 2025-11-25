import { BasePage } from '../basePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = 'Your email address';
  private readonly passwordInput = 'Your password';
  async addUsernameOrEmail(username: string): Promise<void> {
    await this.page.getByPlaceholder(this.usernameInput).fill(username);
  }

  async addPassword(password: string): Promise<void> {
    await this.page.getByPlaceholder(this.passwordInput).fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.click('button:has-text(\'Sign in\')');
  }

  async clickContinue(): Promise<void> {
    await this.click('button:has-text(\'Continue\')');
  }

  async selectOrganisation(organisation: string): Promise<void> {
    await this.page.getByRole('button', { name: organisation }).click({ force: true });
  }
}
