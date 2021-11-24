import { Component, Input, OnInit } from '@angular/core'
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms'

export interface DatePickerErrors {
  required: string
  matDatepickerMax: string
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
  @Input() controlName: string = ''
  @Input() label: string = ''
  myForm: FormGroup
  today = new Date()
  maxDob: Date = new Date(
    this.today.getFullYear() - 18,
    this.today.getMonth(),
    this.today.getDate()
  )
  dateErrors: DatePickerErrors = {
    required: 'Required field',
    matDatepickerMax: 'Only for those over 18 years',
  }
  constructor(private parent: FormGroupDirective) {}
  ngOnInit() {
    this.myForm = this.parent.form
    this.parent.form.addControl(
      this.controlName,
      new FormControl('', Validators.required)
    )
  }
}
