import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';

import ChildrenCardsListModule from './children-cards-list/children-cards-list.module';

import { AuthenticationService } from '../shared/authentication.service';
import ChildCardAddParentComponent from './child-card-add-parent.component';
import MainAppComponent from './main-app.component';
import ViewPatientDataComponent from './view-patient-data/view-patient-data.component';
import ChildrenCardAddComponent from './children-cards-list/add/children-card-add.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MyDatePickerModule,
        ChildrenCardsListModule
    ],
    declarations: [        
        ChildCardAddParentComponent,
        MainAppComponent,
        ViewPatientDataComponent,
        ChildrenCardAddComponent
    ],
    providers: [
        AuthenticationService
    ],
    bootstrap: [
        MainAppComponent
    ]
})
export class MainAppModule { }
