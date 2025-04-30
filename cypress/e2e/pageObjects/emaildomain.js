class Emaildomain {
    constructor() {
        
        this.createcompbtn = ".s-users__create-btn.u-w-sm-100";
        this.switchtoggle = ".modal-content .c-switch-toggle";
        this.inputname = "input#name";
        this.domaininput = "input#domain";
        this.createdomainbtn = ".c-card__btn.c-card__btn--mid.c-card__btn--primary-reversed.m-0.u-font-size-13.u-w-xs-100";
        this.searchemailtxt = ".container.o-app-layout__content-wrap input[name='search']";
        this.sorticons = "th > .c-dropdown__btn > .c-dropdown__btn-icon.d-flex.ms-2.ms-icon.ms-icon-opposite-arrows.u-font-size-13";
        this.editicon = "[class] tr .c-table__icon-btn";
        this.previousandnextbtn = ".c-pagination > a";


      

    }

    createpublicemail(testname,domainame) {
        
        cy.get(this.createcompbtn).click();
        cy.get(this.switchtoggle).click();
        cy.get(this.inputname).type(testname);
        cy.get(this.domaininput).type(domainame);
        cy.get(this.createdomainbtn).click();

    }

    createprivateemail(testname,domainame) {
        
        cy.get(this.createcompbtn).click();
        cy.get(this.inputname).type(testname);
        cy.get(this.domaininput).type(domainame);
        cy.get(this.createdomainbtn).click();

    }

    searchemail(domainame) {
        
        cy.get(this.searchemailtxt).type(domainame);

    }

    sortallcolumns()
    {
        cy.get(this.sorticons).eq(0).click();
        cy.get(this.sorticons).eq(1).click();
        cy.get(this.sorticons).eq(2).click();
        cy.get(this.sorticons).eq(3).click();
        cy.get(this.sorticons).eq(4).click();
    }

    editingemaildomaindeactivate(emailname)
    {
        cy.get(this.searchemailtxt).type(emailname);
        cy.get(this.editicon).first().click();
        cy.get(this.switchtoggle).click();
        cy.get(this.createcompbtn).click();
    }

    clickingnextandprevbtn()
    {
        cy.get(this.previousandnextbtn).last().click();
        cy.get(this.previousandnextbtn).first().click();
    }


}
export default new Emaildomain;