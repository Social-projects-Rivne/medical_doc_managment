import Trilean from './trilean';

export default class PsychomotorDevelopmentModel {
    wasAccordingToAgeLimit: Trilean;
    wasNotNormal: Trilean;
    details: string;

    constructor() {
        this.wasAccordingToAgeLimit = new Trilean();
        this.wasNotNormal = new Trilean();
        this.details = null;
    }
}