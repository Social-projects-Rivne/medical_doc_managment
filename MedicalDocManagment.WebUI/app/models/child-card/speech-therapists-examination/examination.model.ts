import ChildsEarlySpeechDevelopmentModel from './childs-early-speech-development.model';
import StateOfTheLexicalPartOfSpeechModel from './state-of-the-lexical-part-of-speech.model';
import GrammaticalStructureOfSpeechModel from './grammatical-structure-of-speech.model';
import FeaturesOfPhoneticAndPhonematicSpeechComponents from './features-of-phonetic-and-phonematic-speech-components.model';

export default class SpeechTherapistsExaminationModel {
    id: number;
    childsEarlySpeechDevelopment: ChildsEarlySpeechDevelopmentModel;
    stateOfTheLexicalPartOfSpeech: StateOfTheLexicalPartOfSpeechModel;
    grammaticalStructureOfSpeech: GrammaticalStructureOfSpeechModel;
    featuresOfPhoneticAndPhonematicSpeechComponents: FeaturesOfPhoneticAndPhonematicSpeechComponents;
    manifestationsOfStuttering: string;
    conclusion: string;
    longtermIndividualPlanOfRemedialWork: string;
    efficiencyOfSpeechTherapyEffect: string;
    date: Date;
    doctorsId: string;

    constructor(objectToCreateFrom?) {
        this.id = 0;

        this.childsEarlySpeechDevelopment = new ChildsEarlySpeechDevelopmentModel();
        this.stateOfTheLexicalPartOfSpeech = new StateOfTheLexicalPartOfSpeechModel();
        this.grammaticalStructureOfSpeech = new GrammaticalStructureOfSpeechModel();
        this.featuresOfPhoneticAndPhonematicSpeechComponents = new FeaturesOfPhoneticAndPhonematicSpeechComponents();

        this.manifestationsOfStuttering = this.conclusion = 
            this.longtermIndividualPlanOfRemedialWork = this.efficiencyOfSpeechTherapyEffect =
            this.date = this.doctorsId = null;

        if (objectToCreateFrom) {
            Object.assign(this, objectToCreateFrom);
        }
    }
}