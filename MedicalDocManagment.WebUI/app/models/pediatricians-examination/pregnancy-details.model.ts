export default class CurrentDetailsModel {
    someDetails: string;
    passedNormally: boolean;
    passedWithToxemia: boolean;
    toxemiaDetails: string;
    passedWithAnemia: boolean;
    withThreatInInterruption: boolean;
    dateOfInterruption: string;
    fromDetails: string;
    urgentChildBirth: boolean;
    prematureChildBirth: boolean;
    operativeChildBirth: boolean;

    constructor() {
        this.someDetails = this.passedNormally = this.passedWithToxemia =
            this.toxemiaDetails = this.passedWithAnemia = this.withThreatInInterruption =
            this.dateOfInterruption = this.fromDetails = this.urgentChildBirth =
            this.prematureChildBirth = this.operativeChildBirth = null;
    }
}