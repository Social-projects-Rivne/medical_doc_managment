import DiagnosisModel from './diagnosis.model';

export default class ChildCardModel {
    id: string;
    firstName: string;
    secondName: string;
    lastName: string;
    date: string;
    address: string;
    checkIn: string;
    checkOut: string;
    diagnosis: DiagnosisModel;
    prescription: string;

    constructor(jsonObject?) {
        if (jsonObject) {
            this.id = jsonObject.id;        
            this.firstName = jsonObject.firstName;
            this.secondName = jsonObject.secondName;
            this.lastName = jsonObject.lastName;
            this.date = jsonObject.date;
            this.address = jsonObject.address;
            this.checkIn = jsonObject.checkIn;
            this.checkOut = jsonObject.checkOut;
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
            this.diagnosis = null;
            this.prescription = null;
        }
    }
}