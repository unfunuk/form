import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  ValidatorFn,
} from '@angular/forms';

export interface InputErrors {
  required: string;
  wrongName: string;
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
  @Input() controlName: string = '';
  @Input() label: string = '';
  @Input() formController!: AbstractControl;
  @Input() errors!: InputErrors;
  constructor() {}
  ngOnInit() {
    this.formController?.addValidators([this.SpecialSymbolsValidator()]);
  }

  SpecialSymbolsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const accountRgEx: RegExp = /^[а-яА-Яa-zA-Z]+$/;
      let valid = !control.value || accountRgEx.test(control.value);
      return valid ? null : { wrongName: true };
    };
  }
}
