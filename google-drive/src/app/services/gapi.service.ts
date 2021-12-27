import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { NotificationService } from './notification.service';
const CLIENT_ID =
  '105376091089-q4h0dam5cgcqcd3hjoco585ouljj7gr1.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCX5SMRSv5Jh9DnvoYeGKP1BMlmeLO0UrQ';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
];
const SCOPES = 'https://www.googleapis.com/auth/gmail.send';
declare var gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GapiService {
  private googleAuth!: gapi.auth2.GoogleAuth;
  subject$ = new BehaviorSubject<any>(null);
  constructor(
    private notification: NotificationService,
    private readonly zone: NgZone
  ) {
    gapi.load('client:auth2', () => {
      gapi.client.load('gmail', 'v1');
      gapi.client
        .init({
          clientId: CLIENT_ID,
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          this.googleAuth = gapi.auth2.getAuthInstance();
        });
    });
  }

  signIn() {
    this.googleAuth.signIn().then((googleUser: any) => {
      gapi.client.drive.files
        .list({ fields: '*' })
        .then((res: any) => {
          if (
            res.result.files.filter((doc: any) => doc.name === 'l').length !== 0
          ) {
            this.subject$.next(googleUser);
            this.zone.run(() => {
              this.notification.openSuccessSnackBar('Success. You are logged in');
            });
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          this.signOut(true);
        });
    });
  }

  signOut(error?: boolean): void {
    this.googleAuth.signOut().then(() => {
      this.subject$.next(null);
      if (error) {
        this.zone.run(() => {
          this.notification.openErrorSnackBar("Error. Try another account");
        });
      } else {
      }
    });
  }
}
