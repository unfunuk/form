import { Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { InputErrors } from './input/input.component'
import { DatePickerErrors } from './date-picker/date-picker.component'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    time: new FormControl(''),
  })
  constructor(private formBuilder: FormBuilder) {}
  formSubmit() {
    console.log(this.form.value)
    console.log(this.form.valid)
  }
  errorsForFirstName(): InputErrors {
    return { required: 'Required field', wrongName: 'Wrong first name' }
  }
  errorsForLastName(): InputErrors {
    return { required: 'Required field', wrongName: 'Wrong last name' }
  }
  errorsForDateOfBirth(): DatePickerErrors {
    return {
      required: 'Required field',
      matDatepickerMax: 'Only for those over 18 years',
    }
  }
  getFirstName(): AbstractControl {
    return <AbstractControl>this.form.get('firstName')
  }
  getLastName(): AbstractControl {
    return <AbstractControl>this.form.get('lastName')
  }
  getDateOfBirth(): AbstractControl {
    return <AbstractControl>this.form.get('dateOfBirth')
  }
  getTime(): AbstractControl {
    return <AbstractControl>this.form.get('time')
  }
}
