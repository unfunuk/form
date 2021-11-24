import { Component, Input, OnInit } from '@angular/core'
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class TimePickerComponent implements OnInit {
  @Input() controlName: string = ''
  @Input() label: string = ''
  isHourOpen = false
  isMinuteOpen = false
  hourValue: number | undefined
  minuteValue: number | undefined
  minutesArray = [...Array(60).keys()].filter((elem) => elem % 5 === 0)
  hoursArray = [...Array(24).keys()]
  myForm: FormGroup
  iconClick(event: MouseEvent) {
    event.stopPropagation()
    const defaultHourValue = 23
    const defaultMinuteValue = 55
    const timeRgEx = /^([0-9]|[0-1][0-9]|[2][0-3]):([0-9]|[0-5][0-9])$/
    if (timeRgEx.test(this.myForm?.value.time)) {
      const timeArray = this.myForm?.value.time.split(':')
      this.hourValue = timeArray[0]
      this.minuteValue = timeArray[1]
    } else {
      this.hourValue = defaultHourValue
      this.minuteValue = defaultMinuteValue
    }
    this.checkIsTemplateOpen()
  }
  hourClick(hour: number) {
    this.isHourOpen = false
    this.hourValue = hour
    this.isMinuteOpen = true
  }
  checkIsTemplateOpen() {
    if (this.isMinuteOpen || this.isHourOpen) {
      this.isMinuteOpen = false
      this.isHourOpen = false
    } else {
      this.isHourOpen = true
    }
  }
  minuteClick(minute: number) {
    this.minuteValue = minute
    this.myForm?.patchValue({
      time: `${this.hourValue}:${this.minuteValue}`,
    })
    this.isMinuteOpen = false
  }
  outsideClick(event: MouseEvent) {
    const target = event.target as Element
    if (target.id !== 'time') {
      this.checkIsTemplateOpen()
    }
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
