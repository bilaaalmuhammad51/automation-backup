// /// <reference types="cypress" />
// import users from "../../../fixtures/users.json";
// import Login from "../../pageObjects/login";
// import TopNavBar from "../../pageObjects/topNavBar";
// import CourseB from "../../pageObjects/courseBuilder";
// import Common from "../../pageObjects/common";
// import { isPermissionAllowed } from 'cypress-browser-permissions';

// describe(Cypress.env('testEnv') + ' - Course Builder suite', () => {
//   const superAdmin = users[Cypress.env('testEnv')].superAdmin;
//   const admin = users[Cypress.env('testEnv')].admin;
//   const standard = users[Cypress.env('testEnv')].standard;
//   const contributor = users[Cypress.env('testEnv')].contributor;
//   const urlLogin = users[Cypress.env('testEnv')].url + "login";
//   const filesToUpload1= [
//     { path: 'qa_media_upload.mp4', type: 'video/mp4' },
//   ];

//   beforeEach(() => {
//     cy.visit(urlLogin);
//   });
//     let coursetitleSA = "New Testing Course Builder - " + Common.getUTCDateTime();
//     let coursetitleA = "New Testing Course Builder - " + Common.getUTCDateTime();
//     let coursetitleS = "New Testing Course Builder - " + Common.getUTCDateTime();
//     let coursetitleC = "New Testing Course Builder - " + Common.getUTCDateTime();
//     let coursecontent = "For testing courses only";
//     let privacyoption = "MyOrganization";
//     let neweditcoursetitle = " New title for course testing";
//     let lessonNewName = "New lesson testing1";
//     const organizationNameSelected = "Mark QA Organization1";


//   it.only('As super admin user, should be able to create new course', () => {
//     Login.validLogin(superAdmin);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.inputTitleAndDescription(coursetitleSA, coursecontent, privacyoption);
//     CourseB.uploadFilesOnIntro(filesToUpload1);
//     CourseB.uploadFilesOnLesson1(filesToUpload1);
//     CourseB.uploadFilesOnConclusion(filesToUpload1);
//   });

//   it('As admin user, should be able to create new course', () => {
//     Login.validLogin(admin);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.inputTitleAndDescription(coursetitleA, coursecontent, privacyoption);
//     CourseB.uploadFilesOnIntro(filesToUpload1);
//     CourseB.uploadFilesOnLesson1(filesToUpload1);
//     CourseB.uploadFilesOnConclusion(filesToUpload1);
//   });

//   it('As standard user, should be able to create new course', () => {
//     Login.validLogin(standard);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.inputTitleAndDescription(coursetitleS, coursecontent, privacyoption);
//     CourseB.uploadFilesOnIntro(filesToUpload1);
//     CourseB.uploadFilesOnLesson1(filesToUpload1);
//     CourseB.uploadFilesOnConclusion(filesToUpload1);
//   });

//   it('As contributor user, should be able to create new course', () => {
//     Login.validLogin(contributor);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.inputTitleAndDescription(coursetitleC, coursecontent, privacyoption);
//     CourseB.uploadFilesOnIntro(filesToUpload1);
//     CourseB.uploadFilesOnLesson1(filesToUpload1);
//     CourseB.uploadFilesOnConclusion(filesToUpload1);
//   });

//   it('As user, verify able to edit course', () => {
//     Login.validLogin(admin);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.editingCourses(coursetitleA, neweditcoursetitle);
//   });

//   it('As user, verify able to delete course', () => {
//     Login.validLogin(admin);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.deleteCourse(neweditcoursetitle);
//   });

//   it('As user, verify able to save course as draft', () => {
//     Login.validLogin(standard);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.saveFromDrafts(coursetitleS);
//   });

//   it('As user, should be able to record media for Lesson', () => {
//     expect(isPermissionAllowed('camera')).to.be.true;
//     expect(isPermissionAllowed('microphone')).to.be.true;
//     let coursetitle = "New Testing Course Builder - " + Common.getUTCDateTime();
//     Login.validLogin(superAdmin);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.inputTitleAndDescription(coursetitle, coursecontent, privacyoption);
//     CourseB.recordCourseLesson();
//   });

//   it('As user, should be able to edit Lesson name', () => {
//     let coursetitle = "New Testing Course Builder - " + Common.getUTCDateTime();
//     Login.validLogin(superAdmin);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.inputTitleAndDescription(coursetitle, coursecontent, privacyoption);
//     CourseB.editingLessonName(lessonNewName);
//   });

//   it('As user, should be able to delete Lesson', () => {
//     let coursetitle = "New Testing Course Builder - " + Common.getUTCDateTime();
//     Login.validLogin(superAdmin);
//     TopNavBar.selectingOrganization(organizationNameSelected);
//     TopNavBar.clickActionButtonMenuByText("Course Builder");
//     CourseB.inputTitleAndDescription(coursetitle, coursecontent, privacyoption);
//     CourseB.uploadFilesOnIntro(filesToUpload1);
//     CourseB.deletingLessonMedia();
//   });
// });