import { provideHttpClient } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconTestingModule } from '@angular/material/icon/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { MediaChange } from '@ngbracket/ngx-layout'
import { autoSpyObj } from 'angular-unit-test-helper'
import { of } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { UiService } from './ui.service'

export class MediaObserverFake {
  isActive(_query: string): boolean {
    return false
  }

  asObservable() {
    return of({} as MediaChange)
  }
}

export const commonTestingProviders = [
  provideRouter([]),
  provideHttpClient(),
  { provide: AuthService, useValue: autoSpyObj(AuthService) },
  { provide: UiService, useValue: autoSpyObj(UiService) },
]

export const commonTestingModules = [
  ReactiveFormsModule,
  NoopAnimationsModule,
  MatIconTestingModule,
] as unknown[]
