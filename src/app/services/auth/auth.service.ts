import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, authState } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore'
import { UserData } from '../../models/userData.model';
import { Observable, from, map, switchMap } from 'rxjs';
/**
 * Servicio que interactua con las funcionalidades de autenticación de Firebase, asi como el almacenamiento de usuarios registrados en Firestore
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Estancia observable que utilizaremos para la autenticacion con Firebase
   */
  user$: Observable<any>;
  /**
   * Estancia observable de nuestra interfaz UserData
   */
  userData$: Observable<UserData | null>;
  /**
   * Nuestro constructor tiene dos parametros que son importaciones de la libreria de Firebase
   * @param auth Autenticación de Firebase
   * @param firestore Almacenamiento de datos en Firestore
   */
  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.user$ = authState(this.auth);
    this.userData$ = this.user$.pipe(
      switchMap(user => {
        if (user) {
          console.log(user);
          const docRef = doc(this.firestore, 'users', user.uid);
          return from(getDoc(docRef)).pipe(
            map(doc => {
              const data = doc.data();
              console.log(data);
              return {
                nombre: data?.['nombre'],
                apellidos: data?.['apellidos'],
                email: user.email,
                fechaNacimiento: data?.['fechaNacimiento'],
                uid: user.uid
              } as UserData;
            })
          );
        }
        return from(Promise.resolve(null));
      })
    );
  }
/**
 * Función de registro de usuario
 * @param user Nombre de usuario, que será su email
 * @param password Contraseña del usuario
 * @returns 
 */
  async register(user: UserData, password: string): Promise<void> {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, user.email, password);
      if (credential.user) {
        await setDoc(doc(this.firestore, 'users', credential.user.uid), {
          nombre: user.nombre,
          apellidos: user.apellidos,
          email: user.email,
          fechaNacimiento: user.fechaNacimiento,
          uid:credential.user.uid
        });
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
/**
 * Función de inicio de sesión
 * @param email Email del usuario, que utiliza para iniciar sesión
 * @param password Cotnraseña del usuario
 * @returns 
 */
  async login(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }
/**
 * Función de ciere de sesión
 * @returns Llamada a la libreria auth para que nos cierre sesión
 */
  logout() {
    return this.auth.signOut();
  }
/**
 * Función de obtención del token del usuario actual
 * @returns Nuestro token
 */
  getAuthToken(): Promise<string | null> {
    return this.auth.currentUser?.getIdToken() || Promise.resolve(null);
  }
/**
 * Función que devuelve el nombre del usuario actual (su correo)
 * @returns Nombre de usuario actual
 */
  getCurrentUser() {
      return this.auth.currentUser;
    }
/**
 * Función uqe nos dice si el usuario esta logeado o no
 * @returns True o false si el usuario esta logeado
 */
    isLoggedIn(): Observable<boolean> {
      return this.user$.pipe(
        map(user => !!user)
      );
    }
}