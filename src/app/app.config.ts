import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { authFactory } from './auth/auth.factory'
import { AuthHttpInterceptor } from './auth/auth.http.interceptor'
import { AuthService } from './auth/auth.service'
import { provideUiService } from './common/ui.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([AuthHttpInterceptor])),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: AuthService,
      useFactory: authFactory,
    },
    provideUiService(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'lemon-mart-1d7dd',
        appId: '1:1008951001802:web:e3cb41140270298e08ea33',
        storageBucket: 'lemon-mart-1d7dd.appspot.com',
        apiKey: 'AIzaSyACuN-L7rkg0d9AUnMso_GX9UmoN0GH26U',
        authDomain: 'lemon-mart-1d7dd.firebaseapp.com',
        messagingSenderId: '1008951001802',
      })
    ),
    provideAuth(() => getAuth()),
  ],
}
