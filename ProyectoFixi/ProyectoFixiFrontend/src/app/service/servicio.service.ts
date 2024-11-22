import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private apiUrl = 'http://localhost:8000'; // Cambiar por la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener un servicio por su ID
  getServicio(servicioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios/${servicioId}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el servicio:', error);
        throw error;
      })
    );
  }

  // Obtener la lista de servicios
  getServicios(skip: number = 0, limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios?skip=${skip}&limit=${limit}`).pipe(
      catchError((error) => {
        console.error('Error al obtener los servicios:', error);
        throw error;
      })
    );
  }

  // Crear un nuevo servicio
  createServicio(servicioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/servicios/`, servicioData).pipe(
      catchError((error) => {
        console.error('Error al crear el servicio:', error);
        throw error;
      })
    );
  }

  // Actualizar un servicio existente
  updateServicio(servicioId: number, servicioData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/servicios/${servicioId}`, servicioData).pipe(
      catchError((error) => {
        console.error('Error al actualizar el servicio:', error);
        throw error;
      })
    );
  }

  // Eliminar un servicio
  deleteServicio(servicioId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/servicios/${servicioId}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar el servicio:', error);
        throw error;
      })
    );
  }

  // Subir imágenes a un servicio
  uploadImages(servicioId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return this.http.post(`${this.apiUrl}/servicios/${servicioId}/upload-images`, formData).pipe(
      catchError((error) => {
        console.error('Error al subir imágenes:', error);
        throw error;
      })
    );
  }

  // Obtener una imagen específica de un servicio
  getImage(servicioId: number, imageIndex: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/servicios/${servicioId}/images/${imageIndex}`, {
      responseType: 'blob',
    }).pipe(
      catchError((error) => {
        console.error('Error al obtener la imagen:', error);
        throw error;
      })
    );
  }
}
