import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { FormControllerService } from '../../services/form-controller.service';
import { Control } from '../form.component';

export interface InputErrors {
  required: string;
  wrongFormat: string;
}
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class InputComponent implements OnInit {
  @Input() control: Control;
  inputErrors: InputErrors = {
    required: 'Required field',
    wrongFormat: 'Wrong format',
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
