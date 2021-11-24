import { Component, EventEmitter, Input, Output } from '@angular/core'
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete'
import { Address } from 'ngx-google-places-autocomplete/objects/address'
import { MouseEvent } from '@agm/core'
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class MapComponent {
  @Input() lat: number | undefined
  @Input() lng: number | undefined
  /*@ViewChild('placesRef') placesRef: GooglePlaceDirective | undefined*/
  @Output() onMapClick = new EventEmitter<MouseEvent>()
  @Output() onSearch = new EventEmitter<object>()
  zoom = 6
  latitude = 53.882974
  longitude = 27.547119
  locationChosen = false
  apiKey = 'AIzaSyDqHQgfsx8vG0UINAUMtewU8cVlo-0A49c'
  constructor(private parent: FormGroupDirective) {}
  mapClick(event: MouseEvent) {
    this.onMapClick.emit(event)
    this.locationChosen = true
  }
  async search() {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        this.parent.form.get('search')?.value
      }&key=${this.apiKey}`
    )
    const data = await response.json()
    this.onSearch.emit(data.results[0].geometry.location)
    this.locationChosen = true
  }

  ngOnInit() {
    const myForm = this.parent.form
    myForm.addControl('search', new FormControl('', Validators.required))
  }
  /*public handleAddressChange(address: Address) {
    console.log(address)
  }*/
}
