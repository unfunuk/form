import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  baseUrl: string;
  appid: string = 'f7b14bae2f6d5511dccbfa686e76a868';
  constructor(private http: HttpClient) {
    this.baseUrl = `http://api.openweathermap.org/data/2.5/weather`;
  }
  getWeather(lat: number, lng: number) {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lng)
      .set('appid', this.appid);
    return this.http.get(this.baseUrl, { params });
  }
}
