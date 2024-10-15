import Login from "../../e2e/pageObjects/login"
class TopNavBar {
  constructor() {
    this.profileAvatar = "button[role='button']  img.c-avatar__img";
    this.profileDropdownMenu = ".c-navbar__menu-item";
    this.actionButtonMenu = ".c-action-buttons__title";
    this.dashboardButton = ".ms-icon-home-new";
    this.actionButtonBar = ".c-action-buttons";
    this.organizationTab = "li:nth-of-type(2) > div:nth-of-type(2)";
    this.organizationSelect = "li > .c-navbar__companies-item > .c-navbar__companies-item-name.mx-2.text-capitalize.text-start";
    this.brandbooks = "li:nth-of-type(4) > a:nth-of-type(3)";
    this.userstab = "li:nth-of-type(3) > a:nth-of-type(2)";
    this.usertabasadmin = "li:nth-of-type(4) > a:nth-of-type(1)";
    this.emaildom1 = "li:nth-of-type(3) > a:nth-of-type(1)";
    this.viewprofilebtn = ".c-navbar__profile-btn";
    this.grouppagetab = "li:nth-of-type(6) > a:nth-of-type(2)";
    this.goToFeedButton = ".c-app-logo__logo-big";

  }

  clickProfileAvatar() {
    cy.get(this.profileAvatar).click({force: true});
    cy.wait(3000);
  }

  clickProfileMenuByText(menu) {
    cy.wait(5000);
    this.clickProfileAvatar({timeout: 5000});
    cy.get(this.profileDropdownMenu).contains(menu).scrollIntoView().click({force: true});
    cy.wait(3000);
    if(menu == "Logout"){
      cy.get(Login.loginCard, {timeout: 180000}).should("be.visible");
    }
  }

  clickActionButtonMenuByText(actionName) {
    cy.get(this.actionButtonMenu).contains(actionName).click({force: true});
    cy.wait(3000);
  }

  selectingOrganization(organizationName) {
      this.clickProfileAvatar();
      cy.get(this.organizationTab).click({force:true});
      cy.get(this.organizationSelect).contains(organizationName).click({force:true});
  }

  // selectbrandbooks() {
  //   this.clickProfileAvatar();
  //   cy.get(this.brandbooks).contains('Brand Books').click({force:true});
  // }

  selectandviewprofile() {
    this.clickProfileAvatar();
    cy.get(this.viewprofilebtn).click();
  }

  // selectemaildomain ()
  // {
  //   this.clickProfileAvatar();
  //   cy.get(this.emaildom1).click();

  // }

  // selectgroups()
  // {
  //   this.clickProfileAvatar();
  //   cy.get(this.grouppagetab).click({force:true});

  // }


  clickDashboard(){
    cy.get(this.dashboardButton).click({force:true});
    cy.wait(20000);
    cy.get(this.actionButtonBar, {timeout: 120000}).should("be.visible");
  }
}

export default new TopNavBar;