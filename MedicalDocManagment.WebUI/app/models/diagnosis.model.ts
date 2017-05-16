export default class DiagnosisModel {
    id: string;
    name: string;

    constructor(jsonObject?) {
        if (jsonObject) {
            this.id = jsonObject.id;
            this.name = jsonObject.name;
        }
        else {
            this.id = null;
            this.name = null;
        }
    }
}