import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import * as Sentry from '@sentry/angular-ivy';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketIoConfig } from './../../../../node_modules/ngx-socket-io/src/config/socket-io.config.d';
import { appRoutes } from './app.routes';
import { CountEffects } from './store/count.effects';
import { countFeature } from './store/count.feature';

const config: SocketIoConfig = {
  url: 'ws://localhost:8080',
  options: {
    transports: ['websocket'],
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withViewTransitions()),
    provideHttpClient(),
    provideStore(),
    provideState(countFeature),
    provideEffects(CountEffects),
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    provideAnimations(),
    importProvidersFrom([SocketIoModule.forRoot(config)]),
  ],
};
