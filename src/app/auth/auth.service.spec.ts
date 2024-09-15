import { TestBed } from '@angular/core/testing'

import { commonTestingModules } from '../common/common.testing'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...commonTestingModules],
      providers: [AuthService],
    })
    service = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
