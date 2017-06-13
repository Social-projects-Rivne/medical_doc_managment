import LevelOfFormationEnum from './level-of-formation.enum';

export default class FeaturesOfPhoneticAndPhonematicSpeechComponents {
    text: string;
    levelOfFormation: LevelOfFormationEnum;
    levelOfFormationText: string;

    constructor() {
        this.text = this.levelOfFormationText = null;

        this.levelOfFormation = LevelOfFormationEnum.Unknown;    
    }
}