import ChildCardModel from '../child-card.model';

import HeaderModel from './header.model';
import PregnancyDetailsModel from './pregnancy-details.model';
import BirthDetailsModel from './birth-details.model';
import PsychomotorDevelopmentModel from './psychomotor-development.model';

export default class PediatriciansExaminationModel {
    id: number;
    childCardId: number;
    header: HeaderModel;
    complaints: string;
    anamnesisOfDisease: string;
    anamnesisOfLife: string;
    pregnancyDetails: PregnancyDetailsModel;
    birthDetails: BirthDetailsModel;
    earlyNeonatalPeriodWasWithoutComplications: boolean;
    complicationsDuringNeonatalPeriod: string;
    psychomotorDevelopmentOnFirstYear: PsychomotorDevelopmentModel;
    detailsAfterPsychomotorDevelopmentOnFirstYear: string;
    naturalFeedingDetails: string;
    nonNaturalFeedingDetails: string;
    mixedFeedingDetails: string;
    pastIllnesses: string;
    screeningReasonsDetails: string;
    badHabitsPresent: boolean;
    badHabitsDetails: string;
    weightedWithAllergicHistory: boolean;
    allergicHistoryDetails: string;
    weightedWithAncestralAnamnesis: string;
    ancestralAnamnesisDetails: string;
    preventiveVaccinations: string;

    constructor() {
        this.id = this.childCardId =  null;
        this.header = new HeaderModel();
        this.complaints = this.anamnesisOfDisease = this.anamnesisOfLife = null;
        this.pregnancyDetails = new PregnancyDetailsModel();
        this.birthDetails = new BirthDetailsModel();
        this.earlyNeonatalPeriodWasWithoutComplications = this.complicationsDuringNeonatalPeriod = null;
        this.psychomotorDevelopmentOnFirstYear = new PsychomotorDevelopmentModel();
        this.detailsAfterPsychomotorDevelopmentOnFirstYear = this.naturalFeedingDetails =
            this.nonNaturalFeedingDetails = this.mixedFeedingDetails = this.pastIllnesses =
            this.screeningReasonsDetails = this.badHabitsPresent = this.badHabitsDetails = 
            this.weightedWithAllergicHistory = this.allergicHistoryDetails = 
            this.weightedWithAncestralAnamnesis = this.ancestralAnamnesisDetails =
            this.preventiveVaccinations = null;
    }
}