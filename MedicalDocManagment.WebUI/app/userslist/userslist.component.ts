/**
 * @fileoverview This file defines UsersListComponent — component, which implements users list feature.
 * @author andriy_katsubo@ukr.net (Andriy Katsubo)
 */
import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { UsersListPageComponent } from './page/userslist-page.component';
import { UsersListPaginationComponent } from './userslist-pagination.component';
import UserModel from '../models/usermodel';

@Component({
  moduleId: module.id,
  selector: 'usersList',
  templateUrl: './views/userslist.component.html',
  styleUrls: ['./views/userslist.component.css'],
})

/**
 * Class, which implements users list feature.
 */
export class UsersListComponent {
}

