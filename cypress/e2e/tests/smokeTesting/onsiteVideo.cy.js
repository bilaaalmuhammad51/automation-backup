import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import OnsiteVideo from "../../pageObjects/onsiteVideo";

describe(Cypress.env('testEnv') + ' - Brand Books Core suite', () => {
    const superAdmin = users[Cypress.env('testEnv')].superAdmin;
    const urlLogin = users[Cypress.env('testEnv')].url + "login";
    const organizationNameSelected = "Mark QA Organization1";

    beforeEach(() => {
        cy.visit(urlLogin);
      });

      it('As a user, should be able to select Video Production as Event', () => {
        Login.validLogin(superAdmin);
        TopNavBar.selectingOrganization(organizationNameSelected);
        TopNavBar.clickActionButtonMenuByText("Onsite Video");
        OnsiteVideo.selectEvent();
      });

      it('As a user, should be able to select Video Production as Facility Tour', () => {
        Login.validLogin(superAdmin);
        TopNavBar.selectingOrganization(organizationNameSelected);
        TopNavBar.clickProfileMenuByText("Onsite Video");
      });

      it('As a user, should be able to select Video Production as Product Video', () => {
        Login.validLogin(superAdmin);
        TopNavBar.selectingOrganization(organizationNameSelected);
        TopNavBar.clickProfileMenuByText("Onsite Video");
      });

      it('As a user, should be able to select Video Production as Online Learning', () => {
        Login.validLogin(superAdmin);
        TopNavBar.selectingOrganization(organizationNameSelected);
        TopNavBar.clickProfileMenuByText("Onsite Video");
      });

      it('As a user, should be able to select Video Production as Testimonial', () => {
        Login.validLogin(superAdmin);
        TopNavBar.selectingOrganization(organizationNameSelected);
        TopNavBar.clickProfileMenuByText("Onsite Video");
      });

      it('As a user, should be able to select Video Production as Case Study', () => {
        Login.validLogin(superAdmin);
        TopNavBar.selectingOrganization(organizationNameSelected);
        TopNavBar.clickProfileMenuByText("Onsite Video");
      });

      it('As a user, should be able to select Video Production as Culture & Recruiting', () => {
        Login.validLogin(superAdmin);
        TopNavBar.selectingOrganization(organizationNameSelected);
        TopNavBar.clickProfileMenuByText("Onsite Video");
      });

      it('As a user, should be able to select Video Production as Announcement', () => {
        Login.validLogin(superAdmin);
        TopNavBar.selectingOrganization(organizationNameSelected);
        TopNavBar.clickProfileMenuByText("Onsite Video");
      });

});