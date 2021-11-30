import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MapComponent } from './map/map.component'
import { AgmCoreModule } from '@agm/core'
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete'
import { GooglePlaceModule } from 'ngx-google-places-autocomplete'
import { WeatherListComponent } from './weather-list/weather-list.component'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [MapComponent,WeatherListComponent],
  imports: [
    BrowserModule,
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule,
    GooglePlaceModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [],
  exports: [MapComponent,WeatherListComponent],
})
export class WeatherFormModule {}
