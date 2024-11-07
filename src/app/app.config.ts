import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { routes } from './app.routes';
import { firebaseConfig } from './config/firebase.config';

/**
 * Aqui importamos varias partes de Angular y para acceder a Firebase
 */
export const appConfig: ApplicationConfig = {
  providers: [
   { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"movies-user-database","appId":"1:1002831383248:web:2d58f504afed79e8f7acd5","storageBucket":"movies-user-database.firebasestorage.app","apiKey":"AIzaSyCbRbtg0yoodwbP4b7Hch5lfK6NCf0WIXA","authDomain":"movies-user-database.firebaseapp.com","messagingSenderId":"1002831383248"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};