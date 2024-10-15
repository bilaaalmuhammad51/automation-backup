import Common from "../pageObjects/common";

class Viewprofile {
  constructor() {
    this.changepasslink = "li:nth-of-type(2) > button[role='tab']";
    this.currentpasstxt = "input#currentPassword";
    this.newpasswordtxt = "input#passwordUpdatePasswordForm";
    this.comfirmpasswordtxt = "input#password_confirmation";
    this.savebtn = ".col.col-12.col-lg-9.col-md-8.mb-md-3.mt-md-3.ps-md-3.tab-content > div:nth-of-type(2) form  .c-card__btn.c-card__btn--primary-reversed.c-card__btn--wide.ms-auto.u-font-size-13.u-w-xs-100";
    this.notificationcenter = "li:nth-of-type(3) > button[role='tab']";
    this.notifsavebtn = "div:nth-of-type(3) form .c-card__btn.c-card__btn--primary-reversed.c-card__btn--wide.ms-auto.u-font-size-13.u-w-xs-100";
    this.firstname = "div:nth-of-type(3) > .mb-2 > .c-input.form-control";
    this.lastname = "div:nth-of-type(4) > .mb-2 > .c-input.form-control";
    this.jobtitle = "div:nth-of-type(6) > .mb-2 > .c-input.form-control";
    this.updateprofilebtn = "[class='d-sm-flex flex-sm-row-reverse mt-4'] button";
    this.groupnametxt = ".s-groups-edit__card [class='mb-2']:nth-child(6) .form-control";
    this.groupdescriptiontxt = ".c-input.form-control.u-no-resize";
    this.addmemberbtn = "[class='ms-2']";
    this.searchusertoaddtxt = ".modal-body .c-select-users__input.u-w-xs-100";
    this.selectusertoadd = ".c-select-users__card-list.my-3 > label";
    this.selectedusertoaddmember = ".c-select-users__card-list.my-3 > label";
    this.userselected = "div[title='Mark MS ADMIN']";
    this.createnewgroupbtn = ".s-groups__card--top > .m-0";
    this.addmemberuserselected = "[class='m-0 c-card__btn c-card__btn--mid c-card__btn--primary u-font-size-13 u-w-xs-100 mb-2 mb-sm-0 ms-0 ms-sm-2']";
    this.creategrouptafterselected = "[class='m-0 c-card__btn c-card__btn--mid c-card__btn--primary u-font-size-13 u-w-xs-100']";
    this.groupnamelisted = ".mt-3.mt-lg-4.s-groups__card > div:nth-of-type(3) > div";
    this.editgroup = "a[title='Edit group']";
    this.makeprivategroup = ".c-switch-toggle";
    this.groupitems = "div:nth-of-type(3) > div > .s-groups__item-card";
    this.groupitemsediticon = "div > .s-groups__item-card  a[title='Edit group'] > .d-flex.ms-icon.ms-icon-pencil-a";
    this.updategroupedit = "[class='m-0 c-card__btn c-card__btn--mid c-card__btn--primary u-font-size-13 u-w-xs-100']";
    this.deletegroupbtn = ".c-edit-role__btn-delete.me-sm-auto.mt-2.mt-sm-0.u-w-xs-100";
    this.leavegrouplink = "div:nth-of-type(3) > div > .s-groups__item-card > .mt-1.mx-auto.s-groups__item-leave-btn";
    this.groupdeletemodal = ".c-alert-modal__body.modal-body";
    this.yeslinkdelete = "[class='c-alert-modal__button c-alert-modal__button2 p-0']";
    this.uploadphotobtn = ".c-card__btn.c-card__btn--mid.c-card__btn--primary.m-0.me-0.me-sm-1.u-cursor-pointer.u-font-size-13.u-w-xs-100";
    this.uploadphotomodal = "div#GroupThumbnailModal  .modal-content";
    this.addphotobtn = ".c-card__btn.c-card__btn--mid.c-card__btn--primary.m-0.ms-0.ms-sm-1.u-cursor-pointer.u-font-size-13.u-w-xs-100.u-white-space--nowrap";
    this.savephotobtn = "div#GroupThumbnailModal  .modal-content .c-card__btn.c-card__btn--mid.c-card__btn--primary.m-0.mb-2.mb-sm-0.ms-0.ms-sm-2.u-font-size-13.u-w-xs-100";
    this.colorselection = ".c-group-thumbnail__color-btn-wrap > button";
    this.backgroundcolorbtn = ".c-card__btn.c-card__btn--mid.c-card__btn--primary.m-0.ms-0.ms-sm-1.mt-2.mt-sm-0.u-cursor-pointer.u-font-size-13.u-w-xs-100";
  }

  clickchangepassword(oldpassword,newpassword) {
    cy.get(this.changepasslink).click();
    cy.get(this.currentpasstxt).type(oldpassword);
    cy.get(this.newpasswordtxt).type(newpassword);
    cy.get(this.comfirmpasswordtxt).type(newpassword);
    cy.get(this.savebtn).click({force:true});
  }

  clickupdateprofile(firstname,lastname,jobtitle) {
    cy.get(this.firstname).clear().type(firstname);
    cy.get(this.lastname).clear().type(lastname);
    cy.get(this.jobtitle).clear().type(jobtitle);
    cy.get(this.updateprofilebtn).click({force:true});
  }

  creategroups(groupname,groupdescription,toadduser) {
    cy.get(this.createnewgroupbtn).click();
    cy.get(this.groupnametxt).type(groupname);
    cy.get(this.groupdescriptiontxt).type(groupdescription);
    cy.get(this.addmemberbtn).click();
    cy.get(this.searchusertoaddtxt).type(toadduser);
    cy.get(this.userselected).click();
    cy.get(this.addmemberuserselected).click({force:true});
    cy.get(this.creategrouptafterselected).click({force:true});
  }

  createprivategroups(groupname,groupdescription,toadduser) {
    cy.get(this.createnewgroupbtn).click();
    cy.get(this.groupnametxt).type(groupname);
    cy.get(this.groupdescriptiontxt).type(groupdescription);
    cy.get(this.makeprivategroup).click();
    cy.get(this.addmemberbtn).click();
    cy.get(this.searchusertoaddtxt).type(toadduser);
    cy.get(this.userselected).click();
    cy.get(this.addmemberuserselected).click({force:true});
    cy.get(this.creategrouptafterselected).click({force:true});
  }
  
  viewgroupsorjoined() {
    cy.get(this.groupnamelisted).first().should("be.visible")
    cy.get(this.editgroup).first().click();
  }

  editgroupselected () {
    cy.get(this.groupitems).first().should("be.visible")
    cy.get(this.groupitemsediticon).first().click();
    cy.get(this.groupnametxt).clear().type("new testing group name");
    cy.get(this.groupdescriptiontxt).clear().type("New description for testing groups");
    cy.get(this.updategroupedit).click();

  }

  deletegroupselected() {
    cy.get(this.groupitems).first().should("be.visible")
    cy.get(this.groupitemsediticon).first().click();
    cy.get(this.deletegroupbtn).click();
    cy.get(this.groupdeletemodal).should("be.visible");
    cy.get(this.yeslinkdelete).click();
  }

  leavegroupselected() {
    cy.get(this.groupitems).first().should("be.visible");
    cy.get(this.leavegrouplink).first().click();
    cy.get(this.groupdeletemodal).should("be.visible");
    cy.get(this.yeslinkdelete).click();
  }

  changeuploadphoto (uploadphotofile1) {
    cy.get(this.groupitems).first().should("be.visible")
    cy.get(this.groupitemsediticon).first().click();
    cy.get(this.uploadphotobtn).click();
    cy.get(this.uploadphotomodal).should("be.visible");
    this.uploadingPhotoongroups(uploadphotofile1);
    cy.get(this.savephotobtn).click();
    cy.get(this.updategroupedit).click({force:true});
  }

  changecolorbackground() {
    cy.get(this.groupitems).first().should("be.visible")
    cy.get(this.groupitemsediticon).first().click();
    cy.get(this.backgroundcolorbtn).click();
    cy.get(this.colorselection).eq(1).click();
    cy.get(this.savephotobtn).click();
  }

  clicknotificationpage() {
    cy.get(this.notificationcenter).click();
    cy.get(this.notifsavebtn).click();
  }

  uploadingPhotoongroups(uploadphotofile1) {
    uploadphotofile1.forEach(file => {
        cy.get(this.addphotobtn).selectFile("./cypress/fixtures/" + file.path, {
            force:true
        })
    });
  }

}

export default new Viewprofile;