import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { AuthHttpInterceptor } from './auth/auth.http.interceptor'
import { InMemoryAuthService } from './auth/auth.in-memory.service'
import { AuthService } from './auth/auth.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([AuthHttpInterceptor])),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: AuthService,
      useClass: InMemoryAuthService,
    },
  ],
}
