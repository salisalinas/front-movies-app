import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs/operators';
/**
 * Guard que impide la entrada al usuario en peliculas si no esta logeado, y le redirige al login 
 * @returns True si puede entrar en esta ruta, false si no
 */
export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.user$.pipe(
    map(user => {
      if (user) return true;
      
      router.navigate(['/login']);
      return false;
    })
  );
}; 