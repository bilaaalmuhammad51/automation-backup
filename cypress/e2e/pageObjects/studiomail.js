import Common from "./common";

class StudioMail {
    constructor() {
        this.subject = "[class='m-0'] .form-control";
        this.recipientsInput = "[class='w-100'] .ti-new-tag-input"
        this.recipients = "[class='w-100'] .position-relative"; 
        this.uploadRecipientsCSV ="label[title='Upload CSV']";
        this.completeButton = ".ti-autocomplete";
        //this.btnRecordVideo = ".c-card-request__footer-btn.c-card-request__footer-btn--record.w-100";
        this.btnUploadVideo =".c-card-request__footer-btn.c-card-request__footer-btn--upload.w-100";
        //this.btnGoToFeed = "button[title='Go to feed']";
        //this.startButtonRec ="button[title='Start recording']";
        //this.stopButtonRec ="button[title='Stop recording']";
        //this.trimmingBtn ="button#dropdownMenuButton-three-dot";
        //this.btnCloseRecord ="button[title='Close record']";
        //this.btnCloseUpload ="button[title='Close upload']";
        //this.btnAddFile =".s-uploader-new__btn";
        this.descriptionModal =".c-editor-content div[contenteditable=true]";
        this.btnSendEmail = ".c-card__btn--primary-reversed";
        this.btnSaveDraft =".c-card__btn--ghost";
        //this.btnEditEmail ="li:nth-of-type(1) > .c-studio-mail-card a[title='Edit email']";
        //this.btnDeleteEmail ="[class] [class='mb-4']:nth-of-type(1) .c-card__btn--ghost";
        this.selectnewRecipients ="[class='w-100'] .ti-new-tag-input";
        this.emailCardBodyText = "[class] [class='mb-4']:nth-of-type(1) .c-studio-mail-card__body-text";
        this.emailCardList =".c-studio-mail-card .c-studio-mail-card__body-text";
        this.studioCardEditBtns = ".c-studio-mail-card a[title='Edit email']";
        this.selectRecipient = ".ti-item";
    }

    sendingEmailByUpload(newsubjectname, recipientname1, upmediastud, descriptioncontent){
        cy.get(this.subject).scrollIntoView().type(newsubjectname, {scrollBehavior: "center"});
        cy.get(this.recipientsInput).type(recipientname1, {force: true, delay: 100});
        cy.get(this.selectRecipient).first().scrollIntoView().click({scrollBehavior: "center"});
        cy.get(this.btnUploadVideo).click({force: true});
        Common.uploadFiles(upmediastud);
        cy.get(this.descriptionModal).type(descriptioncontent, {force: true});
        cy.get(this.btnSendEmail).first().scrollIntoView().click({force: true});
        //cy.get(this.btnSendEmail).scrollIntoView().click({scrollBehavior: "center"});
    }

    sendingEmailwithoutUpload(newsubjectname, recipientname1, descriptioncontent){
        cy.get(this.subject).scrollIntoView().type(newsubjectname, {scrollBehavior: "center"});
        cy.get(this.recipientsInput).type(recipientname1, {force: true, delay: 100});
        cy.get(this.selectRecipient).first().scrollIntoView().click({scrollBehavior: "center"});
        cy.get(this.descriptionModal).type(descriptioncontent, {force: true});
        cy.get(this.btnSendEmail).first().scrollIntoView().click({force: true});
        //cy.get(this.btnSendEmail).scrollIntoView().click({scrollBehavior: "center"});
    }


    sendingMultipleEmails(newsubjectname, recipientname, recipientname1, recipientname2, upmediastud, descriptioncontent){
        cy.get(this.subject).scrollIntoView().type(newsubjectname,  {scrollBehavior: "center"});
        cy.get(this.recipientsInput).type(recipientname1, {force: true, delay: 100});
        cy.get(this.selectRecipient).first().scrollIntoView().click({scrollBehavior: "center"});
        cy.get(this.selectnewRecipients).type(recipientname, {force: true, scrollBehavior: "center"});
        cy.get(this.selectRecipient).first().scrollIntoView().click({scrollBehavior: "center"});
        cy.get(this.selectnewRecipients).type(recipientname2, {force: true, scrollBehavior: "center"})
        cy.get(this.selectRecipient).first().scrollIntoView().click({scrollBehavior: "center"});
        cy.get(this.btnUploadVideo).click({force: true});
        Common.uploadFiles(upmediastud);
        cy.get(this.descriptionModal).scrollIntoView().type(descriptioncontent, {force: true, scrollBehavior: "center"});
        cy.get(this.btnSendEmail).first().scrollIntoView().click({force: true});
    }

    savingEmailsOnDrafts(newsubjectname, recipientname2, upmediastud, descriptioncontent){
        cy.get(this.subject).scrollIntoView().type(newsubjectname,  {scrollBehavior: "center"});
        cy.get(this.recipientsInput).scrollIntoView().type(recipientname2, {force: true, delay: 100});
        cy.get(this.recipientsInput).type("{enter}").click();
        cy.get(this.completeButton, {timeout: 180000}).scrollIntoView().click({scrollBehavior: "center"});
        cy.get(this.btnUploadVideo).click({scrollBehavior: "bottom"});
        Common.uploadFiles(upmediastud);
        cy.get(this.descriptionModal).scrollIntoView().type(descriptioncontent, {scrollBehavior: "bottom"});
        cy.get(this.btnSaveDraft, {timeout: 120000}).first().click({scrollBehavior: "bottom"});
    }

    editingDraftsEmails(newsubjectname,recipientname2,recipientname1,newsubjectname1){  
      var index = this.getSubjectIndex(this.emailCardList, newsubjectname);
      cy.get(this.emailCardList).eq(index).scrollIntoView().should('be.visible').should("have.text", newsubjectname).click({scrollBehavior: "center"});
      cy.get(this.studioCardEditBtns).eq(index).click({scrollBehavior: "center"});
      cy.url().should("contain", "/edit");
      cy.get(this.subject).scrollIntoView().clear({force: true}).type(newsubjectname1, {scrollBehavior: "center"});
      cy.get(this.recipients).contains(recipientname2);
      cy.get(this.selectnewRecipients).scrollIntoView().type(recipientname1, {delay: 100, scrollBehavior: "center"});
      cy.get(this.completeButton).click({scrollBehavior: "center"});
      cy.get(this.btnSaveDraft, {timeout: 120000}).first().click({scrollBehavior: "bottom"});
    }

    sendingEmailsFromDrafts(newsubjectname){
      var index = this.getSubjectIndex(this.emailCardList, newsubjectname);
      cy.get(this.emailCardList).eq(index).scrollIntoView().should('be.visible').should("have.text", newsubjectname).click({scrollBehavior: "center"});
      cy.get(this.studioCardEditBtns).eq(index).click({scrollBehavior: "center"});
      cy.url().should("contain", "/edit");
      cy.get(this.btnSendEmail, {timeout: 120000}).first().click({scrollBehavior: "bottom"});
    }

    getSubjectIndex(objectParent, subject){
      let retIndex = 0;
      cy.get(objectParent).each(($el, index, $list) => {
          if ($el.text().includes(subject)) {
              retIndex = index;
          } 
      });
      return retIndex;
    }

    sendingEmailwithoutUpload(newsubjectname, recipientname1, descriptioncontent){
        cy.get(this.subject).scrollIntoView().type(newsubjectname, {scrollBehavior: "center"});
        cy.get(this.recipientsInput).type(recipientname1, {force: true, delay: 100});
        cy.get(this.selectRecipient).first().scrollIntoView().click({scrollBehavior: "center"});
        cy.get(this.descriptionModal).type(descriptioncontent, {force: true});
        cy.get(this.btnSendEmail).first().scrollIntoView().click({force: true});
        //cy.get(this.btnSendEmail).scrollIntoView().click({scrollBehavior: "center"});
    }

    // inputTitlesDescriptionStud(newsubjectname)
    // {
    //     cy.get(this.subject).type(newsubjectname);
        
    // }

    // uploadCSVFiles(mediaFiles,descriptioncontent){    
    //     mediaFiles.forEach(file => {
    //         cy.get(this.uploadRecipientsCSV).selectFile("./cypress/fixtures/" + file.path, {
    //             force: true
    //         })
    //         cy.get(this.recipients).should("contain.text", file.path);
    //     });
    //     cy.get(this.btnUploadVideo).click();
    //     Common.uploadFiles(upmediastud);
    //     cy.get(this.descriptionModal).type(descriptioncontent);
    // }
}
export default new StudioMail;