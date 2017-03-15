import { Routes, RouterModule } from '@angular/router';

import { EmptyContentComponent } from './app.emptycontent';
import { UsersListComponent } from './users.list';

const MAINMENU_ROUTES: Routes = [
    { path: '', component: EmptyContentComponent },
    { path: 'usersList', component: UsersListComponent },
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);