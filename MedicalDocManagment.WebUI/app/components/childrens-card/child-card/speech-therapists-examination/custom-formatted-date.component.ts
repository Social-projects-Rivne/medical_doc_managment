import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'custom-formatted-date',
    templateUrl: 'custom-formatted-date.component.html'
})
export default class CustomFormattedDateComponent {
    private _day: string;
    private _month: string;
    private _yearPart1: string;
    private _yearPart2: string;

    constructor() {
        this._day = "";
        this._month = "";
        this._yearPart1 = "";
        this._yearPart2 = "";

        moment.updateLocale('uk', {
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: '"DD" MMMM YYYYр.',
                LLL: 'D MMMM YYYY р., HH:mm',
                LLLL: 'dddd, D MMMM YYYY р., HH:mm'
            },
            months: {
                'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
                'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
                isFormat: /"DD" MMMM YYYYр./
            }
        });
    }

    @Input()
    set date(value: Date) {
        if (value) {
            let strings = moment(value).format('LL').split(' ');

            this._day = strings[0].substring(1, 3);
            this._month = strings[1];

            this._yearPart1 = strings[2].substring(0,2);
            this._yearPart2 = strings[2].substring(2,4);
        }
    }
}