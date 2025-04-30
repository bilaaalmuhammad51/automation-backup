/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import Dashboard from "../../pageObjects/dashboard";
import Upload from "../../pageObjects/upload";
import Common from "../../pageObjects/common";
import ApprovalQueue from "../../pageObjects/approvalQueue";
import TopNavBar from "../../pageObjects/topNavBar";


describe(Cypress.env('testEnv') + ' - Dashboard suite', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const adminUser = users[Cypress.env('testEnv')].admin;
  const standardUser = users[Cypress.env('testEnv')].standard;
  const contriUser = users[Cypress.env('testEnv')].contributor;
  const msAdmin = users[Cypress.env('testEnv')].MSAdmin;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const dateTime = Common.getUTCDateTime();
  const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
  const filesToUploadPNG= [
    { path: 'testingjpg.jpg', type: 'image/jpg' },
  ];
  const filesToUpload1= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
  ];

  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As a user, should be able to use search button', () => {
    Login.validLogin(superAdmin);
    Dashboard.searchContent();
  });

  it('As a user, should be able to access inbox/sent', () => {
    Login.validLogin(contriUser);
    Dashboard.clickInboxButton();
  });

  it('As a user, should be able to access user invite', () => {
    Login.validLogin(adminUser);
    Dashboard.clickUserButton();
  });

  it('As a user, should be able to access gallery', () => {
    Login.validLogin(standardUser);
    Dashboard.clickGalleryButton();
  });

  it('As a user, should be able to access profile', () => {
    Login.validLogin(contriUser);
    Dashboard.accessProfile();
  });

  it('As a user, should be able to download media', () => {
    Login.validLogin(msAdmin);
    Dashboard.clickDownloadButton(); 
  });

  it.skip('As a user, should be able to rename video', () => {
    let uploadMediaTitle = "Automation Upload Media - MyOrg - " + dateTime;
    Login.validLogin(standardUser);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, adminUser.name, "MyOrganization");
    Upload.verifyUploadConfirmation(adminUser.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standardUser.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    Dashboard.renameMedia(); 
  });

  it('As a user, should be able to delete media', () => {
    let uploadMediaTitle = "Automation Upload Media - MyOrg - " + dateTime;
    Login.validLogin(superAdmin);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, adminUser.name, "MyOrganization");
    Upload.verifyUploadConfirmation(adminUser.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    Dashboard.clickDeleteButton();
    Dashboard.verifyMediaDeletion();
  }); 

  it('As a user, should be able to add tags', () => {
    Login.validLogin(adminUser);
    Dashboard.addTags();
    Dashboard.verifyTags();
  });

  it('As a user, should be able to access proofing', () => {
    Login.validLogin(standardUser);
    Dashboard.accessProofing();
    Dashboard.verifyProofingPage();
  });

  it('As a user, should be able to like media', () => {
    Login.validLogin(standardUser);
    Dashboard.clickLikeButton();
    Dashboard.verifyLikedMedia();
  });

  it('As a user, should be able to comment and reply on media ', () => {
    Login.validLogin(standardUser);
    Dashboard.addComment();
  });

  it('As a user, should be able to copy link media ', () => {
    Login.validLogin(standardUser);
    Dashboard.clickCopyLink();
    Dashboard.verifyCopiedLink();
  });

  it('As a user, should be able to download media as MP4 ', () => {
    let uploadMediaTitle = "Automation Upload Media - MyOrg - " + dateTime;
      Login.validLogin(superAdmin);
      TopNavBar.clickActionButtonMenuByText("Upload");
      Common.verifyBreadCrumbs("Upload");
      Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, adminUser.name, "MyOrganization");
      Upload.verifyUploadConfirmation(adminUser.name, uploadMediaTitle);
      Common.visitByURL(urlApprovalQueue);
      ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
      ApprovalQueue.mediaApproveClick(uploadMediaTitle);
      TopNavBar.clickDashboard();
      Dashboard.clickDownloadMP4();
  });

  it('As a user, should be able to download media as SRC ', () => {
    let uploadMediaTitle = "Automation Upload Media - MyOrg - " + dateTime;
      Login.validLogin(superAdmin);
      TopNavBar.clickActionButtonMenuByText("Upload");
      Common.verifyBreadCrumbs("Upload");
      Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, adminUser.name, "MyOrganization");
      Upload.verifyUploadConfirmation(adminUser.name, uploadMediaTitle);
      Common.visitByURL(urlApprovalQueue);
      ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
      ApprovalQueue.mediaApproveClick(uploadMediaTitle);
      TopNavBar.clickDashboard();
      Dashboard.clickDownloadSRC();
  });

});
