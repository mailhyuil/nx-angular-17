import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
} from '@angular/core';
import { Router, provideRouter, withViewTransitions } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import * as Sentry from '@sentry/angular-ivy';
import { appRoutes } from './app.routes';
import { CountEffects } from './store/count.effects';
import { countFeature } from './store/count.feature';
import { provideAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withViewTransitions()),
    provideHttpClient(),
    provideStore(),
    provideState(countFeature),
    provideEffects(CountEffects),
    {
        provide: ErrorHandler,
        useValue: Sentry.createErrorHandler({
            showDialog: true,
        }),
    },
    {
        provide: Sentry.TraceService,
        deps: [Router],
    },
    {
        provide: APP_INITIALIZER,
        useFactory: () => () => { },
        deps: [Sentry.TraceService],
        multi: true,
    },
    provideAnimations()
],
};
