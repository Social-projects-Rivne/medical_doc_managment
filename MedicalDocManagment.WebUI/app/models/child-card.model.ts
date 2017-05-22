import DiagnosisModel from './diagnosis.model';

export default class ChildCardModel {
    id: number;
    cardNumber: number;
    firstName: string;
    secondName: string;
    lastName: string;
    date: Date;
    address: string;
    checkIn: Date;
    checkOut: Date;
    diagnosis: DiagnosisModel;
    prescription: string;
    directedBy: string;
    psychiatristsConclusion: string;

    constructor(jsonObject?) {
        this.id = this.cardNumber = this.firstName = this.secondName = this.lastName =
            this.date =  this.address = this.checkIn = this.checkOut = this.prescription =
            this.psychiatristsConclusion = this.directedBy = null;
        this.diagnosis = new DiagnosisModel();

        if (jsonObject) {
            for (var prop in this)
                if (jsonObject.hasOwnProperty(prop))
                    this[prop] = jsonObject[prop];
        }
    }

}
