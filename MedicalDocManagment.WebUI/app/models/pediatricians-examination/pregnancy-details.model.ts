import Trilean from './trilean';
import ChildBirthModel from './child-birth.model';

export default class CurrentDetailsModel {
    someDetails: string;
    passedNormally: Trilean;
    passedWithToxemia: Trilean;
    toxemiaDetails: string;
    passedWithAnemia: Trilean;
    withThreatInInterruption: Trilean;
    dateOfInterruption: string;
    fromDetails: string;
    childBirth: ChildBirthModel;

    constructor() {
        this.passedNormally = new Trilean();
        this.passedWithToxemia = new Trilean();
        this.passedWithAnemia = new Trilean();
        this.withThreatInInterruption = new Trilean();

        this.childBirth = new ChildBirthModel();

        this.someDetails = this.toxemiaDetails = this.dateOfInterruption =
            this.fromDetails = null;
    }
}