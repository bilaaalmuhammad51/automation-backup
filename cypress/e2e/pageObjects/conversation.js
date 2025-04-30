import Common from "./common";
import Pendingreview from "./CloseReviewPendingPopup";
class Conversation {
  constructor() {
      this.conversationMainTitle = ".c-request-new__main-title";
      this.conversationSubject = "input#new-conversation-room-subject";
      this.conversationParticipants = ".c-conversation__user-name";
      this.inviteParticipantsLink = ".c-conversation__user-text";
      this.inputParticipants = ".c-tag-input__user .ti-new-tag-input";
      this.spanParticipants = ".ti-item div.align-items-start span";
      this.createRoomButton = ".c-conversation__btn";
      this.conversationTitle = "div#title-null";
      this.conversationRoom = ".c-card.c-card-room";
      this.conversationCard = ".c-card-room";
      this.conversationUsers = ".c-card-user-info__user-name";
      this.conversationResendLink = "button[title='Resend Invite']";
      this.promptMessageSent = ".vue-notification-group";
      //this.conversationRoomCards = ".c-conversation__step-title";
      this.conversationEllipsisIcon = ".c-media-card-dropdown__button";
      this.conversationEllipsisDropdown = ".dropdown-menu.show";
      this.editRoom = "div:nth-of-type(2) > .dropdown-item";
      this.copyConversationLink = "div:nth-of-type(1) > .dropdown-item";
      this.deleteConversationItem = "div:nth-of-type(3) > .dropdown-item";
      this.saveChangesbtn = ".c-conversation__btn";
      this.alertModal = ".c-alert-modal__button2";
      this.yesAlertModal = ".c-alert-modal__button";
      this.copyLinkbtn = "button[title='Copy invite link'] > span";
      this.enterRoombtn = "div:nth-of-type(3) > div:nth-of-type(2) button[title='Open room']";
      this.testRoomBody = ".s-test-room__body";
      this.testNowbtn = ".s-test-room__footer-btn.s-test-room__footer-btn-loading";
      this.testNowProgress = ".s-test-room__footer-btn.s-test-room__footer-btn-loading > .s-test-room__footer-btn-loading-bg";
      this.acknowledgeChckBox = "#customCheck2";
      this.enterBodyButton = ".s-test-room__footer .s-test-room__footer-btn:nth-of-type(1)";
      this.podcastRoomBody = ".s-podcasting-room__body";
      this.startRecordingbtn = "button[title='Start recording']";
      this.stopRecordingbtn = "button[title='Stop recording']";
      this.submittedbtn = "div[title='Submitted']";
      this.virtualBackgroundbtn = "button#dropdownMenuButton-virtual-bg-room";
      this.virtualBody = "[data-popper-placement='top-start']";
      this.virtualItems = "[class] button:nth-of-type(4) .s-video-capture__virtual-bg-item-img-wrap";
      this.micIcon = "button#dropdownMenuButton-mic-room";
      this.micItem = ".dropdown-menu.s-podcasting-room__control-panel-mic-menu.show > button:nth-of-type(3)";
      this.leaveRoombtn = "button[title='Leave room']";
      this.leavePromptMessage = ".c-alert-modal .modal-content";
      this.yesbtn = ".c-alert-modal__button.c-alert-modal__button2.p-0";
      this.checkBox = ".form-check-input";
      this.podcastRoom = ".s-podcasting-room__body";
      this.openRooms = ".c-card__header-info__name";
  }

  createConversation(subject, loginUser, participants, privacy) {
    cy.get(this.conversationMainTitle).should("contain.text", "New Recording Room");
    cy.get(this.conversationSubject).type(subject, {force: true});
    cy.get(this.conversationParticipants).should("contain.text", loginUser);
    this.inviteParticipants(participants);
    cy.wait(3000);
    cy.get('.checkBox').should('have.length', 0).then($element => {
      if ($element.length > 1) {
        cy.get('.checkBox').click()
      }
    Common.selectAndVerifyPrivacyMedia(privacy);
    this.clickCreateRoomButton();
    });
  }

  resendLinkTotheUser(conversationTitle)
  {
    var index = this.getConversationTitleIndex(conversationTitle);
    cy.get(this.conversationCard).eq(index).scrollIntoView().should('be.visible');
    cy.get(this.conversationResendLink).eq(index).click({force: true});
    cy.get(this.promptMessageSent).should('be.visible');
  }

  editConversationRoom(conversationTitle,newconversationtitle){
    var index = this.getConversationTitleIndex(conversationTitle);
    cy.get(this.conversationCard).eq(index).scrollIntoView().should('be.visible');
    cy.get(this.conversationEllipsisIcon).eq(index).click({force:true});
    cy.get(this.conversationEllipsisDropdown).find(this.editRoom).click({force: true});
    cy.wait(5000);
    cy.get(this.conversationSubject).scrollIntoView().clear({force:true}).type(newconversationtitle);
    cy.get(this.saveChangesbtn).scrollIntoView().click({force: true});
  }

  copyLinkConversation(conversationTitle){
    var index = this.getConversationTitleIndex(conversationTitle);
    cy.get(this.conversationCard).eq(index).scrollIntoView().should('be.visible');
    cy.get(this.conversationEllipsisIcon).eq(index).scrollIntoView().click({force: true});
    cy.get(this.conversationEllipsisDropdown).find(this.copyConversationLink).click({force: true});
    cy.get(this.promptMessageSent).should('be.visible');
  }

  deleteConversation(conversationTitle){
    var index = this.getConversationTitleIndex(conversationTitle);
    cy.get(this.openRooms).eq(0).scrollIntoView().should('be.visible');
    cy.get(this.conversationEllipsisIcon).eq(index).click({force: true});
    cy.get(this.conversationEllipsisDropdown).find(this.deleteConversationItem).click({force: true});
    cy.get(this.yesAlertModal).eq(1).click({force:true});
    cy.wait(10000);
  }

  verifyRoomDeleted() {
      cy.on('window:alert', (text) => {
          expect(text).to.equal('ROOM WAS SUCCESSFULLY DELETED.')
      });
  }

  enterRoomUsingInviteLink(conversationTitle){
    cy.get(this.conversationRoom).scrollIntoView().eq(0).should('be.visible');
    var index = this.getConversationTitleIndex(conversationTitle);
    this.getLinkMessage();
  }

  verificationConversationRoom(conversationTitle){
    var index = this.getConversationTitleIndex(conversationTitle);
    cy.get(this.conversationCard).eq(index).scrollIntoView().should('be.visible');
    cy.get(this.conversationRoom).eq(index).should('be.visible');
  }

  enterConversationRoom(conversationTitle){
    var index = this.getConversationTitleIndex(conversationTitle);
    cy.get(this.conversationRoom).eq(index).scrollIntoView().should('be.visible');
    //Pendingreview.closeReviewPending();
    cy.get(this.enterRoombtn).eq(index).click({force: true});
    cy.wait(2000);
  
    cy.get(this.testRoomBody, {timeout: 180000}).should('be.visible');
    cy.wait(5000);
    cy.get(this.testRoomBody).contains("Test now", {timeout: 30000}).then(($el) => {
    cy.wrap($el).click();
    });
    cy.get(this.testRoomBody).contains("Testing", {timeout: 120000}).should('not.exist');
    cy.get('body').then(($body) => {
      if ($body.find(this.acknowledgeChckBox).length) {
        cy.get(this.acknowledgeChckBox).click({force: true});
      }
    });
    cy.get(this.testRoomBody).contains("Enter room", {timeout: 30000}).then(($el) => {
    cy.wrap($el).click();
    });
    cy.get(this.podcastRoomBody).should('be.visible');
    cy.wait(5000);
  }

  startRecordingVideo(){
    cy.get(this.startRecordingbtn, {timeout: 120000}).should('be.enabled');
    cy.get(this.startRecordingbtn).click();
    cy.wait(15000);
    cy.get(this.stopRecordingbtn).click();
    cy.get(this.alertModal).should('be.visible');
    cy.wait(2000);
    cy.get(this.alertModal).contains("Finish and submit").click();
    cy.get(this.submittedbtn).should('be.visible');
    cy.get(this.leaveRoombtn).click();
    cy.get(this.leavePromptMessage).should('be.visible');
    cy.get(this.yesAlertModal).eq(1).click({force: true}); 
  }

  startRecordingWithVirtualBackgroundandNoAudio(){
    cy.get(this.micIcon).click();
    cy.get(this.virtualBody).should('be.visible');
    cy.get(this.micItem).click();
    cy.get(this.virtualBackgroundbtn).click();
    cy.get(this.virtualBody).should('be.visible');
    cy.get(this.virtualItems).click();
  }
  
  getConversationTitleIndex(conversationTitle){
    let retIndex = 0;
    cy.get(this.conversationRoom, {timeout: 120000}).each(($el, index, $list) => {
        if ($el.text().includes(conversationTitle)) {
            retIndex = index;
        } 
    });
    return retIndex; 
  }

  getLinkMessage(){
    let linkmessage1 ="";
    // cy.get(this.CopyLinkbtn).click().then(() => {
    //   cy.window().then(win => {
    //     linkmessage1 = win.navigator.clipboard.readText();
    //     console.log("link  message url " + linkmessage1);
    //     cy.visit(linkmessage1);
    //   })
    // });

    cy.get(this.copyLinkbtn).click()
    cy.wait(3000);
    cy.window().its('navigator.clipboard').invoke('readText').then(linkmessage1 =>{
      cy.log(linkmessage1);
      cy.visit(linkmessage1);
    })
  }

  inviteParticipants(participants){
    this.clickInviteParticipants();
    cy.get(this.inputParticipants).first().click({force: true}).type(participants, {force: true});
    cy.wait(2000);
    cy.get(this.spanParticipants).contains(participants).click({force: true});
    cy.get(this.conversationParticipants).each(($el, index, $list) => {
      if($el.text() ==  participants){
        cy.wrap($el).eq(index).should("have.text", participants).should("be.visible");
      }
    });
  }

  clickInviteParticipants(){
    cy.get(this.inviteParticipantsLink).first().click({force: true});
  }

  clickCreateRoomButton(){
    cy.get(this.createRoomButton).should('be.visible').click({force: true});
    cy.wait(5000);
    cy.get(this.createRoomButton).should('be.visible').scrollIntoView().click({force: true, scrollBehavior: "center"});
    cy.wait(3000);
  }

  verifyConversation(loginUser, participants, conversationTitle){
    cy.get(this.conversationTitle).each(($el, index, $list) => {
      if ($el.text() == conversationTitle) {
          $el.text().includes(conversationTitle);
          cy.get(this.conversationRoom).eq(index).scrollIntoView();
          cy.get(this.conversationRoom).eq(index).find(this.conversationUsers).contains(loginUser).should("contain.text",loginUser);
          cy.get(this.conversationRoom).eq(index).find(this.conversationUsers).contains(participants).should("contain.text",participants);
      } 
    })  
  }
  
  verifyConversationRoom(){
    cy.get(this.podcastRoom).should('be.visible');
  }
}

export default new Conversation;