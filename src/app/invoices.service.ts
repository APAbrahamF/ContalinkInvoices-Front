import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {HttpParams} from "@angular/common/http";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private baseUrl = 'http://localhost:3000';

  private _cachedData: any;

  constructor(private http: HttpClient) { }

  // GET request
  getPosts(startDate?: string, endDate?: string): Observable<any> {
    // Configuración inicial de opciones
    const options = startDate && endDate
      ? { params: new HttpParams().set('start_date', startDate).set('end_date', endDate) }
      : {};
  
    // Si hay fechas, hacemos una solicitud directamente con los parámetros.
    if (startDate && endDate) {
      return this.http.get(`${this.baseUrl}/invoices`, options);
    }
  
    // Si no hay fechas, verificamos la caché.
    if (this._cachedData) {
      return of(this._cachedData); // Cambié `from` por `of` para manejar el valor directamente.
    }
  
    // Si no hay datos en caché, hacemos la solicitud HTTP y almacenamos el resultado.
    return this.http.get(`${this.baseUrl}/invoices`, options).pipe(
      tap((data: any) => {
        if (data) {
          this._cachedData = data;
        }
      })
    );
  }
}