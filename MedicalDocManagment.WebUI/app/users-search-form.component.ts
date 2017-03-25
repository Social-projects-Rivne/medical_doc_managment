import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { HttpFacade } from './http.facade';

@Component({
  moduleId: module.id,
  selector: 'users-search-Form',
  templateUrl: 'views/users-search-form.component.html',
  providers: [HttpFacade]
})

export class UsersSearchFormComponent {

  private _httpFacade: HttpFacade;

  constructor(httpFacade: HttpFacade) {
    this._httpFacade = httpFacade;
  }

}

