import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import ChildrenCardsListModule from "./children-cards-list.module";

import { AuthGuard } from '../../shared/guards/auth.guard';
import { AuthenticationService } from '../../shared/authentication.service';

import MainAppComponent from '../components/main-app.component';
import ChildCardAddParentComponent from "../components/childrens-card/parent/child-card-add-parent.component";
import ChildrenCardAddComponent from "../components/childrens-card/children-cards-list/add/children-card-add.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ChildrenCardsListModule
    ],
    declarations: [
        MainAppComponent,
        ChildCardAddParentComponent,
        ChildrenCardAddComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard
    ],
    bootstrap: [
        MainAppComponent
    ]
})
export class MainAppModule { }
