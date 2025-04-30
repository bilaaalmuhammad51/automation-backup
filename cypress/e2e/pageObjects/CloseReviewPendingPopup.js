class Pendingreview {
    constructor() {
        this.reviewModal = ".tooltip-inner.u-position-relative";
        this.closebtn = ".c-navbar__tooltip__close-btn";

    }
  
    closeReviewPending() 
    {
      cy.get(this.reviewModal).should('be.visible');
      cy.get(this.closebtn).click();
    }
  }
  
  export default new Pendingreview;