class UserFunctionalities {
    constructor() {
        
        this.inviteIcon = "button[title='Add user']";
        this.inviteModal = "div#UserInvitationsModal  .modal-content";
        this.inputemail = "div > .position-relative > .c-input.c-user-invitations__input.form-control";
        this.userdropdown = "div > .position-relative > .c-user-invitations__role-btn";
        this.dropdownlistuser = ".c-user-invitations__box [class='mt-3 mt-lg-2']:nth-of-type(3) .tooltip-inner .c-user-invitations__role-tooltip-btn";
        this.usercreatebtn = ".s-users__create-btn";
        this.firstnameinput = "input#firstName";
        this.lastname = "input#lastName";
        this.email = "input#email";
        this.password = "input#passwordUserCreate";
        this.companyname = "input#companyName";
        this.jobtitle = "input#title";
        this.department = "select#department-create";
        this.usericon = "input#selectedRoleStandard";
        this.marketscaleadminicon = ".c-switch-toggle.c-switch-toggle_blue";
        this.createuserbtn = "[class='col col-12 d-flex justify-content-end'] .c-card__btn--primary";
        this.expertleader = ".c-switch-toggle.c-switch-toggle_blue";
        this.searchinput = ".container-fluid.o-app-layout__content-wrap input[name='search']";
        this.namesort = ".pe-1.ps-0 > .c-dropdown__btn > .c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-opposite-arrows.u-font-size-13";
        this.emailnamesort = "th:nth-of-type(2) > .c-dropdown__btn > .c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-opposite-arrows.u-font-size-13";
        this.organizationsort = "button#dropdownMenuButton > .c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-angle-down.u-font-size-13";
        this.organizationsearch = ".c-dropdown__body.dropdown-menu.show  .c-input";
        this.selectorg = "[data-popper-placement] #organization .form-check";
        this.roleorgsort = "th:nth-of-type(4) > .dropdown.w-100 > .c-dropdown__btn > .c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-angle-down.u-font-size-13";
        this.rolesuser = ".c-dropdown__body.dropdown-menu.show > div#organization > div";
        this.titlesorticon = "th:nth-of-type(5) > .c-dropdown__btn > .c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-opposite-arrows.u-font-size-13";
        this.departmentsorticon = ".p-0.u-button-unstyled > .c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-opposite-arrows.u-font-size-13";
        this.editiconuser = "tr > td:nth-of-type(8) > .d-flex.justify-content-center";
        this.statussort = "th:nth-of-type(7) > .dropdown.w-100 > .c-dropdown__btn > .c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-angle-down.u-font-size-13";
        this.statusselect = ".c-dropdown__body.dropdown-menu.show > div#organization > div:nth-of-type(1)";
        this.updateuserbtn = ".justify-content-end .c-card__btn--primary";
        this.nextandprevbutton =".c-pagination > a";
      

    }

    inviteusersinglemail(emailname) {
        
        cy.get(this.inviteIcon).click();
        cy.get(this.inviteModal).should('be.visible');
        cy.get(this.inputemail).eq(0).type(emailname,'{enter}');
    }

    inviteusermultiplemail(emailname,emailname1,emailname2) {
        
        cy.get(this.inviteIcon).click();
        cy.get(this.inviteModal).should('be.visible');
        cy.get(this.inputemail).eq(0).type(emailname,'{enter}');
        cy.get(this.inputemail).eq(1).type(emailname1,'{enter}');
        cy.get(this.inputemail).eq(2).type(emailname2,'{enter}');
    }

    createstandardandcontributor(emailname4,emailname5)
    {
        cy.get(this.inviteIcon).click();
        cy.get(this.inviteModal).should('be.visible');
        cy.get(this.inputemail).eq(0).type(emailname4,'{enter}');
        cy.get(this.dropdownlistuser).invoke ("show").eq(1).click({force: true});
        cy.get(this.inputemail).eq(1).type(emailname5,'{enter}');
        cy.get(this.userdropdown).eq(1).click();
    }

    createcontributoruser(emailname)
    {
        cy.get(this.inviteIcon).click();
        cy.get(this.inviteModal).should('be.visible');
        cy.get(this.inputemail).eq(0).type(emailname,'{enter}');
        cy.get(this.userdropdown).eq(0).click();
        cy.get(this.dropdownlistuser).invoke ("show").eq(1).click({force: true});
    }

    createuserrole(firstname,lastname,email,password,companynamee,jobtitlee)
    {
        cy.get(this.usercreatebtn).click();
        cy.get(this.firstnameinput).type(firstname);
        cy.get(this.lastname).type(lastname);
        cy.get(this.email).type(email);
        cy.get(this.password).type(password);
        cy.get(this.companyname).type(companynamee);
        cy.get(this.jobtitle).type(jobtitlee);
        cy.get(this.department).select("Sales");
        cy.get(this.usericon).click();
        cy.get(this.createuserbtn).click();

    }

    createmsadminrole(firstname,lastname,email,password,companynamee,jobtitlee)
    {
        cy.get(this.usercreatebtn).click();
        cy.get(this.firstnameinput).type(firstname);
        cy.get(this.lastname).type(lastname);
        cy.get(this.email).type(email);
        cy.get(this.password).type(password);
        cy.get(this.companyname).type(companynamee);
        cy.get(this.jobtitle).type(jobtitlee);
        cy.get(this.department).select("Sales");
        cy.get(this.marketscaleadminicon).click();
        cy.get(this.createuserbtn).click();

    }

    createuserwithexpertleader(firstname,lastname,email,password,companynamee,jobtitlee)
    {
        cy.get(this.usercreatebtn).click();
        cy.get(this.firstnameinput).type(firstname);
        cy.get(this.lastname).type(lastname);
        cy.get(this.email).type(email);
        cy.get(this.password).type(password);
        cy.get(this.companyname).type(companynamee);
        cy.get(this.jobtitle).type(jobtitlee);
        cy.get(this.department).select("Sales");
        cy.get(this.expertleader).click();
        cy.get(this.usericon).click();
        cy.get(this.createuserbtn).click();

    }

    createmsdadminwithexpertleader(firstname,lastname,email,password,companynamee,jobtitlee)
    {

        cy.get(this.usercreatebtn).click();
        cy.get(this.firstnameinput).type(firstname);
        cy.get(this.lastname).type(lastname);
        cy.get(this.email).type(email);
        cy.get(this.password).type(password);
        cy.get(this.companyname).type(companynamee);
        cy.get(this.jobtitle).type(jobtitlee);
        cy.get(this.department).select("Sales");
        cy.get(this.marketscaleadminicon).click();
        cy.get(this.createuserbtn).click();
    }

    createscriptsearchuser(emailnamesearch)
    {
        cy.get(this.searchinput).type(emailnamesearch,'enter');
    }

    sortingallcol(orgnamesort)
    {
        cy.get(this.namesort).click();
        cy.get(this.emailnamesort).click();
        cy.get(this.organizationsort).click();
        cy.get(this.organizationsearch).click().type(orgnamesort);
        cy.get(this.selectorg).first().click();
        cy.wait(5000);
        cy.get(this.roleorgsort).click();
        cy.get(this.rolesuser).eq(1).click();
        cy.get(this.titlesorticon).click();
        cy.get(this.departmentsorticon).click();
    }

    sortingallcoladminuser()
    {
        cy.get(this.namesort).click();
        cy.get(this.emailnamesort).click();
        cy.get(this.roleorgsort).click();
        cy.get(this.rolesuser).eq(1).click();
        cy.get(this.titlesorticon).click();
        cy.get(this.departmentsorticon).click();
    }

    sortingorganization (orgnamesort)
    {
        cy.get(this.organizationsort).click();
        cy.get(this.organizationsearch).type(orgnamesort);
        cy.get(this.selectorg).first().click();
    }

    clickeditingicon (editingfirstname)
    {
        cy.get(this.statussort).click();
        cy.get(this.statusselect).first().click();
        cy.get(this.editiconuser).first().click();
        cy.get(this.firstnameinput).type(editingfirstname);
        cy.get(this.updateuserbtn).click();
    }

    clickingnextandprevbtn()
    {
        cy.get(this.nextandprevbutton).last().click();
        cy.wait(5000);
        cy.get(this.nextandprevbutton).first().click();
    }

    

  }
  
  export default new UserFunctionalities;