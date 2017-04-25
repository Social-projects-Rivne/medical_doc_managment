import 'rxjs/add/operator/map';

import DiagnosisModel from './diagnosis.model';

export default class DiagnosesModel extends Array<DiagnosisModel> {

    constructor(jsonobject?) {
        if (jsonobject) {
            super();
            jsonobject.map((elem) => { this.push(new DiagnosisModel(elem)); });
        }
    }
}
