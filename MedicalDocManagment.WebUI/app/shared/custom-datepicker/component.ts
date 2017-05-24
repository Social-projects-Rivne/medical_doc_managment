import {
    Component, forwardRef, ElementRef, EventEmitter,
    Input, Output, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
declare var $;

@Component({
    moduleId: module.id,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CustomDatepickerComponent),
        multi: true
    }],
    selector: 'custom-datepicker',
    templateUrl: 'component.html'
})
export default class CustomDatepickerComponent implements ControlValueAccessor {
    private _date: Date;
    private _disabled: boolean;
    private _onChange: (_: string) => void;
    private _onTouched: () => void;

    constructor() {
        this._date = null;
        this._disabled = false;
        this._onChange = (_: string) => {};
        this._onTouched = () => {};
    }

    @ViewChild('datePicker')
    set datePicker(_elementRef: ElementRef) {
        $(_elementRef.nativeElement).datepicker({
            autoclose: true,
            endDate: '0d',
            language: 'uk'
        });
        $(_elementRef.nativeElement).on('changeDate', (e) => {
            this._onTouched();
            this.date = e.date;
        });
        $(_elementRef.nativeElement).on('clearDate', (e) => {
            this.date = null;
        });
        $(_elementRef.nativeElement).on('show', (e) => {
            this._onTouched();
        });
    }

    @Input()
    get date(): Date {
        return this._date;
    }
    set date(value: Date) {
        this._date = value;
        this._onChange(this._date.toDateString());
    }

    writeValue(value: string) {
        this._date = new Date(value);
    }

    registerOnChange(fn: (_: string) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }
}