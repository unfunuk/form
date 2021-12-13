import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { SpecialSymbolDirective } from './special-symbol.directive';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    InputComponent,
    DatePickerComponent,
    TimePickerComponent,
    SpecialSymbolDirective,
    FormComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    OverlayModule,
    MatIconModule,
    MatNativeDateModule,
    RouterModule.forChild([{ path: 'form', component: FormComponent }]),
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [RouterModule],
})
export class FormModule {}
