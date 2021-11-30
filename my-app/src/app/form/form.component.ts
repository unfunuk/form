import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
export interface Control {
  controlName: string;
  defaultValue: string;
  label: string;
}
interface FormState {
  firstName: Control;
  lastName: Control;
  dateOfBirth: Control;
  time: Control;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  formState: FormState = {
    firstName: {
      controlName: 'firstName',
      defaultValue: 'vlad',
      label: 'Choose the first name',
    },
    lastName: {
      controlName: 'lastName',
      defaultValue: 'akulich',
      label: 'Choose the last name',
    },
    dateOfBirth: {
      controlName: 'dateOfBirth',
      defaultValue: '',
      label: 'Choose the date',
    },
    time: { controlName: 'time', defaultValue: '', label: 'Choose the time' },
  };

  form: FormGroup = this.formBuilder.group({});
  constructor(private formBuilder: FormBuilder) {}
  formSubmit() {
    console.log(this.form.value);
    console.log(this.form.valid);
  }
}
