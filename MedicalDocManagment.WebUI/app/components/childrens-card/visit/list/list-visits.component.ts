import { Component, Input } from '@angular/core';

import VisitModel from '../../../../models/visit.model';

import VisitService from '../../../../services/visit.service';

declare let $;

@Component({
    moduleId: module.id,
    selector: 'list-visits',
    templateUrl: 'list-visits.component.html',
    providers: [
        VisitService
    ]
})
export default class ListVisitsComponent {

    @Input() visits: VisitModel[];
    
    constructor(visitService: VisitService) {
        this.visits = [];
    }

}
