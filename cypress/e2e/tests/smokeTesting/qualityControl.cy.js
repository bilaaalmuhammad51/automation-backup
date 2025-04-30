/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Common from "../../pageObjects/common";
import Upload from "../../pageObjects/upload";
import ApprovalQueue from "../../pageObjects/approvalQueue"
import DashboardFeed from "../../pageObjects/dashboardFeed"
import Proofing from "../../pageObjects/proofing";
import proofing from "../../pageObjects/proofing";
// import topNavBar from "./pageObjects/topNavBar";
// import editingQueue from "./pageObjects/editingQueue";
// import Pendingreview from "./pageObjects/CloseReviewPendingPopup";
// import upload from "./pageObjects/upload";
//import proofing from "./pageObjects/proofing";

describe(Cypress.env('testEnv') + ' - Quality Control Test suite', () => {
const superAdmin = users[Cypress.env('testEnv')].superAdmin;
const MSAdmin = users[Cypress.env('testEnv')].MSAdmin;
const admin = users[Cypress.env('testEnv')].admin;
const standard = users[Cypress.env('testEnv')].standard;
const urlLogin = users[Cypress.env('testEnv')].url + "login";
const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
const urlEditingQueue = users[Cypress.env('testEnv')].url + "editing-queue";
const urlQCqueue = users[Cypress.env('testEnv')].url + "editing-queue/qc";
const dateTime = Common.getUTCDateTime();
const uploadMediaTitle = "QA Automation Testing Quality Control " + dateTime;
const addDescription = "For testing only on automation test";
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

  it('As SA user, should be able to claim QC', () => {
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
    TopNavBar.selectingOrganization(selectOrganization);
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedback(filesToUpload1,addDescription);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.claimingContent(uploadMediaTitle);
    Proofing.deleteMedia();
  });

  it('As SA user, should be able to unassign QC in Queue', () => {
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
  });

  it('As SA user, should be able to approve QC in Proofing', () => {
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(selectOrganization);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle, filesToUpload1);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, uploadMediaTitle);
    TopNavBar.clickDashboard();
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
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedback(filesToUpload1,addDescription);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.claimingContent(uploadMediaTitle);
    Proofing.checkboxclaim();
    Proofing.deleteMedia();
  });

  it('As SA user, should be able to leave feedbacks', () => {
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
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(superAdmin.name);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedback(filesToUpload1,addDescription);
  });

  it('As MS Admin user, should be able to claim QC', () => {
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
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(superAdmin.name);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedback(filesToUpload1,addDescription);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.claimingContent(uploadMediaTitle);
    Proofing.deleteMedia();
  });


  it('As MS Admin, should be able to approve QC in Proofing', () => {
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
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(superAdmin.name);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedback(filesToUpload1,addDescription);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.claimingContent(uploadMediaTitle);
    Proofing.checkboxclaim();
  });


  it('As MS Admin, should be able to reject QC in Proofing', () => {
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
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(superAdmin.name);
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedback(filesToUpload1,addDescription);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.claimingContent(uploadMediaTitle);
    Proofing.checkboxrejectbtn();
    Proofing.leaveProofingicon();
    TopNavBar.clickDashboard();
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.deleteMedia();
  });


  it('As MS Admin, should be able to leave feedbacks ', () => {
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
    Proofing.leaveFeedback(filesToUpload1,addDescription);
  });


  it('As user, verify if the version title of the original footage is "Original" ', () => {
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
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(superAdmin.name);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.checkOriginal();
    
  });

  /* 
  it('As user, verify if the revision (after QC fail) is Version 0.1 \n As user, verify if the second revision (after QC fail) is Version 0.2 \n As user, verify if the approved version after all revisions is Version 1 \n As user, verify if the Version 1.1 is QC fail of Version 1 \n As user, verify if the approved version after all revisions from Version 1 is Version 2', () => {
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
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.AIAssistantButton();
    Proofing.leaveProofingicon();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.selecUserAssigned(uploadMediaTitle);
    Proofing.searchUserToAssigned(superAdmin.name);
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.leaveFeedback(filesToUpload1,addDescription);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(MSAdmin);
    Common.visitByURL(urlEditingQueue);
    Proofing.claimingContent(uploadMediaTitle);
    Proofing.checkboxrejectbtn();
    TopNavBar.clickDashboard();
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    Proofing.getuploadedContent(uploadMediaTitle);
    Proofing.deleteMedia();
  });
  */

})