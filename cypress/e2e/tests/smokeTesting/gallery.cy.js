/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import Gallery from "../../pageObjects/gallery";
import StudioMail from "../../pageObjects/studiomail";
import Upload from "../../pageObjects/upload";
import Common from "../../pageObjects/common";
import ApprovalQueue from "../../pageObjects/approvalQueue";
import TopNavBar from "../../pageObjects/topNavBar";
import DashboardFeed from "../../pageObjects/dashboardFeed";


describe(Cypress.env('testEnv') + ' - Gallery suite', () => {
    const superAdmin = users[Cypress.env('testEnv')].superAdmin;
    const adminUser = users[Cypress.env('testEnv')].admin;
    const standardUser = users[Cypress.env('testEnv')].standard;
    const urlLogin = users[Cypress.env('testEnv')].url + "login";
    const urlApprovalQueue = users[Cypress.env('testEnv')].url + "approval/queue";
    const commenttext = "For testing purposes only comment test";
    const dateTime = Common.getUTCDateTime();
    const filesToUploadPNG= [
      { path: 'testingjpg.jpg', type: 'image/jpg' },
    ];
    const filesToUpload1= [
      { path: 'qa_media_upload.mp4', type: 'video/mp4' },
    ];
  
    beforeEach(() => {
      cy.visit(urlLogin);
    });
  
    let subjectname = "New test subject for testing";
    let recipientname = "MarkQA Standard";
    let recipientname1 = "MarkQA Admin";
    let recipientname2 = "MarkQA Contributor";
    let descriptioncontent = "For testing upload only";


    it('As a user, should be able to access gallery view on dashboard', () => {
      Login.validLogin(adminUser);
      Gallery.clickGallery();
      Gallery.verifyGalleryPage();
    });

    it('As a user, should be able to remove video from gallery', () => {
      Login.validLogin(standardUser);
      Gallery.addGalleryButton();
      Gallery.verifyAddedToGallery();
      Gallery.clickGallery();
      Gallery.clickRemoveVideo();
    });

    it('As a user, should be able to copy external link on gallery', () => {
      Login.validLogin(standardUser);
      Gallery.clickGallery();
      Gallery.clickExternalLink();
    });

    it.only('As a user, should be able to download as MP4 on gallery', () => {
      let uploadMediaTitle = "Automation Upload Media for Gallery " + dateTime;
      Login.validLogin(superAdmin);
      TopNavBar.clickActionButtonMenuByText("Upload");
      Common.verifyBreadCrumbs("Upload");
      Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, adminUser.name, "MyOrganization");
      Upload.verifyUploadConfirmation(adminUser.name, uploadMediaTitle);
      Common.visitByURL(urlApprovalQueue);
      ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
      ApprovalQueue.mediaApproveClick(uploadMediaTitle);
      TopNavBar.clickDashboard();
      Gallery.getuploadedContent(uploadMediaTitle);
      DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
      TopNavBar.clickDashboard();
      Gallery.addGalleryButton();
      Gallery.verifyAddedToGallery();
      Gallery.clickGallery();
      Gallery.clickDownloadMP4();
    });

    it('As a user, should be able to download as SRC on gallery', () => {
      Login.validLogin(adminUser);
      Gallery.clickGallery();
      Gallery.clickDownloadSRC();
    });

    it('As a user, should be able to download transcript on gallery', () => {
      Login.validLogin(superAdmin);
      Gallery.clickGallery();
      Gallery.clickDownloadTranscript();
    });

    it('As a user, should be able to replace cover image on gallery', () => {
      let uploadMediaTitle = "Automation Upload Media for Gallery " + dateTime;
      Login.validLogin(superAdmin);
      TopNavBar.clickActionButtonMenuByText("Upload");
      Common.verifyBreadCrumbs("Upload");
      Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, adminUser.name, "MyOrganization");
      Upload.verifyUploadConfirmation(adminUser.name, uploadMediaTitle);
      Common.visitByURL(urlApprovalQueue);
      ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
      ApprovalQueue.mediaApproveClick(uploadMediaTitle);
      TopNavBar.clickDashboard();
      Gallery.getuploadedContent(uploadMediaTitle);
      DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
      TopNavBar.clickDashboard();
      Gallery.addGalleryButton();
      Gallery.verifyAddedToGallery();
      Gallery.clickGallery();
      Gallery.clickReplaceCoverImage(filesToUploadPNG);
    });

    it('As a user, should be able to like a content on gallery', () => {
      Login.validLogin(standardUser);
      Gallery.clickGallery();
      Gallery.clickLikeButton();
    });

    it('As a user, should be able to leave a comment on gallery', () => {
      let uploadMediaTitle = "Automation Upload Media for Gallery " + dateTime;
      Login.validLogin(superAdmin);
      TopNavBar.clickActionButtonMenuByText("Upload");
      Common.verifyBreadCrumbs("Upload");
      Upload.createUploadMediaForSA(uploadMediaTitle, filesToUpload1, adminUser.name, "MyOrganization");
      Upload.verifyUploadConfirmation(adminUser.name, uploadMediaTitle);
      Common.visitByURL(urlApprovalQueue);
      ApprovalQueue.verifyMediaApprovalQueued(superAdmin.name, uploadMediaTitle);
      ApprovalQueue.mediaApproveClick(uploadMediaTitle);
      TopNavBar.clickDashboard();
      Gallery.getuploadedContent(uploadMediaTitle);
      DashboardFeed.verifyMediaDashboardFeed(superAdmin.name, uploadMediaTitle);
      TopNavBar.clickDashboard();
      Gallery.addGalleryButton();
      Gallery.verifyAddedToGallery();
      Gallery.clickGallery();
      Gallery.clickcommentIcon();
    });

    it('As a user, should be able to download media on gallery', () => {
      Login.validLogin(adminUser);
      Gallery.clickGallery();
      Gallery.clickDownloadMedia();
    });

    it('As a user, should be able to share media on gallery', () => {
      Login.validLogin(superAdmin);
      Gallery.clickGallery();
      Gallery.clickShareMedia();
      StudioMail.sendingEmailwithoutUpload(subjectname, recipientname, recipientname1, recipientname2, descriptioncontent);
      Gallery.verifySharedMedia();
    });

  });