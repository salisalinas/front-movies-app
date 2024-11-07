
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
/**
 * Componente para el formulario de registro. Utiliza la capacidad de formularios de Angular
 * @implements {ReactiveFormsModule, FormBuilder, FormGroup, Validators, AuthService}
 * {@link https://angular.dev/guide/forms/reactive-forms }
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  /**
   * Estancia de FormGroup
   */
  registerForm: FormGroup;
  /**
   * Mensaje de error, comienza vacio
   */
  errorMessage: string = '';
/**
 * Necesitamos tres parametros en el constructor:
 * @param fb Para construir el formulario
 * @param authService Para registrar el usuario
 * @param router Para redirigirle al login
 */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    /**
     * Instancia del formulario de registro, que utiliza validadores para la comprobacion del correcto formato de los datos
     */
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required]
    });
  }
  /**
   *Método que manda el formulario, validandolo y llamando a AuthService
   */
  async onSubmit() {
    /** Validamos formulario */
    if (this.registerForm.valid) {
      try {
        /**Llamamos al servicio para registrar el usuario */
        await this.authService.register(
          {
            nombre: this.registerForm.value.name,
            apellidos: this.registerForm.value.surnames,
            email: this.registerForm.value.email,
            fechaNacimiento: this.registerForm.value.dateOfBirth
          },
          this.registerForm.value.password
        );
        /**Si todo va bien, nos vamos al login */
        await this.router.navigate(['/login']);
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }
}