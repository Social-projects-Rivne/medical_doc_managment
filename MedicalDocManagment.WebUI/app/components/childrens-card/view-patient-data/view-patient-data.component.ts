import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/of';
declare var $;

import ChildrensCardService from '../../../services/children-card.service';

import ChildCardModel from '../../../models/child-card/child-card.model';
import ChildrenCardsModel from '../../../models/children-cards.model';
import ViewPatientDataModel from '../../../models/view-patient-data.model';
import { CategoriesToViewByEnum } from '../../../models/view-patient-data.model';

export const CATEGORIES_TO_VIEW_BY = [
    { name: 'По імені', key: CategoriesToViewByEnum.byFirstName },
    { name: 'По прізвищу', key: CategoriesToViewByEnum.byLastName },
    { name: 'По батькові', key: CategoriesToViewByEnum.bySecondName },
    { name: 'По даті народження', key: CategoriesToViewByEnum.byBirthDate },
    { name: 'По номеру картки', key: CategoriesToViewByEnum.byCardNumber },
    { name: 'По всьому вищевказаному', key: CategoriesToViewByEnum.byAllInTheAbove }
];

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

    private _isErrorOnSearching: boolean;
    private _isNotFound: boolean;
    private _isSearching: boolean;
    private _lastErrorMessage: string;
    private _childrensCardService: ChildrensCardService;
    private _patientToView: ViewPatientDataModel;
    private _searchResult: ChildrenCardsModel;
    private _triedToSearch: boolean;

    constructor(childrensCardService: ChildrensCardService) {
        this._isErrorOnSearching = false;
        this._isSearching = false;
        this._lastErrorMessage = '';
        this._childrensCardService = childrensCardService;
        this._patientToView = new ViewPatientDataModel();
        this._patientToView.viewCategory = CategoriesToViewByEnum.byLastName;
        this._searchResult = [];
        this._triedToSearch = false;
    }

    _viewPatientData(formValue: any): void {
        this._isErrorOnSearching = false;
        this._isSearching = true;
        this._searchResult = [];
        this._triedToSearch = true;
        
        this._childrensCardService.viewPatientData(formValue)
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

    // Initializing tooltips

    @ViewChild('lastNameInput')
    set _lastNameInput(elementRef: ElementRef) {
        this._initTooltip(elementRef);
    }

    @ViewChild('firstNameInput')
    set _firstNameInput(elementRef: ElementRef) {
        this._initTooltip(elementRef);
    }

    @ViewChild('secondNameInput')
    set _secondNameInput(elementRef: ElementRef) {
        this._initTooltip(elementRef);
    }

    _initTooltip(elementRef: ElementRef): void {
        if (elementRef) {
            $(elementRef.nativeElement).tooltip();
        }
    }
}

