/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Common from "../../pageObjects/common";
import Upload from "../../pageObjects/upload";
import ApprovalQueue from "../../pageObjects/approvalQueue"
import DashboardFeed from "../../pageObjects/dashboardFeed"

describe(Cypress.env('testEnv') + ' - Upload Core suite', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const admin = users[Cypress.env('testEnv')].admin;
  const standard = users[Cypress.env('testEnv')].standard;
  const contributor = users[Cypress.env('testEnv')].contributor;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
  const dateTime = Common.getUTCDateTime();
  const organizationNameSelected = "Mark QA Organization1";
  const filesToUpload1= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
  ];
  const filesToUpload2= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
    { path: 'qa_media_upload2.mp4', type: 'video/mp4' },
    //{ path: 'qa_media_image.png',  type: 'image/png' },
  ];
  const filesToUpload3= [
    { path: 'qa_media_image.png',  type: 'image/png' },
  ];

  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As super admin user, should be able to upload video / photos (My Organization as set to privacy setting)', () => {
    let uploadMediaTitle = "Automation Upload Media - MyOrg - " + dateTime;
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
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(standard);
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(contributor);
    DashboardFeed.verifyMediaDashboardFeedFalse(uploadMediaTitle);
  });

  it('As super admin user, should be able to upload bulk videos / images)', () => {
    let uploadMediaTitlebulk = "Automation Bulk Upload Media - " + dateTime;
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    //change to filesToUpload2 // troubleshooting mode only on filesToUpload1
    Upload.createUploadMediaForSA(uploadMediaTitlebulk, filesToUpload2, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitlebulk);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitlebulk);
    ApprovalQueue.mediaApproveClick(uploadMediaTitlebulk);
    TopNavBar.clickDashboard();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitlebulk);
  });

  it('As admin user, should be able to upload video / photos (OnlyMe+Admins as set to privacy settings))', () => {
    let uploadMediaTitle = "Automation Upload Media -> onlyMe + Admins - " + dateTime;
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMedia(uploadMediaTitle, filesToUpload1, superAdmin.name, "OnlyMe+Admins");
    Upload.verifyUploadConfirmation(superAdmin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(admin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    DashboardFeed.verifyMediaDashboardFeed(admin.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(standard);
    DashboardFeed.verifyMediaDashboardFeedFalse(uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(contributor);
    DashboardFeed.verifyMediaDashboardFeedFalse(uploadMediaTitle);
  });

  it('As admin user, should be able to upload video / photos  (Group association as set to privacy settings))', () => {
    let uploadMediaTitle = "Automation Upload Media -> Group association - " + dateTime;
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMedia(uploadMediaTitle, filesToUpload1, superAdmin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(superAdmin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(admin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    DashboardFeed.verifyMediaDashboardFeed(admin.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(standard);
    DashboardFeed.verifyMediaDashboardFeed(admin.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(contributor);
    DashboardFeed.verifyMediaDashboardFeedFalse(uploadMediaTitle);
  });

  it('As admin user, should be able to upload bulk videos / images)', () => {
    let uploadMediaTitle = "Automation Bulk Upload Media - " + dateTime;
    Login.validLogin(admin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    //change to filesToUpload2 // troubleshooting mode only on filesToUpload1
    Upload.createUploadMedia(uploadMediaTitle, filesToUpload2, superAdmin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(superAdmin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(admin.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    DashboardFeed.verifyMediaDashboardFeed(admin.name, uploadMediaTitle);
  });

  it.only('As standard user, should be able to upload video / photos  (My Organization as set to privacy settings))', () => {
    let uploadMediaTitle = "Automation Upload Media - " + dateTime;
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, admin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(admin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    DashboardFeed.verifyMediaDashboardFeed(admin.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    DashboardFeed.verifyMediaDashboardFeed(standard.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(contributor);
    DashboardFeed.verifyMediaDashboardFeedFalse(uploadMediaTitle);
  });

  it('As standard user, should be able to upload video / photos  (OnlyMe+Admins as set to privacy settings))', () => {
    let uploadMediaTitle = "Automation Upload Media -> onlyMe + Admins - " + dateTime;
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMedia(uploadMediaTitle, filesToUpload1, superAdmin.name, "OnlyMe+Admins");
    Upload.verifyUploadConfirmation(superAdmin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    DashboardFeed.verifyMediaDashboardFeed(standard.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(standard);
    DashboardFeed.verifyMediaDashboardFeed(standard.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(contributor);
    DashboardFeed.verifyMediaDashboardFeedFalse(uploadMediaTitle);
  });

  it('As standard user, should be able to upload video / photos  (Group association as set to privacy settings))', () => {
    let uploadMediaTitle = "Automation Upload Media -> Group association - " + dateTime;
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    Upload.createUploadMedia(uploadMediaTitle, filesToUpload1, superAdmin.name, "OnlyMe+Admins");
    Upload.verifyUploadConfirmation(superAdmin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    DashboardFeed.verifyMediaDashboardFeed(standard.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(admin);
    DashboardFeed.verifyMediaDashboardFeed(standard.name, uploadMediaTitle);
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(contributor);
    DashboardFeed.verifyMediaDashboardFeedFalse(uploadMediaTitle);
  });

  it('As standard user, should be able to upload bulk videos / images)', () => {
    let uploadMediaTitle = "Automation Bulk Upload Media - " + dateTime;
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    //change to filesToUpload2 // troubleshooting mode only on filesToUpload1
    Upload.createUploadMedia(uploadMediaTitle, filesToUpload2, superAdmin.name, "MyOrganization");
    Upload.verifyUploadConfirmation(superAdmin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    DashboardFeed.verifyMediaDashboardFeed(standard.name, uploadMediaTitle);
  });

  it('As user, verify if the approver was automatically set to "Me")', () => {
    let uploadMediaTitle = "Automation Bulk Upload Media - " + dateTime;
    Login.validLogin(standard);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickActionButtonMenuByText("Upload");
    Common.verifyBreadCrumbs("Upload");
    //change to filesToUpload2 // troubleshooting mode only on filesToUpload1
    Upload.createUploadMedia(uploadMediaTitle, filesToUpload2, superAdmin.name, "MyOrganization", true);
    Upload.verifyUploadConfirmation(superAdmin.name, uploadMediaTitle);
    Common.visitByURL(urlApprovalQueue);
    ApprovalQueue.verifyMediaApprovalQueued(standard.name, uploadMediaTitle);
    ApprovalQueue.mediaApproveClick(uploadMediaTitle);
    TopNavBar.clickDashboard();
    TopNavBar.clickProfileMenuByText("Log Out");
    Login.validLogin(superAdmin);
    DashboardFeed.verifyMediaDashboardFeed(standard.name, uploadMediaTitle);
  });

});