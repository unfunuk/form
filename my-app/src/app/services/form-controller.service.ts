import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormControllerService {
  constructor() {}
  addFormControl(
    controlName: string,
    parent: FormGroupDirective,
    defaultValue: string
  ) {
    parent.form.addControl(
      controlName,
      new FormControl(defaultValue, [Validators.required])
    );
  }
}
