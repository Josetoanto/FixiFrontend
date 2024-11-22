import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://lh8wfcbm-8001.use2.devtunnels.ms'; 
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, userData).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
      }),
      catchError((error) => {
        console.error('Error durante el registro:', error);
        return throwError(error);
      })
    );
  }

   login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token`, { email, password }).pipe(
      tap((response: any) => {
        this.saveToken(response.access_token);  
      }),
      catchError((error) => {
        console.error('Error durante el logeo:', error);
        return throwError(error);
      })
    );
  }

  private saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const expiration = payload.exp * 1000; 
    sessionStorage.setItem('tokenExpiration', expiration.toString());
  }
  
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private getAuthHeaders(): { [header: string]: string } {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('tokenExpiration');
  }
 
  getUsers(skip: number = 0, limit: number = 10): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users?skip=${skip}&limit=${limit}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        return throwError(error);
      })
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }
  
}
