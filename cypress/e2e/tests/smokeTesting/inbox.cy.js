/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Common from "../../pageObjects/common";
import Upload from "../../pageObjects/upload";
import ApprovalQueue from "../../pageObjects/approvalQueue"
import DashboardFeed from "../../pageObjects/dashboardFeed"
import Proofing from "../../pageObjects/proofing";
import Inbox from "../../pageObjects/inbox";
import Request from "../../pageObjects/request";

describe(Cypress.env('testEnv') + ' - Inbox Testcase', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const admin = users[Cypress.env('testEnv')].admin;
  const expertUser = users[Cypress.env('testEnv')].expert;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
  const dateTime = Common.getUTCDateTime();
  const organizationNameSelected = "Mark QA Organization1";
  const filesToUpload1= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
  ];

  beforeEach(() => {
    cy.visit(urlLogin);
  });
    let uploadMediaTitle = "Automation Upload Media - MyOrg - " + dateTime;
    let requestQuestion = "What is the prompt/direction about? " + dateTime;
    let additionalNotesDirection = "What to do next?"
    let tags = "QA Automation Testing";

  it('As a user, should be able to access inbox', () => {
    Login.validLogin(superAdmin);
    Inbox.accessInbox();
  });

  it('As a user, should be able to approve and edit request a content on inbox', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();  
  });

  it('As a user, should be able to approve a content on inbox', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);  
  });

  it('As a user, should be able to decline a content on inbox', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaDeclineClick(uploadMediaTitle);   
  });

  it('As a user, should be able to like and comment a content on inbox', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    Inbox.likebuttonContent(); 
  });

  it('As a user, should be able to access proofing room on inbox', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    Inbox.accessProofingInbox(); 
  });

  it('As a user, should be able to save or add to gallery a content on inbox', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    Inbox.saveToGallery();
  });

  it('As a user, should be able to access expert request', () => {
    Login.validLogin(superAdmin);
    Common.visitByURL(urlApprovalQueue);
    Inbox.accessExpertRequest();
  });

  it('As a user, should be able to copy link to request', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    Inbox.copyLinkClick();
  });

  it('As a user, should be able to delete a request on expert request', () => {
    Login.validLogin(expertUser);
    Common.visitByURL(urlApprovalQueue);
    Inbox.accessExpertRequest();
    Inbox.deletingRequest();
  });

  it('As a user, should be able to upload or record video as a response', () => {
    Login.validLogin(expertUser);
    Common.visitByURL(urlApprovalQueue);
    Inbox.accessExpertRequest();
    Inbox.uploadingmediaupload(filesToUpload1);
  });

  it('As a user, should be able to copy link of the sent request', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Colleagues and Guests");
    Request.createRequest("ColleaguesAndGuest", expertUser.name, tags, requestQuestion, additionalNotesDirection, "MyOrganization");
    Request.verifyRequestConfirmation(expertUser.name, superAdmin.name, requestQuestion, additionalNotesDirection);
    Common.visitByURL(urlApprovalQueue);
    Inbox.accessSentRequest();
    Inbox.copylinkrequestsent();
  });

  it('As a user, should be able to remind about the sent request by email', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Colleagues and Guests");
    Request.createRequest("ColleaguesAndGuest", expertUser.name, tags, requestQuestion, additionalNotesDirection, "MyOrganization");
    Request.verifyRequestConfirmation(expertUser.name, superAdmin.name, requestQuestion, additionalNotesDirection);
    Common.visitByURL(urlApprovalQueue);
    cy.wait(5000);
    Inbox.accessSentRequest();
    Inbox.remindsentrequest();
  });

  it('As a user, should be able to reassign sent request', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Request");
    Common.verifyBreadCrumbs("Expert request");
    Request.createRequest("ColleaguesAndGuest", expertUser.name, tags, requestQuestion, additionalNotesDirection, "MyOrganization");
    Request.verifyRequestConfirmation(expertUser.name, superAdmin.name, requestQuestion, additionalNotesDirection);
    Common.visitByURL(urlApprovalQueue);
    cy.wait(5000);
    Inbox.accessSentRequest();
    cy.wait(5000);
    Inbox.reassignrequestclick();
  });

  it('As a user, should be able to remind about the sent request', () => {
    Login.validLogin(superAdmin);
    Common.visitByURL(urlApprovalQueue);
    cy.wait(5000);
    Inbox.accessSentRequest();
    cy.wait(5000);
    Inbox.remindsentrequest();
    Inbox.verifyRemindRequest();
  });

  it('As a user, should be able to delete sent request', () => {
    Login.validLogin(superAdmin);
    Common.visitByURL(urlApprovalQueue);
    cy.wait(5000);
    Inbox.accessSentRequest();
    cy.wait(5000);
    Inbox.deleteRequest();
    Inbox.verifyDeletedRequest();
  });

})