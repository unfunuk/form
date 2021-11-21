import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { InputComponent } from './input/input.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DatePickerComponent } from './date-picker/date-picker.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { TimePickerComponent } from './time-picker/time-picker.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatIconModule } from '@angular/material/icon'
import { TemplateForTimePickerComponent } from './template-for-time-picker/template-for-time-picker.component'

@NgModule({
  declarations: [
    InputComponent,
    DatePickerComponent,
    TimePickerComponent,
    TemplateForTimePickerComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    OverlayModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    InputComponent,
    DatePickerComponent,
    TimePickerComponent,
    TemplateForTimePickerComponent,
  ],
})
export class FormModule {}
