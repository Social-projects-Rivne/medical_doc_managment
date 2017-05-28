import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

import NeurologistsExaminationComponent from '../../components/childrens-card/child-card/neurologists-examination/component';
import NeurologistsExaminationFormComponent from '../../components/childrens-card/child-card/neurologists-examination/form.component';
import NeurologistsExaminationViewComponent from '../../components/childrens-card/child-card/neurologists-examination/view.component';

import { AuthenticationService } from '../../services/authentication.service';
import { AuthGuard } from '../../services/guards/auth.guard';
import ChildrenCardService from '../../services/children-card.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        MomentModule,
        SimpleNotificationsModule
    ],
    declarations: [
        NeurologistsExaminationComponent,
        NeurologistsExaminationFormComponent,
        NeurologistsExaminationViewComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ChildrenCardService,
        NotificationsService
    ],
    exports: [NeurologistsExaminationComponent ]
})
export default class NeurologistsExaminationModule {
}
