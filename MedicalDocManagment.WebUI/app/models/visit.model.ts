import UserModel from './usermodel';
import ChildCardModel from './child-card/child-card.model';

export default class VisitModel {

    id: number;
    date: Date;
    summary: string;
    patient: ChildCardModel;
    patientId: number;
    doctor: UserModel;
    doctorId: string;

    constructor(jsonObject?) {
        this.id = this.date = this.summary =
            this.patient = this.patientId =
            this.doctor = this.doctorId = null;

        if (jsonObject) {
            for (var prop in this) {
                if (jsonObject.hasOwnProperty(prop)) {
                    this[prop] = jsonObject[prop];
                }
            }
        }

    }

}
