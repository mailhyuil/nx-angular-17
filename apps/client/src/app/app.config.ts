import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ApiConfiguration } from 'api/src/lib/api-configuration';
import { ApiModule } from './../../../../api/src/lib/api.module';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom([ApiModule, ApiConfiguration, HttpClientModule]),
  ],
};
