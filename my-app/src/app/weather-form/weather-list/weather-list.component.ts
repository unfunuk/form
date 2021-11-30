import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather.service';

interface WeatherInfo {
  name: string;
  weather: [{ description: string }];
  wind: { speed: string };
  clouds: { all: string };
}
@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss'],
})
export class WeatherListComponent implements OnChanges {
  @Input() lat: number;
  @Input() lng: number;
  apiId: string = 'f7b14bae2f6d5511dccbfa686e76a868';
  weatherInfo: WeatherInfo;
  async ngOnChanges(changes: SimpleChanges) {
    if (this.lat !== undefined || this.lng !== undefined) {
      this.weatherApi
        .getWeather(this.lat, this.lng)
        .subscribe((data: any) => (this.weatherInfo = data));
    }
  }

  constructor(public weatherApi: WeatherService) {}
}
