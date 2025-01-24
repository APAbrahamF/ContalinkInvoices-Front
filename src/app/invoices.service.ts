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

  getInvoices(startDate?: string, endDate?: string): Observable<any> {
    const options = startDate && endDate
      ? { params: new HttpParams().set('start_date', startDate).set('end_date', endDate) }
      : {};
    if (startDate && endDate) {
      return this.http.get(`${this.baseUrl}/invoices`, options);
    }
    if (this._cachedData) {
      return of(this._cachedData);
    }
    return this.http.get(`${this.baseUrl}/invoices`, options).pipe(
      tap((data: any) => {
        if (data) {
          this._cachedData = data;
        }
      })
    );
  }
}