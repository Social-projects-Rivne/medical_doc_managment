import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { HttpFacade } from '../../http.facade';
import { ItemComponent } from './item.component';
import UserModel from '../../models/usermodel';

@Component({
  moduleId: module.id,
  selector: 'page',
  templateUrl: './views/page.component.html',
  styleUrls: ['./views/page.component.css'],
  providers: [HttpFacade]
})

export class PageComponent {
  private _users: UserModel[];
  private _httpFacade: HttpFacade;

  constructor(httpService: HttpFacade) {
    this._httpFacade = httpService;
    this.updateUsersList();
  }

  updateUsersList(): void {
    this._httpFacade.getUsersList()
      .subscribe((data: UserModel[]) => { this._users = data; });
  }

}

