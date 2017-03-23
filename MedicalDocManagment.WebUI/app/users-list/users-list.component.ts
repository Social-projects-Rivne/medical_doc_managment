/**
 * @fileoverview This file defines UsersListComponent — component, which implements users list feature.
 * @author andriy_katsubo@ukr.net (Andriy Katsubo)
 */
import { Component } from '@angular/core';
import { Response } from '@angular/http';

import PageComponent from './page/page.component';
import PaginationComponent from './pagination.component';
import UserModel from '../models/usermodel';

@Component({
  moduleId: module.id,
  selector: 'usersList',
  templateUrl: 'views/users-list.component.html',
  styleUrls: ['views/users-list.component.css'],
})

/**
 * Class, which implements users list feature.
 */
export class UsersListComponent {
}

