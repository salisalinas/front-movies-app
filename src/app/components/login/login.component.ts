import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
/**
 * Componente de inicio de sesión
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /** Instancia de FormGroup, que agrupa todos los valores del formulario en un objeto */
  loginForm: FormGroup;
  /** Mensaje de error, inicialmente vacío */
  errorMessage: string = '';
  /** Indica si se está mostrando el spinner de carga o no */
  isLoading: boolean = false;
/**
 * Necesitamos 3 parametros para nuestro formulario de login
 * @param fb Instancia de nuestro formulario reactivo
 * @param authService Servicio de autenticación
 * @param router Servicio de enrutado
 */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

/**
 * Función de inicio de sesión
 */
  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        await this.authService.login(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        this.router.navigate(['/movies']);
      } catch (error: any) {
        console.error('Error al entrar:', error);
        this.errorMessage = 'Email o contraseña no validos';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
