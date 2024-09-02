import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
  ],
  template: `
    <mat-toolbar color="accent" fxLayoutGap="8px">
      <a mat-button routerLink="home" routerLinkActive="active-link">
        Manager's Dashboard
      </a>
      <a mat-button routerLink="users" routerLinkActive="active-link">
        User Management
      </a>
      <a mat-button routerLink="receipts" routerLinkActive="active-link">
        Receipt Lookup
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: `
    div[fxLayout] {
      margin-top: 32px;
    }
    .active-link {
      font-weight: bold;
      border-bottom: 2px solid #005005;
    }
  `,
})
export class ManagerComponent {}
