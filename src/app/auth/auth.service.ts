import { inject } from '@angular/core'
import { jwtDecode as decode } from 'jwt-decode'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators'

import { CacheService } from '../common/cache.service'
import { transformError } from '../common/common'
import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}

export abstract class AuthService implements IAuthService {
  protected readonly cache = inject(CacheService)

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(
    this.cache.getItem('authStatus') ?? defaultAuthStatus
  )
  readonly currentUser$ = new BehaviorSubject<IUser>(new User())

  constructor() {
    this.authStatus$.pipe(
      tap((authStatus) => this.cache.setItem('authStatus', authStatus))
    )
  }

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>

  protected abstract transformJwtToken(token: unknown): IAuthStatus

  protected abstract getCurrentUser(): Observable<User>

  login(email: string, password: string): Observable<void> {
    this.clearToken()

    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken)

        const token = decode(value.accessToken)
        return this.transformJwtToken(token)
      }),
      tap((status) => this.authStatus$.next(status)),
      filter((status: IAuthStatus) => status.isAuthenticated),
      mergeMap(() => this.getCurrentUser()),
      map((user: IUser) => this.currentUser$.next(user)),
      catchError(transformError)
    )

    loginResponse$.subscribe({
      error: (err) => {
        this.logout()
        return throwError(() => err)
      },
    })

    return loginResponse$
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken()
    }

    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  getToken(): string {
    return this.cache.getItem('jwt') ?? ''
  }

  protected setToken(jwt: string) {
    this.cache.setItem('jwt', jwt)
  }

  protected clearToken() {
    this.cache.removeItem('jwt')
  }
}
