import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({
    "apiKey": "AIzaSyD4YQKbtRf1aBi-wW3weak0WDdrjI5CDNo",
    "authDomain": "simulacrop1labo4.firebaseapp.com",
    "projectId": "simulacrop1labo4",
    "storageBucket": "simulacrop1labo4.appspot.com",
    "messagingSenderId": "161451895122",
    "appId": "1:161451895122:web:d4b7f59867406a4272f28b"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), 
    provideDatabase(() => getDatabase()), 
    provideStorage(() => getStorage()), 
    provideHttpClient()
  ]
};
