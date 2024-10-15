/// <reference types="cypress" />
import users from "../../../fixtures/users.json";
import Login from "../../pageObjects/login";
import TopNavBar from "../../pageObjects/topNavBar";
import Viewprofile from "../../pageObjects/viewprofile";


describe(Cypress.env('testEnv') + ' - View Profile Testcase', () => {
  const superAdmin = users[Cypress.env('testEnv')].superAdmin;
  const admin = users[Cypress.env('testEnv')].admin;
  const standard = users[Cypress.env('testEnv')].standard;
  const msAdmin = users[Cypress.env('testEnv')].MSAdmin;
  const urlLogin = users[Cypress.env('testEnv')].url + "login";
  const organizationNameSelected = "Mark QA Organization1";
  const oldpassword = "Testing!23$";
  const newpassword = "Testing!23$";
  const firstname = "Marknew1";
  const lastname = "Superadmin";
  const jobtitle = "Testing title1";
  const firstnamead = "MarkQA1";
  const lastnamead = "Admin1";
  const jobtitlead = "Testing title1";
  const groupname = "Testing group for automation";
  const toadduser = "Mark MS ADMIN";
  const groupdescription = "For automation testing purposes only. This is for testing in creating groups";

  const filesToUpload1= [
    { path: 'testingjpg2.jpg', type: 'JPEG/Image' },
  ];

  beforeEach(() => {
    cy.visit(urlLogin);
  });

  it('As super admin user, should be able to switch organization and must show their organization feeds', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectingOrganization(organizationNameSelected);

  });

  it.skip('As super admin user, should be able to update Profile Information', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectandviewprofile();
    Viewprofile.clickupdateprofile(firstname,lastname,jobtitle);
  });

  it('As super admin user, should be able to change Password', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectandviewprofile();
    Viewprofile.clickchangepassword(oldpassword,newpassword,newpassword)

  });

  it('As super admin user, should be able to update Notification Center', () => {
    Login.validLogin(superAdmin);
    TopNavBar.selectandviewprofile();
    Viewprofile.clicknotificationpage();
  });

  it('As admin user, should be able to update Profile Information', () => {
    Login.validLogin(admin);
    TopNavBar.selectandviewprofile();
    Viewprofile.clickupdateprofile(firstnamead,lastnamead,jobtitlead);
  });

  it('As admin user, should be able to change Password', () => {
    Login.validLogin(admin);
    TopNavBar.selectandviewprofile();
    Viewprofile.clickchangepassword(oldpassword,newpassword,newpassword)

  });

  it('As admin user, should be able to update Notification Center', () => {
    Login.validLogin(admin);
    TopNavBar.selectandviewprofile();
    Viewprofile.clicknotificationpage();
  });

  it('As super admin user, should be able to Create Groups', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.creategroups(groupname,groupdescription,toadduser);
  });

  it('As super admin user, should be able to view Groups or Joined Groups', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.viewgroupsorjoined();
  });

  it('As admin user, should be able to Create Groups', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.creategroups(groupname,groupdescription,toadduser);
  });

  it('As admin user, should be able to view Groups or Joined Groups', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.viewgroupsorjoined();
  });

  it('As super admin user, should be able to create group privately', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.createprivategroups(groupname,groupdescription,toadduser);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.deletegroupselected();
  });

  it('As super admin user, should be able to create group publicly', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.creategroups(groupname,groupdescription,toadduser);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.deletegroupselected();
  });

  it('As super admin user, should be able to edit group ', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.editgroupselected();
  });

  it('As super admin user, should be able to create group privately', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.createprivategroups(groupname,groupdescription,toadduser);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.deletegroupselected();
  });

  it('As super admin user, should be able to create group publicly', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.creategroups(groupname,groupdescription,toadduser);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.deletegroupselected();
  });

  it('As super admin user, should be able to edit group ', () => {
    Login.validLogin(admin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.editgroupselected();
  });

  it('As user, should be able to delete groups', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.deletegroupselected();
  });

  it('As user, should be able to leave group', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.leavegroupselected();
  });

  it('As user, should be able to change group photo', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.creategroups(groupname,groupdescription,toadduser);
    Viewprofile.changeuploadphoto(filesToUpload1);
  });

  it('As user, should be able to change background color', () => {
    Login.validLogin(superAdmin);
    TopNavBar.clickProfileMenuByText("Groups");
    Viewprofile.creategroups(groupname,groupdescription,toadduser);
    Viewprofile.changeuploadphoto(filesToUpload1);
  });

})