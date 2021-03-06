﻿import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

import DiagnosisSelectModalComponent from '../../components/childrens-card/diagnosis/select-modal.component';
import DiagnosisTextComponent from '../../components/childrens-card/diagnosis/text.component';
import NeurologistsExaminationComponent from '../../components/childrens-card/child-card/neurologists-examination/component';
import NeurologistsExaminationFormComponent from '../../components/childrens-card/child-card/neurologists-examination/form.component';
import NeurologistsExaminationViewComponent from '../../components/childrens-card/child-card/neurologists-examination/view.component';

import { AuthenticationService } from '../../services/authentication.service';
import { AuthGuard } from '../../services/guards/auth.guard';
import ChildCardService from '../../services/child-card.service';
import ChildrenCardService from '../../services/children-card.service';
import MkhsService from "../../services/mkhs.service";
import SharedService from '../../services/shared.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        MomentModule,
        SimpleNotificationsModule
    ],
    declarations: [
        DiagnosisSelectModalComponent,
        DiagnosisTextComponent,
        NeurologistsExaminationComponent,
        NeurologistsExaminationFormComponent,
        NeurologistsExaminationViewComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ChildCardService,
        ChildrenCardService,
        NotificationsService,
        MkhsService,
        SharedService
    ],
    exports: [NeurologistsExaminationComponent]
})
export default class NeurologistsExaminationModule {
}
