class Dashboard {
    constructor() {
        this.searchButton = ".c-search__input";
        this.verifySearch = ".c-search__dropdown";
        this.inboxButton = ".ms-icon-inbox-new";
        this.verifyInboxPage = ".c-nav-button__title";
        this.userInviteButton = ".ms-icon-user-plus-new";
        this.verifyInviteUserPage = ".c-user-invitations__box-wrap";
        this.galleryButton = ".ms-icon-squares";    
        this.verifyBreadCrumbTitle = ".breadcrumb-item";
        this.profileButton = ".c-navbar__button-content";
        this.verifyProfileDropdown = ".c-navbar__profile";
        this.viewProfileButton = ".c-navbar__profile-btn";
        this.ellipsisButton = ".c-media-card-dropdown__button";
        this.copyLinkButton = ".ms-icon-link-alt";
        this.copyExtLinkButton = ".ms-icon-link-ext";
        this.likeButton = ".ms-icon-like-a";
        this.downloadButton = ".c-card__btn--primary-small";
        this.proofingButton = ".d-flex.ms-3.u-flex-none";
        this.verifyProofing = ".s-proofing__info-btn";
        this.editButton = ".ms-icon-pencil-a";
        this.deleteButton = ".c-media-card-dropdown__delete-icon";
        this.clickTag = ".c-tags-current__title-sub";
        this.clickInputTag = ".ti-new-tag-input";
        this.verifyAddedTags = ".c-tags__tag-text";
        this.saveGalleryButton = ".c-card__btn--primary-small";
        this.accessMediaCard = ".c-media-card";
        this.mediaCardButton = ".c-card__header";
        this.verifyLike = ".ms-1"
        this.commentButton = ".ms-icon-comments-a";
        this.commentBox = ".is-editor-empty";
        this.replyButton = ".c-comments__comment-reply-btn";
        this.maximizeButton = ".plyr__controls__item";
        this.verifyMaximize = ".plyr__poster";
        this.shareButton = ".ms-icon-share";
        this.addSubject = ".c-input";
        this.addEmail = ".ti-valid";
        this.addImage = ".is-editor-empty";
        this.clickSentMail = ".ms-icon-inbox-a";
        this.conversationCopyLinkButton = ".ms-icon-link-alt";
        this.titlewrapper = ".s-proofing__top-title";
        this.downloadAsMP4 = ".c-media-card-dropdown__item-dropdown-link";
        this.downloadAsSRC = ".c-media-card-dropdown__item-dropdown-link";
        this.dropdownItemsonEllipsisbtn = ".dropdown-menu.show > div";
        this.replaceCoverImagemodal = "div#openVideoThumbnail .modal-body";
        this.uploadImage = ".c-card__btn--primary.u-cursor-pointer";
        this.saveImage = "button[title='Save']";
        this.alertmodaldeletion = ".c-alert-modal__body.modal-body";
        this.alertyeslinkdelete = "[class='c-alert-modal__button c-alert-modal__button2 p-0']";
    }

    searchContent(){
        cy.get(this.searchButton).click();
        cy.get(this.searchButton).type('Request{enter}');
        cy.get(this.verifySearch).should('be.visible');
    }

    clickInboxButton(){
        cy.get(this.inboxButton).click();
        cy.get(this.verifyInboxPage).contains('Inbox');
    }

    clickUserButton(){
        cy.get(this.userInviteButton).click();
        cy.get(this.verifyInviteUserPage).should('be.visible');
    }
    
    clickGalleryButton(){
        cy.get(this.galleryButton).click();
        cy.get(this.verifyBreadCrumbTitle).contains('Gallery');
    }

    accessProfile(){
        cy.get(this.profileButton).first().click();
        cy.get(this.verifyProfileDropdown).should('be.visible');
        cy.get(this.viewProfileButton).click();
        cy.get(this.verifyBreadCrumbTitle).contains('Profile information');
    }
    
    clickDownloadButton(){
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible').wait(2000);
        cy.scrollTo('bottom', { duration: 10 });
        cy.get(this.downloadButton).eq(3).click();
    }
    
    clickLikeButton(){
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible').wait(2000);
        cy.scrollTo('bottom', { duration: 10 });
        cy.get(this.likeButton).first().click();
    }

    verifyLikedMedia(){
        cy.get(this.verifyLike).contains('liked this post');
    }
    
    renameMedia(){
        cy.get(this.proofingButton).eq(1).scrollIntoView().click();
        cy.wait(3000);
        cy.get(this.editButton).first().trigger('mouseover').click({force: true});
        cy.get(this.titlewrapper).clear().type(' - Edited Title{enter}');
    }

    clickDeleteButton(){
        cy.get(this.proofingButton).eq(2).scrollIntoView().should('be.visible');
        cy.get(this.ellipsisButton).first().click();
        cy.get(this.deleteButton).first().click();
    }

    verifyMediaDeletion(){
        cy.on('window:alert', (text) => {
            expect(text).to.equal('MEDIA HAS BEEN DELETED')
        });
    }

    addTags(){
        cy.get(this.clickTag).first().click();
        cy.get(this.clickInputTag).first().click().type('QA Automation Tag{enter}');
    }

    verifyTags(){
        cy.get(this.verifyAddedTags).should('exist');
    }

    accessProofing(){
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible');
        cy.get(this.proofingButton).first().click();
    }

    verifyProofingPage(){
        cy.get(this.verifyProofing).should('be.visible');
    }

    addComment(){
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible');
        cy.get(this.commentButton).first().click();
        cy.get(this.commentBox).first().click().type('QA Automation Comment{enter}');
        cy.get(this.replyButton).first().click();
        cy.get(this.commentBox).first().click().type('QA Automation Reply{enter}');
    }

    clickCopyLink(){
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible');
        cy.get(this.ellipsisButton).first().click();
        cy.get(this.conversationCopyLinkButton).first().click();
    }

    verifyCopiedLink(){
        cy.on('window:alert', (text) => {
            expect(text).to.equal('LINK COPIED TO CLIPBOARD')
        });
    }

    clickExternalLink(){
        cy.get(this.proofingButton).eq(5).scrollIntoView().should('be.visible');
        cy.get(this.ellipsisButton).first().click();
        cy.get(this.copyExtLinkButton).first().click();
    }
    
    clickShareMedia(){
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible');
        cy.get(this.shareButton).first().click();
    }

    sendMedia(){
        cy.get(this.addSubject).first().click().type('Sending Email via Automation testing');
        cy.get(this.addEmail).first().click().type('mark_stnd@yopmail.com{enter}');
        cy.get(this.addImage).first().click().type('Message Testing for Automation');
        cy.get(this.clickSentMail).first().click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('STUDIOMAIL SENT');
        });
    }

    clickDownloadMP4() {
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible');
        cy.get(this.ellipsisButton).eq(3).click({force:true});
        cy.get(this.dropdownItemsonEllipsisbtn).eq(2).trigger('mouseover');
        cy.get(this.downloadAsMP4).contains('Download as MP4').click({force:true});
    }

    clickDownloadSRC() {
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible');
        cy.get(this.ellipsisButton).eq(3).click({force:true});
        cy.get(this.dropdownItemsonEllipsisbtn).eq(2).trigger('mouseover');
        cy.get(this.downloadAsSRC).contains('Download as SRC').click({force:true});
    }

    clickReplaceCoverImage(mediaFiles) {
        cy.get(this.proofingButton).eq(0).scrollIntoView().should('be.visible');
        cy.get(this.ellipsisButton).eq(3).click({force:true});
        cy.get(this.dropdownItemsonEllipsisbtn).contains('Replace cover image').click();
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

}
  
export default new Dashboard;
