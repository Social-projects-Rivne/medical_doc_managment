import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AdminAppModule } from './admin-app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AdminAppModule);