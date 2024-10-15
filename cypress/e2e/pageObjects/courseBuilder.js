import Upload from "./upload";
import Common from "./common";

class CourseBuilder {
    constructor() {
        this.courseTitle = ".u-border-radius";
        this.courseContent = ".mt-3  .c-editor-content";
        this.btnNextCourse = "button[title='Build course']";
        this.step3Lesson = "[class] div:nth-child(7) .list-unstyled";
        this.uploadButtons = ".list-enter-to [alt='Upload video']";
        this.createMediaRequestButtons = ".list-enter-to [alt='Create media request']";
        this.recordVideoButtons = ".list-enter-to [alt='Record your own video']";
        this.uploadIntoButton1 = "[class] .list-enter-to:nth-of-type(1) [alt='Upload video']";
        this.uploadIntoButton2 = "[class] .list-enter-to:nth-of-type(2) [alt='Upload video']";
        this.uploadIntoButton3 = "[class] .list-enter-to:nth-of-type(3) [alt='Upload video']";
        this.btnSaveFiles = "button[title='Save']";
        this.courseButtons = ".s-course__lesson-btns";
        this.btnSaveDraft = "button[title='Save draft']";
        this.btnSubmitCourse = "button[title='Submit course']";
        this.successBox = "div#AlertModal  .modal-content";
        this.coursesCard = "[class] [class='mb-4']:nth-of-type(1) .s-course__card";
        this.ellipsisIcon = ".c-media-card-dropdown__button";
        this.alertYesModalCont = "[class='c-alert-modal__button c-alert-modal__button2 p-0']";
        this.btnEditCourse = ".s-course__card a[title='View course']";
        this.requestTimeMedia = ".c-datetime.e-validated__border-dangerous.vdatetime.w-100";
        this.dateConfirm = ".vdatetime-popup__actions__button--confirm";
        this.confirmTime = ".vdatetime-popup__actions__button--confirm";
        this.userDropdown = "[class='c-request-new__users-wrap py-3'] .ti-new-tag-input";
        this.additionalNotes ="div:nth-of-type(2) > .c-editor-content";
        this.btnSendRequest = ".justify-content-end .btn-primary";
        this.startRecordingButton = "button[title='Start recording']";
        this.stopRecordingButton = "button[title='Stop recording']";
        this.recAddNotes = "div:nth-of-type(4) > div > .c-editor-content";
        this.editIcons = "li:nth-of-type(2) .s-course__lesson-title-wrap";
        this.editIconsPlaceholder = ".s-course__lesson-title";
        this.inputDateTime = "input#datetimei";
        this.mediaUser = ".position-relative .ti-new-tag-input";
        this.mediaItem = ".ti-item";
        this.courseCards = ".s-course.s-course-card";
        this.editCourseLinkButton = "a[title='Edit course']";
        this.deleteItem = ".dropdown-menu.show > .c-media-card-dropdown__item";
        this.lessonEditButton = "li:nth-of-type(2) .s-course__lesson-title-wrap  img[alt='Edit']";
        this.saveLessonButton = "li:nth-of-type(2) button[title='Save lesson']";
        this.lessonMediaItem = "[class] .list-unstyled .list-enter-to:nth-of-type(1)";
        this.lessonDeleteButton = "button[title='Delete Media']";
        this.privacySection = ".c-privacy-new";
    }

    inputTitleAndDescription (coursetitle,coursecontent,privacyOption){
        cy.get(this.courseTitle).clear({force: true}).type(coursetitle, {scrollBehavior: "center"});
        cy.get(this.courseContent).type(coursecontent, {scrollBehavior: "center"});
        Common.selectAndVerifyPrivacyMedia(privacyOption);
        cy.get(this.btnNextCourse).click({force: true});
    }

    uploadFilesOnIntro(mediafiles){
        cy.get(this.step3Lesson).scrollIntoView().should("contain.text",'Intro');
        cy.get(this.courseButtons).should('be.visible');
        cy.get(this.uploadIntoButton1).scrollIntoView().click({force: true});
        Common.uploadFiles(mediafiles);
        cy.get(this.btnSaveFiles).scrollIntoView().click({force: true});
        cy.get(Upload.uploadLoading).should('exist');
        cy.get(Upload.uploadLoading, {timeout: 120000}).should('not.exist');
    }

    uploadFilesOnLesson1(mediafiles){
        cy.get(this.step3Lesson).scrollIntoView().should("contain.text", 'Lesson 1');
        cy.get(this.courseButtons).should('be.visible');
        cy.get(this.uploadIntoButton2).scrollIntoView().click({force: true});
        Common.uploadFiles(mediafiles);
        cy.get(this.btnSaveFiles).scrollIntoView().click({force: true});
        cy.get(Upload.uploadLoading).should('exist');
        cy.get(Upload.uploadLoading, {timeout: 120000}).should('not.exist');
    }

    uploadFilesOnConclusion(mediafiles){
        cy.get(this.step3Lesson).scrollIntoView().should("contain.text", 'Conclusion');
        cy.get(this.courseButtons).should('be.visible');
        cy.get(this.uploadIntoButton3).scrollIntoView().click({force: true});
        Common.uploadFiles(mediafiles);
        cy.get(this.btnSaveFiles).scrollIntoView().click({force: true});
        cy.get(Upload.uploadLoading).should('exist');
        cy.get(Upload.uploadLoading, {timeout: 120000}).should('not.exist');
        cy.get(this.btnSubmitCourse).scrollIntoView().click({force: true});
        cy.get(this.successBox).should('be.visible');
        cy.wait(5000);
    }

    // requestMediaOnCourses(){
    //     cy.get(this.courseTitle).clear().type("New Course testing1");
    //     cy.get(this.courseContent).clear().type("For testing courses on this page. Will delete once testing is done");
    //     cy.get(this.btnNextCourse).click({force: true});
    //     cy.get(this.step3Lesson).should("contain.text", 'Lesson 1');
    //     cy.get(this.courseButtons).should("be.visible");
    //     cy.get(this.createMediaRequestButtons).eq(0).click({force: true});
    //     cy.get(this.requestTimeMedia).find(this.inputDateTime).click({force: true});
    //     cy.get(this.dateConfirm).click({force: true});
    //     cy.get(this.confirmTime).click({force: true});
    //     cy.get(this.userDropdown).click({force: true});
    //     cy.get(this.mediaUser).type("MarkQA Standard");
    //     cy.get(this.mediaItem).should('have.value',0).click({force: true});
    //     cy.get(this.additionalNotes).clear().type("For Testing only");
    //     cy.get(this.btnSendRequest).click({force: true});
    // }

    getCourseTitleIndex(coursetitle1){
        let retIndex = 0;
        cy.get(this.courseCards).each(($el, index, $list) => {
            if ($el.text().includes(coursetitle1)) {
                retIndex = index;
            } 
        });
        return retIndex;
    }

    saveFromDrafts(coursetitle1){
        var index = this.getCourseTitleIndex(coursetitle1);
        cy.get(this.courseCards).eq(index).scrollIntoView().should('be.visible');
        cy.get(this.btnEditCourse).eq(index).scrollIntoView().click({force: true});
        cy.get(this.editCourseLinkButton).click({force: true});
        cy.get(this.btnSaveDraft).click({force: true});
    }

    deleteCourse(coursetitle1){
        cy.get(this.privacySection).scrollIntoView();
        cy.wait(3000);
        var index = this.getCourseTitleIndex(coursetitle1);
        cy.get(this.courseCards).eq(index).should('be.visible');
        cy.get(this.ellipsisIcon).eq(index).click({force: true, scrollBehavior: "center"});
        cy.get(this.deleteItem).click({scrollBehavior: "center"});
        cy.get(this.successBox).should('be.visible');
        cy.get(this.alertYesModalCont).should("have.text","Yes, delete course").click({force: true});
    }

    editingCourses (coursetitle1,neweditcoursetitle){
        var index = this.getCourseTitleIndex(coursetitle1);
        cy.get(this.courseCards).eq(index).scrollIntoView().should('be.visible');
        cy.get(this.btnEditCourse).eq(index).click({force: true});
        cy.get(this.editCourseLinkButton).scrollIntoView().click({scrollBehavior: "center", force: true});
        cy.get(this.courseTitle).scrollIntoView().clear({force: true}).type(neweditcoursetitle, {force: true});
        cy.get(this.btnSubmitCourse).click({force: true});
    }

    recordCourseLesson(){
        cy.get(this.step3Lesson).scrollIntoView().should("contain.text", 'Lesson 1');
        cy.get(this.courseButtons).should('be.visible');
        cy.get(this.recordVideoButtons).eq(0).click({force: true});
        cy.get(this.startRecordingButton).click({force: true})
        cy.wait(5000);
        cy.get(this.stopRecordingButton).click({force: true});
        cy.get(this.recAddNotes).scrollIntoView().type("For testing new additional notes", {scrollBehavior: "center"});
        cy.get(this.btnSaveFiles).click({force: true});
    }

    editingLessonName(lessonnewname){
        cy.get(this.editIcons).scrollIntoView().should("contain.text", "Lesson 1");
        cy.get(this.lessonEditButton).click({force: true});
        cy.get(this.editIconsPlaceholder).scrollIntoView().clear({force: true}).type(lessonnewname, {scrollBehavior: "center"});
        cy.get(this.saveLessonButton).click({force: true});
    }

    deletingLessonMedia(){
        cy.get(this.lessonMediaItem).scrollIntoView().should('be.visible');
        cy.get(this.lessonDeleteButton).click({force: true});
        cy.get(this.successBox).should('be.visible');
        cy.get(this.alertYesModalCont).should("have.text","Yes, delete course media").click({force: true});
    }

    submittingCourses(){
        cy.get(this.submitCourse).scrollIntoView().click({force: true});
        cy.contains(this.alertModal,'Course updated.').should('be.visible');
    }

    goToCoursesLinkPage(){
        cy.get(this.submitCourse).scrollIntoView().click({force: true});
        cy.contains(this.alertModal,'Course updated.').should('be.visible');
        cy.get(this.goToCoursesLink).click({force: true});
    }

    goBackLink(){
        cy.get(this.submitCourse).scrollIntoView().click({force: true});
        cy.contains(this.alertModal,'Course updated.').should('be.visible');
        cy.get(this.goBacklinkCourse).click({force: true});
    }
}

export default new CourseBuilder;