import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navLinks: Array<{ label: string; link: string }>;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Home',
        link: '/',
      },
      {
        label: 'Form',
        link: '/form',
      },
      {
        label: 'Weather Form',
        link: '/weather-form',
      },
    ];
  }
}
