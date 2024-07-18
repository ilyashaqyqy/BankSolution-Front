import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8086/api/v1/auth';
  private username: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}



  
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { username, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.decodeToken(token);
    this.router.navigate(['/dashboard']);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  decodeToken(token: string): void {
    const decodedToken: any = jwtDecode(token);
    this.username = decodedToken.sub;
  }

  getUsername(): string | null {
    if (!this.username) {
      const token = this.getToken();
      if (token) {
        this.decodeToken(token);
      }
    }
    return this.username;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.username = null;
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return !!this.getToken(); // Returns true if token exists, otherwise false
  }
  
}



