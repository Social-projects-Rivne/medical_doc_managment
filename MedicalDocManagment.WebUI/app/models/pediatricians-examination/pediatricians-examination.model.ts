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
    earlyNeonatalPeriodWasWithoutComplications: boolean;
    complicationsDuringNeonatalPeriod: string;
    detailsAfterEarlyNeonatalPeriod: string;
    psychomotorDevelopmentOnFirstYear: PsychomotorDevelopmentModel;    
    naturalFeedingDetails: string;
    nonNaturalFeedingDetails: string;
    mixedFeedingDetails: string;
    pastIllnesses: string;
    screeningReasonsDetails: string;
    badHabitsPresent: boolean;
    badHabitsDetails: string;
    weightedWithAllergicHistory: boolean;
    allergicHistoryDetails: string;
    weightedWithAncestralAnamnesis: boolean;
    ancestralAnamnesisDetails: string;
    preventiveVaccinations: string;

    constructor(objectToCreateFrom?) {
        this.header = new HeaderModel();
        this.pregnancyDetails = new PregnancyDetailsModel();
        this.birthDetails = new BirthDetailsModel();
        this.earlyNeonatalPeriodWasWithoutComplications = null;
        this.psychomotorDevelopmentOnFirstYear = new PsychomotorDevelopmentModel();

        this.id = this.complaints = this.anamnesisOfDisease = 
            this.anamnesisOfLife = this.complicationsDuringNeonatalPeriod =
            this.detailsAfterEarlyNeonatalPeriod = this.naturalFeedingDetails =
            this.nonNaturalFeedingDetails = this.mixedFeedingDetails =
            this.pastIllnesses = this.screeningReasonsDetails = 
            this.badHabitsPresent = this.badHabitsDetails =
            this.weightedWithAllergicHistory = this.allergicHistoryDetails =
            this.weightedWithAncestralAnamnesis = this.ancestralAnamnesisDetails =
            this.preventiveVaccinations = null;

        if (objectToCreateFrom) {
            Object.assign(this, objectToCreateFrom);

            this.pregnancyDetails = new PregnancyDetailsModel(objectToCreateFrom.pregnancyDetails);
        }
    }

    get badHabitsAbsent(): boolean {
        return this.badHabitsPresent == null ? null : !this.badHabitsPresent;
    }

    get earlyNeonatalPeriodWasWithComplications(): boolean {
        return this.earlyNeonatalPeriodWasWithoutComplications == null ? null :
            !this.earlyNeonatalPeriodWasWithoutComplications;
    }

    get notWeightedWithAllergicHistory(): boolean {
        return this.weightedWithAllergicHistory == null ? null :
            !this.weightedWithAllergicHistory;
    }

    get notWeightedWithAncestralAnamnesis(): boolean {
        return this.weightedWithAncestralAnamnesis == null ? null :
            !this.weightedWithAncestralAnamnesis;
    }
}