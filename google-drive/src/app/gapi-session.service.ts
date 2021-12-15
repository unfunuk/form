import { Injectable } from '@angular/core';
const CLIENT_ID =
  '1068480686064-r8ri5cc9mc9jqs83s5u9d2c6plk6tdt2.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBEyfKlzW0qK9N4TMyRwJMq3OdGF8RGPi8';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
];
const SCOPES = 'https://www.googleapis.com/auth/drive';
declare var gapi: any;
@Injectable({
  providedIn: 'root',
})
export class GapiSessionService {
  googleAuth: any;
  constructor() {}

  initClient() {
    return new Promise<void>((resolve, reject) => {
      gapi.load('client:auth2', () => {
        return gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            this.googleAuth = gapi.auth2.getAuthInstance();
            resolve();
          });
      });
    });
  }
  get isSignedIn(): boolean {
    return this.googleAuth.isSignedIn.get();
  }

  signIn() {
    return this.googleAuth
      .signIn({
        prompt: 'select_account',
      })
      .then((googleUser: any) => {
        console.log(googleUser);
      });
  }

  signOut(): void {
    this.googleAuth.signOut();
  }
}
