import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginAppComponent } from '../components/login-app.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AuthenticationService } from '../../shared/authentication.service';
import { routing } from '../routes/login-app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        LoginAppComponent,
        LoginComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService
    ],
    bootstrap: [LoginAppComponent]
})
export class LoginAppModule { }
