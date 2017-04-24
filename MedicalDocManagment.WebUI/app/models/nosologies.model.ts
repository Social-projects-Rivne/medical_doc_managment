import 'rxjs/add/operator/map';

import NosologyModel from './nosology.model';

export default class NosologiesModel extends Array<NosologyModel> {

    constructor(jsonobject?) {
        if (jsonobject) {
            super();
            jsonobject.map((elem) => { this.push(new NosologyModel(elem)); });
        }
    }
}
