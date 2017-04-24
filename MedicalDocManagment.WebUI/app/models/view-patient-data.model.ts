export default class ViewPatientDataModel {
    firstName: string;
    secondName: string;
    lastName: string;
    birthDate: Date;

    constructor() {
        this.firstName = this.secondName = this.lastName = this.birthDate = null;
    }
}