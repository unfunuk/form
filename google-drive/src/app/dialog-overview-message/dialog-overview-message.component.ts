import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilesService } from '../services/files.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dialog-overview-message',
  templateUrl: './dialog-overview-message.component.html',
  styleUrls: ['./dialog-overview-message.component.css'],
})
export class DialogOverviewMessageComponent implements OnInit {
  message = '';
  subject = '';
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewMessageComponent>,
    public filesService: FilesService,
    private formBuilder: FormBuilder
  ) {}
  form: FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
