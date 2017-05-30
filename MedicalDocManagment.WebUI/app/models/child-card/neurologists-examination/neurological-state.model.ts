export default class NeurologicalState {
    consciousness: string;
    reactionToOthers: string;
    meningealSymptoms: string;
    headCircumference: number;
    headShape: string;
    cranialNerves: string;
    reflexMotorArea: string;
    movementsVolume: string;
    tendonAndPeriostealReflexes: string;
    abdominalReflexes: string;
    abnormalReflexes: string;
    unconditionedReflexes: string;
    headControl: string;
    turningOnStomach: string;
    testForTraction: string;
    sitting: string;
    crawling: string;
    standing: string;
    backing: string;
    walking: string;
    hyperkinesis: string;
    episyndrome: string;
    functionsOfPelvicOrgans: string;

    constructor(objectToCreateFrom?) {
        this.consciousness = this.reactionToOthers = this.meningealSymptoms =
            this.headCircumference = this.headShape = this.cranialNerves =
            this.reflexMotorArea = this.movementsVolume = this.tendonAndPeriostealReflexes =
            this.abdominalReflexes = this.abnormalReflexes = this.unconditionedReflexes =
            this.headControl = this.turningOnStomach = this.testForTraction =
            this.sitting = this.crawling = this.standing = this.backing =
            this.walking = this.hyperkinesis = this.episyndrome =
            this.functionsOfPelvicOrgans = null;

        if (objectToCreateFrom) {
            Object.assign(this, objectToCreateFrom);
        }
    }
}