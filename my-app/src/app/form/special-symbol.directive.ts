import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[specialSymbol]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SpecialSymbolDirective,
      multi: true,
    },
  ],
})
export class SpecialSymbolDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const accountRgEx: RegExp = /^[а-яА-Яa-zA-Z]+$/;
    let valid = !control.value || accountRgEx.test(control.value);
    return valid ? null : { wrongFormat: true };
  }
}
