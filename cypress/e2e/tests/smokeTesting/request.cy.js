/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Common from "../../pageObjects/common";
import Request from "../../pageObjects/request";
//import ApprovalQueue from "./pageObjects/approvalQueue";
//import DashboardFeed from "./pageObjects/dashboardFeed"

describe(Cypress.env('testEnv') + ' - Request Core suite', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const adminUser = users[Cypress.env('testEnv')].admin;
  const standardUser = users[Cypress.env('testEnv')].standard;
  const contributorUser = users[Cypress.env('testEnv')].contributor;
  const expertUser = users[Cypress.env('testEnv')].expert;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const dateTime = Common.getUTCDateTime();
  const organizationNameSelected = "Mark QA Organization1";
  beforeEach(() => {
    cy.visit(urlLogin);
  });

    let requestQuestion = "What is the prompt/direction about? " + dateTime;
    let additionalNotesDirection = "What to do next?"
    let tags = "QA Automation Testing";
    let firstname = "MarkQA";
    let lastname = "QA Testing";
    let linkedin = "https://sandbox.studio.marketscale.com/dashboard";
    let relevantlinks = "https://sandbox.studio.marketscale.com/";

  it.only('As super admin user, should be able to request from Colleagues and Guests as request type', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Colleagues and Guests");
    Request.createRequest("ColleaguesAndGuest", expertUser.name, tags, requestQuestion, additionalNotesDirection, "MyOrganization");
    Common.verifyBreadCrumbs("Colleagues and Guests");
    Request.verifyRequestConfirmation(expertUser.name, superAdmin.name, requestQuestion, additionalNotesDirection);
  });

  it('As super admin user, should be able to request from Industry Experts as a request type', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createRequestOnExperts("IndustryExperts", expertUser.name, tags, requestQuestion, additionalNotesDirection,  "MyOrganization");
    Common.verifyBreadCrumbs("Industry Experts");
    Request.verifyRequestConfirmation(expertUser.name, superAdmin.name, requestQuestion, additionalNotesDirection);
  });

  it('As super admin user, should be able to request External Open Link as request type', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createExternalLinks("ExternalOpenLink", tags, additionalNotesDirection);
    Common.verifyBreadCrumbs("External Open Link");
    Request.verifyRequestExternalConfirmation(superAdmin.name, additionalNotesDirection);
  });

  it('As admin user, should be able to request from Colleagues and Guests as request type', () => {
    Login.validLogin(adminUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createRequest("ColleaguesAndGuest", expertUser.name, tags, requestQuestion, additionalNotesDirection,  "MyOrganization");
    Common.verifyBreadCrumbs("Colleagues and Guests");
    Request.verifyRequestConfirmation(expertUser.name, adminUser.name, requestQuestion, additionalNotesDirection);
  });

  it('As admin user, should be able to request from Industry Experts as a request type', () => {
    Login.validLogin(adminUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createRequestOnExperts("IndustryExperts", expertUser.name, tags, requestQuestion, additionalNotesDirection,  "MyOrganization");
    Common.verifyBreadCrumbs("Industry Experts");
    Request.verifyRequestConfirmation(expertUser.name, adminUser.name, requestQuestion, additionalNotesDirection);
  });

  it('As admin user, should be able to request External Open Link as request type', () => {
    Login.validLogin(adminUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createExternalLinks("ExternalOpenLink", tags, additionalNotesDirection);
    Common.verifyBreadCrumbs("External Open Link");
    Request.verifyRequestExternalConfirmation(adminUser.name, additionalNotesDirection);
  });

  it('As standard user, should be able to request from Colleagues and Guests as request type', () => {
    Login.validLogin(standardUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createRequest("ColleaguesAndGuest", expertUser.name, tags, requestQuestion, additionalNotesDirection,  "MyOrganization");
    Common.verifyBreadCrumbs("Colleagues and Guests");
    Request.verifyRequestConfirmation(expertUser.name, standardUser.name, requestQuestion, additionalNotesDirection);
  });

  it('As standard user, should be able to request from Industry Experts as a request type', () => {
    Login.validLogin(standardUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createRequestOnExperts("IndustryExperts", expertUser.name, tags, requestQuestion, additionalNotesDirection,  "MyOrganization");
    Common.verifyBreadCrumbs("Industry Experts");
    Request.verifyRequestConfirmation(expertUser.name, standardUser.name, requestQuestion, additionalNotesDirection);
  });

  it('As standard user, should be able to request External Open Link as request type', () => {
    Login.validLogin(standardUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createExternalLinks("ExternalOpenLink", tags, additionalNotesDirection);
    Common.verifyBreadCrumbs("External Open Link");
    Request.verifyRequestExternalConfirmation(standardUser.name, additionalNotesDirection);
  });

  it('As contributor user, should be able to request from Colleagues and Guests as request type', () => {
    Login.validLogin(contributorUser);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createRequest("ColleaguesAndGuest", expertUser.name, tags, requestQuestion, additionalNotesDirection,  "MyOrganization");
    Common.verifyBreadCrumbs("Colleagues and Guests");
    Request.verifyRequestConfirmation(expertUser.name, contributorUser.name, requestQuestion, additionalNotesDirection);
  });

  it('As contributor user, should be able to request from Industry Experts as a request type', () => {
    Login.validLogin(contributorUser);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createRequestOnExperts("IndustryExperts", expertUser.name, tags, requestQuestion, additionalNotesDirection,  "MyOrganization");
    Common.verifyBreadCrumbs("Industry Experts");
    Request.verifyRequestConfirmation(expertUser.name, contributorUser.name, requestQuestion, additionalNotesDirection);
  });

  it('As contributor user, should be able to request External Open Link as request type', () => {
    Login.validLogin(contributorUser);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createExternalLinks("ExternalOpenLink", tags, additionalNotesDirection);
    Common.verifyBreadCrumbs("External Open Link");
    Request.verifyRequestExternalConfirmation(contributorUser.name, additionalNotesDirection);
  });

  it('As a user, should be able to propose an Expert', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.proposeExpertOnIndustryExpert("IndustryExperts",firstname,lastname,linkedin,relevantlinks,additionalNotesDirection);

  });

  it('As a user, should be able to propose an Expert without providing LinkedIn, Relevant Links and Expert Message', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.proposeExpertWithoutLinkedInMessageAndRelevantLinks("IndustryExperts",firstname,lastname);
    Common.verifyBreadCrumbs("Industry Experts");
  });

});