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
    private _datePickerElementRef: ElementRef;
    private _disabled: boolean;
    private _format: string | Object;
    private _onChange: (_: string) => void;
    private _onTouched: () => void;

    constructor() {
        this._date = null;
        this._datePickerElementRef = null;
        this._disabled = false;
        this._format = 'dd.mm.yyyy';
        this._onChange = (_: string) => {};
        this._onTouched = () => {};
    }

    private _initDatepicker() {
        $(this._datePickerElementRef.nativeElement).datepicker({
            autoclose: true,
            endDate: new Date(),
            format: this._format,
            language: 'uk'
        });
        $(this._datePickerElementRef.nativeElement)
            .on('changeDate', (e) => {
            this._onTouched();
            this.date = e.date;
        });
        $(this._datePickerElementRef.nativeElement)
            .on('clearDate', (e) => {
            this.date = null;
        });
        $(this._datePickerElementRef.nativeElement)
            .on('show', (e) => {
            this._onTouched();
        });
    }

    @Input()
    set format(value: string | Object) {
        this._format = value;
        $(this._datePickerElementRef.nativeElement).datepicker('remove');
        this._initDatepicker();
    }

    @ViewChild('datePicker')
    set datePicker(elementRef: ElementRef) {
        this._datePickerElementRef = elementRef;
        this._initDatepicker();
    }

    @Input()
    get date(): Date {
        return this._date;
    }
    set date(value: Date) {
        this._date = value;
        this._onChange(this._date ? this._date.toDateString(): "");
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