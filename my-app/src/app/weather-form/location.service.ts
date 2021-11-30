import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  baseUrl: string;
  apiKey = 'AIzaSyDqHQgfsx8vG0UINAUMtewU8cVlo-0A49c';
  constructor(private http: HttpClient) {
    this.baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  }
  getLocation(address: string) {
    const params = new HttpParams()
      .set('address', address)
      .set('key', this.apiKey);
    return this.http.get(this.baseUrl, { params });
  }
}
