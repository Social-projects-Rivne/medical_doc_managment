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

    constructor(objectToCreateFrom?) {
        this.someDetails = this.passedNormally = this.passedWithToxemia =
            this.toxemiaDetails = this.passedWithAnemia = this.withThreatInInterruption =
            this.dateOfInterruption = this.fromDetails = null;

        this.childBirth = ChildBirthEnum.Unknown;

        if (objectToCreateFrom) {
            Object.assign(this, objectToCreateFrom);
        }
    }

    switchPassedNormally(): void {
        this.passedNormally = !this.passedNormally;
        if (this.passedNormally) {
            this.passedWithToxemia = this.passedWithAnemia = this.withThreatInInterruption = false;
        }
    }

    switchPassedWithToxemia(): void {
        this.passedWithToxemia = !this.passedWithToxemia;
        if (this.passedWithToxemia) {
            this.passedNormally = false;
        }
    }

    switchPassedWithAnemia(): void {
        this.passedWithAnemia = !this.passedWithAnemia;
        if (this.passedWithAnemia) {
            this.passedNormally = false;
        }
    }

    switchWithThreatInInterruption(): void {
        this.withThreatInInterruption = !this.withThreatInInterruption;
        if (this.withThreatInInterruption) {
            this.passedNormally = false;
        }
    }
}