import { Component, EventEmitter, Input, Output } from '@angular/core';

import LevelOfFormationEnum from "../../../../models/child-card/speech-therapists-examination/level-of-formation.enum";

@Component({
    moduleId: module.id,
    selector: 'level-of-formation',
    styleUrls: ['level-of-formation.component.css'],
    templateUrl: 'level-of-formation.component.html'
})
export default class LevelOfFormationComponent {
    @Output() levelChange: EventEmitter<LevelOfFormationEnum>;
    LevelOfFormationEnum = LevelOfFormationEnum;
    @Input() readonly: boolean;

    private _level: LevelOfFormationEnum;

    constructor() {
        this.levelChange = new EventEmitter<LevelOfFormationEnum>();
        this.readonly = false;

        this._level = LevelOfFormationEnum.Unknown;
    }

    @Input()
    get level(): LevelOfFormationEnum {
        return this._level;
    }
    set level(value: LevelOfFormationEnum) {
        this._level = value;
        this.levelChange.emit(this._level);
    }

    _mouseOver($event: any) {
        if (!this.readonly)
        {
            $event.target.classList.add('active');
        }
    }

    _mouseOut($event: any) {
        if (!this.readonly) {
            $event.target.classList.remove('active');
        }
    }

    _levelValueClick(levelValue: LevelOfFormationEnum) {
        if (!this.readonly) {
            this.level = this.level != levelValue ? levelValue : LevelOfFormationEnum.Unknown;
        }        
    }
}