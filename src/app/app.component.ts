import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    MatToolbarModule, 
    MatButtonModule
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
  user$: Observable<User | null>;
  userData$: Observable<any>;
  userName: string='';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.user$;
    this.userData$ = this.authService.userData$; 
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      this.userName = user?.email || '';
  
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