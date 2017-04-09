import 'rxjs/add/operator/map';

import ChildCardModel from './child-card.model';

export default class ChildrenCardsModel extends Array<ChildCardModel> {
    constructor(jsonobject?) {
        super();
        if (jsonobject) {
            jsonobject.map((elem) => { this.push(new ChildCardModel(elem)); });
        }
    }
}