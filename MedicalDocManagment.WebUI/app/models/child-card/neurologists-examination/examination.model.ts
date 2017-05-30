import NeurologicalState from './neurological-state.model';

export default class NeurologistsExaminationModel {
    id: number;
    complaints: string;
    anamnesis: string;
    statokineticDevelopment: string;
    psychospeechDevelopment: string;
    neurologicalState: NeurologicalState;
    diagnosis: string;

    constructor(objectToCreateFrom?) {
        this.neurologicalState = new NeurologicalState();

        this.id = 0;
        this.complaints = this.anamnesis = 
            this.statokineticDevelopment = this.psychospeechDevelopment =
            this.diagnosis = null;

        if (objectToCreateFrom) {
            Object.assign(this, objectToCreateFrom);

            this.neurologicalState = new NeurologicalState(objectToCreateFrom.neurologicalState);
        }
    }
}