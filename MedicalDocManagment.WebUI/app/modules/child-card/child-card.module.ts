import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';

import PediatriciansExaminationModule from './pediatricians-examination.module';

import ChildCardMainPageComponent from '../../components/childrens-card/child-card/main-page.component';
import ChildCardParentsListComponent from '../../components/childrens-card/child-card/parents/parents-list.component';
import ChildCardPsychiatristsConclusionFormComponent from '../../components/childrens-card/child-card/psychiatrists-conclusion-form.component';
import VisitComponent from '../../components/childrens-card/visit/add/visit.component';

import { AuthenticationService } from '../../services/authentication.service';
import { AuthGuard } from '../../services/guards/auth.guard';
import ChildrenCardService from '../../services/children-card.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        MomentModule,
        PediatriciansExaminationModule,
        SimpleNotificationsModule,
        PushNotificationsModule
    ],
    declarations: [
        ChildCardMainPageComponent,
        ChildCardPsychiatristsConclusionFormComponent,
        VisitComponent,
        ChildCardParentsListComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ChildrenCardService
    ]
})
export default class ChildCardModule {
}
