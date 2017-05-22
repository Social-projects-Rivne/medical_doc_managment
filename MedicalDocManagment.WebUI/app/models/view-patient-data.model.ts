export default class ViewPatientDataModel {
    firstName: string;
    secondName: string;
    lastName: string;
    birthDate: Date;
    cardNumber: string;

    constructor() {
        this.firstName = this.secondName = this.lastName = this.birthDate =
            this.cardNumber = null;
    }
}