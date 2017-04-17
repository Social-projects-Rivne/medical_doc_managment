import { Routes, RouterModule } from '@angular/router';

import { UserAddComponent } from './user-add/user-add.component';
import { UsersSearchFormComponent  } from './users-search/users-search-form.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const appRoutes: Routes = [
    //{ path: 'login', component: LoginComponent },
    { path: 'add', component: UserAddComponent },
    { path: 'search', component: UsersSearchFormComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
    //{ path: '**', component: LoginComponent }
    //{ path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);