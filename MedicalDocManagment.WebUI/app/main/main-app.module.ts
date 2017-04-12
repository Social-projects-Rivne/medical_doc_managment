import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import ChildrenCardsListModule from './children-cards-list/children-cards-list.module';

import { AuthenticationService } from '../shared/authentication.service';
import ChildCardAddParentComponent from './child-card-add-parent.component';
import MainAppComponent from './main-app.component';
import ViewPatientDataComponent from './view-patient-data/view-patient-data.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ChildrenCardsListModule
    ],
    declarations: [        
        ChildCardAddParentComponent,
        MainAppComponent,
        ViewPatientDataComponent
    ],
    providers: [
        AuthenticationService
    ],
    bootstrap: [
        MainAppComponent
    ]
})
export class MainAppModule { }
