import Common from "./common";

class Inbox {
    constructor() {
        this.inboxIcon = ".c-navbar__icons .justify-content-center:nth-of-type(2)";
        this.likebutton = "div .c-card__btns > div:nth-of-type(1)";
        this.proofingButton = "div .d-flex.ms-3.u-flex-none";
        this.savetoGalleryButton = "div button[title='Note']";
        this.expertrequesttab = ".c-nav-buttons > a:nth-of-type(1)";
        this.sntrequesttab = ".c-nav-buttons > .c-nav-button";
        this.dropwdownElipsis = ".c-card.c-media-card  .c-media-card-dropdown.dropdown.p-0";
        this.elipsisItems = ".dropdown-menu.show > div";
        this.requestCard = "[class] .c-card-request";
        this.requestEllipsis = ".c-media-card-dropdown__circle";
        this.deleterequestbtn = ".dropdown-menu.show > div:nth-of-type(2)";
        this.uploadbtn = "div:nth-of-type(2) > .c-card-request__footer > .c-card-request__footer-btns > .c-card-request__footer-btn.c-card-request__footer-btn--upload";
        this.addfilesbtn = ".s-uploader-new__btn";
        this.termsadgree = "input#isAcceptTermsAndPrivacy";
        this.startupload = ".s-uploader-new__submit-btn";
        this.sentcardrequest =".col.col-lg-10 > div";
        this.ellipsissent = ".c-media-card-dropdown__circle";
        this.sentcopylinkreq = ".dropdown-menu.show > div:nth-of-type(1)";
        this.sentexpertcard = "div > .c-card-request__top.c-card-request__top--expert-request";
        this.remindreqbtn = ".c-media-card-dropdown__item-title";
        this.reassignrequestbtn = ".c-media-card-dropdown__item-title";
        this.reassignrequestmodal = ".c-reassign-request__title";
        this.selectuserdropdown = "#reassign-request-select-user-container .ti-input";
        this.selectuseradmin = ".ti-autocomplete .ti-valid:nth-of-type(8) [class='mb-2 my-item d-flex justify-content-between align-items-center']";
        this.sentrequesttitle = "div > .c-card-request__top .c-sent-content__top-title";
        this.sentcardtop = " .col.col-lg-10 > div > .c-card-request__top .c-sent-content__top-title";
        this.requestforcol = "div  .c-sent-content__users-wrap.c-sent-content__users-wrap--bottom-border-rounded.row > div:nth-of-type(1) > .c-card-user-info__user > .align-items-center.d-flex.flex-column.justify-content-center.text-center > a[title='Go to profile']";
        this.reassignsavebtn = "[class='c-reassign-request__footer-btns mt-3'] .btn-primary";
        this.deleteRequestButton = ".c-media-card-dropdown__delete-icon";

    }

    accessInbox() {
        cy.get(this.inboxIcon).click();
    }

    getsentrequesttitle(senttitle) {
        cy.get(this.sentcardtop).should('exist');
        cy.get(this.sentcardtop).should("have.text", senttitle);
        cy.get(this.requestforcol).eq(0).should('exist').scrollIntoView();   
    }

    likebuttonContent() {
        cy.get(this.likebutton).first().click();
    }

    accessProofingInbox() {
        cy.get(this.proofingButton).first().click();
    }

    saveToGallery() {
        cy.get(this.savetoGalleryButton).first().click();
    }
    
    accessExpertRequest () {
        cy.get(this.expertrequesttab).click();
    }

    accessSentRequest () {
        cy.get(this.sntrequesttab).eq(2).click();
    }

    copyLinkClick() {
        cy.get(this.dropwdownElipsis).first().click();
        cy.get(this.elipsisItems).first().click();
    }

    deletingRequest() {
        cy.get(this.requestCard).first().should('be.visible');
        cy.get(this.requestEllipsis).first().click();
        cy.get(this.deleterequestbtn).click();
    }

    uploadingmediaupload(uploadmediaresponse) {
        cy.get(this.requestCard).first().should('be.visible');
        cy.get(this.requestEllipsis).first().click();
        cy.get(this.uploadbtn).click();
        cy.get(this.addfilesbtn).click({force:true});
        Common.uploadFiles(uploadmediaresponse);
        cy.get('body').then(($body) => {
            if ($body.find(this.termsadgree).length > 0) {
              cy.get(this.termsadgree).click();
            }
          });
        cy.get(this.startupload).click();

    }

    copylinkrequestsent() {
        cy.get(this.sentcardrequest).first().should('be.visible');
        cy.get(this.ellipsissent).first().click();
        cy.get(this.sentcopylinkreq).click();
    }

    remindsentrequest() {
        cy.get(this.ellipsissent).first().click();
        cy.get(this.remindreqbtn).contains('Remind about request by email').click({force:true});
    }

    verifyRemindRequest() {
        cy.on('window:alert', (text) => {
            expect(text).to.equal('REMINDER WAS SUCCESFULLY SENT')
        });
    }

    reassignrequestclick() {
        cy.wait(10000);
        cy.get(this.ellipsissent).first().click({force:true});
        cy.get(this.reassignrequestbtn).contains('Reassign request').click({force:true});
        cy.get(this.reassignrequestmodal).contains('Reassign request').should('be.visible');
        cy.get(this.selectuserdropdown).click().type("Mark");
        cy.get(this.selectuseradmin).click();
        cy.get(this.reassignsavebtn).click();
    }

    deleteRequest() {
        cy.get(this.sentcardrequest).first().should('be.visible');
        cy.get(this.ellipsissent).first().click();
        cy.get(this.deleteRequestButton).first().click();
    }

    verifyDeletedRequest() {
        cy.on('window:alert', (text) => {
            expect(text).to.equal('MEDIA REQUEST HAS BEEN DELETED')
        });
    }

}

export default new Inbox;