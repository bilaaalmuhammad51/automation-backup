import TopNavBar from "../../e2e/pageObjects/topNavBar";

class BrandBooks {
  constructor() {   
    this.createbrandbooksicon = "[class='s-design-studio__navigation-link u-button-unstyled w-100']";
    this.brandbooknameinput = ".mt-3.mt-md-0.px-3.px-sm-4.s-design-studio__card > .c-editable-name > .c-editable-name__text";
    this.brandbooksnamelist = "div#navigationCollapse > ul:nth-of-type(1) > li";
    this.editIconbutton = ".mt-3.mt-md-0.px-3.px-sm-4.s-design-studio__card > .c-editable-name > button[title='Edit']";
    this.savebutton = ".ms-auto.c-card__btn--primary-reversed";
    this.messageprompt = ".c-notification__body-wrap";
    this.ellipsisIcondropdown = ".ms-auto > .btn";
    this.duplicateButton = ".dropdown-menu.show > div:nth-of-type(3)";
    this.deleteButton = ".dropdown-menu.show > div:nth-of-type(4)";
    this.navigateLogoAnchor = "ul:nth-of-type(2) > li";
    this.uploadLogoicon = "div:nth-of-type(2) > .s-design-studio__logo-pick";
    this.colorInput = "div:nth-of-type(5) > .mt-2.s-design-studio__palette-colors > .s-design-studio__palette-color-picker";
    this.colortextbox = "[data-inline] [type='text']";
    this.fontuploadicon = "div:nth-of-type(8) > .c-dropdown.s-design-studio__font-dropdown > .mt-3.s-design-studio__font-input-wrapper > .btn.c-card__btn.c-card__btn--mid.c-card__btn--primary.m-0.mt-3.mt-sm-0.s-design-studio__upload-btn.u-cursor-pointer.u-font-size-14";
    this.confirmModal = ".c-alert-modal__body";
    this.yesConfirmandUpload = "#AlertModal > .modal-dialog > .modal-content > .modal-body > .c-alert-modal__button-container > .c-alert-modal__button2";
    this.graphicElementsbtn = "div:nth-of-type(11) > .s-design-studio__logo-pick";
    this.imageryiconbtn = "div:nth-of-type(13) > .s-design-studio__logo-pick";
    this.toneandvoice = "div:nth-of-type(15) > div > .c-editor-content > div:nth-of-type(1)";
    this.compliancetxt = "div:nth-of-type(16) > div > .c-editor-content > div:nth-of-type(1)";
    this.introbtn = "div:nth-of-type(1) > .mt-2.s-design-studio__upload-wrap > .flex-column.s-design-studio__upload.s-design-studio__upload_picture";
    this.outrobtn = "div:nth-of-type(2) > .mt-2.s-design-studio__upload-wrap > .flex-column.s-design-studio__upload.s-design-studio__upload_picture";
    this.musicuploadbtn = ".s-uploader-new__drop-section__title";
    this.uploadmusiciconbtn = "[class='s-design-studio__upload-wrap mt-3'] .s-design-studio__upload";
    this.templatesuploadbtn = ".btn.c-card__btn.c-card__btn--mid.c-card__btn--primary.m-0.mt-3.mt-sm-0.s-design-studio__upload-btn.u-cursor-pointer.u-font-size-14";
    this.examplesuploadbtn = "div:nth-of-type(1) > .mt-2.s-design-studio__upload-wrap > .flex-column.s-design-studio__upload.s-design-studio__upload_picture";
    this.deletelogoupload = ".s-design-studio__remove-logo.s-design-studio__utility-button";
    this.deletecoloruplaod = "div:nth-of-type(5) > .mt-2.s-design-studio__palette-colors > div > .d-flex.dropdown.justify-content-center.s-design-studio__color-menu.s-editing-queue__dropdown";
    this.deletecoloritem = ".dropdown-menu.show > button:nth-of-type(2)";
    this.deletefontupload = "div > .align-items-center.c-uploaded-file.c-uploaded-file_doc.c-uploaded-file_extended.d-flex.mt-3 > .c-uploaded-file__buttons-container > button[title='Remove'] > .d-block";
    this.deletegraphicupload = "div:nth-of-type(11) > div > .s-design-studio__logo-picture > .s-design-studio__remove-logo.s-design-studio__utility-button > .d-block > path";
    this.deleteimageryupload = ":nth-child(28) > .s-design-studio__logo-picture-wrap > .s-design-studio__logo-picture > .s-design-studio__utility-button";
    this.deleteintroupload = "div:nth-of-type(1) > .mt-2.s-design-studio__upload-wrap > .s-design-studio__upload-video-container > button[title='Remove media']";
    this.deleteoutroupload = "div:nth-of-type(2) > .mt-2.s-design-studio__upload-wrap > .s-design-studio__upload-video-container > button[title='Remove media']";
    this.deletemusicupload = ".ms-2.s-design-studio__utility-button";
    this.deletetemplateupload = "[class='c-uploaded-file d-flex align-items-center mt-3'] .c-uploaded-file__button";
    this.deleteexampleupload = "div:nth-of-type(29) > div > .mt-2.s-design-studio__upload-wrap > .s-design-studio__upload-video-container > button[title='Remove media']";
    this.alertmodalprompt = ".c-alert-modal__body.modal-body";
    this.confirmandUpload = ".c-alert-modal__button2";
    

  }

    createNewBranbooks(){
        cy.get(this.createbrandbooksicon).click();
        cy.wait(5000);
        cy.get(this.brandbooksnamelist).last().click();
        cy.get(this.editIconbutton).trigger("mouseover").click();
        cy.get(this.brandbooknameinput).clear();
        cy.get(this.messageprompt).invoke('show').should('be.visible');
        cy.get(this.brandbooknameinput).type("Automation Brand Book Testing");
    }

    duplicateCreatedBrandbooks() {
        cy.get(this.brandbooksnamelist).last().click();
        cy.get(this.ellipsisIcondropdown).click();
        cy.get(this.duplicateButton).click();
        //cy.get(this.messageprompt).should('be.visible');
    }

    deleteDuplicatedBrandbooks() {
        this.navigateAutomationBrandBooks;
        cy.get(this.ellipsisIcondropdown).click();
        cy.get(this.deleteButton).click();
        cy.get(this.alertmodalprompt).should('be.visible');
        cy.get(this.yeslinkdeletebrand).click();
    }

    navigatebrandbooknamelist() {
        cy.get(this.brandbooksnamelist).last().click();
    }

    navigateLogoicon() {
        cy.get(this.navigateLogoAnchor).eq(0).click();
        cy.wait(5000);
    }

    navigatecolorPaletteicon() {
        cy.get(this.navigateLogoAnchor).eq(1).click();
        cy.wait(5000);
    }

    navigateFontIcon() {
        cy.get(this.navigateLogoAnchor).eq(2).click();
        cy.wait(5000);
    }

    navigateElementIcon() {
        cy.get(this.navigateLogoAnchor).eq(3).click();
        cy.wait(5000);
    }

    navigateImageryIcon() {
        cy.get(this.navigateLogoAnchor).eq(4).click();
        cy.wait(5000);
    }

    navigateVoiceandToneIcon() {
        cy.get(this.navigateLogoAnchor).eq(5).click();
        cy.wait(5000);
    }

    navigateLegalCompIcon() {
        cy.get(this.navigateLogoAnchor).eq(6).click();
        cy.wait(5000);
    }

    navigateIntroOutroIcon() {
        cy.get(this.navigateLogoAnchor).eq(7).click();
        cy.wait(5000);
    }

    navigateMusicIcon() {
        cy.get(this.navigateLogoAnchor).eq(8).click();
        cy.wait(5000);

    }
    navigatetemplatesIcon() {
        cy.get(this.navigateLogoAnchor).eq(9).click();
        cy.wait(5000);
    }
    navigateExamplesIcon() {
        cy.get(this.navigateLogoAnchor).eq(10).click();
        cy.wait(5000);
    }

    navigateExternalAssetIcon() {
        cy.get(this.navigateLogoAnchor).eq(11).click(); 
        cy.wait(5000);
    }

    navigateAutomationBrandBooks() {
        cy.get(this.brandbooksnamelist).contains('Automation Brand Book Testing').click();
    }

    uploadingFilesonbrand(brandbookFiles){
        brandbookFiles.forEach(file => {
            cy.get(this.uploadLogoicon).first().selectFile("./cypress/fixtures/" + file.path, {
                force:true
            })
            cy.get(this.messageprompt).should('be.visible');
            cy.wait(3000);
            
        });
    }

    uploadingFilesonFont(brandbookFiles) {
        brandbookFiles.forEach(file => {
            cy.get(this.fontuploadicon).selectFile("./cypress/fixtures/" + file.path, {
                force:true
            })
            cy.wait(5000);
        });
        cy.get(this.confirmModal).should('be.visible');
        cy.get(this.confirmandUpload).contains("Confirm and Upload").click({force:true});
        cy.get(this.messageprompt).should('be.visible');
    }

    uploadingFilesonGraphicElements(brandbookFiles) {
        brandbookFiles.forEach(file => {
            cy.get(this.graphicElementsbtn).selectFile("./cypress/fixtures/" + file.path, {
                force:true
            })
            cy.wait(3000);
            
        });
    }

    uploadingFilesonImagery(brandbookFiles) {
        brandbookFiles.forEach(file => {
            cy.get(this.imageryiconbtn).selectFile("./cypress/fixtures/" + file.path, {
                force:true
            })
            cy.wait(3000);
            
        });
    }

    uploadingIntro(brandbookFiles) {
        brandbookFiles.forEach(file => {
            cy.get(this.introbtn).eq(0).selectFile("./cypress/fixtures/" + file.path, {
                force:true
            })
            cy.wait(3000);
            
        });
    }

    uploadingOutro(brandbookFiles1) {
        brandbookFiles1.forEach(file1 => {
            cy.get(this.outrobtn).selectFile("./cypress/fixtures/" + file1.path, {
                force:true
            })
            cy.wait(3000);
            
        });
    }

    uploadMusicFiles(brandbookFiles) {
        brandbookFiles.forEach(file1 => {
            cy.get(this.musicuploadbtn).first().contains('Add new song').click({ force: true });
            cy.get(this.uploadmusiciconbtn).selectFile("./cypress/fixtures/" + file1.path, {
                force:true
            })
            cy.get(this.confirmModal).should('be.visible');
            cy.get(this.alertmodalprompt).contains("Confirm and Upload").click();
            cy.get(this.messageprompt).should('be.visible');
        });
    }
    

    uploadTemplatesFiles(brandbookFiles) {
        brandbookFiles.forEach(file1 => {
            cy.get(this.templatesuploadbtn).last().selectFile("./cypress/fixtures/" + file1.path, {
                force:true
            })
            cy.wait(3000);
            
        });
    }

    uploadexamplsFiles(brandbookFiles) {
        brandbookFiles.forEach(file => {
            cy.get(this.examplesuploadbtn).first().selectFile("./cypress/fixtures/" + file.path, {
                force:true
            })
            cy.wait(3000);
            
        });
    }

    uploadinglogo(brandbookFiles) {
        cy.get(this.uploadLogoicon).first().click();
        this.uploadingFilesonbrand(brandbookFiles);
    }

    uploadingColorPalette() {
        cy.get(this.colorInput).click();
        cy.get(this.colortextbox).type("#3b2d2d{enter}");
        cy.get(this.messageprompt).should('be.visible');
    }

    uploadingFont(brandbookFiles) {
        cy.get(this.fontuploadicon).first().click({force:true});
        this.uploadingFilesonFont(brandbookFiles);
    }

    uploadingGraphicElements(brandbookFiles) {
        cy.get(this.graphicElementsbtn).click();
        this.uploadingFilesonGraphicElements(brandbookFiles);
        cy.get(this.messageprompt).should('be.visible');
    }

    uploadingImagery(brandbookFiles) {
        cy.get(this.graphicElementsbtn).click();
        this.uploadingFilesonImagery(brandbookFiles);
        cy.get(this.messageprompt).should('be.visible');
    }

    getiingtoneandcomplianceinput() {
        cy.get(this.toneandvoice).type("For testing only");
        cy.get(this.compliancetxt).type("For testing only");
    }

    uploadingIntrobrand(brandbookFiles) {
        cy.get(this.introbtn).eq(0).click();
        this.uploadingIntro(brandbookFiles);
        cy.get(this.messageprompt).should('be.visible');
    }

    uploadingOutrobrand(brandbookFiles1) {
        cy.get(this.outrobtn).click();
        this.uploadingOutro(brandbookFiles1);
        cy.get(this.messageprompt).should('be.visible');
    }

    uploadingMusiconBrand(brandbookFiles) {
        this.navigateMusicIcon();
        cy.get(this.musicuploadbtn);
        this.uploadMusicFiles(brandbookFiles);
    }
    

    uploadingTemplatesonBrand(brandbookFiles) {
        cy.get(this.templatesuploadbtn).last().click();
        this.uploadTemplatesFiles(brandbookFiles);
        cy.get(this.messageprompt).should('be.visible');
    }

    uploadingExamplesonBrand(brandbookFiles) {
        cy.get(this.examplesuploadbtn).last().click({force:true});
        this.uploadexamplsFiles(brandbookFiles);
    }

    deletingUploadedLogo() {
        this.navigateLogoicon();
        cy.get(this.deletelogoupload).first().click({force:true});
        cy.get(this.messageprompt).should('be.visible');
    }

    deletingUploadedColorP() {
        this.navigatecolorPaletteicon();
        cy.get(this.deletecoloruplaod).eq(0).click();
        cy.get(this.deletecoloritem).click();
        cy.get(this.messageprompt).should('be.visible');
    }

    deletingUploadedFont() {
        this.navigateFontIcon();
        cy.get(this.deletefontupload).first().click();
        cy.get(this.messageprompt).should('be.visible');
    }

    deletingUploadedGraphic() {
        this.navigateElementIcon();
        cy.get(this.deletegraphicupload).first().click({force:true});
        cy.get(this.messageprompt).should('be.visible');
    }

    deletingUploadedImagery() {
        this.navigateImageryIcon();
        cy.get(this.deleteimageryupload).first().click({force:true});
        cy.get(this.messageprompt).should('be.visible');
    }

    deletingUploadedIntro() {
        this.navigateIntroOutroIcon();
        cy.get(this.deleteintroupload).click({force:true});
        cy.get(this.messageprompt).should('be.visible');
    }

    deletingUploadedOutro() {
        this.navigateIntroOutroIcon();
        cy.get(this.deleteoutroupload).eq(0).click({force:true});
        cy.get(this.messageprompt).should('be.visible');
    }

    deletingUploadedMusic() {
        this.navigateMusicIcon();
        cy.get(this.deletemusicupload).first().click({force:true});
        cy.get(this.messageprompt).should('be.visible');
    }

    deletingUploadedTemplates() {
        this.navigatetemplatesIcon();
        cy.get(this.deletefontupload).last().click({force:true});
        cy.get(this.messageprompt).should('be.visible');
    }

    deletingUploadedExamples() {
        this.navigateExamplesIcon();
        cy.get(this.deleteexampleupload).first().click({force:true});
        cy.get(this.messageprompt).should('be.visible');
    }


}

export default new BrandBooks;