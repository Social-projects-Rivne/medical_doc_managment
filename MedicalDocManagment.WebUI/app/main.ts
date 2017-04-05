import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LoginAppModule } from './core/login-app.module';
import { AdminAppModule } from './admin/admin-app.module';
import { MainAppModule } from './main/main-app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(LoginAppModule);
platform.bootstrapModule(AdminAppModule);
platform.bootstrapModule(MainAppModule);