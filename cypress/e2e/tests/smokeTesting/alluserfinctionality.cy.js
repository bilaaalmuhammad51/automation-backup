/// <reference types="cypress" />
import users from"../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import UserFunctionalities from "../../pageObjects/alluserfunctionality";
import TopNavBar from "../../pageObjects/topNavBar";


describe(Cypress.env('testEnv') + ' - All user Functionality', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const admin = users[Cypress.env('testEnv')].admin;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const organizationNameSelected = "Mark QA Organization1";
  const emailname = "testingmdinvi1@yopmail.com";
  const emailname1 = "testingmdinvi2@marketscale.com";
  const emailname2 = "testingmdinvi3@yopmail.com";
  const emailname3 = "testingmdinvi4@yopmail.com";
  const emailname4 = "testingmdinvi5@yopmail.com";
  const emailname5 = "testingmdinvi6@yopmail.com";
  const firstname = "marktest";
  const lastname = "testingmd";
  const password = "Testing!23$";
  const companyname = "new testing company1";
  const jobtitle = "new job testing";
  const newfirstname = "newtestingfirstname";

  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As super admin user, should be able to invite users (single email)', () => {
    Login.validLogin(superAdmin);
    UserFunctionalities.inviteusersinglemail(emailname);

  });

  it('As super admin user, should be able to invite users (multiple emails on invites)', () => {
    Login.validLogin(superAdmin);
    UserFunctionalities.inviteusermultiplemail(emailname,emailname1,emailname2);

  });

  it('As super admin user, should be able to invite a new Standard user role', () => {
    Login.validLogin(superAdmin);
    UserFunctionalities.inviteusersinglemail(emailname3);

  });

  it('As super admin user, should be able to upload CSV for Standard and Contributor', () => {
    Login.validLogin(superAdmin);
    UserFunctionalities.createstandardandcontributor(emailname4,emailname5);

  });

  it('As super admin user, should be able to invite a new Contributors user role', () => {
    Login.validLogin(superAdmin);
    UserFunctionalities.createcontributoruser(emailname4);

  });

  it('As admin, should be able to invite users (single email)', () => {
    Login.validLogin(admin);
    UserFunctionalities.inviteusersinglemail(emailname);

  });

  it('As admin should be able to invite users (multiple emails on invites)', () => {
    Login.validLogin(admin);
    UserFunctionalities.inviteusermultiplemail(emailname,emailname1,emailname2);

  });

  it('As admin, should be able to invite a new Standard user role', () => {
    Login.validLogin(admin);
    UserFunctionalities.inviteusersinglemail(emailname3);

  });

  it('As admin, should be able to upload CSV for Standard and Contributor', () => {
    Login.validLogin(admin);
    UserFunctionalities.createstandardandcontributor(emailname4,emailname5);

  });

  it('As admin user, should be able to invite a new Contributors user role', () => {
    Login.validLogin(admin);
    UserFunctionalities.createcontributoruser(emailname4);

  });
  
  it('As super admin user, should be able to create new user with User Role', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.createuserrole(firstname,lastname,emailname,password,companyname,jobtitle);

  });

  it('As super admin user, should be able to create new user with MS Admin Role', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.createmsadminrole(firstname,lastname,emailname1,password,companyname,jobtitle);

  });

  it('As admin user, should be able to create new user with User Role', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.createuserrole(firstname,lastname,emailname2,password,companyname,jobtitle);

  });

  it('As super admin user, should be able to create new user with User Role (Expert Thought Leader enabled)', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.createuserwithexpertleader(firstname,lastname,emailname3,password,companyname,jobtitle);

  });

  it('As super admin user, should be able to create new user with MarketScale Admin Role (Expert Thought Leader enabled)', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.createmsdadminwithexpertleader(firstname,lastname,emailname3,password,companyname,jobtitle);

  });

  it('As admin user, should be able to create new user User Role (Expert Thought Leader enabled)', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.createuserwithexpertleader(firstname,lastname,emailname3,password,companyname,jobtitle);

  });

  it('As super admin user, should be able to search users', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.createscriptsearchuser(emailname);

  });

  it('As admin user, should be able to search users', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.createscriptsearchuser(emailname);

  });

  it('As super admin user, should be able to sort users by all columns', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.sortingallcol(organizationNameSelected);

  });

  it('As admin user, should be able to sort users by all columns', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.sortingallcoladminuser(organizationNameSelected);

  });
  
  it('As super admin user, should be able to show all users (10 rows per page)', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Users");

  });

  it('As admin user, should be able to show only organization admin users', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.sortingorganization(organizationNameSelected);

  });

  // it('As super admin user, should be able to click action button (edit)', () => {
  //   Login.validLogin(superAdmin);
  //   TopNavBar.clickProfileMenuByText("Users");
  //   UserFunctionalities.clickeditingicon(newfirstname);
  // });

  // it('As admin user, should be able to click action button (edit)', () => {
  //   Login.validLogin(admin);
  //   TopNavBar.clickProfileMenuByText("Users");
  //   UserFunctionalities.clickeditingicon(newfirstname);

  // });

  it('As super admin user, should be able to go back and next user pages', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.clickingnextandprevbtn();

  });

  it('As admin user, should be able to go back and next user pages', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.clickingnextandprevbtn();

  });

  it('As admin user, should be able to edit role', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.clickeditingicon(newfirstname);

  });

  it('As admin user, should be able to sort account status', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Users");
    UserFunctionalities.clickeditingicon(newfirstname);

  });



  







});