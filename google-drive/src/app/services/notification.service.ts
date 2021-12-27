import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}
  openErrorSnackBar(text:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: text,
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snack-error'],
    });
  }
  openSuccessSnackBar(text:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: text,
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['snack-success'],
    });
  }
}
