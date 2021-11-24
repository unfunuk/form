import { Component, Input, OnInit } from '@angular/core'
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidatorFn,
  Validators,
} from '@angular/forms'

export interface InputErrors {
  required: string
  wrongFormat: string
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
  @Input() controlName: string = ''
  @Input() label: string = ''
  myForm: FormGroup
  inputErrors: InputErrors = {
    required: 'Required field',
    wrongFormat: 'Wrong format',
  }
  constructor(private parent: FormGroupDirective) {}
  ngOnInit() {
    this.myForm = this.parent.form
    this.parent.form.addControl(
      this.controlName,
      new FormControl('', [Validators.required])
    )
  }
}
