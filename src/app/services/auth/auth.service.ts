import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, authState } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore'
import { User } from '../../models/user.model';
import { Observable, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  userData$: Observable<any>;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.user$ = authState(this.auth);
    this.userData$ = this.user$.pipe(
      switchMap(user => {
        if (user) {
          const docRef = doc(this.firestore, 'users', user.uid);
          return from(getDoc(docRef)).pipe(
            map(doc => doc.data())
          );
        }
        return from(Promise.resolve(null));
      })
    );
  }

  async register(user: User, password: string): Promise<void> {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, user.email, password);
      if (credential.user) {
        await setDoc(doc(this.firestore, 'users', credential.user.uid), {
          nombre: user.nombre,
          apellidos: user.apellidos,
          email: user.email,
          fechaNacimiento: user.fechaNacimiento,
        });
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async login(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  logout() {
    return this.auth.signOut();
  }

  getAuthToken(): Promise<string | null> {
    return this.auth.currentUser?.getIdToken() || Promise.resolve(null);
  }

    getCurrentUser() {
      return this.auth.currentUser;
    }

    isLoggedIn(): Observable<boolean> {
      return this.user$.pipe(
        map(user => !!user)
      );
    }
}