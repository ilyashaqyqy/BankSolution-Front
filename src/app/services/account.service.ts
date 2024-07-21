
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8086/api/comptes'; 

  constructor(private http: HttpClient) {}

  getAccountBalance(accountId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${accountId}/balance`);
  }
}
