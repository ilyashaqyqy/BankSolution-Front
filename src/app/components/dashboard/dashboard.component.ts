// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getToken(); // Retrieve user information from the token or another service method
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}

