import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

import ChildCardModel from "../../../../models/child-card/child-card.model";
import ChildrenCardService from '../../../../services/children-card.service';
import SharedService from '../../../../services/shared.service';
import MainAppService from "../../../../services/main-app.service";
import ProcedureModel from "../../../../models/child-card/procedure.model";
import RehabilitationModel from "../../../../models/child-card/rehabilitation.model";

@Component({
    moduleId: module.id,
    selector: 'procedures-add',
    templateUrl: 'procedures-add.component.html',
    providers: [
        SharedService,
        NotificationsService
    ]
})
export default class ProceduresAddComponent implements OnInit {
    procedures: ProcedureModel[];
    rehabilitation = new RehabilitationModel();
    private _childCard: ChildCardModel;
    private _isSaving: boolean = false;

    constructor(private _childrenCardService: ChildrenCardService,
                private _mainAppService: MainAppService,
                private _sharedService: SharedService,
                private _notificationService: NotificationsService) {
        this._childCard = _mainAppService.currentCard;
    }

    ngOnInit() {
        this.updateProceduresList();
    }

    updateProceduresList(): void {
        this._childrenCardService.getProcedures()
            .subscribe((data: ProcedureModel[]) => { console.log(data); this.procedures = data; });
    }

    onDateChange(target: HTMLInputElement) {
        let miliseconds: number = target.valueAsNumber;

        this.rehabilitation.beginDate = this.getDateByMiliseconds(miliseconds);
    }

    private getDateByMiliseconds(miliseconds: number) {
        return (miliseconds) ? new Date(miliseconds) : null;
    }

    submit(event: Event) {
        event.preventDefault();
        this._isSaving = true;
        this._childrenCardService.addRehabilitationIntoChildCard(this._childCard.id,
            this.rehabilitation)
            .subscribe((response) => {
                this._isSaving = false;
                this._notificationService.success("Успіх", "Успішно додано призначення!");
                console.log(response);
            },
            (error: any) => {
                this._isSaving = false;
                console.log(error);
                this._notificationService.error("Помилка", 'При збереженні призначення виникла \
                    помилка: \r\n' + <any>error);
            });
    }

}