class Commons {
    constructor() {
      this.breadcrumbs = "[aria-current] span";
      this.uploadInput = ".s-uploader-new__items-wrap input[type='file']";
      this.uploadedFile = ".c-version-history__item-title";
      this.goToFeedButton = ".c-go-back-btn .c-go-back-btn__text";
      this.searchInput = ".c-select-users__input[placeholder='Search']";
      this.approverImg = ".tooltip__title";
      this.organizationButton = ".c-privacy-new__options .c-select-users__card-indicator";
      this.whoSeeMediaButton = ".c-privacy-new__title";
      this.groupPrivacy = ".c-select-users__card-list.mt-2 .c-select-users__card-name";
      this.groupSelectButton = ".c-select-users__card-list.mt-2 .c-select-users__card-indicator";
      this.loadMoreButton = ".u-bg-transparent";
      this.requesttabs = ".s-expert-requests__tile-wrapper > button";
    }
  
    selectingindustryexperttab()
    {
      cy.get(this.requesttabs).eq(1).click();
    }

    selectingexternalopenlinktab()
    {
      cy.get(this.requesttabs).eq(2).click();
    }

    verifyBreadCrumbs(label) {
      cy.get(this.breadcrumbs).should("exist");
      cy.get(this.breadcrumbs).should("have.text", label);
    }

    verifyBackToFeed(text){
      cy.get(this.goToFeedButton).should("exist");
      cy.get(this.goToFeedButton).should("have.text", text);
    }

    uploadFiles(mediaFiles){    
      mediaFiles.forEach(file => {
          cy.get(this.uploadInput).selectFile("./cypress/fixtures/" + file.path, {
              force: true
          })
          cy.get(this.uploadedFile).should("contain.text", file.path);
          cy.wait(3000);
      });
    }


    visitByURL(url) {
      cy.visit(url);
      cy.wait(3000);
    }

    getUTCDateTime(){
      const dayjs = require("dayjs");
      const utc = require('dayjs/plugin/utc')
      const timezone = require('dayjs/plugin/timezone')
      dayjs.extend(utc)
      dayjs.extend(timezone)
      return dayjs.utc().tz("America/Chicago").format("MM-DD-YYYY h:mm A");
    }

    searchSelectApprover(approver){
      cy.get(this.searchInput).scrollIntoView();
      cy.get(this.searchInput).clear({scrollBehavior: "center", force: true}).type(approver, {force: true, delay: 150});
      cy.get(this.searchInput).type("{enter}", {force: true, delay: 150, scrollBehavior:"center"});
      cy.wait(5000);
      cy.get("div[title='" + approver + "']").click({scrollBehavior:"center"});
    }

    searchAdminSelectApprover(approver){
      cy.get(this.searchInput).scrollIntoView();
      cy.get(this.searchInput).clear({scrollBehavior: "center", force: true}).type(approver, {force: true, delay: 150});
      cy.get(this.searchInput).type("{enter}", {force: true, delay: 150, scrollBehavior:"center"});
      cy.wait(3000);
      this.clickLoadMore();
      cy.get("div[title='" + approver + "']").click({scrollBehavior:"center"});
    }
    
    verifyApprovers(approver){
      cy.get(this.approverImg).last().should("have.text", approver);
    }

    verifyExpert(expert){
      cy.get(this.approverImg).last().should("have.text", expert);
    }

    selectAndVerifyPrivacyMedia(privacyOption){
      cy.get(this.whoSeeMediaButton).first().click({force:true})
      if(privacyOption=="MyOrganization"){
        cy.get(this.organizationButton).first().should("have.class", "active");
      }else if(privacyOption=="OnlyMe+Admins"){
        cy.get(this.organizationButton).last().click({force:true});
        cy.get(this.organizationButton).last().should("have.class", "active");
      }else{
        cy.get(this.groupPrivacy).each(($el, index, $list) => {
          if ($el.text().includes(privacyOption)) {
            cy.get(this.groupSelectButton).eq(index).click({force:true});
            return
          } 
        })  
      }
    }

    clickLoadMore(){
      cy.get(this.loadMoreButton).eq(0).scrollIntoView().should('be.visible').click({force:true});
      cy.get(this.loadMoreButton).first().click({force:true});
    }

  }
  
  export default new Commons;