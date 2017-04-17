import DiagnosisModel from './diagnosis.model';

export default class ChildCardModel {
    id: string;
    firstName: string;
    secondName: string;
    lastName: string;
    date: Date;
    address: string;
    checkIn: Date;
    checkOut: Date;
    diagnosis: DiagnosisModel;
    prescription: string;

    constructor(jsonObject?) {
        if (jsonObject) {
            this.id = jsonObject.id;
            this.firstName = jsonObject.firstName;
            this.secondName = jsonObject.secondName;
            this.lastName = jsonObject.lastName;
            this.date = new Date(jsonObject.date);
            this.address = jsonObject.address;
            this.checkIn = new Date(jsonObject.checkIn);
            this.checkOut = new Date(jsonObject.checkOut);
            this.diagnosis = new DiagnosisModel(jsonObject.diagnosis);
            this.prescription = jsonObject.prescription;
        }
        else {
            this.id = null;
            this.firstName = null;
            this.secondName = null;
            this.lastName = null;
            this.date = null;
            this.address = null;
            this.checkIn = null;
            this.checkOut = null;
            this.diagnosis = new DiagnosisModel();
            this.prescription = null;
        }
    }

}