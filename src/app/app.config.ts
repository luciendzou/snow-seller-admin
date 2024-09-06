import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserStorageService } from './services/browser-storage.service';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { enviroment } from '../enviroment/enviroment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    BrowserStorageService,
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(ReactiveFormsModule),
    provideClientHydration(withHttpTransferCacheOptions({ includePostRequests: true })),
    importProvidersFrom([AngularFireModule.initializeApp(enviroment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireDatabase]),
      provideFirebaseApp(()=>initializeApp(enviroment.firebaseConfig)),
      provideAuth(()=>getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
  ]
};
