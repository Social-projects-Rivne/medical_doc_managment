import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginAppComponent } from './login-app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        LoginAppComponent
    ],
    bootstrap: [LoginAppComponent]
})
export class LoginAppModule { }
