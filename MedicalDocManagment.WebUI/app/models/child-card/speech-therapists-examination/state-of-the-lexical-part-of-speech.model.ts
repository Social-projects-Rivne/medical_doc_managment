import LevelOfFormationEnum from './level-of-formation.enum';

export default class StateOfTheLexicalPartOfSpeechModel {
    impressiveSpeech: string;
    exspressiveSpeech: string;
    levelOfFormation: LevelOfFormationEnum;
    levelOfFormationText: string;

    constructor() {
        this.impressiveSpeech = this.exspressiveSpeech = this.levelOfFormationText = null;

        this.levelOfFormation = LevelOfFormationEnum.Unknown;
    }
}