import { Component, ElementRef, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/of';

import ChildrensCardService from '../../../services/children-card.service';

import ChildCardModel from '../../../models/child-card/child-card.model';
import ChildrenCardsModel from '../../../models/children-cards.model';
import ViewPatientDataModel from '../../../models/view-patient-data.model';
import { CategoriesToViewByEnum, CATEGORIES_TO_VIEW_BY } from './view-categories';

@Component({
    moduleId: module.id,
    selector: 'view-patient-data',
    templateUrl: 'view-patient-data.component.html',
    providers: [ChildrensCardService],
    styleUrls: ['view-patient-data.component.css']
})
export default class ViewPatientDataComponent{
    // next is declared in such way so that can be used in template
    CategoriesToViewByEnum = CategoriesToViewByEnum;
    CATEGORIES_TO_VIEW_BY = CATEGORIES_TO_VIEW_BY;

    @ViewChild('viewPatientDataForm') viewPatientDataForm: NgForm;

    private _birthDateTouched: boolean;
    private _isErrorOnSearching: boolean;
    private _isNotFound: boolean;
    private _isSearching: boolean;
    private _lastErrorMessage: string;
    private _childrensCardService: ChildrensCardService;
    private _patientToView: ViewPatientDataModel;
    private _searchResult: ChildrenCardsModel;
    private _triedToSearch: boolean;
    private _viewCategory: CategoriesToViewByEnum;

    constructor(childrensCardService: ChildrensCardService) {
        this._birthDateTouched = false;
        this._isErrorOnSearching = false;
        this._isSearching = false;
        this._lastErrorMessage = '';
        this._childrensCardService = childrensCardService;
        this._patientToView = new ViewPatientDataModel();
        this._searchResult = [];
        this._triedToSearch = false;
        this._viewCategory = CategoriesToViewByEnum.byLastName;
    }

    viewPatientData(): void {
        this._isErrorOnSearching = false;
        this._isSearching = true;
        this._searchResult = [];
        this._triedToSearch = true;

        this._childrensCardService.viewPatientData(this._patientToView)
                                  .subscribe((data: ChildrenCardsModel) => {
                                      if (data && data.length) {
                                          this._searchResult = this._searchResult.concat(data);
                                      }
                                      this._isSearching = false;
                                  },
                                  (error: any) => {
                                    this._isSearching = false;
                                    this._isErrorOnSearching = true;
                                    this._lastErrorMessage = 'При перегляді виникла помилка: \r\n' + <any>error;
                                  });
    }

    _formInvalid(): boolean {    
        let result: boolean = false;
        switch (this._viewCategory) {
            case CategoriesToViewByEnum.byFirstName: {
                let firstName = this.viewPatientDataForm.controls['firstName'];
                if (firstName) {
                    result = firstName.invalid;
                }
                break;
            }
            case CategoriesToViewByEnum.byLastName: {
                let lastName = this.viewPatientDataForm.controls['lastName'];
                if (lastName) {
                    result = lastName.invalid;
                }
                break;
            }
            case CategoriesToViewByEnum.bySecondName: {
                let secondName = this.viewPatientDataForm.controls['secondName'];
                if (secondName) {
                    result = secondName.invalid;
                }
                break;
            }
            case CategoriesToViewByEnum.byBirthDate: {
                break;
            }
            case CategoriesToViewByEnum.byCardNumber: {
                let cardNumber = this.viewPatientDataForm.controls['cardNumber'];
                if (cardNumber) {
                    result = cardNumber.invalid;
                }
                break;
            }
            case CategoriesToViewByEnum.byAllInTheAbove: {
                break;
            }
        }

        return result;
    }
}

