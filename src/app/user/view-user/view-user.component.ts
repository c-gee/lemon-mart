import { AsyncPipe, DatePipe } from '@angular/common'
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router'

import { IUser, User } from '../user/user'

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    AsyncPipe,
    DatePipe,
  ],
  template: `
    @if (currentUser) {
      <div>
        <mat-card appearance="outlined">
          <mat-card-header style="border: 1px">
            <div mat-card-avatar>
              <mat-icon>account_circle</mat-icon>
            </div>
            <mat-card-title-group>
              <mat-card-title>{{ currentUser.fullName }}</mat-card-title>
              <mat-card-subtitle>{{ currentUser.role }}</mat-card-subtitle>
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <p><span class="mat-input bold">E-mail</span></p>
            <p>{{ currentUser.email }}</p>
            <p><span class="mat-input bold">Date of Birth</span></p>
            <p>{{ currentUser.dateOfBirth | date: 'mediumDate' }}</p>
          </mat-card-content>
          @if (editMode) {
            <mat-card-actions>
              <button mat-icon-button (click)="editUser(currentUser._id)">
                <mat-icon>edit</mat-icon>
              </button>
            </mat-card-actions>
          }
        </mat-card>
      </div>
    }
  `,
  styles: `
    .bold {
      font-weight: bold;
    }
  `,
})
export class ViewUserComponent implements OnChanges {
  private readonly router = inject(Router)

  @Input()
  user!: IUser

  currentUser = new User()

  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser = User.Build(changes['user'].currentValue)
  }

  get editMode() {
    return !this.user
  }

  editUser(id: string) {
    this.router.navigate(['/user/profile', id])
  }
}
