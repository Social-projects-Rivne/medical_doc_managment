import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MainAppModule } from './modules/main-app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(MainAppModule);