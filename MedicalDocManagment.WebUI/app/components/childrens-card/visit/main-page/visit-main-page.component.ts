import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import MainAppService from "../../../../services/main-app.service";
import ChildCardService from '../../../../services/child-card.service';
import SharedService from '../../../../services/shared.service';
import VisitService from '../../../../services/visit.service';

import VisitModel from '../../../../models/visit.model';
import ChildCardModel from '../../../../models/child-card/child-card.model';
import UserModel from '../../../../models/usermodel';

@Component({
    moduleId: module.id,
    selector: 'visit-main-page',
    templateUrl: 'visit-main-page.component.html',
    styleUrls: [
        'visit-main-page.component.css'
    ],
    providers: [
        VisitService,
        SharedService,
    ]
})
export default class VisitMainPageComponent {
    visits: VisitModel[];
    patient: ChildCardModel;

    constructor(private _visitService: VisitService,
                private _sharedService: SharedService,
                private _childCardService: ChildCardService,
                private _mainAppService: MainAppService) {
        this.visits = [];

        let patientId = this._sharedService.getChildrenCardIdFromRoute();
        this.loadPatient(patientId);
        this.loadPatientVisits(patientId);
    }

    addVisit(visit: VisitModel) {
        this.visits.push(visit);
    }

    loadPatientVisits(patientId: number) {
        this._visitService.getVisitsByPatientId(patientId)
                          .subscribe(
                              (visits: VisitModel[]) => {
                                  this.visits = visits;
                              },
                              (error: any) => {
                                  console.log(error);
                              }
                          );
    }

    loadPatient(patientId: number) {
        this._childCardService.getChildCard(patientId)
                                 .subscribe(
                                     (patient: ChildCardModel) => {
                                         this.patient = this._mainAppService.currentCard = patient;
                                     },
                                     (error: any) => {
                                         console.log(error);
                                     }
                                 );
    }
}
