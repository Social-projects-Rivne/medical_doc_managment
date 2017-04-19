import { Routes, RouterModule } from '@angular/router';

import ChildCardAddParentComponent from "../components/childrens-card/parent/child-card-add-parent.component";
import MainAppComponent from "../components/main-app.component";

import { AuthGuard } from '../../shared/guards/auth.guard';

const appRoutes: Routes = [
    { path: 'parentadd', component: ChildCardAddParentComponent , canActivate: [AuthGuard] },
    { path: '', component: MainAppComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', component: MainAppComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);