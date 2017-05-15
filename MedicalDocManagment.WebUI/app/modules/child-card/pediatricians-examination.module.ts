import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';

import PediatriciansExaminationComponent from '../../components/childrens-card/child-card/pediatricians-examination/component';
import PediatriciansExaminationFormComponent from '../../components/childrens-card/child-card/pediatricians-examination/form.component';
import PediatriciansExaminationViewComponent from '../../components/childrens-card/child-card/pediatricians-examination/view.component';

import { AuthenticationService } from '../../services/authentication.service';
import { AuthGuard } from '../../services/guards/auth.guard';
import ChildrenCardService from '../../services/children-card.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        MomentModule
    ],
    declarations: [
        PediatriciansExaminationComponent,
        PediatriciansExaminationFormComponent,
        PediatriciansExaminationViewComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ChildrenCardService
    ],
    exports: [ PediatriciansExaminationComponent ]
})
export default class PediatriciansExaminationModule {
}
