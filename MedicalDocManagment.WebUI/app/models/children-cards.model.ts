import ChildCardModel from './child-card.model';

export default class ChildrenCardsModel extends Array<ChildCardModel> {
    constructor(jsonObject?) {
        super();
        if (jsonObject) {
            jsonObject.forEach((elem) => { this.push(new ChildCardModel(elem)); });
        }
    }
}