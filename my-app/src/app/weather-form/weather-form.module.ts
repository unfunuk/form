import { NgModule } from '@angular/core';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WeatherFormComponent } from './weather-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MapComponent, WeatherListComponent, WeatherFormComponent],
  imports: [
    CommonModule,
    AgmCoreModule,
    GooglePlaceModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'weather-form',
        component: WeatherFormComponent,
      },
    ]),
  ],
  providers: [],
  exports: [RouterModule],
})
export class WeatherFormModule {}
