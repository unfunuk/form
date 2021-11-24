import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form: FormGroup = this.formBuilder.group({})
  constructor(private formBuilder: FormBuilder) {}
  formSubmit() {
    console.log(this.form.value)
    console.log(this.form.valid)
  }
}
