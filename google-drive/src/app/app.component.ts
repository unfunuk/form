import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GapiSessionService } from './gapi-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isSignedIn = false;
  constructor(
    public gapiSession: GapiSessionService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.gapiSession.isSignedIn$.subscribe((value) => {
      this.isSignedIn = value;
      this.ref.detectChanges();
    });
  }
}
