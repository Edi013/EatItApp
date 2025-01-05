import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes'; 
import { AuthGuard } from './app/guards/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ),
    AuthGuard
  ],
}).catch(err => console.error(err));
