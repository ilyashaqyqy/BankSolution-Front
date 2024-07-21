import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiary } from '../models/beneficiary';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  private apiUrl = 'http://localhost:8086/api/beneficiaires';

  constructor(private http: HttpClient) { }

  getBeneficiaries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBeneficiary(id: number): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${this.apiUrl}/${id}`);
  }

  addBeneficiary(beneficiary: Beneficiary): Observable<Beneficiary> {
    // Set compteId to 13 when adding a new beneficiary
    const beneficiaryWithCompteId = { ...beneficiary, compteId: 13 };
    return this.http.post<Beneficiary>(this.apiUrl, beneficiaryWithCompteId);
  }

  updateBeneficiary(id: number, beneficiary: Beneficiary): Observable<Beneficiary> {
    return this.http.put<Beneficiary>(`${this.apiUrl}/${id}`, beneficiary);
  }

  deleteBeneficiary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
