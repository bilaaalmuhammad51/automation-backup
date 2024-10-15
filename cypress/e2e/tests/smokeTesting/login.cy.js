/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import login from "../../pageObjects/login";

describe(Cypress.env('testEnv') + ' - Login Suite', () => {

  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const userAdmin = users[Cypress.env('testEnv')].admin
  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('Should be able to login as admin', () => {
    const user = users[Cypress.env('testEnv')].admin
    login.validLogin(user);
  });

  it('Should be able to login as standard', () => {
    const user = users[Cypress.env('testEnv')].standard
    login.validLogin(user);
  });

  it('Should be able to login as contributor', () => {
    const user = users[Cypress.env('testEnv')].contributor
    login.validLogin(user);
  });

  it('Should be able to show field validation error for required field - email', () => {
    const errMessage = "Missing email address: Please enter your email address."
    login.validationLogin(undefined, userAdmin.password, errMessage);
  });

  it('Should be able to show field validation error for required field - password', () => {
    const errMessage = "Missing password: Please enter your password to log in. If you've forgotten your password, you can reset it here."
    login.validationLogin(userAdmin.email, undefined, errMessage);
  });

  //skipped till found a solution to get the tooltip validation message
  it.skip('should be able to show field validation error for incorrect email format', () => {
    const errMessage = "Please include an \'@\' in the email address";
    login.invalidEmailFormatLogin("invalidEmail", errMessage);
  });

  it('Should be able to show field validation error for incorrect password', () => {
    const errMessage = "These credentials do not match our records."
    login.validationLogin(userAdmin.email, userAdmin.password + "z", errMessage);
  });

  it('Should be able to show field validation error for non existing user', () => {
    const errMessage = "Email address not found: The email address you entered is not registered in our system. Please double-check your email address or reach your organization admin."
    login.validationLogin('notregistered@yopmail.com', userAdmin.password, errMessage);
  });
  
})