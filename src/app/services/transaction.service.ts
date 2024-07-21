import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8086/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactionsByCompteId(compteId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/compte/${compteId}`);
  }

  createTransaction(transaction: any): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }
}
