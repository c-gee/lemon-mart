import { provideHttpClient } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconTestingModule } from '@angular/material/icon/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'

export const commonTestingProviders = [provideRouter([]), provideHttpClient()]

export const commonTestingModules = [
  ReactiveFormsModule,
  NoopAnimationsModule,
  MatIconTestingModule,
] as unknown[]
