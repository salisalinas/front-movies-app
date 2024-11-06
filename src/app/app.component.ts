import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserData } from './models/userData.model';
import { MayusPipe } from './pipes/mayus.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    MatToolbarModule, 
    MatButtonModule,
    MayusPipe
  ],
  templateUrl: './app.component.html',
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .welcome-text {
      margin-right: 16px;
      font-size: 14px;
    }
  `]
})
export class AppComponent implements OnInit {
  user$: Observable<UserData | null>;
  userName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.userData$;
    this.user$.subscribe(userData => {
      console.log(userData);
      if (userData) {
        this.userName = `${userData.nombre} ${userData.apellidos}`;
      }
    });
  }

  ngOnInit() {
    this.user$.subscribe(userData => {
      console.log(userData);
      if (userData) {
        this.userName = `${userData.nombre} ${userData.apellidos}`;
      }
    });
  }

  async logout() {
    try {
      await this.authService.logout();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}