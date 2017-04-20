import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import ChildCardModel from "../../../models/child-card.model";

@Component({
    moduleId: module.id,
    selector: '[children-cards-list-item]',
    templateUrl: 'children-cards-list-item.component.html'
})
export default class ChildrensCardsListItemComponent {
    @Input() childCard: ChildCardModel;

    constructor() {
        this.childCard = new ChildCardModel();
    }
}

