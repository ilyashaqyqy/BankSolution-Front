
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = null;
  accountBalance: number | null = null;
  readonly accountId = 13; // The account ID 

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.fetchAccountBalance();
  }

  fetchAccountBalance(): void {
    this.accountService.getAccountBalance(this.accountId).subscribe({
      next: (balance: number) => {
        this.accountBalance = balance;
      },
      error: (error) => {
        console.error('Error fetching account balance', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
