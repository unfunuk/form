import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { FormControllerService } from '../../services/form-controller.service';
import { Control } from '../form.component';

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
export class DatePickerComponent implements OnInit {
  @Input() control: Control;
  today = new Date();
  maxDob: Date = new Date(
    this.today.getFullYear() - 18,
    this.today.getMonth(),
    this.today.getDate()
  );
  dateErrors: DatePickerErrors = {
    required: 'Required field',
    matDatepickerMax: 'Only for those over 18 years',
  };
  constructor(
    public parent: FormGroupDirective,
    private formController: FormControllerService
  ) {}
  ngOnInit() {
    this.formController.addFormControl(
      this.control.controlName,
      this.parent,
      this.control.defaultValue
    );
  }
}
