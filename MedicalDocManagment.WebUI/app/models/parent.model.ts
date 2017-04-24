export default class ParentModel {
    id: string;
    firstName: string;
    secondName: string;
    lastName: string;
    work: string;
    phone: string;

    constructor(jsonObject?) {
        this.id = this.firstName = this.secondName = this.lastName = this.work =
            this.phone = null;

        if (jsonObject) {
            for (var prop in this)
                if (jsonObject.hasOwnProperty(prop))
                    this[prop] = jsonObject[prop];
        }
    }
}