import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MatIconModule, MatButtonModule, MatBadgeModule]
})
export class NavbarComponent {

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
