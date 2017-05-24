import { Component, Input } from '@angular/core';

import VisitModel from '../../../../models/visit.model';

import VisitService from '../../../../services/visit.service';

declare let $;

@Component({
    moduleId: module.id,
    selector: 'list-visits',
    templateUrl: 'list-visits.component.html',
    styleUrls: [
        'list-visit.component.css'
    ],
    providers: [
        VisitService
    ]
})
export default class ListVisitsComponent {

    @Input() visits: VisitModel[];
    
    constructor(visitService: VisitService) {
        this.visits = [];
    }

    toogleVisibilityList() {
        let isVisible = $('#listVisits').attr('aria-expanded') == 'true';
        let classes = isVisible ? 'glyphicon glyphicon-chevron-down'
                                : 'glyphicon glyphicon-chevron-up';
        $('#toogleListVisits i').attr('class', classes);
    }
}
