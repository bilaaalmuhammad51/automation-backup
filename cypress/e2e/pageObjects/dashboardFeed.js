class DashboardFeed {
    constructor() {
      this.mediaQueuedTitle = ".c-media-card .c-title";
      this.mediaUploaderUsername = ".c-user-info__name";
      this.mediaApproveButton = ".c-card__approve-btn";
      this.requestTitle = ".c-questions__item";
      this.conversationQueuedTitle = "div#title-null";
      this.conversationName = " .c-card-user-info__user-name";
      
    }

    verifyConversationDashboardFeed(uploaderUser, title) {
        cy.scrollTo('bottom').wait(4000);
        cy.get(this.conversationName).contains(uploaderUser).should("exist");
        cy.get(this.conversationQueuedTitle).each(($el, index, $list) => {
            if ($el.text().includes(title)){
                cy.get(this.conversationQueuedTitle).eq(index).scrollIntoView().should("contain.text", title);
                return
            } 
        })  
    }

    getMediaIndex(element, itemText){
        let retIndex = 0;
        cy.get(element).each(($el, index, $list) => {
            if ($el.text().includes(itemText)) {
                retIndex = index;
            } 
        });
        return retIndex; 
      }
    
    verifyMediaDashboardFeed(uploaderUser, title) {
        var index = this.getMediaIndex(this.mediaUploaderUsername, uploaderUser);
        cy.get(this.mediaUploaderUsername).eq(index).scrollIntoView().should('be.visible');
        cy.get(this.mediaQueuedTitle).each(($el, index, $list) => {
            if ($el.text().includes(title)){
                cy.get(this.mediaQueuedTitle).eq(index).should("contain.text", title);
                return
            } 
        })  
    }

    verifyMediaDashboardFeedFalse(title) {
        cy.get(this.mediaQueuedTitle).contains(title).should("not.exist");
    }

    verifyConversationDashboardFeedFalse(title) {
        cy.contains(title).should("not.exist");
    }
}
  
  export default new DashboardFeed;