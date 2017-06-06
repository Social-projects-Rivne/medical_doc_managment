import LevelOfFormationEnum from './level-of-formation.enum';

export default class GrammaticalStructureOfSpeechModel {
    text: string;
    levelOfFormation: LevelOfFormationEnum;
    levelOfFormationText: string;

    constructor() {
        this.text = this.levelOfFormationText = null;

        this.levelOfFormation = LevelOfFormationEnum.Unknown;
    }
}