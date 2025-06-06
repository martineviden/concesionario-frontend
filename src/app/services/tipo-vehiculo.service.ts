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
    return this.http.get<TipoVehiculoModel[]>(this.apiUrl);
  }

  getTipoVehiculoById(id: number): Observable<TipoVehiculoModel> {
    return this.http.get<TipoVehiculoModel>(`${this.apiUrl}/${id}`);
  }

  getTiposVehiculo(): Observable<TipoVehiculoModel[]> {
    return this.http.get<TipoVehiculoModel[]>(this.apiUrl);
  }

  createTipoVehiculo(tipo: any): Observable<any> {
    return this.http.post(this.apiUrl, tipo);
  }

  updateTipoVehiculo(id: number, tipo: TipoVehiculoModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tipo);
  }

  deleteTipoVehiculo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
