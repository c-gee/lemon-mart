import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { DomSanitizer } from '@angular/platform-browser'
import { RouterLink, RouterOutlet } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout/flex'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
  ],
  template: `
    <mat-toolbar color="primary" fxLayoutGap="8px">
      <button mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
      <a mat-icon-button routerLink="/home">
        <mat-icon svgIcon="lemon"></mat-icon>
        <span class="left-pad">LemonMart</span>
      </a>
      <span class="flex-spacer"></span>
      <button mat-icon-button>
        <mat-icon>account_circle</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    )
  }
}
