import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminModule } from './main/admin/admin.module';

import { AppComponent } from './core/app.component';

@NgModule({
    imports: [
        BrowserModule,
        AdminModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
