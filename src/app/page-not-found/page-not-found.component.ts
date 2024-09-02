import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  template: ` <p>This page doesn't exist. Go back to <a routerLink="/home">home</a>.</p>`,
  styles: ``,
})
export class PageNotFoundComponent {}
