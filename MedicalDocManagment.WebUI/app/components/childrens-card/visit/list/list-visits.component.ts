import { Component, Input, OnInit } from '@angular/core';

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
export default class ListVisitsComponent implements OnInit {

    @Input() childCardId: number;
    visitService: VisitService;
    visits: VisitModel[];
    
    constructor(visitService: VisitService) {
        this.visitService = visitService;
        this.visits = [];
        this.childCardId = null;
    }

    ngOnInit() {
        if (this.childCardId != null) {
            this.visitService.getVisitsByPatientId(this.childCardId)
                             .subscribe(
                                 (visits: VisitModel[]) => {
                                 this.visits = visits;
                             },
                             (error: any) => {
                                 console.log(error);
                             }
            );
        }
    }

    toogleVisibilityList() {
        let isVisible = $('#listVisits').attr('aria-expanded') == 'true';
        let classes = isVisible ? 'glyphicon glyphicon-chevron-down'
                                : 'glyphicon glyphicon-chevron-up';
        $('#toogleListVisits i').attr('class', classes);
    }
}
