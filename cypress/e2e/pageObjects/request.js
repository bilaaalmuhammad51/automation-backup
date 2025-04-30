import Common from "./common";
class Request {
    constructor() {
        this.requestTypeTile = ".s-expert-requests__tile";
        this.searchRequestContentFromInput = "input[placeholder='Search users or add an email address']";
        this.promptDirectionInput = "input.s-expert-requests__extensible-input-wrap-elem";
        this.additonalNotesButton = " button[title='Additional Notes']";
        this.additionalIndustryExpert = "button[title='Message for the Expert']";
        this.additionalNotesText = ".ProseMirror.tiptap";
        this.submitRequestButton = ".s-expert-requests__button";
        this.confirmationTitle = ".c-summary-modal__title > span";
        this.usersLabels = ".c-user-info__name";
        this.usersTitle = ".section-users__title";
        this.requestQuestion = ".c-questions__item";
        this.requestAdditonalNotes = ".c-director-notes__notes p"
        this.requestConfirmationButtons = ".c-summary-modal__button";
        this.pitchQuestion =".s-expert-requests__extensible-input-wrap-elem";
        this.pitchQuestion1 = "div:nth-of-type(4) > .s-expert-requests__extensible-input-wrap-elem ";
        this.pitchQuestion2 = "div:nth-of-type(5) > .s-expert-requests__extensible-input-wrap-elem";
        this.pitchQuestion3 = "div:nth-of-type(6) > .s-expert-requests__extensible-input-wrap-elem";
        this.pitchQuestion4 = "div:nth-of-type(7) > .s-expert-requests__extensible-input-wrap-elem";
        this.pitchQuestion5 = "div:nth-of-type(8) > .s-expert-requests__extensible-input-wrap-elem";
        this.addQuestionbtn = "[class='s-expert-requests__template-btn s-expert-requests__template-btn--add ms-2']";
        this.searchIndustryExpert =" .justify-content-between .c-select-users__input ";
        //this.expertListUsers = "div:nth-of-type(2) > .c-select-users__card-list.my-3";
        this.featuredQuestion = "[class] .c-prompts";
        //this.listQuestions = ".c-prompts__container";
        this.addNewTags = "button#dropdownMenuButton-tag";
        this.inputnewtag =" [maxlength] .ti-new-tag-input-wrapper ";
        this.proposeLink = ".ms-2.s-expert-requests__suggestion.s-expert-requests__suggestion-btn";
        this.propseExpertModal = ".show .modal-content";
        this.proposeFirstname = "div#RequestExpertModal  .modal-content > div > input:nth-of-type(1)";
        this.proposeLastname = "div#RequestExpertModal  .modal-content > div > input:nth-of-type(2)";
        this.proposeFieldExpertise = ".mt-2.s-expert-requests__badge > li";
        this.proposeLinkedIn = ".modal-body .s-expert-requests__extensible-input-wrap-elem:nth-child(8)";
        this.proposeRelevantLinks = "[class='s-expert-requests__extensible-group mt-2'] .s-expert-requests__extensible-input-wrap-elem";
        this.proposeSavebtn = ".show .justify-content-end .c-create-template__footer-btn:nth-of-type(2)";
        this.loadMore = ".s-expert-requests__body-sections-wrap .s-expert-requests__body-section:nth-of-type(3) .u-bg-transparent";
        this.inputTag = ".d-flex > .vue-tags-input > .ti-input > .ti-tags";
        this.tagselected = ".c-tags-current__dropdown-list-button";
        this.submitbutton = "button#btn-next";
    }

    createRequest(requestType, expert, inputtags2, question, additionalNotes, privacy) {
        this.selectRequestType(requestType);
        this.searchSelectExpert(expert);
        this.selectingTags(inputtags2);
        Common.verifyExpert(expert);
        this.clickNextButton();
        this.createPromptDirection(question);
        this.setAdditionalNotesDirection(additionalNotes)
        this.clickNextButton();
        // Common.searchSelectApprover(approver);
        // Common.verifyApprovers(approver);
        Common.selectAndVerifyPrivacyMedia(privacy);
        this.clickSubmitButton();
    }

    proposeExpertOnIndustryExpert(requestType, firstname, lastname, linkedin, relevantlinks, additionalNotes){
        this.selectRequestType(requestType);
        cy.get(this.proposeLink).scrollIntoView().click({scrollBehavior: "center", force: true});
        cy.get(this.propseExpertModal).should("be.visible");
        cy.get(this.proposeFirstname).type(firstname);
        cy.get(this.proposeLastname).type(lastname);
        cy.get(this.proposeFieldExpertise).eq(2).click({scrollBehavior: "center"});
        cy.get(this.proposeLinkedIn).eq(3).type(linkedin);
        cy.get(this.proposeRelevantLinks).eq(4).type(relevantlinks);
        cy.get(this.additionalNotesText).type(additionalNotes);
        cy.get(this.proposeSavebtn).scrollIntoView().click({scrollBehavior: "center", force: true});
    }

    proposeExpertWithoutLinkedInMessageAndRelevantLinks(requestType, firstname, lastname){
        this.selectRequestType(requestType);
        cy.get(this.proposeLink).scrollIntoView().click({scrollBehavior: "center", force: true});
        cy.get(this.propseExpertModal).should("be.visible");
        cy.get(this.proposeFirstname).type(firstname);
        cy.get(this.proposeLastname).type(lastname);
        cy.get(this.proposeFieldExpertise).eq(2).click({scrollBehavior: "center"});
        cy.get(this.proposeSavebtn).scrollIntoView().click({scrollBehavior: "center", force: true});
    }


    createRequestOnExperts(requestType, expert, inputtags1, question, additionalIndExpertNotes, privacy) {
        this.selectRequestType(requestType);
        this.searchSelectIndustryExpert(expert);
        this.clickNextButton();
        this.selectingTags(inputtags1);
        this.createPromptDirection(question);
        this.setIndustryExpertAdditionalNotesDirection(additionalIndExpertNotes);
        this.clickNextButton();
        Common.selectAndVerifyPrivacyMedia(privacy);
        this.clickSubmitButton();
    }

    createExternalLinks(requestType, inputtags3, additionalNotes) {
        this.selectRequestType(requestType);
        this.selectingTags(inputtags3);
        cy.get(this.featuredQuestion).eq(1).click({scrollBehavior: "center"});
        cy.get(this.featuredQuestion).eq(1).should("have.class", "active");
        this.setAdditionalNotesDirection(additionalNotes);
        this.clickNextButton();
        this.clickSubmitButton();
    }

    createExpertQuestions(pitchquestion, pitchquestion1, pitchquestion2, pitchquestion3, pitchquestion4, pitchquestion5){
        cy.get(this.pitchQuestion).type(pitchquestion);
        cy.get(this.addQuestionbtn).click({scrollBehavior: "center"});
        cy.get(this.pitchQuestion1).type(pitchquestion1);
        cy.get(this.addQuestionbtn).click({scrollBehavior: "center"});
        cy.get(this.pitchQuestion2).type(pitchquestion2);
        cy.get(this.addQuestionbtn).click({scrollBehavior: "center"});
        cy.get(this.pitchQuestion3).type(pitchquestion3);
        cy.get(this.addQuestionbtn).click({scrollBehavior: "center"});
        cy.get(this.pitchQuestion4).type(pitchquestion4);
        cy.get(this.addQuestionbtn).click({scrollBehavior: "center"});
        cy.get(this.pitchQuestion5).type(pitchquestion5);
    }

    selectRequestType(requestType) {
        cy.get(this.requestTypeTile).first().scrollIntoView();
        if (requestType == "ColleaguesAndGuest") {
            cy.get(this.requestTypeTile).first().should("have.class", "active");
        } else if (requestType == "IndustryExperts") {
            cy.get(this.requestTypeTile).eq(1).click({force:true});
            cy.get(this.requestTypeTile).eq(1).should("have.class", "active");
        } else if (requestType == "ExternalOpenLink") {
            cy.get(this.requestTypeTile).eq(2).click({force:true});
            cy.get(this.requestTypeTile).eq(2).should("have.class", "active");
        }
    }

    searchSelectExpert(expert){
        cy.get(this.searchRequestContentFromInput).type(expert, {force: true});
        cy.get(this.loadMore).click();
        cy.get(this.searchRequestContentFromInput).type("{enter}", {force: true});
        cy.get("div[title='" + expert + "']").click({scrollBehavior: "center"});
        this.clickNextButton();

        
    }
    searchSelectIndustryExpert(expert){
        cy.get(this.searchIndustryExpert).type(expert + "{enter}", {force: true});
        cy.get("div[title='" + expert + "']").click({scrollBehavior: "center"});
    }

    selectingTags(inputtags)
    {
        cy.get(this.addNewTags).click({scrollBehavior: "center"});
        cy.get(this.inputTag).type(inputtags);
        cy.get(this.tagselected).click();
    }

    createPromptDirection(question){
        cy.get(this.promptDirectionInput).type(question, {force: true});
    }

    // searchSelectTemplates(){
       
    // }

    clickNextButton(){
        cy.get(this.submitbutton).click({force: true});
    }

    setAdditionalNotesDirection(notes){
        cy.get(this.additonalNotesButton).click({force: true});
        cy.get(this.additionalNotesText).clear().type(notes, { force: true } );
    }

    setIndustryExpertAdditionalNotesDirection(notes){
        cy.get(this.additionalIndustryExpert).click({force: true});
        cy.get(this.additionalNotesText).clear().type(notes, { force: true } );
    }

    clickSubmitButton(){
        cy.get(this.submitRequestButton).click({force: true})
    }

    verifyRequestConfirmation(expert,approver, question, additionalNotes){
        cy.get(this.confirmationTitle).should("contain.text", "Request Confirmation");
        cy.get(this.usersTitle).first().should("have.text", "Requested for");
        cy.get(this.usersTitle).last().should("have.text", "To be approved by");
        cy.get(this.usersLabels).first().should("contain.text", expert);
        cy.get(this.usersLabels).last().should("contain.text", approver);
        cy.get(this.requestQuestion).should("have.text", question);
        cy.get(this.requestAdditonalNotes).should("have.text", additionalNotes);
        cy.get(this.requestConfirmationButtons).first().should("contain.text", "Go to feed");
        cy.get(this.requestConfirmationButtons).last().should("contain.text", "Copy link to request");
        cy.get(this.requestConfirmationButtons).first().click({ force: true});
    }

    verifyRequestExternalConfirmation(approver, additionalNotes){
        cy.get(this.usersLabels).last().should("contain.text", approver);
        cy.get(this.requestAdditonalNotes).should("have.text", additionalNotes);
    }
    
}

export default new Request;