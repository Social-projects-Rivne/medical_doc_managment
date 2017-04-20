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
        this.id = this.firstName = this.secondName = this.lastName = this.date =
            this.address = this.checkIn = this.checkOut = this.diagnosis =
            this.prescription = null;

        if (jsonObject) {
            for (var prop in this)
                if (jsonObject.hasOwnProperty(prop))
                    this[prop] = jsonObject[prop];
        }
    }

}