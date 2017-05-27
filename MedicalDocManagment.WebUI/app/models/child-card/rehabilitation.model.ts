import ProcedureModel from "./procedure.model";

export default class RehabilitationModel {
    id: number;
    beginDate: Date;
    count: number;
    commentary: string;
    therapeuticProcedure: ProcedureModel;

    constructor(jsonObject?) {
        this.id = this.beginDate = this.count = this.commentary = null;
        this.therapeuticProcedure = new ProcedureModel();

        if (jsonObject) {
            for (var prop in this)
                if (jsonObject.hasOwnProperty(prop))
                    this[prop] = jsonObject[prop];
        }
    }
}