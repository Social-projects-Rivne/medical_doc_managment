import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';

import UserModel from '../../models/usermodel'
import { HttpFacade } from '../../http.facade';

@Component({
  moduleId: module.id,
  selector: 'item-ActionList-Delete',
  templateUrl: 'views/item-actionlist-delete.component.html',
  providers: [HttpFacade]
})

/**
 * Class, which implements list of actions on item from list of users.
 */
export default class ItemActionListDeleteComponent {
  @Input() user: UserModel;

  private _httpFacade: HttpFacade;

  constructor(httpFacade: HttpFacade) {
    this.user = new UserModel(null);
    this._httpFacade = httpFacade;
  }

  clicked(): void {
    this._httpFacade.deleteUser(this.user)
                    .subscribe((result: boolean) => { 
                      if (result) this.user.isActive = false;                   
                    });
    
  }
}

