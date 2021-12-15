import { Component } from '@angular/core';
import { GapiSessionService } from './gapi-session.service';
import { FilesService } from './files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public gapiSession: GapiSessionService,
    public filesService: FilesService
  ) {}
}
