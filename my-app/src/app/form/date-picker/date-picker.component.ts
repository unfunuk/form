import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroupDirective,
} from '@angular/forms';

export interface DatePickerErrors {
  required: string;
  matDatepickerMax: string;
}
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class DatePickerComponent {
  @Input() controlName: string = '';
  @Input() label: string = '';
  @Input() formController!: AbstractControl;
  @Input() errors!: DatePickerErrors;

  today = new Date();
  maxDob: Date = new Date(
    this.today.getFullYear() - 18,
    this.today.getMonth(),
    this.today.getDate()
  );
  constructor() {}
}
