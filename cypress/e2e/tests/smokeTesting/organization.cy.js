/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Common from "../../pageObjects/common";
import Organization from "../../pageObjects/organization";


describe(Cypress.env('testEnv') + ' - Organization suite', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const adminUser = users[Cypress.env('testEnv')].admin;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const organizationName = "Mark QA Organization1";

  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it.skip('As super admin user, should be able to create new organization \n As super admin user, should be able to update organization', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Organizations");
    Common.verifyBreadCrumbs("Organizations");
    Organization.createOrganization(organizationName, "This is for QA Automation");
    Organization.searchOrganization(organizationName);
    Organization.editOrganizationDetails("-Edited", "Mark QA", "Software & Technology");
  });

  it('As super admin user, should be able to add domain', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.searchOrganization(organizationName);
    Organization.addDomainOrganization("invalid", "qatesting.net{enter}");
    TopNavBar.clickProfileMenuByText("Log Out");
  });

  it('As super admin user, should be able to delete whitelist domain', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.searchOrganization(organizationName);
    Organization.deleteWhitelistDomain();
    TopNavBar.clickProfileMenuByText("Log Out");
  });

  it('As super admin user, should be able to invite user', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.searchOrganization(organizationName);
    Organization.inviteUserOrganization("qainvite@yopmail.com", "admin", true);
  });

  it('As admin user, should be able to invite user', () => {
    Login.validLogin(adminUser);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.searchOrganization(organizationName);
    Organization.inviteUserOrganization("qainvite123@yopmail.com", "standard", true);
    TopNavBar.clickProfileMenuByText("Log Out");
  });

  it('As super admin user, should be able to Search Organization', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.searchOrganization(organizationName);
    Organization.verifyOrgSearchResult();
    TopNavBar.clickProfileMenuByText("Log Out");
  });

  it('As admin user, should be able to Search Organization', () => {
    Login.validLogin(adminUser);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.searchOrganization(organizationName);
    Organization.verifyOrgSearchResult();
    TopNavBar.clickProfileMenuByText("Log Out");
  });
  
  it('As super admin user, organization table row should contain (Name, ID, Created by, Domains, Users, Edit, View) ', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.verifyOrgRows();
    TopNavBar.clickProfileMenuByText("Log Out");
  });

  it('As admin user, organization table row should contain (Name, ID, Created by, Domains, Users, Edit, View) ', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.verifyOrgRows();
    TopNavBar.clickProfileMenuByText("Log Out");
  });

  it('As super admin user, should be able to click action button (edit).', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.searchOrganization(organizationName);
    Organization.organizationEdit();
    TopNavBar.clickProfileMenuByText("Log Out");
  });

  it('As admin user, should be able to click action button (edit).', () => {
    Login.validLogin(adminUser);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.searchOrganization(organizationName);
    Organization.organizationEdit();
    TopNavBar.clickProfileMenuByText("Log Out");
  }); 

  it('As super admin user, should be able to go back and next organization pages', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.backNextOrgScroll();
    Organization.clickNextButton();
    Organization.backNextOrgScroll();
    Organization.verifyNextPage();
    Organization.clickPreviousButton();
    Organization.backNextOrgScroll();
    Organization.verifyPreviousButton();
    TopNavBar.clickProfileMenuByText("Log Out");
  });

  //admin account does not have that many org or over 15 org for it to have previous and next button
  //will skip for now
  it.skip('As admin user, should be able to go back and next organization pages', () => {
    Login.validLogin(adminUser);
    TopNavBar.clickProfileMenuByText("Organizations");
    Organization.backNextOrgScroll();
    Organization.clickNextButton();
    Organization.backNextOrgScroll();
    Organization.clickPreviousButton();
    Organization.verifyPreviousButton();
  });
  
});