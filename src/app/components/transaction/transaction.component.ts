import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  accountId!: number;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.accountId = +params.get('accountId')!;
      this.loadTransactions();
    });
  }

  loadTransactions(): void {
    this.transactionService.getTransactionsByCompteId(this.accountId).subscribe(
      data => this.transactions = data,
      error => console.error('Error fetching transactions', error)
    );
  }
}

