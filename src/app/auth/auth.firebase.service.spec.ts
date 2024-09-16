import { TestBed, inject } from '@angular/core/testing'
import { Auth as FireAuth } from '@angular/fire/auth'

import { commonTestingModules, commonTestingProviders } from '../common/common.testing'
import { FirebaseAuthService } from './auth.firebase.service'

const angularFireSutb = {
  user: jasmine.createSpyObj('user', ['subscribe']),
  auth: jasmine.createSpyObj('auth', ['singInWithEmailAndPassword', 'signOut']),
}

describe('FirebaseAuthService', () => {
  let service: FirebaseAuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...commonTestingModules],
      providers: [
        FirebaseAuthService,
        ...commonTestingProviders,
        { provide: FireAuth, useValue: angularFireSutb },
      ],
    })
    service = TestBed.inject(FirebaseAuthService)
  })

  it('should be created', inject(
    [FirebaseAuthService],
    (service: FirebaseAuthService) => {
      expect(service).toBeTruthy()
    }
  ))
})
