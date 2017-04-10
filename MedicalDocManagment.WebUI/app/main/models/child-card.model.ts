import DiagnosisModel from './diagnosis.model';

export default class ChildCardModel {
    id: string;
    f_name: string;
    s_name: string;
    l_name: string;
    date: string;
    address: string;
    checkin: string;
    checkout: string;
    diagnosis: DiagnosisModel;
    prescription: string;

    constructor(jsonObject?) {
        if (jsonObject) {
            this.id = jsonObject.id;        
            this.f_name = jsonObject.f_name;
            this.s_name = jsonObject.s_name;
            this.l_name = jsonObject.l_name;
            this.date = jsonObject.date;
            this.address = jsonObject.address;
            this.checkin = jsonObject.checkin;
            this.checkout = jsonObject.checkout;
            this.diagnosis = new DiagnosisModel(jsonObject.diagnosis);
            this.prescription = jsonObject.prescription;
        }
        else {
            this.id = null;
            this.f_name = null;
            this.s_name = null;
            this.l_name = null;
            this.date = null;
            this.address = null;
            this.checkin = null;
            this.checkout = null;
            this.diagnosis = null;
            this.prescription = null;
        }
    }
}