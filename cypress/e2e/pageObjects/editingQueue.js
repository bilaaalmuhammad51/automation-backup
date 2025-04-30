class EditingQueue {
  constructor() {

    this.organizationFilter = ".c-dropdown__btn-text";
    this.organizationSearch = ".c-input";
    this.authorSearch = "th:nth-of-type(3) > .c-dropdown > .c-dropdown__body  .c-input";
    this.organizationName = "[value='Mark QA Organization1']";
    this.organizationmodal = "th:nth-of-type(3) > .c-dropdown > .c-dropdown__body";
    this.organizationBody = "tbody > tr > td:nth-of-type(2)";  
    this.authorFilter = "th:nth-of-type(3) > .c-dropdown > .c-dropdown__btn > .c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-angle-down.u-font-size-13";
    this.authorName = "th:nth-of-type(3) > .c-dropdown > .c-dropdown__body  .c-input";
    this.authorSelected = "div#author-dropdown";
    this.sortSubmit = ".c-dropdown__btn.s-editing-queue__thead-group-item.s-editing-queue__thead-group-item--first";
    this.projContentTitle = "[class] tr .s-editing-queue__title-row";
    this.claimbtn = "[class] tr .s-editing-queue__button--narrow";
    this.masterTemplatesModal = ".c-alert-modal__body.modal-body";
    this.leaveComment = "#proofingAddCommentContainer .ProseMirror";
    this.elipsisDropdown = ".dropdown-menu.show";
    this.copyLinkbtn = ".dropdown-menu.show > button:nth-of-type(1)";
    this.elipsisIcon = "tr> .ps-2.py-0.s-editing-queue__col-narrow > .d-flex.dropdown.justify-content-center.s-editing-queue__dropdown > .btn.s-editing-queue__dropdown-button";
    this.rejectbtn = ".dropdown-menu.show > button:nth-of-type(2)";
    this.assignUserLink = "tr > td:nth-of-type(9) > .mx-auto.px-0.s-editing-queue__button.s-editing-queue__button--unstyled";
    this.searchUserToAssign = ".c-input__wrapper.mb-2 > .c-input";
    this.selectedEditor = ".c-assign-modal__assignee-btn";
    this.inEditingTabPage = ".c-tab-button-wrapper.d-sm-flex.mb-2 > a:nth-of-type(2)";
    this.inCompletedTabpage = ".c-tab-button-wrapper.d-sm-flex.mb-2 > a:nth-of-type(5)";
    this.downloadMediaIcon = "tr > td:nth-of-type(8) > .mx-auto.s-editing-queue__button.s-editing-queue__button--blue";
    this.downloadCSV = ".c-card__btn.c-card__btn--mid.c-card__btn--primary.m-0.u-cursor-pointer";
    this.viewIcon = ".ms-icon-eye-alt";
  }


  singleFiltering(orgname)
  {
    cy.get(this.organizationFilter).contains('Organization').click();
    cy.get(this.organizationSearch).first().click().type(orgname);
    cy.get(this.organizationName).click({scrollBehavior: "center",force: true});
    cy.get(this.organizationBody).eq(1).click({force:true});
  }

  multipleFiltering(orgname) {
    cy.get(this.organizationFilter).contains('Organization').click();
    cy.get(this.organizationSearch).first().click().type(orgname);
    cy.get(this.organizationName).click();
    cy.get(this.organizationFilter).contains('Author').click({force:true});
    cy.get(this.authorSearch).type('Marknew Superadmin');
    cy.get(this.authorSelected).click({force:true});
    cy.get(this.organizationBody).eq(1).click({force:true});
  }

  sortSubmittedDateColumn() {
    cy.get(this.sortSubmit).click({scrollBehavior: "center"});
  }

  clickViewIcon() {
    cy.get(this.viewIcon).first().click({force:true});
  }

  claimingContent() {
    cy.get(this.projContentTitle).last().scrollIntoView().should('be.visible');
    cy.get(this.claimbtn).last().click({scrollBehavior: "center"});
    cy.wait(10000);
    cy.get(this.masterTemplatesModal).should('be.visible');
  }

  copyLinkContent() {
    cy.get(this.projContentTitle).last().scrollIntoView().should('be.visible');
    cy.get(this.elipsisIcon).last().click({scrollBehavior: "center"});
    cy.get(this.elipsisDropdown).should('be.visible');
    cy.get(this.copyLinkbtn).click({force:true});
  }

  rejectLinkbtn() {
    cy.get(this.projContentTitle).last().scrollIntoView().should('be.visible');
    cy.get(this.elipsisIcon).last().click({scrollBehavior: "center"});
    cy.get(this.elipsisDropdown).should('be.visible');
    cy.get(this.rejectbtn).click({scrollBehavior: "center"});
  }

  assigningUser(editorname) {
    cy.get(this.projContentTitle).last().scrollIntoView().should('be.visible');
    cy.get(this.assignUserLink).last().click({scrollBehavior: "center"});
    cy.wait(3000);
    cy.get(this.searchUserToAssign).type(editorname, {scrollBehavior: "center"});
    cy.get(this.selectedEditor).click({scrollBehavior: "center"});
  }

  inEditingTab() {
    cy.get(this.inEditingTabPage).click({scrollBehavior: "center"});
    cy.wait(10000);
  }

  inCompletedTab() {
    cy.get(this.inCompletedTabpage).click({scrollBehavior: "center"});
    cy.wait(5000);
  }

  downloadMediaonCompletedTab() {
    cy.get(this.projContentTitle).last().scrollIntoView().should('be.visible');
    cy.get(this.downloadMediaIcon).last().click();

  }

  downloadCSVfile() {
    cy.get(this.downloadCSV).click({scrollBehavior: "center"});
  }

}
export default new EditingQueue;