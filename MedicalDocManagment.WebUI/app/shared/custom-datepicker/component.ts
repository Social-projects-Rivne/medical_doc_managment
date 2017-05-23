import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
declare var $;

@Component({
    moduleId: module.id,
    selector: 'custom-datepicker',
    templateUrl: 'component.html'
})
export default class CustomDatepickerComponent{    
    @Output() dateChange: EventEmitter<Date>;
    @Output() touchedChange: EventEmitter<boolean>;
    private _touched: boolean;
    private _date: Date;

    constructor() {
        this.dateChange = new EventEmitter<Date>();
        this.touchedChange = new EventEmitter<boolean>();

        this._touched = false;
        this._date = null;
    }

    @ViewChild('datePicker')
    set datePicker(_elementRef: ElementRef) {
        $(_elementRef.nativeElement).datepicker({
            autoclose: true,
            language: 'uk'
        });
        $(_elementRef.nativeElement).on('changeDate', (e) => {
            this.touched = true;
            this.date = e.date;
        });
        $(_elementRef.nativeElement).on('clearDate', (e) => {
            this.date = null;
        });
        $(_elementRef.nativeElement).on('show', (e) => {
            this.touched = true;
        });
    }

    @Input()
    get date(): Date {
        return this._date;
    }
    set date(newDate: Date) {
        this._date = newDate;
        this.dateChange.emit(this._date);
    }

    @Input()
    get touched(): boolean {
        return this._touched;
    }
    set touched(newValue: boolean) {
        this._touched = newValue;
        this.touchedChange.emit(this._touched);
    }
}