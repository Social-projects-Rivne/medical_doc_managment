import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import ChildCardAddParentComponent from './child-card-add-parent.component';

const appRoutes: Routes = [
    { path: 'add', component: ChildCardAddParentComponent },
    { path: '', component: ChildCardAddParentComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', component: ChildCardAddParentComponent }
];

export const routing = RouterModule.forRoot(appRoutes);