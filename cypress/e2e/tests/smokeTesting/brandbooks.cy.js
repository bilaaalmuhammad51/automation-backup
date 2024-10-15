// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import BrandBooks from "../../pageObjects/brandbooks";
import brandbooks from "../../pageObjects/brandbooks";
import Common from "../../pageObjects/common";

describe(Cypress.env('testEnv') + ' - Brand Books Core suite', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const organizationNameSelected = "Mark QA Organization1";
  const filesToUpload1= [
    { path: 'testingjpg2.jpg', type: 'JPEG/Image' },
  ];
  
  const filesToUpload2= [
    { path: 'AppleBraille.ttf', type: 'TrueType/Font' },
  ];

  const filesToUpload3= [
    { path: 'graphicElements.png', type: 'PNG/Image' },
  ];

  const filesToUpload4= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
  ];

  const filesToUpload5= [
    { path: 'qa_media_upload.mp4', type: 'video/mp4' },
  ];

  const filesToUpload6= [
    { path: 'sample-file-4.wav', type: 'Waveform/audio' },
  ];

  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As user, should be able to access brand books successfully', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    Common.verifyBreadCrumbs("Brand Books");
  });

  it('As user, should be able to create brand books successfully and edit created brand books', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.createNewBranbooks();
  });

  it('As user, should be able to navigate logo', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateLogoicon();
  });

  it('As user, should be able to navigate color palette', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigatecolorPaletteicon();
  });

  it('As user, should be able to navigate Fonts', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateFontIcon();
  });

  it('As user, should be able to navigate graphic elements', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateElementIcon();

  });

  it('As user, should be able to navigate imagery', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateImageryIcon();

  });

  it('As user, should be able to navigate voice and tone', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateVoiceandToneIcon();

  });

  it('As user, should be able to navigate legal and compliance', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateLegalCompIcon();

  });

  it('As user, should be able to navigate intro and outro', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateIntroOutroIcon();

  });

  it('As user, should be able to navigate Music', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateMusicIcon();

  });

  it('As user, should be able to navigate Templates', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigatetemplatesIcon();

  });

  it('As user, should be able to navigate Examples', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateExamplesIcon();

  });

  it('As user, It should be able to upload logo', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    BrandBooks.navigateLogoicon();
    BrandBooks.uploadinglogo(filesToUpload1);
  });

  it('As user, should be able to upload color palette', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    BrandBooks.navigatecolorPaletteicon();
    BrandBooks.uploadingColorPalette();
  });

  it('As user, should be able to upload Fonts', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    BrandBooks.navigateFontIcon();
    BrandBooks.uploadingFont(filesToUpload2);
  });

  it('As user, should be able to upload graphic elements', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    BrandBooks.navigateElementIcon();
    BrandBooks.uploadingGraphicElements(filesToUpload3);
  });

  it('As user, should be able to upload imagery', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    BrandBooks.navigateImageryIcon();
    BrandBooks.uploadingImagery(filesToUpload1);
  });

  it('As user, should be able to upload voice and tone and legal compliance ', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    BrandBooks.navigateVoiceandToneIcon();
    BrandBooks.getiingtoneandcomplianceinput();
  });

  it('As user, should be able to upload Intro and Outro', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    BrandBooks.navigatebrandbooknamelist();
    BrandBooks.navigateIntroOutroIcon();
    BrandBooks.uploadingIntrobrand(filesToUpload4);
    BrandBooks.uploadingOutrobrand(filesToUpload5);
  });

  it('As user, should be able to upload Music', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    brandbooks.navigateMusicIcon();
    BrandBooks.uploadingMusiconBrand(filesToUpload6);
  });

  it('As user, should be able to upload Templates', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    BrandBooks.navigatetemplatesIcon();
    BrandBooks.uploadingTemplatesonBrand(filesToUpload4);

  });

  it('As user, should be able to upload Examples', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.navigateAutomationBrandBooks();
    BrandBooks.navigateExamplesIcon();
    BrandBooks.uploadingExamplesonBrand(filesToUpload4);

  });

  it('As user, should be able to duplicate brand books', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.duplicateCreatedBrandbooks();
  });

  it('As user, should be able to delete brandbooks', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);
    TopNavBar.clickProfileMenuByText("Brand Books");
    BrandBooks.deleteDuplicatedBrandbooks();
  });



});