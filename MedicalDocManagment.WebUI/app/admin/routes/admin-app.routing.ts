import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../shared/guards/auth.guard";
import { UserAddComponent } from "../components/user/user-add/user-add.component";
import { UsersSearchFormComponent } from "../components/user/users-search/users-search-form.component";
import { HomeComponent } from "../components/home/home.component";

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