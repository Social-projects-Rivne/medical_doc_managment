import { Component, Input } from '@angular/core';
import { Inject } from '@angular/core'; 
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';

import ChildrensCardService from '../../../services/children-card.service';
import ChildrenCardsModel from '../../../models/children-cards.model';

@Component({
    moduleId: module.id,
    selector: 'children-cards-list-without-lazy',
    templateUrl: 'children-cards-list-without-lazy.component.html',
    styleUrls: ['children-cards-list-without-lazy.component.css']
})
export default class ChildrenCardsListWithoutLazyComponent {
    @Input() childrenCards: ChildrenCardsModel;

    constructor() {
        this.childrenCards = [];
    }
}

