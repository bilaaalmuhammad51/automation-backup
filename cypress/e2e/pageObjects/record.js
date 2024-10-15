import Common from "./common";
class Record {
    constructor() {
      this.videocaptureModal = ".s-video-capture > .modal-body";
      this.requestPermissionbtn = ".mt-5 > .c-card__btn";
      this.startRecordingButton = "button[title='Start recording']";
      this.stopRecordingButton = "button[title='Stop recording']";
      this.recordingTimer = ".s-podcasting-room__control-panel-timer--recording";
      this.tryAgainButton = "button[title='Try again']";
      this.pauseButton = "button[title='Pause']";
      this.threeDotMenuButton = "button#dropdownMenuButton-three-dot"; 
      this.playTimer = ".s-podcasting-room__control-panel-timer";
      this.submitButton = "button[title='Submit']";
      this.recordConfirmationTitle = ".c-record-confirmation-form__title";
      this.titleInput = "input.s-uploader-new__extensible-input-wrap-elem";
      this.additionalNotes = ".ProseMirror.tiptap";
      this.confirmationTitle = ".c-summary-modal__title > span";
      this.approverConfirmation = ".c-user-info__name";
      this.approverTitle = ".section-users__title";
      this.mediaTitle = ".c-summary-modal__media-title";
      this.recordConfirmationButtons = ".c-summary-modal__button";
      this.approverCardName = ".c-select-users__card-name";
      this.approverCardSelected = ".c-select-users__card-indicator";
      this.micButton = "button#dropdownMenuButton-mic";
      this.micOptions = ".s-podcasting-room__control-panel-mic-item";
      this.videoButton = "button#dropdownMenuButton-camera";
      this.videoOptions = ".s-podcasting-room__control-panel-camera-item";
      this.virtualBgButton = "button#dropdownMenuButton-virtual-bg";
      this.virtualBgOptions = ".s-video-capture__virtual-bg-item-title";
      this.loadMoreButton = ".c-divider__title";
      this.tagButton = ".c-tags-current__edit-toggle-btn";
      this.tagInput = ".ti-new-tag-input";
    }
  
    createRecordMedia(audio = true, video = true, background = "Original", title, notes, approver, privacyOption, verifyMe=false){
      //this.requestBrowserPermission();
      this.preSettings(audio, video, background);
      this.startRecording();
      this.stopRecording();
      this.submitRecording();
      this.setRecordConfirmation(title, notes, approver, privacyOption, verifyMe);
    }
    
    createRecordMediaForSA(audio = true, video = true, background = "Original", title, notes, approver, privacyOption, verifyMe=false){
      //this.requestBrowserPermission();
      this.preSettings(audio, video, background);
      this.startRecording();
      this.stopRecording();
      this.submitRecording();
      this.setRecordConfirmationForSA(title, notes, approver, privacyOption, verifyMe);
    }

    requestBrowserPermission(){
      cy.get(this.videocaptureModal).should('be.visible');
      cy.get('body').contains("Request permission", {timeout: 120000}).click();
      cy.get('body').contains("Request permission", {timeout: 120000}).should('not.exist');
    }

    preSettings(audio, video, background){
      if(!audio){
        cy.get(this.micButton).click({force: true});
        cy.get(this.micOptions).contains("Muted").click({force: true});
      }
      else if (audio == "Fake Audio Input 2"){
        cy.get(this.micButton).click({force: true});
        cy.get(this.micOptions).contains(audio).click({force: true});
      }
      else if (!video){
        cy.get(this.videoButton).click({force: true});
        cy.get(this.videoOptions).contains("Audio only").click({force: true});
      }
      else if (video == "Fake Device"){
        cy.get(this.videoButton).click({force: true});
        cy.get(this.videoOptions).contains("Audio only").click({force: true});
        cy.get(this.videoButton).click({force: true});
        cy.get(this.videoOptions).contains("fake_device_0").click({force: true});
      }
      // if (background != "Original"){
      //   cy.get(this.virtualBgButton).click({force: true});
      //   cy.get(this.virtualBgOptions).contains(background).click({force: true});
      // }
    }

    startRecording() {
        //Common.verifyBackToFeed("Go to feed");
        //while (cy.get(this.stopRecordingButton).)
        cy.wait(5000);
        cy.get(this.startRecordingButton).click({scrollBehavior: "center"});
        cy.get(this.stopRecordingButton).should("exist");
        cy.wait(10000);
        cy.get(this.recordingTimer).should("exist");
        cy.get(this.threeDotMenuButton).should("exist");
     }

    stopRecording() {
        cy.get(this.stopRecordingButton).click( {force: true} );
        cy.get(this.tryAgainButton).should("exist");
        cy.get(this.pauseButton).should("exist");
        cy.get(this.threeDotMenuButton).should("exist");
        cy.get(this.playTimer).should("exist");
        cy.get(this.submitButton).should("exist");
    }

    submitRecording() {
        cy.get(this.submitButton).click( {force: true} )
    }
    
    setRecordConfirmation(title, notes, approver, privacyOption, verifyApproverAutoMe){
        cy.get(this.titleInput).clear().type(title, { force: true, delay: 200 } );
        cy.get(this.additionalNotes).clear().type(notes, { force: true } );
        cy.get(this.tagButton).first().click();
        cy.get(this.tagInput).first().click().type('QA Automation Tag{enter}');
        if(verifyApproverAutoMe){
          cy.get(this.approverCardName).first().should("contain.text", "Me");
          cy.get(this.approverCardSelected).first().should("have.class", "active");
        }
        Common.searchSelectApprover(approver);
        Common.verifyApprovers(approver);
        Common.selectAndVerifyPrivacyMedia(privacyOption);
        cy.get("button").contains("Submit video").click( { force: true } );
    }

    setRecordConfirmationForSA(title, notes, approver, privacyOption, verifyApproverAutoMe){
      cy.get(this.titleInput).clear().type(title, { force: true, delay: 200 } );
      cy.get(this.additionalNotes).clear().type(notes, { force: true } );
      cy.get(this.tagButton).first().click();
      cy.get(this.tagInput).first().click().type('QA Automation Tag{enter}');
      if(verifyApproverAutoMe){
        cy.get(this.approverCardName).first().should("contain.text", "Me");
        cy.get(this.approverCardSelected).first().should("have.class", "active");
      }
      Common.searchAdminSelectApprover(approver);
      Common.verifyApprovers(approver);
      Common.selectAndVerifyPrivacyMedia(privacyOption);
      cy.get("button").contains("Submit video").click( { force: true } );
  }
    verifyRecordConfirmation(approver, title){
        cy.get(this.confirmationTitle).should("have.text", "Record confirmation");
        cy.get(this.approverTitle).should("have.text", "To be approved by");
        cy.get(this.approverConfirmation).last().should("contain.text", approver);
        cy.get(this.mediaTitle).should("have.text", title);
        cy.get(this.recordConfirmationButtons).first().should("contain.text", "Go to media");
        cy.get(this.recordConfirmationButtons).last().should("contain.text", "Close");
        cy.get(this.recordConfirmationButtons).first().click({ force: true});
        cy.wait(3000);
    }
  }
  
  export default new Record;