import { Component } from '@angular/core'
import { MouseEvent } from '@agm/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss'],
})
export class WeatherFormComponent {
  lat: number | undefined
  lng: number | undefined
  formGroup: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({})
  }
  mapClick(event: MouseEvent) {
    this.lat = event.coords.lat
    this.lng = event.coords.lng
  }
  async search(geometry: any) {
    this.lat = geometry.lat
    this.lng = geometry.lng
  }
}
