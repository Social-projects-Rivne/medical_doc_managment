import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UsersSearchOptionsEnum } from './users-search-options.enum';

@Component({
    moduleId: module.id,
    selector: 'search-options',
    templateUrl: 'search-options.component.html'
})

export default class SearchOptionsComponent {
    // next is declared in such way so that enum can be used in template
    UsersSearchOptionsEnum = UsersSearchOptionsEnum;

    @Input() disabled: boolean;
    @Output() selectedChanged: EventEmitter<UsersSearchOptionsEnum>;
    private _selectedOption: UsersSearchOptionsEnum;

    constructor() {
        this.selectedChanged = new EventEmitter<UsersSearchOptionsEnum>();
        this._selectedOption = UsersSearchOptionsEnum.byUsername;
    }

    get selectedOption(): UsersSearchOptionsEnum {
        return this._selectedOption;
    }

    set selectedOption(newSelectedOption: UsersSearchOptionsEnum) {
        this._selectedOption = newSelectedOption;
        this.selectedChanged.emit(this._selectedOption);
    }
}