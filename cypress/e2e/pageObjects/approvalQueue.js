class ApprovalQueue {
    constructor() {
      this.mediaQueuedTitle = ".c-card .c-title__item";
      this.mediaUploaderUsername = ".c-user-info__name";
      this.mediaApproveButton = ".c-card__approve-btn";
      this.mediaDeclineButton = " .c-card__decline-btn";
      this.declineModal = ".c-alert-modal .modal-content";
      this.declineNotes = ".c-alert-modal__notes";
      this.declineyeslink = "[class='c-alert-modal__button c-alert-modal__button2 p-0']";
      this.requestTitle = ".c-questions__item";
      this.conversationQueuedTitle = "div#title-null";
      this.conversationName = " .c-card-user-info__user-name";
      this.conversationcard = "[class] .c-podcast-card";
      this.invitationcard = ".col.col-lg-10 > div:nth-of-type(3)";
      this.editApprovebtn = ".c-card__btn.c-card__btn--reversed.c-card__btn--wide.c-card__status-request-button > .c-card__btn-text.d-md-block.d-none.ms-1";
      

    }

    verifyMediaApprovalQueued(uploaderUser, title) {
        cy.get(this.mediaQueuedTitle, {timeout: 150000}).contains(title).scrollIntoView().should("exist");
        cy.get(this.mediaUploaderUsername).contains(uploaderUser).should("exist");
    }

    verifyConversationApprove(conversationtitle){
        cy.get(this.invitationcard).scrollIntoView().should('be.visible');
        var index = this.conversationTitleIndex(conversationtitle);
        cy.get(this.mediaApproveButton).eq(index).click({force: true});
        cy.contains("Podcast has been approved").should("be.visible");

    }

    mediaApproveClick(title){
        cy.get(this.mediaQueuedTitle).each(($el, index, $list) => {
            if ($el.text() == title) {
                cy.get(this.mediaApproveButton).eq(index).scrollIntoView().click({force: true});
                cy.contains("Media has been approved").should("be.visible");
                cy.contains("Media has been approved", {timeout: 60000}).should("not.exist");
                return
            } 
        })  
    }

    mediaDeclineClick(title){
        cy.get(this.mediaQueuedTitle).each(($el, index, $list) => {
            if ($el.text() == title) {
                cy.get(this.mediaDeclineButton).eq(index).scrollIntoView().click({force: true});
                cy.get(this.declineModal).should('be.visible');
                cy.get(this.declineNotes).type("Testing decline notes");
                cy.get(this.declineyeslink).click();
                
                return
            } 
        })  
    }

    mediaEditandApproveClick(title){
        cy.get(this.mediaQueuedTitle).each(($el, index, $list) => {
            if ($el.text() == title) {
                cy.get(this.editApprovebtn).eq(index).click({force: true});
                return
            } 
        })  
    }

    conversationTitleIndex(title){
        let retIndex = 0;
        cy.get(this.conversationcard).each(($el, index, $list) => {
            if ($el.text().includes(title)) {
                retIndex = index;
            } 
        });
        return retIndex; 
      }

    verifyRequestApprovalQueued(requestorUser, question){
        cy.get(this.requestTitle).contains(question).should("exist");
        cy.get(this.mediaUploaderUsername).contains(requestorUser).should("exist");
    }
  }
  
  export default new ApprovalQueue;