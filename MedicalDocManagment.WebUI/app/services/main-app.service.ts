import { Injectable } from '@angular/core';

import ChildCardModel from "../models/child-card/child-card.model";

/**
 * Class designed to provide communication between components of main application
 *     in situations when more simple methods of communication are not available.
 */
@Injectable()
export default class MainAppService {
    currentCard: ChildCardModel; 

    constructor() {
        this.currentCard = null;
    }
}