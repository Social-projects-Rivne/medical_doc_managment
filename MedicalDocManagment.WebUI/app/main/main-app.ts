import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MainAppModule } from './main-app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(MainAppModule);