import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { UsersListComponent } from './users-list/users-list.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'views/app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('usersList') usersList: UsersListComponent;


  ngOnInit() {
    this.usersList.getUsersFromServer();
  }
}
