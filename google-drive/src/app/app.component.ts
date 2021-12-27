import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewMessageComponent } from './dialog-overview-message/dialog-overview-message.component';
import { GapiService } from './services/gapi.service';
import { GmailService } from './services/gmail.service';
import { NotificationService } from "./services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  user: any;
  constructor(
    public gapiService: GapiService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    public messageService: GmailService,
    private readonly zone: NgZone,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.gapiService.subject$.subscribe((user) => {
      this.user = user;
      this.ref.detectChanges();
    });
  }
  signIn() {
    this.gapiService.signIn();
  }
  signOut() {
    this.gapiService.signOut();
  }
  openDialog(): void {
    this.zone.run(() => {
      const dialogRef = this.dialog.open(DialogOverviewMessageComponent, {
        width: '400px',
        data: { user: 'unfunuk@gmail.com' },
      });
      dialogRef
        .afterClosed()
        .subscribe((info: { message: string; subject: string }) => {
          if (info !== undefined) {
            this.messageService
              .sendMessage(
                info.message,
                info.subject,
                this.user.vc.access_token,
                this.user.yu.nv
              )
              .subscribe(() => {
                this.notification.openSuccessSnackBar('Success. Message has been sent');
              });
          }
        });
    });
  }
}
