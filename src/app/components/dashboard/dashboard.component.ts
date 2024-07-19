import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = null;
  accountBalance: number | null = null;
  transactions: Transaction[] = [];
  readonly accountId = 13; // The account ID

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.fetchAccountBalance();
    this.fetchTransactions();
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

  fetchTransactions(): void {
    this.transactionService.getTransactionsByCompteId(this.accountId).subscribe({
      next: (transactions: Transaction[]) => {
        this.transactions = transactions;
      },
      error: (error) => {
        console.error('Error fetching transactions', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
