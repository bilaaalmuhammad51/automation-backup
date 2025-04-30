/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Common from "../../pageObjects/common";
import Upload from "../../pageObjects/upload";
import ApprovalQueue from "../../pageObjects/approvalQueue";
import DashboardFeed from "../../pageObjects/dashboardFeed";
import Proofing from "../../pageObjects/proofing";

describe(Cypress.env('testEnv') + ' - Proofing Test suite', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const MSAdmin = users[Cypress.env('testEnv')].MSAdmin;
  const admin = users[Cypress.env('testEnv')].admin;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
  const urlEditingQueue = users[Cypress.env('testEnv')].url + "editing-queue";
  const urlReportFeedback = users[Cypress.env('testEnv')].url + "reports/feedback";
  const dateTime = Common.getUTCDateTime();
  const uploadMediaTitle = "Automation Request Edit Testing " + dateTime;
  const addDescription = "For testing only on automation test";
  const commentstext = "New testing for comments.";
  const organizationNameSelected = "Mark QA Organization1";
  const filesToUpload1= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
  ];

  const filesToUpload2= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
    { path: 'qa_media_upload2.mp4', type: 'video/mp4' },
    { path: 'qa_media_image.png',  type: 'image/png' },
  ];

  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As super admin user should be able to access proofing', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    Proofing.accessProofing();
  });

  it('As super admin user, should be able to Request Revision Edit', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.deleteMedia();

  });

  it('As super admin user, should be able to leave comment', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name,uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveComment(addDescription);
    Proofing.deleteMedia();

  });
  
  /*
  it.skip('As super admin user, should be able to leave feedback', () => {
    Login.validLogin(MSAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMedia(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(MSAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.getEditRequestDetails();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(superAdmin.name);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedback(filesToUpload1,addDescription);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.deleteMedia();  
  });
  */

  it('As super admin user, should be able to download video/media', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.dowloadMedia();
    Proofing.deleteMedia();
  });

  it('As super admin user, should be able to copy link for viewing', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.copylink();
    Proofing.deleteMedia();
  });

  it('As super admin user, should be able to delete media/video', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.deleteMedia();
  });

  it('As super admin user, should be able to edit feedback or comment', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveComment(addDescription);
    Proofing.editingComments(addDescription);
    Proofing.deleteMedia();
  });

it('As super admin user user, should be able to sort feedback', () => {
  Login.validLogin(superAdmin);
  TopNavBar.selectingOrganization(organizationNameSelected);
  TopNavBar.clickActionButtonMenuByText("Upload");
  Common.verifyBreadCrumbs("Upload");
  Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
  Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
  Common.visitByURL(urlApprovalQueue);
  ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
  ApprovalQueue.mediaApproveClick(uploadMediaTitle);
  Common.visitByURL(urlReportFeedback);
  Proofing.sortingFeedback();
  TopNavBar.clickProfileMenuByText("Log Out");
  Login.validLogin(superAdmin);
  Proofing.getuploadedContent(uploadMediaTitle);
  Proofing.deleteMedia();

});

it('As super admin user, should not be able to give feedback if the revision has not yet uploaded', () => {
  Login.validLogin(superAdmin);
  TopNavBar.clickActionButtonMenuByText("Upload");
  Common.verifyBreadCrumbs("Upload");
  Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
  Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
  Common.visitByURL(urlApprovalQueue);
  ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
  ApprovalQueue.mediaApproveClick(uploadMediaTitle);
  TopNavBar.clickDashboard();
  DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
  Proofing.getuploadedContent(uploadMediaTitle);
  Proofing.deleteMedia();

});

// skipping for now, need to manually verify the different versions

// it.only('As super admin user, verify if all different versions of video are displayed in proofing page', () => {
//   Login.validLogin(superAdmin);
//   TopNavBar.selectingOrganization(organizationNameSelected);
//   TopNavBar.clickActionButtonMenuByText("Upload");
//   Common.verifyBreadCrumbs("Upload");
//   Upload.createUploadMedia(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
//   Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
//   Common.visitByURL(urlApprovalQueue);
//   ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
//   ApprovalQueue.mediaApproveClick(uploadMediaTitle);
//   TopNavBar.clickDashboard();
//   DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
//   Proofing.getuploadedContent(uploadMediaTitle);
//   Proofing.getEditRequestDetails();
//   Proofing.leaveProofingicon();
//   Common.visitByURL(urlEditingQueue);
//   Proofing.selecUserAssigned(uploadMediaTitle);
//   Proofing.searchUserToAssigned(MSAdmin.name);
//   TopNavBar.clickProfileMenuByText("Log Out");
//   Login.validLogin(MSAdmin);
//   TopNavBar.clickDashboard();
//   DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
//   Proofing.getuploadedContent(uploadMediaTitle);
//   Proofing.leaveFeedbackAfterProofing(filesToUpload1,addDescription); 
//   TopNavBar.clickProfileMenuByText("Log Out");
//   Login.validLogin(superAdmin);
//   Common.visitByURL(urlEditingQueue);
//   Proofing.claimingContent(uploadMediaTitle);
//   Proofing.checkboxclaim();
//   TopNavBar.clickDashboard();
//   Proofing.getuploadedContent(uploadMediaTitle);
//   Proofing.claimingYesLink();
//   Proofing.leaveProofingicon();
//   TopNavBar.clickProfileMenuByText("Log Out");
//   Login.validLogin(MSAdmin);
//   TopNavBar.clickDashboard();
//   DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
//   Proofing.getuploadedContent(uploadMediaTitle);
//   Proofing.leaveFeedbackAfterProofing(filesToUpload1,addDescription); 
//   TopNavBar.clickProfileMenuByText("Log Out");
//   Login.validLogin(superAdmin);
//   Common.visitByURL(urlEditingQueue);
//   Proofing.claimingContent(uploadMediaTitle);
//   Proofing.checkboxclaim();
//   TopNavBar.clickDashboard();
//   Proofing.getuploadedContent(uploadMediaTitle);
//   //Proofing.deleteMedia();
// });


  it('As super admin user, should be able to receive an email notification when a content has being commented on', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveComment(addDescription);
    Proofing.deleteMedia();

  });

  /* -- this must be tested manually
  it.only('As requester, should be able to receive an email notification when the requested edit video has been replaced by new version(the edit is now ready for distribution)', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent();
    Proofing.getEditRequestDetails();
    Proofing.leaveProofingicon();
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(MSAdmin.name);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedbackAfterProofing(filesToUpload1,addDescription); 
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.claimingContent(uploadMediaTitle);
    Proofing.checkboxclaim();
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.claimingYesLink();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedbackAfterProofing(filesToUpload1,addDescription); 
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.claimingContent(uploadMediaTitle);
    Proofing.checkboxclaim();
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);

  });
  */

  //-------------Proofing: Editor View---------------//

  it('As editor, should be able to access proofing', () => {
    Login.validLogin(MSAdmin);
    Proofing.accessProofing();
  });

  it('As editor, should be able to leave comment', () => {
    Login.validLogin(MSAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(MSAdmin.name,uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveComment(addDescription);
    Proofing.deleteMedia();

  });

  it('As Editor, should be able to leave feedback', () => {
      Login.validLogin(superAdmin);
      TopNavBar.selectingOrganization(organizationNameSelected);
      TopNavBar.clickActionButtonMenuByText("Upload");
      Common.verifyBreadCrumbs("Upload");
      Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
      Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
      Common.visitByURL(urlApprovalQueue);
      ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
      ApprovalQueue.mediaApproveClick(uploadMediaTitle);
      TopNavBar.clickDashboard();
      DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
      Proofing.getuploadedContent(uploadMediaTitle);
      Proofing.AIAssistantButton();
      Proofing.leaveProofingicon();
      Common.visitByURL(urlEditingQueue);
      Proofing.selecUserAssigned(uploadMediaTitle);
      Proofing.searchUserToAssigned(MSAdmin.name);
      TopNavBar.clickProfileMenuByText("Log Out");
      Login.validLogin(MSAdmin);
      TopNavBar.selectingOrganization(organizationNameSelected);
      TopNavBar.clickDashboard();
      DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
      Proofing.getuploadedContent(uploadMediaTitle);
      Proofing.leaveFeedbackAfterProofing(filesToUpload1,addDescription);
      TopNavBar.clickProfileMenuByText("Log Out");
      Login.validLogin(superAdmin);
      Proofing.getuploadedContent(uploadMediaTitle);
      Proofing.deleteMedia();

  });

  it('As editor, should be able to reply a certain feedback from client', () => {
    Login.validLogin(MSAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(MSAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveComment(addDescription);
    Proofing.replyingToCommentsonOtherUser(commentstext);
    Proofing.deleteMedia();
  });

  it('As editor, should be able to download video/media', () => {
      Login.validLogin(MSAdmin);
      TopNavBar.selectingOrganization(organizationNameSelected);
      TopNavBar.clickActionButtonMenuByText("Upload");
      Common.verifyBreadCrumbs("Upload");
      Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
      Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
      Common.visitByURL(urlApprovalQueue);
      ApprovalQueue.verifyMediaApprovalQueued(MSAdmin.name, uploadMediaTitle);
      ApprovalQueue.mediaApproveClick(uploadMediaTitle);
      TopNavBar.clickDashboard();
      DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
      Proofing.getuploadedContent(uploadMediaTitle);
      Proofing.dowloadMedia();
      Proofing.deleteMedia();
  });

  it('As editor, should be able to copy link for viewing', () => {
      Login.validLogin(MSAdmin);
      TopNavBar.selectingOrganization(organizationNameSelected);
      TopNavBar.clickActionButtonMenuByText("Upload");
      Common.verifyBreadCrumbs("Upload");
      Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
      Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
      Common.visitByURL(urlApprovalQueue);
      ApprovalQueue.verifyMediaApprovalQueued(MSAdmin.name, uploadMediaTitle);
      ApprovalQueue.mediaApproveClick(uploadMediaTitle);
      TopNavBar.clickDashboard();
      DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
      Proofing.getuploadedContent(uploadMediaTitle);
      Proofing.copylink();
      Proofing.deleteMedia();
  });

  it('As editor, should be able to sort feedback', () => {
    Login.validLogin(MSAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(MSAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    Common.visitByURL(urlReportFeedback);
    Proofing.sortingFeedback();

  });

  it('As editor, should be able to upload new version of the video', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent();
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(MSAdmin.name);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedbackAfterProofing(filesToUpload1,addDescription); 
  });

  it('As editor, should not be able to upload video unless the feedback/comment from the client gets completed/checked mark', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon(); 
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(MSAdmin.name);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(MSAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedbackAfterProofing(filesToUpload1,addDescription); 
  });

  // manual testing
  it.skip('As editor, should be able to receive notification after client requested a revision', () => {
    Login.validLogin(MSAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(MSAdmin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.getEditRequestDetails();
    Proofing.deleteMedia();
  });

  it.skip('As editor, should be able to verify all the status color of each content', () => {
    Login.validLogin(otherSuperAd);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(otherSuperAd.name, uploadMediaTitle);
    ApprovalQueue.mediaEditandApproveClick(uploadMediaTitle);
    Proofing.getApproveandEditRequestDetails();
    Proofing.deleteMedia();
  });

});
