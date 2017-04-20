import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/guards/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { UserAddComponent } from "../components/user/user-add/user-add.component";
import { UsersSearchFormComponent } from "../components/user/users-search/users-search-form.component";
import { HomeComponent } from "../components/home/home.component";
import ChildCardAddParentComponent from "../components/childrens-card/parent/child-card-add-parent.component";
import MainAppComponent from "../components/main-app.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'add', component: UserAddComponent, canActivate: [AuthGuard] },
    { path: 'search', component: UsersSearchFormComponent, canActivate: [AuthGuard] },
    { path: 'parentadd', component: ChildCardAddParentComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);