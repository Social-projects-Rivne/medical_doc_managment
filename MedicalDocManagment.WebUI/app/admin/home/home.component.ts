import { Component, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
})
@Injectable()
export class HomeComponent {

    constructor(@Inject(DOCUMENT) private document: any) { }

    logout(event) {
        event.preventDefault();
        this.document.location.href = "/app/core/index.html";
    }

}
