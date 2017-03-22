/**
 * @fileoverview This file defines AppComponent — root component of front-end side of application.
 * @author Rv-023.Net
 */
import { Component } from '@angular/core';

import { UsersListComponent } from './userslist/userslist.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './views/app.component.html'
})
export class AppComponent {
}
