class Login {
  constructor() {
    this.debugger = ".phpdebugbar-mini-design .phpdebugbar-restore-btn"
    this.emailInput = 'input#Email';
    this.passwordInput = 'input[type="password"]';
    this.logInButton = '.mt-4.s-login__btn';
    this.loginCard = '.s-login__card';
    this.userLoggedInCard = '.c-navbar__list';
    this.loginErrorText = '.c-input__invalid-feedback'
  }

  validLogin(user) {
    this.closeDebuggerBeforeLogin();
    //cy.get(this.loginCard).find(this.emailInput).should("be.visible")
    cy.get(this.loginCard, {timeout: 120000}).should("be.visible");
    cy.get(this.loginCard).find(this.emailInput).click({force: true});
    cy.get(this.loginCard).find(this.emailInput).clear({force: true});
    cy.get(this.loginCard).find(this.emailInput).type(user.email, {force: true});
    cy.get(this.loginCard).find(this.passwordInput).type(user.password, {force: true});
    cy.get(this.logInButton).click();
    cy.get(this.userLoggedInCard).should("exist");
    cy.url().should("contains", "/dashboard");
  }

  validationLogin(username="", password="", errorText) {
    if (username!="") {
      cy.get(this.loginCard).find(this.emailInput).type(username);
    }
    if (password!="") {
      cy.get(this.loginCard).find(this.passwordInput).type(password);
    }
    cy.get(this.logInButton).click();
    cy.get(this.loginCard).find(this.loginErrorText).should("exist");
    cy.get(this.loginCard).find(this.loginErrorText).should("have.text", errorText);
  }

  invalidEmailFormatLogin(username, errorText) {
    cy.get(this.loginCard).find(this.emailInput).type(username);
    cy.get(this.logInButton).click();
    cy.get(this.loginCard).find(this.emailInput).invoke('attr', 'setCustomValidity').should('contain', errorText);
  }

  closeDebuggerBeforeLogin() {
    cy.get("body").then($body => {
      if ($body.find(this.debugger).length > 0) {   
        cy.get(this.debugger).click( {force: true});
      }
    });
  }
}

export default new Login;