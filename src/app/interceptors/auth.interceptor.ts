import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * Interceptor que lee el token del usuario almacenad en el local storage
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Método de interception de petición
   * @param req Petición HTTP
   * @param next Manejador HTTP
   * @returns El token de identificacion, si lo hay
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**Obtenemos token */
    const token = localStorage.getItem('userToken'); 
    /**Si lo hay, lo clonamos y metemos en el header del request */
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}