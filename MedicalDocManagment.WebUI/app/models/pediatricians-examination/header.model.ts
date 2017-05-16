export default class HeaderModel {
    age: string;
    weight: string;
    height: string;
    headCircumference: string;
    chestCircumference: string;
    vt: string;

    constructor() {
        this.age = this.weight = this.height = this.headCircumference =
            this.chestCircumference = this.vt = null;
    }
}