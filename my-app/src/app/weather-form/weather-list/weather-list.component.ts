import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'

interface WeatherInfo {
  name: string
  weather: [{ description: string }]
  wind: { speed: string }
  clouds: { all: string }
}
@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss'],
})
export class WeatherListComponent implements OnChanges {
  @Input() lat: number | undefined
  @Input() lng: number | undefined
  apiId: string = 'f7b14bae2f6d5511dccbfa686e76a868'
  weatherInfo: WeatherInfo
  async ngOnChanges(changes: SimpleChanges) {
    if (this.lat !== undefined || this.lng !== undefined) {
      let response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=${this.apiId}`
      )
      this.weatherInfo = await response.json()
      console.log(this.weatherInfo)
    }
  }

  constructor() {}
}
