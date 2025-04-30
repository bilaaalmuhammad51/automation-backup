/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Common from "../../pageObjects/common";
import Conversation from "../../pageObjects/conversation";
import ApprovalQueue from "../../pageObjects/approvalQueue";
import DashboardFeed from "../../pageObjects/dashboardFeed";
import { isPermissionAllowed } from 'cypress-browser-permissions';

describe(Cypress.env('testEnv') + ' - Conversation Core suite', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const adminUser = users[Cypress.env('testEnv')].admin;
  const standUser =  users[Cypress.env('testEnv')].standard;
  const contriUser = users[Cypress.env('testEnv')].contributor;
  const expertUser = users[Cypress.env('testEnv')].expert;
  const GuestUser = users[Cypress.env('testEnv')].guestuser;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
  const dateTime = Common.getUTCDateTime();
  const conversationSubject = "What is the subject about? " + dateTime;
  const organizationNameSelected = "Mark QA Organization1";

  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As super admin user, should be able to create new conversation room', () => {
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.createConversation(conversationSubject, superAdmin.name, adminUser.name, "MyOrganization");
    Conversation.verifyConversation(superAdmin.name, adminUser.name, conversationSubject);
    TopNavBar.clickProfileMenuByText("Log Out");
    //Common.visitByURL(urlLogin);
    Login.validLogin(adminUser)
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.verificationConversationRoom(conversationSubject);


  });

  it('As admin user, should be able to create new conversation room', () => {
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(adminUser);
    Common.verifyOrganization;
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.createConversation(conversationSubject, adminUser.name, superAdmin.name, "MyOrganization");
    Conversation.verifyConversation(adminUser.name, superAdmin.name, conversationSubject);
    TopNavBar.clickProfileMenuByText("Log Out");
    //Common.visitByURL(urlLogin);
    Login.validLogin(superAdmin);
    Common.verifyOrganization;
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.verificationConversationRoom(conversationSubject);
  });

  it('As standard user, should be able to create new conversation room', () => {
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(standUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.createConversation(conversationSubject, standUser.name, adminUser.name, "MyOrganization");
    Conversation.verifyConversation(standUser.name, adminUser.name, conversationSubject);
    TopNavBar.clickProfileMenuByText("Log Out");
    //Common.visitByURL(urlLogin);
    Login.validLogin(adminUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.verificationConversationRoom(conversationSubject);
  });

  it('As contributor user, should be able to create new conversation room', () => {
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(contriUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.createConversation(conversationSubject, contriUser.name, standUser.name, "MyOrganization");
    Conversation.verifyConversation(contriUser.name, standUser.name, conversationSubject);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(standUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.verificationConversationRoom(conversationSubject);
  });

  it('As user, should be able to resend invitation to other users', () => {
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;Login.validLogin(superAdmin);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.resendLinkTotheUser(conversationSubject);
  });

  it('As user, should be able to edit room', () => {
    let newconversationSubject = "New testing for editing conversation";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.editConversationRoom(conversationSubject,newconversationSubject);
  });

  it('As user, should be able to copy link to conversation', () => {
    let conversationSubject = "New testing for editing conversation";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.copyLinkConversation(conversationSubject);
  });

  it('As user, should be able to enter room using room card', () => {
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.createConversation(conversationSubject, superAdmin.name, adminUser.name, "MyOrganization");
    Conversation.verificationConversationRoom(conversationSubject);
    Conversation.enterConversationRoom(conversationSubject);
    Conversation.verifyConversationRoom();
  });

  it('As user, should be able to start video recording', () => {
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.createConversation(conversationSubject, superAdmin.name, adminUser.name, "MyOrganization");
    Conversation.verificationConversationRoom(conversationSubject);
    Conversation.enterConversationRoom(conversationSubject);
    Conversation.startRecordingVideo();
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyConversationApprove(superAdmin.name,conversationSubject);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyConversationDashboardFeed(superAdmin.name, conversationSubject);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(contriUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    DashboardFeed.verifyConversationDashboardFeedFalse(conversationSubject);
  });

  it('As user, should be able to start video recording with background and no audio', () => {
    let dateTime = Common.getUTCDateTime();
    let conversationSubject = "What is the subject about? " + dateTime;
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(standUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.createConversation(conversationSubject, standUser.name, adminUser.name, "MyOrganization");
    Conversation.verifyConversation(standUser.name, adminUser.name, conversationSubject);
    Conversation.enterConversationRoom(conversationSubject);
    Conversation.startRecordingWithVirtualBackgroundandNoAudio();
    Conversation.startRecordingVideo();
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyConversationApprove(conversationSubject);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyConversationDashboardFeed(standUser.name, conversationSubject);
    TopNavBar.clickProfileMenuByText("Log Out");
    //Common.visitByURL(urlLogin);
    Login.validLogin(contriUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    DashboardFeed.verifyConversationDashboardFeedFalse(conversationSubject);
  });

  it('As user, should be able to delete room', () => {
    let conversationSubject = "New testing for deleting conversation1";
    expect(isPermissionAllowed('camera')).to.be.true;
    expect(isPermissionAllowed('microphone')).to.be.true;
    Login.validLogin(adminUser);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Conversation");
    Conversation.createConversation(conversationSubject, adminUser.name, superAdmin.name, "MyOrganization");
    Conversation.verifyConversation(adminUser.name, superAdmin.name, conversationSubject);
    Conversation.deleteConversation(conversationSubject);
  });
});