class Organization {
  constructor() {
    this.createOrganizationButton = ".s-organizations__create-btn";
    this.organizationModal = ".c-create-organization__title";
    this.nameInput = "input#name";
    this.descriptionInput = "input#description";
    this.search = ".container.o-app-layout__content-wrap input[name='search']";
    this.tableOrganization = "table[role='table']";
    this.tableRow = ".c-table__link";
    this.editIconButton = ".c-table__icon-btn";  
    this.name = ".c-input[placeholder='Name']";
    this.parentCompany = ".c-input[placeholder='e.g MarketScale Soundbite']";
    this.selectIndustry = ".custom-select";
    this.updateOrganizationButton = ".s-organizations-edit__update-btn--edit";
    this.notificationToast = ".c-notification__title";
    this.editButtons = "a.s-organizations-edit__btn--edit.btn";
    this.domainInput = ".ti-new-tag-input";
    this.addDomainButton = ".btn-primary";
    this.addDomainSuccess = ".text-success";
    this.addMDomainWarning = ".text-danger";
    this.clickDomain =".vue-tags-input";
    this.domainRowsCell = "td[role='cell']";
    this.inviteUserEmail = "#email22";
    this.roleContributor = "label[for='role-contributor']";
    this.roleStandard = "label[for='role-standard']";
    this.roleAdmin = "label[for='role-admin']";
    this.roleMSAdmin = "label[for='role-super']";
    this.allowUsePayments = "label[for='allow-to-use-credits']";
    this.inviteButton = ".s-organizations-edit__btns .btn";
    this.addDomainButton = ".s-organizations-edit__btns .btn";
    this.rowContent = ".c-dropdown__btn-text";
    this.rowContainer = '.c-dropdown__btn-text';
    this.uploadEmailLogo = ".s-organizations-edit__org-backgrounds__upload-btn";
    this.uploadFeedLogo = ".s-organizations-edit__org-backgrounds__upload-btn";
    this.brandColor = ".s-organizations-edit__org-backgrounds__input";
    this.orgNameResult = ".word-wrap";
    this.verifyOrgName = ".s-organizations-edit__title";
    this.nextButton = ".c-pagination__item";
    this.editOrgBackground = ".u-white-space--nowrap";
    this.clickUploadBackground =".s-organizations-edit__org-backgrounds__upload-btn";
    this.inviteUserButton = ".s-organizations-edit__btn";
    this.brandingView = ".me-2";
    this.deleteDomain = ".btn-light";
    this.yesDeleteConfirmation = ".c-alert-modal__button2";
    this.pagePaginationButton = ".c-pagination__item";
    this.verifyPage = ".c-pagination__item--active";
  }

  createOrganization(name, description) {
    cy.get(this.createOrganizationButton).first().click();
    cy.get(this.organizationModal).find(this.nameInput).type(name);
    cy.get(this.organizationModal).find(this.descriptionInput).type(description);
    cy.get(this.organizationModal).find("button").contains("Create").click();
    cy.get(this.notificationToast).should("have.text", "Organization created.");
  }

  searchOrganization(name) {
    cy.get(this.search).type(name + "{enter}");
    cy.wait(10000);
  }

  editOrganizationDetails(newName, parentCo, industry) {
    cy.get(this.editIconButton).click();
    cy.get(this.name).type(newName);
    cy.get(this.parentCompany).type(parentCo);
    cy.get(this.selectIndustry).select(industry);
    cy.get(this.updateOrganizationButton).click();
    cy.get(this.notificationToast).should("have.text", "Organization updated");
    cy.get(this.name).should('contain' , newName);
    cy.get(this.parentCompany).should('eq', parentCo);
    cy.get(this.selectIndustry).should('eq', industry);
  }

  addDomainOrganization(invalidDomainName, domainName) {
    cy.get(this.editIconButton).first().click();
    cy.scrollTo('bottom', { duration: 2000 });
    cy.get(this.addDomainButton).eq(1).click();
    cy.get(this.domainInput).click().type(invalidDomainName + "{enter}");
    cy.get(this.addMDomainWarning).should("have.text", "Invalid domain");
    cy.get(this.domainInput).first().click().type(domainName + "{enter}");
    cy.get(this.addDomainButton).first().click();
    cy.url().should("contains", "/add_domain");
    cy.get(this.notificationToast).should("have.text", "Domain(s) added successfully.");
  }

  organizationEdit(){
    cy.get(this.editIconButton).first().click();
    cy.get(this.verifyOrgName).should("have.text", "Mark QA Organization1");
  }

  inviteUserOrganization(email, role, allowUsePayment) {
    cy.get(this.editIconButton).first().click();
    cy.scrollTo('bottom', { duration: 2000 });
    cy.get(this.inviteUserButton).contains("Invite User").click({force:true});
    cy.get(this.inviteUserEmail).type(email);
    if(role =="VIP Guest Pass"){
      cy.get(this.roleContributor).click();
      cy.get(this.allowUsePayments).should("have.attr", "disabled").and("eq", "disabled");
    }else if(role =="standard"){
      cy.get(this.roleStandard).click();
    }else if(role =="admin"){
      cy.get(this.roleAdmin).click();
    }else if(role =="msadmin"){
      cy.get(this.roleMSAdmin).click();
    }
    if(allowUsePayment){
      cy.get(this.allowUsePayments).click();
    }
    cy.get(this.inviteButton).click();
  }

  deleteWhitelistDomain() {
    cy.get(this.editIconButton).first().click();
    cy.scrollTo('bottom', { duration: 2000 });
    cy.get(this.deleteDomain).eq(5).click({force:true});
    cy.get(this.yesDeleteConfirmation).contains("Yes, delete domain").click();
  }

  verifyOrgRows() {
    cy.get(this.rowContent).should("have.text", "NameIDCreated byDomainsUsersEditView");
  }

  organizationScroll() {
      cy.contains('Branding').trigger('mb-0').should('be.visible');
  }

  updateBranding() {
    cy.get(this.editIconButton).click();
    organizationScroll();
  }

  verifyOrgSearchResult() {
    cy.get(this.orgNameResult).should("have.text", "Mark QA Organization1");
  }

  backNextOrgScroll(){
    cy.contains('Next').trigger('c-pagination__item').should('be.visible');
  }

  clickNextButton(){
    cy.get(this.pagePaginationButton).contains('Next').click({force:true});
    cy.wait(5000);
  }

  verifyNextPage(){
    cy.get(this.verifyPage).contains('2');
  }

  clickPreviousButton(){
    cy.get(this.pagePaginationButton).contains('Previous').click({force:true});
    cy.wait(5000);
  }

  verifyPreviousButton(){
    cy.get(this.verifyPage).contains('1');
  }

  organizationBGScroll(){
    cy.contains('Organization Backgrounds').trigger('u-white-space--nowrap').should('be.visible');
  }

  clickOrgBackground(){
    cy.get(this.editOrgBackground).first().click();
  }

  uploadOrgBackground(){
    cy.get(this.clickUploadBackground).first().click();

  }
}

export default new Organization;