export default class NosologyModel {
    id: string;
    name: string;

    constructor(jsonObj?) {
        if (jsonObj) {
            this.id = jsonObj.id;
            this.name = jsonObj.name;
        } else {
            this.id = null;
            this.name = null;
        }
    }

}
