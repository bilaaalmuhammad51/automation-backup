import Common from "./common";
import Proofing from "./proofing";

class Upload {
  constructor() {
      this.titleInput = ".s-uploader-new__extensible-input-wrap-elem";
      this.addFileButton = ".s-uploader-new__btn";
      this.startUploadButton = ".s-uploader-new__submit-btn";
      this.uploadLoading = ".c-loading__body";
      this.confirmationTitle = ".c-summary-modal__title > span";
      this.approverConfirmation = ".c-user-info__name";
      this.approverTitle = ".section-users__title";
      this.mediaTitle = ".c-summary-modal__media-title";
      this.mediaFileName = ".c-uploaded-file__text";
      this.uploadConfirmationButtons = ".c-summary-modal__button";
      this.approverCardName = ".c-select-users__card-name";
      this.approverCardSelected = ".c-select-users__card-indicator";
      this.approvernameCard = ".c-user-info__name-link";
      this.contentnametitle = ".c-title__item";
      this.uploadtagButton = ".c-tags-current__edit-toggle-btn";
      this.uploadtagInput = ".ti-new-tag-input";
      this.tagresult = "li:nth-of-type(1) > .c-tags-current__dropdown-list-button";
      this.selectTag = ".c-tags-current__dropdown-list-button";
      this.typeTag = ".ti-new-tag-input-wrapper";


  }

  createUploadMedia(title, mediaFiles, approver, privacyOption, verifyApproverAutoMe=false) {
      cy.get(this.titleInput).type(title, {scrollBehavior: "center"});
      Common.uploadFiles(mediaFiles);
      if(verifyApproverAutoMe){
        var index = this.getApproverIndex(this.approverCardName, "Me");
        cy.wrap(index).should("eq", 0)
        cy.get(this.approverCardName).eq(index).as("approverName");
        cy.get('@approverName').scrollIntoView()
        cy.get('@approverName').should("contain.text", "Me");

        cy.get(this.approverCardSelected).eq(index).as("approveCard");
        cy.get('@approveCard').should("have.class", "active");
      }
      cy.get(this.uploadtagButton).first().click();
      cy.get(this.uploadtagInput).first().click().type('QA Automation Tag');
      cy.get(this.tagresult).click();
      Common.searchSelectApprover(approver);
      Common.verifyApprovers(approver);
      Common.selectAndVerifyPrivacyMedia(privacyOption);
      cy.get(this.startUploadButton).click({force:true});
      cy.get(this.uploadLoading).should("exist");
  }

  createUploadMediaForSA(title, mediaFiles, approver, privacyOption, verifyApproverAutoMe=false) {
    cy.get(this.titleInput).type(title, {scrollBehavior: "center"});
    Common.uploadFiles(mediaFiles);
    if(verifyApproverAutoMe){
      var index = this.getApproverIndex(this.approverCardName, "Me");
      cy.wrap(index).should("eq", 0)
      cy.get(this.approverCardName).eq(index).as("approverName");
      cy.get('@approverName').scrollIntoView()
      cy.get('@approverName').should("contain.text", "Me");

      cy.get(this.approverCardSelected).eq(index).as("approveCard");
      cy.get('@approveCard').should("have.class", "active");
    }
    cy.get(this.uploadtagButton).first().click();
    cy.get(this.uploadtagInput).first().click().type('QA Automation Tag');
    cy.get(this.tagresult).click();
    Common.searchAdminSelectApprover(approver);
    Common.verifyApprovers(approver);
    Common.selectAndVerifyPrivacyMedia(privacyOption);
    cy.get(this.startUploadButton).click({force:true});
    cy.get(this.uploadLoading).should("exist");
}

  createUploadMediaMS(title, mediaFiles, approver, privacyOption, verifyApproverAutoMe=false) {
    cy.get(this.titleInput).type(title, {scrollBehavior: "center"});
    Common.uploadFiles(mediaFiles);
    if(verifyApproverAutoMe){
      var index = this.getApproverIndex(this.approverCardName, "Me");
      cy.wrap(index).should("eq", 0)
      cy.get(this.approverCardName).eq(index).as("approverName");
      cy.get('@approverName').scrollIntoView()
      cy.get('@approverName').should("contain.text", "Me");

      cy.get(this.approverCardSelected).eq(index).as("approveCard");
      cy.get('@approveCard').should("have.class", "active");
    }
    cy.get(this.uploadtagButton).first().click({force:true});
    cy.get(this.typeTag).first().click({force:true}).type("QA Automation Tag");
    cy.get(this.selectTag).contains("QA Automation Tag").click({force:true});
    Common.searchSelectApprover(approver);
    Common.verifyApprovers(approver);
    Common.selectAndVerifyPrivacyMedia(privacyOption);
    cy.get(this.startUploadButton).click({force:true});
    cy.get(this.uploadLoading).should("exist");
}

  verifyUploadConfirmation(approver, title) {
      cy.get(this.approvernameCard, { timeout: 120000 }).should('be.visible');
      cy.get(this.contentnametitle).should ('be.visible');
  }


  getApproverIndex(objectParent, approverName){
    let retIndex = 0;
    cy.get(objectParent).each(($el, index, $list) => {
        if ($el.text().includes(approverName)) {
            retIndex = index;
        } 
    });
    return retIndex;
  }
  
}

export default new Upload;