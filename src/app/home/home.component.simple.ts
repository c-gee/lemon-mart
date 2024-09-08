import { Component, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { combineLatest } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, FlexModule],
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-headline-3">Hello, Limoncu!</span>
      <button mat-raised-button color="primary" (click)="login()">
        Login as Manager
      </button>
    </div>
  `,
  styles: `
    div[fxLayout] {
      margin-top: 32px;
    }
  `,
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login('manager@test.com', '12345678')

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        tap(([authStatus, user]) => {
          this.router.navigate(['/manager'])
        })
      )
      .subscribe()
  }
}
