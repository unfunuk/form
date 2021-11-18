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
  isHourOpen:boolean=false;
  isMinuteOpen:boolean=false;
  hourValue: number | undefined;
  minuteValue: number | undefined;
  minutesArray:number[]=[];
  hoursArray:number[]=[...Array(24).keys()];

  form: FormGroup= this.formBuilder.group({
    firstName: new FormControl('',[Validators.required,this.ValidatorForName()]),
    lastName: new FormControl('', [Validators.required,this.ValidatorForName()]),
    dateOfBirth: new FormControl('',[Validators.required]),
    time:new FormControl('')
  });
  constructor( private formBuilder: FormBuilder) {
    for(let i=0;i<12;i++){
      this.minutesArray.push(5*i)
    }
  }
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
  iconClick(event:any){
    event.stopPropagation();
    if(this.isMinuteOpen){
      this.isMinuteOpen=false;
    }else{
      this.isHourOpen? this.isHourOpen=false : this.isHourOpen=true;
    }
    this.minuteValue=undefined;
    this.hourValue=undefined;
  }
  hourClick(event:any){
    this.isHourOpen=false;
    this.hourValue=event.target.id;
    this.isMinuteOpen=true;
  }
  minuteClick(event:any){
    this.minuteValue=event.target.id;
    this.form.patchValue({time:`${this.hourValue}:${this.minuteValue}`})
    this.isMinuteOpen=false;
  }
  outsideClick(event:any){
    console.log('a')
    if(event.target.id!=="time"){
      if(this.isHourOpen) {
        this.isHourOpen = false
      }
      if(this.isMinuteOpen){
        this.isMinuteOpen=false;
      }
    }
    this.minuteValue=undefined;
    this.hourValue=undefined;
  }

}
