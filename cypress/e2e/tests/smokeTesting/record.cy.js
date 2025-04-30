/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Common from "../../pageObjects/common";
import Record from "../../pageObjects/record";
import ApprovalQueue from "../../pageObjects/approvalQueue";
import DashboardFeed from "../../pageObjects/dashboardFeed";
import { isPermissionAllowed } from 'cypress-browser-permissions';

describe(Cypress.env('testEnv') + ' - Record Core suite', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const admin = users[Cypress.env('testEnv')].admin;
  const standard = users[Cypress.env('testEnv')].standard;
  const contributor = users[Cypress.env('testEnv')].contributor;
  const msadmin = users[Cypress.env('testEnv')].MSAdmin;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
  const dateTime = Common.getUTCDateTime();
  const organizationNameSelected = "Mark QA Organization1";


  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As super admin user, should be able to record video with audio', () => {
    let recordMediaTitle = "Automation Record Media - " + dateTime;
    let recordMediaNotes = "Automation Testing Notes";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Record");
    Record.createRecordMediaForSA(true, true, "Original", recordMediaTitle, recordMediaNotes, admin.name, "MyOrganization", false);
    Record.verifyRecordConfirmation(admin.name, recordMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, recordMediaTitle);
    ApprovalQueue.mediaApproveClick(recordMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, recordMediaTitle);
  });

  it('As admin user, should be able to record video with no audio while on virtual background', () => {
    let recordMediaTitle = "Automation Record Media - No Audio + Virtual BG - " + dateTime;
    let recordMediaNotes = "Automation Testing Notes - No Audio with Virtual Background";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Record");
    Record.createRecordMedia(false, undefined, "Studio", recordMediaTitle, recordMediaNotes, superAdmin.name, "MyOrganization", false);
    Record.verifyRecordConfirmation(superAdmin.name, recordMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(admin.name, recordMediaTitle);
    ApprovalQueue.mediaApproveClick(recordMediaTitle);
    TopNavBar.clickDashboard();
    //let recordMediaTitle =  "Automation Record Media - No Audio + Virtual BG - 02-18-2024 6:40 AM";
    DashboardFeed.verifyMediaDashboardFeed(admin.name, recordMediaTitle);
  });

  it('As standard user, should be able to record video with audio while on virtual background', () => {
    let recordMediaTitle = "Automation Record Media - Audio + Virtual BG - " + dateTime;
    let recordMediaNotes = "Automation Testing Notes - Audio with Virtual Background";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Record");
    Record.createRecordMediaForSA(true, true, "Studio", recordMediaTitle, recordMediaNotes, admin.name, "MyOrganization", false);
    Record.verifyRecordConfirmation(admin.name, recordMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, recordMediaTitle);
    ApprovalQueue.mediaApproveClick(recordMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(standard.name, recordMediaTitle);
  });

  //bug on (Contributor)
  it.skip('As contributor user, should be able to record with audio only', () => {
    let recordMediaTitle = "Automation Record Media - Audio only - " + dateTime;
    let recordMediaNotes = "Automation Testing Notes - Audio only";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true
    Login.validLogin(contributor);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Record");
    Record.createRecordMedia(true, false, "Original", recordMediaTitle, recordMediaNotes, superAdmin.name, "MyOrganization", false);
    Record.verifyRecordConfirmation(superAdmin.name, recordMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(contributor.name, recordMediaTitle);
    ApprovalQueue.mediaApproveClick(recordMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(contributor.name, recordMediaTitle);
  });

  it('As user, verify able to choose microphone devices', () => {
    let recordMediaTitle = "Automation Record Media - Audio Input 2 " + dateTime;
    let recordMediaNotes = "Automation Testing Notes - Audio Input 2";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Record");
    Record.createRecordMediaForSA("Fake Audio Input 2", true, "Original", recordMediaTitle, recordMediaNotes, admin.name, "MyOrganization", false);
    Record.verifyRecordConfirmation(admin.name, recordMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, recordMediaTitle);
    ApprovalQueue.mediaApproveClick(recordMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(standard.name, recordMediaTitle);
  });

  it('As user, verify able to choose camera devices', () => {
    let recordMediaTitle = "Automation Record Media-Fake Camera " + dateTime;
    let recordMediaNotes = "Automation Testing Notes - Fake Camera 0";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Record");
    Record.createRecordMedia("Fake Audio Input 2", "Fake Device", "Original", recordMediaTitle, recordMediaNotes, superAdmin.name, "MyOrganization", false);
    Record.verifyRecordConfirmation(superAdmin.name, recordMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, recordMediaTitle);
    ApprovalQueue.mediaApproveClick(recordMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(standard.name, recordMediaTitle);
  });

  it('As user, verify if the approver is automatically selected as "Me"', () => {
    let recordMediaTitle = "Automation Record Media - " + dateTime;
    let recordMediaNotes = "Automation Testing Notes";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Record");
    Record.createRecordMediaForSA(true, true, "Original", recordMediaTitle, recordMediaNotes, admin.name, "MyOrganization", true);
    Record.verifyRecordConfirmation(admin.name, recordMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, recordMediaTitle);
    ApprovalQueue.mediaApproveClick(recordMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(standard.name, recordMediaTitle);
  });
});