export default class ParentModel {
    id: string;
    firstName: string;
    secondName: string;
    lastName: string;
    work: string;
    phone: string;

    constructor(jsonObject?) {
        if (jsonObject) {
            this.id = jsonObject.id;
            this.firstName = jsonObject.firstName;
            this.secondName = jsonObject.secondName;
            this.lastName = jsonObject.lastName;
            this.work = jsonObject.work;
            this.phone = jsonObject.phone;
        }
        else {
            this.id = null;
            this.firstName = null;
            this.secondName = null;
            this.lastName = null;
            this.work = null;
            this.phone = null;
        }
    }
}