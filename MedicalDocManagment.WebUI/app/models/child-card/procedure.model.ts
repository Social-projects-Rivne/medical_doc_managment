export default class ProcedureModel {
    id: number;
    procedureCaption: string;

    constructor(jsonObject?) {
        this.id = this.procedureCaption = null;

        if (jsonObject) {
            for (var prop in this)
                if (jsonObject.hasOwnProperty(prop))
                    this[prop] = jsonObject[prop];
        }
    }
}