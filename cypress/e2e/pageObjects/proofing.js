import Common from "../pageObjects/common";

class Proofing {
    constructor() {

        this.contentsOnDashboard = ".s-dashboard__media > div:nth-of-type(3) > div:nth-of-type(1)";
        this.contentTitle = " div:nth-of-type(1) .c-title";
        this.mediacontentcard = ".s-dashboard__media div:nth-of-type(2) .c-media-card";
        this.recordedCards = ".s-dashboard__media > div:nth-of-type(1) > div:nth-of-type(6)";
        this.contentCards = ".s-dashboard__media div:nth-of-type(1) .c-media-card";
        this.proofbtn = ".s-dashboard__media .c-media-card:nth-of-type(1) .c-card__btn--primary";
        this.proofTitle = ".s-proofing__top-title";
        this.videoDicterAssetItems = ".c-editing-request-modal__body > div:nth-of-type(2) > button";
        this.VideoDirectionText = ".c-editing-request-modal__subtitle";
        this.videoDrectionInput = ".tiptap ProseMirror";
        this.stockVideoText = ".c-editing-request-modal__body [class='mb-4']:nth-child(10) .form-control";
        this.anyThingCutText = ".c-editing-request-modal__body [class='mb-4']:nth-child(14) .form-control";
        this.portTrait = ".c-editing-request-modal__orientation-btn.c-editing-request-modal__orientation-btn--portrait";
        this.editRequestbtn = "[class='ms-2']";
        this.AIGeneratedDirection = ".c-editing-assistance__wizard-title";
        this.commenttext = "#proofingAddCommentContainer .ProseMirror";
        this.submitbtnComment = ".ms-2.s-proofing__btn";
        this.commentsbox = "[class='mb-0']";
        this.commentbodyText = ".c-comments__comment-body > .c-comments__comment-text";
        this.projectnamebox = "[class] tr .s-editing-queue__title-row";
        this.assignbutton = "[class] tr:nth-of-type(269) [class='s-editing-queue__button s-editing-queue__button--unstyled mx-auto px-0']";
        this.modalboy = "div#AssignModal  .modal-content";
        this.searchEditorbox = "[class='c-input__wrapper mb-2'] .c-input";
        this.userassigned = "tr .mx-auto.px-0.s-editing-queue__button.s-editing-queue__button--unstyled";
        this.ineditingPanel = ".c-tab-button-wrapper.d-sm-flex.mb-2 > a:nth-of-type(2)";
        this.eyeIcon = "tr .mx-auto.s-editing-queue__button > .d-flex.justify-content-center.ms-icon.ms-icon-eye-alt.u-font-size-16";
        this.EditRequestNow = ".flex-shrink-0.s-proofing__request-revision-btn";
        this.addFilebtn = ".s-proofing__versions-upload-btn";
        this.filepathtxt = ".c-input.mt-2";
        this.startUploadbtn = ".s-uploader-new__submit-btn";
        this.ratingModal = "div#RatingModal  .modal-content";
        this.ratingStar = ".vue-star-rating > span:nth-of-type(4)";
        this.addNotesModal = "#alert-modal-notes";
        this.goBackLink = ".show [class='c-alert-modal__button p-0']";
        this.qcTabs = ".c-tab-button-wrapper.d-sm-flex.mb-2 > a:nth-of-type(3)";
        this.listOfProjectname = ".align-items-center.d-flex.text-start";
        this.claimQCbtn = "tr .mx-auto.s-editing-queue__button.s-editing-queue__button--blue.s-editing-queue__button--narrow";
        this.claimModal = "div#AlertModal  .modal-content";
        this.yesClaimLink = ".c-alert-modal__button2";
        this.speakerModal = "#tooltip-for-commentTypeDropdownPopover > .tooltip-inner";
        this.tryNowbtn = ".s-proofing__comment-dropdown-popover-button";
        this.commentDropdown = ".d-none.d-sm-flex.dropup.s-proofing__comment-dropdown > button#commentTypeDropdown";
        this.commentSelect  = ".dropdown-menu.dropdown-menu-left.s-proofing__comment-dropdown-menu.show > .s-proofing__comment-dropdown-menu-item";
        this.dropdownButton = ".s-proofing__dropdown-button";
        this.arrowleft = ".s-proofing__top-button-back";
        this.trbody = "[class] tbody tr";
        this.selectedAssignUser = ".c-assign-modal__assignee-btn";
        this.editcommentsIcon = ".c-comments-proofing__edit-btn [alt]";
        this.feedbacksortingIcon = ".c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-opposite-arrows.u-font-size-13";
        this.replyCommentsbtn = ".c-comments__comment-reply-btn";
        this.replyCommentBox = ".c-comments__add-comment_reply .ProseMirror";
        this.replySubmitbtn = ".c-editor-content__footer-right [class='s-proofing__btn ms-1']:nth-child(3)";
        this.replyCommenttext = ".c-comments-proofing__comment-body-reply [class='mb-0']";
        this.claimingcheckbox = ".form-check-input";
        this.approvebtn = ".d-flex.justify-content-center.mt-4 > button:nth-of-type(3)";
        this.rejectbtn = ".d-flex.justify-content-center.mt-4 > button:nth-of-type(2)";
        this.profRevisionbtn = ".flex-shrink-0.s-proofing__request-revision-btn";
        this.uploadProgressBar = ".c-loading__body";
        this.submitFeed = ".c-alert-modal__button2";
        this.dropdownItems = ".s-proofing__dropdown-item-title";
        this.yesDeleteAlert = ".c-alert-modal__button";
        this.editCommentBox = ".c-comments__comment-body .ProseMirror.tiptap";
        this.editSubmitbtn = ".c-editor-content__footer-right > button:nth-of-type(2)";
        this.commentIconOnFeed = "div:nth-of-type(1) > .c-card__footer > .c-comments > .c-card__btns > div:nth-of-type(2)";
        this.commentBoxOnFeed = "div:nth-of-type(1) > .c-card__footer > .c-comments > .list-unstyled.mt-3 > .c-comments__form .ProseMirror.tiptap";
        this.commentSubmitbtnOnFeed = ".c-comments__send-button";  
        this.proofingButton = ".c-card__btn-text--proofing";
        this.termsandpolicy = "input#isAcceptTermsAndPrivacy";
        this.hideeditingDirection = ".c-comments-proofing__editing-toggle-btn.mb-2.mt-3.mt-sm-0";
        this.alertModal1 = "div#AlertModal  .modal-content";
        this.startAIassistant = ".c-editing-request-modal__assistance-button_fixed";
        this.brandingBooksButton = ".c-editing-request-modal__video-type-text";
        this.brandingBooksItems = ".c-input__label";
        this.adminOptions = ".c-input__label";
        this.letscreatebtn = ".c-card__btn--mid";
        this.elipsisicon = "[class] tr .s-editing-queue__dropdown-button";
        this.rejectModal = ".c-alert-modal__body.modal-body";
        this.rejectYeslink = "[class='c-alert-modal__button c-alert-modal__button2 p-0']";
        this.commentIcononproofing = ".c-proofing-actions__button_request";
        this.newversion1Upload = ".s-proofing__versions-list li:nth-of-type(1)";
        this.rejectMessagebox = ".c-comments__comment";
        this.rejectcheckbox = ".c-comments__comment-body > button:nth-of-type(1)";
        this.proofingInfo = ".s-proofing__info-btn";
        this.proofingInfoModal = ".c-alert-modal__title";
        this.sortSubmittedColumn = ".c-dropdown__btn-text";
        this.claimQC = ".s-editing-queue__button";
        this.yesButtonClaimQC = ".c-alert-modal__button2";
        this.proofingBackButotn = ".s-proofing__top-button-back";
        this.ineditingIconellipsis = "tr > .ps-2.py-0.s-editing-queue__col-narrow > .d-flex.dropdown.justify-content-center.s-editing-queue__dropdown > .btn.s-editing-queue__dropdown-button";
        this.unassignbutton = ".dropdown-menu.show > button:nth-of-type(2)";
        this.versionItem = ".s-proofing__versions-item-title";
    }

    revisionyeslink() {
        cy.get(this.commentIcononproofing).click();
        cy.get(this.EditRequestNow).click();
        cy.get(this.revisionmodal).should('be.visible');
        cy.get(this.yeslinkrevision).click();
    }

    checkTermsAndPolicy() {
        cy.get('body').then(($body) => {
            // synchronously query from body
            // to find which element was created
            if ($body.find(this.termsandpolicy).length) {
            // input was found, do something else here
            return this.termsandpolicy
            }
        })
        .then((selector) => {
            // selector is a string that represents
            // the selector we could use to find it
            cy.get(selector).scrollIntoView().click({scrollBehavior: "center"});
        })   
    }

    getuploadedContent(contenttitle) {
        cy.get(this.mediacontentcard).first().scrollIntoView().should('be.visible');
        var index = this.contentMediaTitle(contenttitle);
        cy.wait(3000);
        cy.get(this.proofbtn).eq(index).click({force: true});
        cy.wait(6000);
        cy.get('body').click(5, 5);
        cy.get(this.proofTitle).should('be.visible');
    }

    claimingYesLink() {
        cy.get(this.EditRequestNow).click();
        cy.get(this.claimModal).should('be.visible');
        cy.get(this.yesClaimLink).click();
    }

    getCommentTextOnFeed(descriptionComment,contenttitle) {
        cy.get(this.mediacontentcard).scrollIntoView().should('be.visible');
        var index = this.contentMediaTitle(contenttitle);
        cy.wait(3000);
        cy.get(this.commentIconOnFeed).eq(index).click({force: true});
        cy.get(this.commentBoxOnFeed).type(descriptionComment);
        cy.get(this.commentSubmitbtnOnFeed).click({scrollBehavior: "center"});
    }


    getMultipleClicks () {
        const assetItemsCount = 4;
        const clicks = [3, 2, 1];
        clicks.forEach(index => {
            cy.get(this.complimentaryItems).eq(index).click();
        });
    }
    

    AIAssistantButton() {
        cy.get(this.commentIcononproofing).click({force:true});
        cy.get(this.startAIassistant).click();
        cy.wait(3000);
        cy.get(this.brandingBooksButton).contains('Select a brand book').click();
        cy.get(this.brandingBooksItems).contains('Automation Testing Brand Book for Proofing').click();
        cy.get(this.adminOptions).contains("Pre-Edit").click();
        cy.get(this.letscreatebtn).first().click({force:true});
        cy.wait(5000);
    }

    clickingthenewuploadedversion() {
        // cy.get(this.brandbookassetpopup).as('alert');
        // cy.get('@alert').should('be.visible');
        cy.wait(3000);
        cy.get(this.brandbooksbodyoutside).click('topLeft', {force: true });
        cy.get(this.newversion1Upload).click();
        cy.wait(5000);
        cy.get(this.brandbooksbodyoutside).click('topLeft', {force: true });
        cy.get(this.commentIcononproofing).click({force:true});
        cy.get(this.rejectMessagebox).scrollIntoView().should('be.visible');
        cy.get(this.rejectcheckbox).click({force:true});
    }

    // clickingnewversion2()
    // {
    //     cy.get(this.newversion1Upload).click({force:true});
    //     cy.wait(5000);
    //     cy.get(this.brandbooksbodyoutside).click('topLeft', {force: true });
    //     cy.get(this.commentIcononproofing).click({force:true});
    //     cy.get(this.rejectMessagebox).scrollIntoView().should('be.visible');
    //     cy.get(this.rejectcheckbox).click({force:true});
    // }
    
    leaveProofingicon() {
        cy.get(this.arrowleft).click();
        cy.wait(5000);
    }

    leaveComment(comments) {
        cy.wait(3000);
        cy.get(this.commenttext).type(comments,{force: true});
        cy.get(this.submitbtnComment).click({scrollBehavior: "center"});
        cy.get(this.commentsbox).should('be.visible');
    }

    editingComments(commentstoedit) {
        cy.get(this.editcommentsIcon).click({scrollBehavior: "center"});
        cy.get(this.editCommentBox).clear().type(commentstoedit,{force: true});
        cy.get(this.editSubmitbtn).click({scrollBehavior: "center"});

    }

    sortingFeedback() {
        cy.get(this.feedbacksortingIcon).click({scrollBehavior: "center"});

    }

    dowloadMedia() {
        cy.get(this.dropdownButton).scrollIntoView().click({force:true});
        cy.get(this.dropdownItems).contains('Download').click({scrollBehavior: "center"});
    }

    deleteMedia() {
        cy.wait(2000)
        cy.get(this.dropdownButton).scrollIntoView().click({force:true});
        cy.get(this.dropdownItems).contains('Delete').click();
        cy.get(this.yesDeleteAlert).contains('Yes, delete media').click();
    }

    copylink() {
        cy.wait(5000)
        cy.get(this.dropdownButton).scrollIntoView().click({force:true});
        cy.get(this.dropdownItems).contains('Copy link').click();
    }

    leaveFeedback(mediafiles,addnotes) {
        cy.get(this.addFilebtn).click({force:true});
        Common.uploadFiles(mediafiles);
        this.filePathType(mediafiles);
        cy.get(this.ratingModal,{ timeout: 120000 }).should('be.visible');
        cy.get(this.ratingStar).click();
        cy.get(this.addNotesModal).type(addnotes,{force:true});
        cy.get(this.submitFeed).first().click();
        cy.wait(5000);
    }

    leaveFeedbackAfterProofing(mediafiles,addnotes) {
        cy.get(this.addFilebtn).click({force:true});
        Common.uploadFiles(mediafiles);
        this.filePathTypeMS(mediafiles);
        cy.get(this.ratingModal,{ timeout: 120000 }).should('be.visible');
        cy.get(this.ratingStar).click();
        cy.get(this.addNotesModal).type(addnotes,{force:true});
        cy.get(this.submitFeed).first().click();
        cy.wait(5000);
    }

    filePathType(mediaFiles) {    
        mediaFiles.forEach(file => {
            cy.get(this.filepathtxt).type("./cypress/fixtures/" + file.path, {
                force: true
            })
            this.checkTermsAndPolicy();
            cy.get(this.startUploadbtn).click({force:true});
            cy.get(this.uploadProgressBar).should("exist");
            
        });
      }

    filePathTypeMS(mediaFiles) {    
        mediaFiles.forEach(file => {
        cy.get(this.filepathtxt).type("./cypress/fixtures/" + file.path, {
            force: true
        })
        cy.get(this.startUploadbtn).click({scrollBehavior: "center"});
        cy.get(this.uploadProgressBar).should("exist");    
        });
    }

    replyingToCommentsonOtherUser(replymessage) {
        cy.get(this.replyCommentsbtn).click({scrollBehavior: "center"});
        cy.get(this.replyCommentBox).type(replymessage);
        cy.get(this.replySubmitbtn).click({scrollBehavior: "center"});
        cy.get(this.replyCommenttext).should('be.visible');
        
    }

    claimingContent(projectnametitle) {
        cy.get(this.qcTabs).click({scrollBehavior: "center"});
        cy.wait(10000);
        cy.get(this.projectnamebox).last().scrollIntoView().should('be.visible');
        var index = this.getProjectNameTitle(projectnametitle);
        cy.get(this.claimQCbtn).last().click({scrollBehavior: "center"});
        cy.get(this.claimModal).should('be.visible');
        cy.wait(3000);
        cy.get(this.yesClaimLink).contains('Yes, claim QC').click({force:true});
    }

    checkboxclaim() {
        cy.get(this.sortSubmittedColumn).contains('Submitted').click({force:true});
        // cy.get(this.claimQC).contains('Claim QC').click({force:true});
        // cy.get(this.yesButtonClaimQC).contains('Yes, claim QC').click({force:true});
        cy.wait(5000);
        cy.get(this.claimingcheckbox).eq(0).click({scrollBehavior: "center"});
        cy.get(this.claimingcheckbox).eq(1).click({scrollBehavior: "center"});
        cy.get(this.claimingcheckbox).eq(2).click({scrollBehavior: "center"});
        cy.get(this.claimingcheckbox).eq(3).click({scrollBehavior: "center"});
        cy.get(this.claimingcheckbox).eq(4).click({scrollBehavior: "center"});
        cy.get(this.claimingcheckbox).eq(5).click({scrollBehavior: "center"});
        cy.get(this.claimingcheckbox).eq(6).click({scrollBehavior: "center"});
        cy.get(this.claimingcheckbox).eq(7).click({scrollBehavior: "center"});
        cy.get(this.approvebtn).click({force:true});
        cy.wait(3000);
        cy.get(this.proofingBackButotn).click();
        
    }

    checkboxrejectbtn() {
       // cy.get(this.commentIcononproofing).click({force:true});
        cy.get(this.claimingcheckbox).eq(0).click();
        cy.get(this.claimingcheckbox).eq(2).click();
        cy.get(this.claimingcheckbox).eq(4).click();
        cy.get(this.claimingcheckbox).eq(7).click();
        cy.get(this.rejectbtn).click();
        cy.get(this.rejectModal).should('be.visible');
        cy.get(this.rejectYeslink).click();
        cy.wait(2000);
        cy.on('window:alert', (text) => {
            expect(text).to.equal('QUALITY CONTROL DECLINED SUCCESSFULLY')
        });
    }

    clickingRevisionEditbtn() {
        cy.get(this.profRevisionbtn).click({scrollBehavior: "center"});
    }

    selecUserAssigned(projectnametitle) {
        cy.get(this.projectnamebox).last().scrollIntoView().should('be.visible');
        var index = this.getProjectNameTitle(projectnametitle);
        cy.get(this.userassigned).last().click({scrollBehavior: "center"});

    }

    searchUserToAssigned(userlogin) {
        cy.get(this.searchEditorbox).type(userlogin,{force:true});
        cy.wait(3000);
        cy.get(this.selectedAssignUser).click({scrollBehavior: "center"});
        cy.wait(3000);
    }

    unassignuserfromassign(ineditingprojectnametitle)
    {   
        cy.get(this.ineditingPanel).click();
        cy.get(this.projectnamebox).last().scrollIntoView().should('be.visible');
        var index = this.getProjectNameTitle(ineditingprojectnametitle);
        cy.get(this.ineditingIconellipsis).last().click();
        cy.get(this.unassignbutton).click();

    }

    contentMediaTitle(title) {
        let retIndex = 0;
        cy.get(this.contentCards).each(($el, index, $list) => {
            if ($el.text().includes(title)) {
                retIndex = index;
            } 
        })
        return retIndex; 
    }

    getProjectNameTitle(projectnametitle) {
        let retIndex = 0;
        cy.get(this.listOfProjectname).each(($el, index, $list) => {webkitURL
            if ($el.text().includes(projectnametitle)) {
                retIndex = index;
            } 
        })
        return retIndex; 
    }

    accessProofing() {
        cy.scrollTo('bottom', { duration: 5000 });
        cy.get(this.proofingButton).first().click();
        cy.contains('Proofing').should('be.visible');

    }

   verifyProofingPage() {
        cy.get(this.proofingInfo).click({force: true});
        cy.get(this.proofingInfoModal).contains('PROOFING');
   }

   checkOriginal() {
        cy.get(this.versionItem).contains('Original');
   }


}
export default new Proofing