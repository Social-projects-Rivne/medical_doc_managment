export default class VisitModel {

    id: number;
    date: Date;
    summury: string;
    patientId: number;
    doctorId: string;

    constructor(jsonObject?) {
        this.id = this.date = this.summury =
            this.patientId = this.doctorId = null;

        if (jsonObject) {
            for (var prop in this) {
                if (jsonObject.hasOwnProperty(prop)) {
                    this[prop] = jsonObject[prop];
                }
            }
        }

    }

}
