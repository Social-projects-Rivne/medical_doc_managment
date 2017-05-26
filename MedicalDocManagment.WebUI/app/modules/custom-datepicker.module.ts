import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';

import CustomDatepickerComponent from '../shared/custom-datepicker/component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        MomentModule        
    ],
    declarations: [CustomDatepickerComponent],
    exports: [CustomDatepickerComponent]
})
export default class CustomDatepickerModule {
}
