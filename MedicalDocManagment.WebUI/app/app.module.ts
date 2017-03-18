import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserAddComponent } from './user-add/user-add.component';
import { HttpModule }   from '@angular/http';
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
        declarations: [AppComponent, UserAddComponent],
        bootstrap: [AppComponent]
})
export class AppModule { }