export default class BirthDetailsModel {
    weight: string;
    bodyLength: string;
    headCircumference: string;
    chestCircumference: string;
    scoreByApgar: string;

    constructor() {
        this.weight = this.bodyLength = this.headCircumference = this.chestCircumference =
            this.scoreByApgar = null;
    }
}