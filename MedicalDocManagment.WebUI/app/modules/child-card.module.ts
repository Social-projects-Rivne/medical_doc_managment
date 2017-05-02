import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';

import ChildCardComponent from '../components/childrens-card/child-card/child-card.component';
import PsychiatristsConclusionFormComponent from '../components/childrens-card/child-card/psychiatrists-conclusion-form.component';

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
        ChildCardComponent,
        PsychiatristsConclusionFormComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ChildrenCardService
    ],
    exports: [ChildCardComponent]
})
export default class ChildCardModule {
}
