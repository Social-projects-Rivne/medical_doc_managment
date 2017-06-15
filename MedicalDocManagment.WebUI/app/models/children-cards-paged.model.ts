import ChildrenCardsModel from './children-cards.model';

export default class ChildrenCardsPagedModel {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    totalRecordCount: number;
    childrenCards: ChildrenCardsModel;
}