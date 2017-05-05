import Trilean from './trilean';

import HeaderModel from './header.model';
import PregnancyDetailsModel from './pregnancy-details.model';
import BirthDetailsModel from './birth-details.model';
import PsychomotorDevelopmentModel from './psychomotor-development.model';

export default class PediatriciansExaminationModel {
    id: number;
    header: HeaderModel;
    complaints: string;
    anamnesisOfDisease: string;
    anamnesisOfLife: string;
    pregnancyDetails: PregnancyDetailsModel;
    birthDetails: BirthDetailsModel;
    earlyNeonatalPeriodWasWithoutComplications: Trilean;
    complicationsDuringNeonatalPeriod: string;
    detailsAfterEarlyNeonatalPeriod: string;
    psychomotorDevelopmentOnFirstYear: PsychomotorDevelopmentModel;    
    naturalFeedingDetails: string;
    nonNaturalFeedingDetails: string;
    mixedFeedingDetails: string;
    pastIllnesses: string;
    screeningReasonsDetails: string;
    badHabitsPresent: Trilean;
    badHabitsDetails: string;
    weightedWithAllergicHistory: Trilean;
    allergicHistoryDetails: string;
    weightedWithAncestralAnamnesis: Trilean;
    ancestralAnamnesisDetails: string;
    preventiveVaccinations: string;

    constructor() {
        this.header = new HeaderModel();
        this.pregnancyDetails = new PregnancyDetailsModel();
        this.birthDetails = new BirthDetailsModel();
        this.psychomotorDevelopmentOnFirstYear = new PsychomotorDevelopmentModel();

        this.earlyNeonatalPeriodWasWithoutComplications = new Trilean();
        this.weightedWithAllergicHistory = new Trilean();
        this.weightedWithAncestralAnamnesis = new Trilean();
        this.badHabitsPresent = new Trilean();

        this.id = this.complaints = this.anamnesisOfDisease = 
            this.anamnesisOfLife = this.complicationsDuringNeonatalPeriod =
            this.detailsAfterEarlyNeonatalPeriod = this.naturalFeedingDetails =
            this.nonNaturalFeedingDetails = this.mixedFeedingDetails =
            this.pastIllnesses = this.screeningReasonsDetails = this.badHabitsDetails = 
            this.allergicHistoryDetails = this.ancestralAnamnesisDetails =
            this.preventiveVaccinations = null;
    }
}