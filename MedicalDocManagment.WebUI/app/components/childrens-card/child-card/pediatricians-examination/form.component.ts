import { Component } from '@angular/core';

import ChildCardModel from "../../../../models/child-card/child-card.model";
import PediatriciansExaminationModel from "../../../../models/child-card/pediatricians-examination/pediatricians-examination.model";
import { ChildBirthEnum } from '../../../../models/child-card/pediatricians-examination/child-birth.enum';

import ChildCardService from '../../../../services/child-card.service';
import ChildrenCardService from '../../../../services/children-card.service';
import MainAppService from "../../../../services/main-app.service";
declare var moment: any;

@Component({
    moduleId: module.id,
    providers: [ChildrenCardService],
    selector: 'pediatricians-examination-form',
    styleUrls: ['form.component.css'],
    templateUrl: 'form.component.html'
})
export default class PediatriciansExaminationFormComponent {
    // next is declared in such way so that enum can be used in template
    ChildBirthEnum = ChildBirthEnum;

    private _childCard: ChildCardModel;
    private _childCardService: ChildCardService;
    private _childrenCardService: ChildrenCardService;
    private _isErrorOnLoading: boolean;
    private _isErrorOnSaving: boolean;
    private _isLoading: boolean;
    private _isSaving: boolean;
    private _lastLoadingErrorMessage: string;
    private _lastSavingErrorMessage: string;
    private _pediatriciansExamination: PediatriciansExaminationModel;

    constructor(childCardService: ChildCardService, childrenCardService: ChildrenCardService,
        mainAppService: MainAppService) {
        this._childCardService = childCardService;
        this._childrenCardService = childrenCardService;
        this._childCard = null;
        this._isErrorOnLoading = false;
        this._isErrorOnSaving = false;
        this._isLoading = true;
        this._isSaving = false;
        this._lastLoadingErrorMessage = '';
        this._lastSavingErrorMessage = '';
        this._pediatriciansExamination = new PediatriciansExaminationModel();

        let childCardSubscription = this._childrenCardService.currentChildCardObservable
            .subscribe((childCard: ChildCardModel) => {
                this._childCard = childCard;
                if (this._childCard) {
                    this._loadExaminationFromServer();
                }
            },
            (error) => { },
            () => {
                childCardSubscription.unsubscribe();
            }
            );
    }

    private _calculateAge(): void {
        let age = "";
        if (this._childCard.date) {            
            let duration = moment.duration(moment().diff(moment(this._childCard.date)));
            let years = duration.years();
            if (years > 1) {
                age = years;
                if (years > 5) {
                    age += ' років';
                }
                else {
                    age += ' роки';
                }
            }
            else {
                let months = duration.months();
                if (years == 1) {                    
                    age = years + ' рік ' + months;
                    switch (months) {
                        case 1: {
                            age += ' місяць';
                            break;
                        };
                        case 2:
                        case 3:
                        case 4: {
                            age += ' місяці';
                            break;
                        }
                        default: {
                            age += ' місяців';
                            break;
                        }
                    }                    
                }
                else {
                    age = months;
                    switch (months) {
                        case 1: {
                            age += ' місяць';
                            break;
                        };
                        case 2:
                        case 3:
                        case 4: {
                            age += ' місяці';
                            break;
                        }
                        default: {
                            age += ' місяців';
                            break;
                        }
                    }  
                }
            }
        }
        else {
             age = "";
        }
        this._pediatriciansExamination.header.age = age;
    }

    _interactableMouseOver($event: any) {
        $event.target.classList.add('active');
    }

    _interactableMouseOut($event: any) {
        $event.target.classList.remove('active');
    }

    private _loadExaminationFromServer(): void {
        this._isLoading = true;
        this._isErrorOnLoading = false;
        this._lastLoadingErrorMessage = '';

        this._childCardService.getPediatriciansExamination(this._childCard.id)
            .subscribe((examination: PediatriciansExaminationModel) => {
                this._pediatriciansExamination = examination;
                this._calculateAge();
                this._isLoading = false;
            },
            (error: any) => {
                this._isLoading = false;
                this._isErrorOnLoading = true;
                this._lastLoadingErrorMessage = 'При отриманні результатів огляду \
                    виникла помилка: \r\n' + <any>error;
            });
    }

    private _textDecoration(textState: boolean): string {
        let result = '';
        if (textState == true) {
            result += 'underline'
        } else {
            if (textState == false) {
                result += 'line-through'
            }
        }
        return result;
    }

    private _save(): void {
        this._lastSavingErrorMessage = '';
        this._isErrorOnSaving = false;
        this._isSaving = true;
        this._childCardService.savePediatriciansExamination(this._childCard.id,
            this._pediatriciansExamination)
            .subscribe((savedExamination: PediatriciansExaminationModel) => {
                this._pediatriciansExamination = savedExamination;
                this._isSaving = false;
            },
            (error: any) => {
                this._isSaving = false;
                this._isErrorOnSaving = true;
                this._lastSavingErrorMessage = 'При збереженні результатів огляду \
                    виникла помилка: \r\n' + <any>error;
            });
    }
}