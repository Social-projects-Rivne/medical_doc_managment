﻿import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LoginAppModule } from './login-app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(LoginAppModule);