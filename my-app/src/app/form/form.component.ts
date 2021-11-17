import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent{
  today = new Date();
  maxDob: Date = new Date(
    this.today.getFullYear() - 18,
    this.today.getMonth(),
    this.today.getDate()
  );
  form: FormGroup= this.formBuilder.group({
    firstName: new FormControl('',[Validators.required,this.ValidatorForName()]),
    lastName: new FormControl('', [Validators.required,this.ValidatorForName()]),
    dateOfBirth: new FormControl('',[Validators.required])
  });
  constructor( private formBuilder: FormBuilder) {}
  ValidatorForName():ValidatorFn{
    return (
      control: AbstractControl
    ): { [key: string]: boolean } | null => {
      let accountRgEx: RegExp = /^[^0-9!?.|,@#$%^*]+$/
      let valid =
        !control.value || accountRgEx.test(control.value)
      return valid ? null : { wrongName: true }
    }
  }

  formSubmit(){
    console.log(this.form.value)
    console.log(this.form.valid)
  }

}
