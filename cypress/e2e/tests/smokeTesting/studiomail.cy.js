/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import StudioMail from "../../pageObjects/studiomail";
import Common from "../../pageObjects/common"

describe(Cypress.env('testEnv') + ' - Studio Mail suite', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const admin = users[Cypress.env('testEnv')].admin;
  const standard = users[Cypress.env('testEnv')].standard;
  const contributor = users[Cypress.env('testEnv')].contributor;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const organizationNameSelected = "Mark QA Organization1";
  const filesToUpload1= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
  ];

  // const fileMultiUser = [
  //   {path: 'sandbox-unverified-org-admins.xlsx', type: 'doc/xlsx'},
  // ];

  beforeEach(() => {
    cy.visit(urlLogin);
  });

    let subjectname = "New test subject for testing";
    let subjectname1 = "Test subject is now edited!";
    let recipientname = "MarkQA Standard";
    let recipientname1 = "MarkQA Admin";
    let recipientname2 = "MarkQA Contributor";
    let descriptioncontent = "For testing upload only";
    
  it.only('As super admin user, should be able to send StudioMail', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("StudioMail");
    StudioMail.sendingEmailByUpload(subjectname, recipientname1, filesToUpload1, descriptioncontent);
  });

  it('As admin user, should be able to send StudioMail', () => {
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("StudioMail");
    StudioMail.sendingEmailByUpload(subjectname, recipientname, filesToUpload1, descriptioncontent);
  });

  it('As standard user, should be able to send StudioMail', () => {
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("StudioMail");
    StudioMail.sendingEmailByUpload(subjectname, recipientname1, filesToUpload1, descriptioncontent);
  });

  it('As contributor user, should be able to send StudioMail', () => {
    Login.validLogin(contributor);
    TopNavBar.clickActionButtonMenuByText("StudioMail");
    StudioMail.sendingEmailByUpload(subjectname, recipientname1, filesToUpload1, descriptioncontent);
  });

  it('As user, should be able to send StudioMail (single email)', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("StudioMail");
    StudioMail.sendingEmailByUpload(subjectname, recipientname1, filesToUpload1, descriptioncontent);
  });

  it('As user, should be able to send StudioMail (multiple emails)', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("StudioMail");
    StudioMail.sendingMultipleEmails(subjectname, recipientname, recipientname1, recipientname2, filesToUpload1, descriptioncontent);
  });

  it('As user, should be able to save StudioMail as drafts', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("StudioMail");
    StudioMail.savingEmailsOnDrafts(subjectname, recipientname2, filesToUpload1, descriptioncontent);
  });

  it('As user, should be able to edit drafts on StudioMail', () => {
    subjectname = subjectname + "-" + Common.getUTCDateTime();
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("StudioMail");
    StudioMail.savingEmailsOnDrafts(subjectname, recipientname2, filesToUpload1, descriptioncontent);
    StudioMail.editingDraftsEmails(subjectname, recipientname2, recipientname1, subjectname1);
  });

  it('As user, should be able to send Studiomail from drafts', () => {
    subjectname = subjectname + "-" + Common.getUTCDateTime();
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("StudioMail");
    StudioMail.savingEmailsOnDrafts(subjectname, recipientname2, filesToUpload1, descriptioncontent);
    StudioMail.sendingEmailsFromDrafts(subjectname);
  });

  // it('As user, should be able to upload csv files)', () => {
  //   Login.validLogin(superAdmin);
  //   TopNavBar.clickActionButtonMenuByText("StudioMail");
  //   StudioMail.inputTitlesDescriptionStud(subjectname);
  //   StudioMail.uploadRecipientsCSV(fileMultiUser,descriptioncontent)
  // });

});