import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Base64 } from 'js-base64';
@Injectable({
  providedIn: 'root',
})
export class GmailService {
  constructor(private http: HttpClient) {}
  sendMessage(
    message: string,
    subject: string,
    token: string,
    from: string,
    to: string
  ) {
    const raw = [
      `to: ${to}`,
      '\n',
      `from: ${from}`,
      '\n',
      `subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
      '\n\n',
      message,
    ].join('');
    const encodedMessage = btoa(unescape(encodeURIComponent(raw)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'message/rfc822');
    return this.http.post(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
      { raw: encodedMessage },
      { headers }
    );
  }
}
