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
  isModalOpen = false;
  transaction = { typeDeTransaction: 'Credit', montant: 0, description: '', compteId: 13 };

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactionsByCompteId(13).subscribe(
      data => this.transactions = data,
      error => console.error('Error fetching transactions', error)
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    this.transactionService.createTransaction(this.transaction).subscribe(
      response => {
        console.log('Transaction created:', response);
        this.closeModal();
        this.loadTransactions(); // Refresh the transaction list
      },
      error => console.error('Error creating transaction', error)
    );
  }
}
