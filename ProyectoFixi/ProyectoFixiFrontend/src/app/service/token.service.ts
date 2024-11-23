import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


export class TokenService {
  private tokenKey = 'authToken'; // Clave para guardar el token

  // Guardar un token
  saveToken(token: any): void {
    const tokenString = JSON.stringify(token);
    sessionStorage.setItem(this.tokenKey, tokenString); // Aquí podrías cambiarlo a localStorage si deseas persistencia más allá de la sesión
  }

  // Obtener un token
  getToken(): any | null {
    const tokenString = sessionStorage.getItem(this.tokenKey);
    return tokenString ? JSON.parse(tokenString) : null;
  }

  // Eliminar un token
  removeToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}
