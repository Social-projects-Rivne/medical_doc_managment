import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full',component: LoginComponent },
    { path: '**', component: LoginComponent }
];

export const routing = RouterModule.forRoot(appRoutes);