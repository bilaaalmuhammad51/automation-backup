/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import Common from "../../pageObjects/common";
import Emaildomain from "../../pageObjects/emaildomain";
import TopNavBar from "../../pageObjects/topNavBar";


describe(Cypress.env('testEnv') + ' - Email Domain Testcase', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const admin = users[Cypress.env('testEnv')].admin;
  const standard = users[Cypress.env('testEnv')].standard;
  const contributor = users[Cypress.env('testEnv')].contributor;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
  const dateTime = Common.getUTCDateTime();
  const organizationNameSelected = "Mark QA Organization1";
  const name = "testing name for email domain";
  const domainname = "yopmail.com"


  const filesToUpload1= [
    { path: 'testingjpg2.jpg', type: 'JPEG/Image' },
  ];


  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As super admin user, should be able to create company (Public)', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Email Domain");
    Emaildomain.createpublicemail(name,domainname);
  });

  it('As super admin user, should be able to create company (Private)', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Email Domain");;
    Emaildomain.createprivateemail(name,domainname);
  });

  it('As super admin user, should be able to search email domains', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Email Domain");
    Emaildomain.searchemail(name,domainname);
  });

  it('As super admin user, should be able to sort by all columns', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Email Domain");
    Emaildomain.sortallcolumns();
  });

  it('As super admin user, should be able to show all domains (15 rows per page)', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Email Domain");
  });

  it('As super admin user, should be able to do actions (Edit, Deactivate)', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Email Domain");
    Emaildomain.editingemaildomaindeactivate(name);
  });

  it('As super admin user, should be able to go back and next domain pages', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Email Domain");
    Emaildomain.clickingnextandprevbtn();
  });

});