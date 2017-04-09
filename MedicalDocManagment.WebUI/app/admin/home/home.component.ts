import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
})
@Injectable()
export class HomeComponent implements OnInit {

    constructor(@Inject(DOCUMENT) private document: any) { }

    ngOnInit() {
    }
    logout(event) {
        event.preventDefault();
        this.document.location.href = "/app/core/index.html";
    }

}