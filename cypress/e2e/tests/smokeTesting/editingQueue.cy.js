/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Common from "../../pageObjects/common";
import Upload from "../../pageObjects/upload";
import ApprovalQueue from "../../pageObjects/approvalQueue"
import DashboardFeed from "../../pageObjects/dashboardFeed"
import Proofing from "../../pageObjects/proofing";
import editingQueue from "../../pageObjects/editingQueue";
// import Pendingreview from "./pageObjects/CloseReviewPendingPopup";
// import upload from "./pageObjects/upload";
//import proofing from "./pageObjects/proofing";

describe(Cypress.env('testEnv') + ' - Editing Queue Test suite', () => {
const superAdmin = users[Cypress.env('testEnv')].superAdmin;
const MSAdmin = users[Cypress.env('testEnv')].MSAdmin;
const admin = users[Cypress.env('testEnv')].admin;
const standard = users[Cypress.env('testEnv')].standard;
const urlLogin = users[Cypress.env('testEnv')].url + "login";
const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
const urlEditingQueue = users[Cypress.env('testEnv')].url + "editing-queue";
const urlInEditingTable = users[Cypress.env('testEnv')].url + "editing-queue/editing";
const dateTime = Common.getUTCDateTime();
const uploadMediaTitle = "What is the subject about? " + dateTime;
const addDescription = "For testing only on automation test";
const videoDirectionRandom = "Diversity is a strength, and our differences should be celebrated rather than feared. Whether it's differences in race, ethnicity, religion, or sexual orientation, every person has something unique and valuable to offer to the world. Another important application of technology in nature is through the use of machine learning. With machine learning, we can analyze vast amounts of data to identify patterns and make predictions about the behavior of complex environmental systems. This technology has the potential to revolutionize the way we manage natural resources and respond to environmental threats. Leadership is the ability to inspire and guide others towards a common goal, and it is essential to creating positive change in the world. Whether it's in a formal leadership position or in everyday life, leadership requires vision, courage, and the ability to bring people together.The snow was falling softly outside, creating a winter wonderland. I snuggled up by the fire with a cup of hot cocoa, feeling cozy and content."
const selectOrganization = "Mark QA Organization1";
const filesToUpload1= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
  ];

//   const filesToUpload2= [
//     { path: 'qa_media_upload.mp4', type: 'video/mp4' },
//     { path: 'qa_media_upload2.mp4', type: 'video/mp4' },
//     { path: 'qa_media_image.png',  type: 'image/png' },
//   ];

  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As super admin user, should be able to access Ready to Edit queue page/table', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
    Common.visitByURL(urlEditingQueue);
  });

  // Need to manually test in order to verify if the filter works correctly
  it.skip('As super admin user, on ready to edit table, should be able to select filter columns', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
    TopNavBar.selectingOrganization(selectOrganization);
    Common.visitByURL(urlEditingQueue);
    editingQueue.multipleFiltering(selectOrganization);
  });

  it('As super admin user, on Ready to Edit table, should be able to sort Submitted (date) column', () => {
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    TopNavBar.selectingOrganization(selectOrganization);
    editingQueue.sortSubmittedDateColumn();
  });

  it('As super admin user, on Ready to Edit table, should be able to view content', () => {
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    TopNavBar.selectingOrganization(selectOrganization);
    editingQueue.clickViewIcon();
  });

  it.only('As super admin user, on Ready to Edit table, should be able to claim content', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
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
    editingQueue.claimingContent();
  });

  it('As super admin user, on Ready to Edit table, should be able to copy the link of the content in order to view', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
    Common.visitByURL(urlEditingQueue);
    editingQueue.copyLinkContent();
  });

  it('As super admin user, on Ready to Edit table, should be able to reject a content', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
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
    editingQueue.rejectLinkbtn();
  });

  it('As super admin user, on Ready to Edit table, should be able to assign a content to an editor', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
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
    editingQueue.assigningUser(MSAdmin.name);
  });

  it('As super admin user, should be able to access In Editing queue page', () => {
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    editingQueue.inEditingTab();

  });

  // Need to manually test in order to verify if the filter works correctly
  it.skip('As super admin user, on In Editing table, should be able to select/filter columns', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
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
    editingQueue.inEditingTab();
    editingQueue.singleFiltering(selectOrganization);
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.deleteMedia();

  });

  it('As super admin user, on In Editing table, should be able to copy the link of the content in order to view', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
    Common.visitByURL(urlEditingQueue);
    editingQueue.inEditingTab();
    editingQueue.clickViewIcon();
  });

  it('As super admin user, on In Editing table, should be able to unassign a content', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
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
    editingQueue.inEditingTab();
    editingQueue.rejectLinkbtn();
  });


  it('As super admin user, should be able to access in Completed queue page', () => {
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    editingQueue.inCompletedTab();

  });

  it('As super admin user, on Completed table, should be able to download content', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
    Common.visitByURL(urlEditingQueue);
    editingQueue.inCompletedTab();
    editingQueue.downloadMediaonCompletedTab();
  });

  it('As super admin user, on Completed table, should be able to copy the link of the content in order to view', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
    Common.visitByURL(urlEditingQueue);
    editingQueue.inCompletedTab();
    editingQueue.copyLinkContent();
  });


  it('As super admin user, on complete table, should be able to sort Submitted (date) column', () => {
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    editingQueue.inCompletedTab();
    editingQueue.sortSubmittedDateColumn();

  });

  it('As super admin user, on complete queue, should be able to export report as CSV ', () => {
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    editingQueue.inCompletedTab();
    editingQueue.downloadCSVfile();

  });


  it('As editor user/role, should be able to have access to a content after claiming and able to edit the content', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(selectOrganization);
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
    Proofing.leaveFeedback(filesToUpload1,addDescription); 
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.claimingContent(uploadMediaTitle);
    Proofing.checkboxclaim();
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.deleteMedia();


  });

  it('As editor user/role, should be able to have access to a content after claiming and able to edit the content', () => {
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(selectOrganization);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(standard.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
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
  
  it('As editor user/role, should be able to reassign content to another editor', () => {
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(selectOrganization);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(standard.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(MSAdmin.name);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(superAdmin.name);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.deleteMedia();
  });


});