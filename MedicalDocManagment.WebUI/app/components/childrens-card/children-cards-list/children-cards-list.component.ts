import { Component, Input, OnInit } from '@angular/core';
import { Inject } from '@angular/core'; 
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';

import ChildrensCardService from '../../../services/children-card.service';
import ChildrenCardsModel from '../../../models/children-cards.model';

@Component({
    moduleId: module.id,
    selector: 'children-cards-list',
    templateUrl: 'children-cards-list.component.html',
    providers: [ChildrensCardService]
})
export default class ChildrenCardsListComponent implements OnInit {
    private childrenCardsRetriever: Subject<any>;
    @Input() private childrenCards: Array<ChildrenCardsModel>;
    private page: number = 1;
    private pageSize: number = 9;
    private total: number;
    private pageCount: number;
    private loading: boolean = false;

    constructor( @Inject(ChildrensCardService) private _childrensCardService: ChildrensCardService) {
        this.childrenCards = new Array<ChildrenCardsModel>();
    }
    ngOnInit() {
        this.childrenCardsRetriever = this._childrensCardService.childrenCardsSubject;
        this.childrenCardsRetriever.subscribe(data => {
            this.childrenCards.push.apply(this.childrenCards, data.childrenCards);
            this.page = data.pageNumber;
            this.pageSize = data.pageSize;
            this.total = data.totalRecordCount;
            this.pageCount = data.pageCount;
            this.loading = false;
        });
    }
    onScrollDown() {
        let nextPage = this.page + 1;
        if (nextPage <= this.pageCount) {
            if (this.loading == false) {
                this.getPage(nextPage, this.pageSize);
            }
            this.loading = true;
        }
    }
    getPage(page: number, pageSize:number) {
        this._childrensCardService.getChildrenCardsPaged(page, pageSize);
    }
    //getChildrenCardsFromServer(): void {
    //    this.childrenCards = null;
    //    this.childrenCards = this._childrensCardService.getChildrenCards();
    //}
}

