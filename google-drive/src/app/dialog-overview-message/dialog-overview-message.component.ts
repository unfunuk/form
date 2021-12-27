import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: { user: string }
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
