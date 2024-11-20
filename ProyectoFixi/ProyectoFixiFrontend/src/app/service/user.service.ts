import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://lh8wfcbm-8001.use2.devtunnels.ms'; // Cambia esta URL según sea necesario
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {
    this.checkTokenExpiration(); // Inicia la verificación al cargar el servicio
  }

  // Método para registrar usuario
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

   // Método para logear usuario
   login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token`, { email, password }).pipe(
      tap((response: any) => {
        this.saveToken(response.access_token);  // Guardamos el token
      }),
      catchError((error) => {
        console.error('Error durante el logeo:', error);
        return throwError(error);
      })
    );
  }

  // Guardar token en Session Storage
  private saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    // Decodificar el token para obtener la fecha de expiración
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del JWT
    const expiration = payload.exp * 1000; // Convertir a milisegundos
    sessionStorage.setItem('tokenExpiration', expiration.toString());
  }
  // Obtener token
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  private checkTokenExpiration(): void {
    setInterval(() => {
      const expiration = sessionStorage.getItem('tokenExpiration');
      if (expiration) {
        const now = new Date().getTime();
        if (now > parseInt(expiration, 10)) {
          this.logout(); // Elimina el token
          this.router.navigate(['/']); // Redirige al home
        }
      }
    }, 180000); // Verifica cada 60 segundos
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private getAuthHeaders(): { [header: string]: string } {
    const token = this.getToken(); // Recupera el token desde sessionStorage
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Eliminar token (Cerrar sesión)
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
