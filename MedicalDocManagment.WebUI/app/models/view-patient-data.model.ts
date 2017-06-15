export enum CategoriesToViewByEnum {
    byFirstName, byLastName, bySecondName, byBirthDate, byCardNumber, byAllInTheAbove
}

export default class ViewPatientDataModel {
    firstName: string;
    secondName: string;
    lastName: string;
    date: string;
    cardNumber: string;
    viewCategory: CategoriesToViewByEnum;

    constructor() {
        this.firstName = this.secondName = this.lastName = this.date =
            this.cardNumber = this.viewCategory = null;
    }
}