class OnsiteVideo {
    constructor() {
        this.videoProdTypeDropdown = ".ms-icon-angle-down";
        this.eventIcon = ".c-editing-request-modal__icon-lamp";
        this.productVideoIcon = ".ms-icon-product";
        this.testimonialIcon = ".ms-icon-testimonial";
        this.cultureIcon = ".ms-icon-culture";
        this.facilityIcon = ".c-editing-request-modal__icon-facility";
        this.onlineLearningIcon = ".ms-icon-educational";
        this.caseStudyIcon = ".ms-icon-case_study";
        this.announcementIcon = ".c-editing-request-modal__icon-announcement";
    }

    selectEvent() {
        cy.get(this.videoProdTypeDropdown).click({force:true});
        cy.get(this.eventIcon).click();
    }
}

export default new OnsiteVideo;