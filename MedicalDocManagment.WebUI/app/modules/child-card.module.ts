import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';

import ChildCardMainPageComponent from '../components/childrens-card/child-card/main-page.component';
import ChildCardPediatriciansExaminationFormComponent from '../components/childrens-card/child-card/pediatricians-examination-form.component';
import ChildCardPsychiatristsConclusionFormComponent from '../components/childrens-card/child-card/psychiatrists-conclusion-form.component';

import { AuthenticationService } from '../services/authentication.service';
import { AuthGuard } from '../services/guards/auth.guard';
import ChildrenCardService from '../services/children-card.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        MomentModule
    ],
    declarations: [
        ChildCardMainPageComponent,
        ChildCardPediatriciansExaminationFormComponent,
        ChildCardPsychiatristsConclusionFormComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ChildrenCardService
    ]
})
export default class ChildCardModule {
}
