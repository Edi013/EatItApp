import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';


import { appRoutes } from './app.routes';
import { AuthGuard } from './guards/auth.guard';
import { authenticationInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    provideAnimations(),
    AuthGuard,
  ]
};
