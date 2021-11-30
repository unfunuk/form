import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss'],
})
export class WeatherFormComponent {
  lat: number = 53.882974;
  lng: number = 27.547119;
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({});
  }
  mapClick(event: MouseEvent) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  handleAddressChange(location: any) {
    console.log(location.lat());
    this.lat = location.lat();
    this.lng = location.lng();
  }
}
