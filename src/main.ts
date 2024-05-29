import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
