import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const CLIENT_ID =
  '1068480686064-r8ri5cc9mc9jqs83s5u9d2c6plk6tdt2.apps.googleusercontent.com';
const API_KEY = 'AIzaSyALKrGtW8xoM4fh2goItStszHCc8PZqRXA';
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
  token!: string;
  isSignedIn$ = new BehaviorSubject(false);

  constructor() {}

  initClient() {
    return new Promise<void>((resolve, reject) => {
      gapi.load('auth2', () => {
        gapi.auth2
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            this.googleAuth = gapi.auth2.getAuthInstance();
            this.signOut();
            this.googleAuth.isSignedIn.listen(
              this.updateSignInStatus.bind(this)
            );
            resolve();
          });
      });
    });
  }

  signIn() {
    return this.googleAuth.signIn().then((googleUser: any) => {
      this.token = googleUser.vc.access_token;
    });
  }

  signOut(): void {
    this.googleAuth.signOut();
    this.token = '';
  }

  updateSignInStatus() {
    let user = this.googleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPES);
    isAuthorized ? this.isSignedIn$.next(true) : this.isSignedIn$.next(false);
  }
}
