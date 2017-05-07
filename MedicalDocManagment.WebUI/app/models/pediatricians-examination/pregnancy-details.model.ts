import { ChildBirthEnum } from './child-birth.enum';

export default class CurrentDetailsModel {
    someDetails: string;
    passedNormally: boolean;
    passedWithToxemia: boolean;
    toxemiaDetails: string;
    passedWithAnemia: boolean;
    withThreatInInterruption: boolean;
    dateOfInterruption: string;
    fromDetails: string;
    childBirth: ChildBirthEnum;

    constructor() {
        this.someDetails = this.passedNormally = this.passedWithToxemia =
            this.toxemiaDetails = this.passedWithAnemia = this.withThreatInInterruption =
            this.dateOfInterruption = this.fromDetails = null;

        this.childBirth = ChildBirthEnum.Unknown;
    }
}