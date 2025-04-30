import Common from "./common";


class Gallery {
    constructor() {
        this.galleryIcon = ".ms-icon-squares";
        this.verifyGallery = ".s-gallery__sortBy";
        this.ellipsisButton = ".c-media-card-dropdown__button";
        this.removeButton = ".ms-icon-notice-filled";
        this.verifyBreadCrumbTitle = ".breadcrumb-item";
        this.proofingButton = ".ms-icon-check-circle";
        this.addGalleryIcon = ".s-dashboard__media .c-media-card .ms-sm-auto .c-card__btn--primary-small";
        this.copyLinkButton = ".ms-icon-link-ext";
        this.likeButton = "div > .c-card__footer > .c-comments > .d-flex.justify-content-between > div > button[title='Like']";
        this.verifyLike = ".ms-1"
        this.downloadButton = ".c-card__btn--primary-small";
        this.contentCards = ".s-gallery .s-gallery__items:nth-of-type(2) [class='c-card c-gallery-media-card mb-0']";
        this.dropdownItemsonEllipsisbtn = ".dropdown-menu.show > div";
        this.promptMessage = ".c-notification";
        this.downloadAsMP4 = "[data-popper-placement='bottom-start'] .tooltip-inner .c-media-card-dropdown__item-title:nth-of-type(1)";
        this.downloadAsSRC = "[data-popper-placement='bottom-start'] .tooltip-inner .c-media-card-dropdown__item-title:nth-of-type(2)";
        this.replaceCoverImagemodal = "div#openVideoThumbnail .modal-body";
        this.uploadImage = ".c-card__btn--primary.u-cursor-pointer";
        this.saveImage = "button[title='Save']";
        this.commentIcon = "div:nth-of-type(1) > .c-card__footer > .c-comments > .d-flex.justify-content-between > div > button[title='Comments']";
        this.commentIconOnDashboard = ".c-card__btns > div:nth-of-type(2)";
        this.commentboxTyped = ".ProseMirror.tiptap";
        this.submitbtndashboard = ".c-comments__send-button";
        this.shareIconbtn = ".ms-icon-share";
        this.sentMailAlert = ".c-alert-modal__title";
        this.commentButton = ".ms-icon-comments-a";
        this.commentBox = ".is-editor-empty";
        this.mediacontentcard = ".plyr__poster";
        this.contentCardsForDashboard = ".s-dashboard__media div:nth-of-type(1) .c-media-card";


    }

    clickGallery() {
        cy.get(this.galleryIcon).first().click();
    }

    verifyGalleryPage() {
        cy.get(this.verifyBreadCrumbTitle).contains('Gallery');
    }

    clickRemoveVideo() {
        cy.get(this.ellipsisButton, { timeout: 10000 }).first().click({ force: true });
        cy.get(this.removeButton, { timeout: 10000 }).first().click({ force: true });    
    }

    addGalleryButton() {
        cy.wait(5000);
        cy.get(this.addGalleryIcon).first().click();
    }

    verifyAddedToGallery(){
        cy.on('window:alert', (text) => {
            expect(text).to.equal('MEDIA IS ADDED TO THE GALLERY')
        });
    }

    clickCopyLink() {
        cy.get(this.ellipsisButton).first().click({force: true});
        cy.get(this.copyLinkButton).first().click();
            cy.on('window:alert', (text) => {
                expect(text).to.equal('LINK COPIED TO CLIPBOARD')
            });
    }

    verifyRemoveToGallery() {
        cy.on('window:alert', (text) => {
            expect(text).to.equal('MEDIA IS REMOVED FROM THE GALLERY')
        });
    }

    clickLikeButton(){
        cy.get(this.contentCards).first().should('be.visible');
        cy.get(this.likeButton).first().click({force:true});
        cy.wait(2000);
    }

    clickcommentIcon() {
        cy.get(this.contentCards).first().should('be.visible');
        cy.get(this.commentIcon).eq(0).click({force:true});
        cy.wait(5000);
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible');
        cy.get(this.commentButton).first().click();
        cy.get(this.commentBox).first().click().type('QA Automation Comment{enter}');
    }

    verifyLikedMedia() {
        cy.get(this.verifyLike).contains('liked this post');
    }

    clickDownloadMedia() {
        cy.get(this.contentCards).first().should('be.visible');
        cy.get(this.downloadButton).eq(2).click();
    }

    clickShareMedia() {
        cy.get(this.contentCards).first().should('be.visible');
        cy.get(this.shareIconbtn).first().click({force:true});
    }

    clickExternalLink() {
        cy.get(this.contentCards).first().should('be.visible');
        cy.get(this.ellipsisButton).first().click({force:true});
        cy.get(this.dropdownItemsonEllipsisbtn).eq(1).click();
        cy.get(this.promptMessage).should('be.visible');

    }

    clickDownloadMP4() {
        cy.get(this.contentCards).first().should('be.visible');
        cy.get(this.ellipsisButton).first().click({force:true});
        cy.get(this.dropdownItemsonEllipsisbtn).eq(2).trigger('mouseover');
        cy.get(this.downloadAsMP4).click();
    }

    clickDownloadSRC() {
        cy.get(this.contentCards).first().should('be.visible');
        cy.get(this.ellipsisButton).first().click({force:true});
        cy.get(this.dropdownItemsonEllipsisbtn).eq(2).trigger('mouseover');
        cy.get(this.downloadAsSRC).click();
    }

    clickDownloadTranscript() {
        cy.get(this.contentCards).first().should('be.visible');
        cy.get(this.downloadButton).eq(3).click();
    }
    

    clickReplaceCoverImage(mediaFiles) {
        cy.get(this.contentCards).first().should('be.visible');
        cy.get(this.ellipsisButton).first().click({ force: true });
        cy.get(this.dropdownItemsonEllipsisbtn)
            .contains('Replace cover image')
            .click();
        cy.get(this.replaceCoverImagemodal).should('be.visible');
        this.uploadFilesPictures(mediaFiles);
    }    

    uploadFilesPictures(mediaFiles) {    
        mediaFiles.forEach(file => {
            cy.get(this.uploadImage).selectFile("./cypress/fixtures/" + file.path, {
                force: true
            })
            cy.get(this.saveImage).click();
            cy.wait(3000);
        });
    }

    verifySharedMedia() {
        cy.get(this.sentMailAlert).contains('StudioMail Sent');
    }
    contentMediaTitle(title) {
        let retIndex = 0;
        cy.get(this.contentCardsForDashboard).each(($el, index, $list) => {
            if ($el.text().includes(title)) {
                retIndex = index;
            } 
        })
        return retIndex; 
    }

    getuploadedContent(contenttitle) {
        cy.get(this.mediacontentcard).first().scrollIntoView().should('be.visible');
        var index = this.contentMediaTitle(contenttitle);
        cy.wait(3000);
    }

}

export default new Gallery;