import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service'; // Importa el TokenService

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://lh8wfcbm-8001.use2.devtunnels.ms';

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService // Inyecta el TokenService
  ) {}

  // Registrar un nuevo usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, userData).pipe(
      tap((response: any) => {
        const token: any = { value: response.token };
        this.tokenService.saveToken(token); // Guardar el token usando el TokenService
      }),
      catchError((error) => {
        console.error('Error durante el registro:', error);
        return throwError(error);
      })
    );
  }

  // Iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token`, { email, password }).pipe(
      tap((response: any) => {
        const token: any = { value: response.access_token };
        this.tokenService.saveToken(token); // Guardar el token usando el TokenService
      }),
      catchError((error) => {
        console.error('Error durante el inicio de sesión:', error);
        return throwError(error);
      })
    );
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return !!token;
  }

  // Cerrar sesión
  logout(): void {
    this.tokenService.removeToken(); // Eliminar el token usando el TokenService
  }

  // Obtener encabezados de autorización
  private getAuthHeaders(): { [header: string]: string } {
    const token = this.tokenService.getToken()?.value; // Obtén el valor del token
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Obtener usuarios con paginación
  getUsers(skip: number = 0, limit: number = 10): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users?skip=${skip}&limit=${limit}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        return throwError(error);
      })
    );
  }

  // Eliminar un usuario por ID
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error al eliminar usuario:', error);
        return throwError(error);
      })
    );
  }
}
