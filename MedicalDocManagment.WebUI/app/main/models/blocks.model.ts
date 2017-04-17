import 'rxjs/add/operator/map';

import BlockModel from './block.model';

export default class BlocksModel extends Array<BlockModel> {
    constructor(jsonobject?) {
        if (jsonobject) {
            super();
            jsonobject.forEach((elem) => { this.push(new BlockModel(elem)); });
        }
    }
}
