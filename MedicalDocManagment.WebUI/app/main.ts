/**
 * @fileoverview This file tells SystemJS how to load Angular2.
 * @author Rv-023.Net
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);