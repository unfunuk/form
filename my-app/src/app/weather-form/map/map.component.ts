import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MouseEvent } from '@agm/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { LocationService } from '../location.service';
import { FormControllerService } from '../../services/form-controller.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class MapComponent {
  @Input() lat: number;
  @Input() lng: number;
  @Output() onMapClick = new EventEmitter<MouseEvent>();
  @Output() onAddressChange = new EventEmitter<object>();
  zoom = 6;
  isMarkerAtCenter = true;
  latitude: number;
  longitude: number;
  constructor(
    private parent: FormGroupDirective,
    public locationApi: LocationService,
    private formController: FormControllerService
  ) {}
  mapClick(event: MouseEvent) {
    this.isMarkerAtCenter = false;
    this.onMapClick.emit(event);
  }

  ngOnInit() {
    this.formController.addFormControl('search', this.parent, '');
  }

  handleAddressChange(address: Address) {
    const location = address.geometry.location;
    this.latitude = location.lat();
    this.longitude = location.lng();
    this.onAddressChange.emit(location);
    this.isMarkerAtCenter = true;
  }
}
