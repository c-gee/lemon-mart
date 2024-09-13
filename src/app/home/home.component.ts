import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { FlexModule } from '@ngbracket/ngx-layout/flex'

import { AuthService } from '../auth/auth.service'
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlexModule, LoginComponent, AsyncPipe],
  template: `
    @if ((authService.authStatus$ | async)?.isAuthenticated) {
      <div fxLayout="column" fxLayoutAlign="center center">
        <div class="mat-display-4">This is LemonMart! The place where</div>
        <div class="mat-display-4">
          You get a lemon, you get a lemon, you get a lemon...
        </div>
        <div class="mat-display-4">Everybody gets a lemon.</div>
      </div>
    } @else {
      <app-login></app-login>
    }
  `,
  styles: `
    div[fxLayout] {
      margin-top: 32px;
    }
  `,
})
export class HomeComponent {
  // displayLogin = true

  constructor(public authService: AuthService) {}
}
