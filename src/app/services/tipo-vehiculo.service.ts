import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoVehiculoModel } from '../models/tipo-vehiculo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TipoVehiculoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tipos-vehiculo';

  listAllTipoVehiculo(): Observable<TipoVehiculoModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TipoVehiculoModel[]>(this.apiUrl, { headers });
  }

  getTipoVehiculoById(id: number): Observable<TipoVehiculoModel> {
    return this.http.get<TipoVehiculoModel>(`${this.apiUrl}/${id}`);
  }

  getTiposVehiculo(): Observable<TipoVehiculoModel[]> {
    return this.http.get<TipoVehiculoModel[]>(this.apiUrl);
  }

  createTipoVehiculo(tipo: TipoVehiculoModel): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, tipo, { headers });
  }

  updateTipoVehiculo(id: number, tipo: TipoVehiculoModel): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${id}`, tipo, { headers });
  }

  deleteTipoVehiculo(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
