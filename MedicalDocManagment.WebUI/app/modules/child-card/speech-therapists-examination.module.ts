import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

import CustomDatepickerModule from "../custom-datepicker.module";

import LevelOfFormationComponent from '../../components/childrens-card/child-card/speech-therapists-examination/level-of-formation.component';
import SpeechTherapistsExaminationComponent from '../../components/childrens-card/child-card/speech-therapists-examination/component';
import SpeechTherapistsExaminationFormComponent from '../../components/childrens-card/child-card/speech-therapists-examination/form.component';
import SpeechTherapistsExaminationViewComponent from '../../components/childrens-card/child-card/speech-therapists-examination/view.component';

import { AuthenticationService } from '../../services/authentication.service';
import { AuthGuard } from '../../services/guards/auth.guard';
import ChildrenCardService from '../../services/children-card.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        MomentModule,
        SimpleNotificationsModule,
        CustomDatepickerModule
    ],
    declarations: [
        LevelOfFormationComponent,
        SpeechTherapistsExaminationComponent,
        SpeechTherapistsExaminationFormComponent,
        SpeechTherapistsExaminationViewComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ChildrenCardService,
        NotificationsService
    ],
    exports: [SpeechTherapistsExaminationComponent]
})
export default class SpeechTherapistsExaminationModule {
}
