import 'rxjs/add/operator/map';

import ClassModel from './class.model';

export default class ClassesModel extends Array<ClassModel> {
    constructor(jsonobject?) {
        if (jsonobject) {
            super();
            jsonobject.map((elem) => { this.push(new ClassModel(elem)); });
        }
    }
}