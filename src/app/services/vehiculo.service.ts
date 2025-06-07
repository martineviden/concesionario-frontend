import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VehiculoModel } from '../models/vehiculo.model';
import { Provincia, TipoVehiculo } from '../models/enums';

@Injectable({
  providedIn: 'root',
})

export class VehiculoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/vehiculos';

  listAllVehiculo(): Observable<VehiculoModel[]> {
    return this.http.get<VehiculoModel[]>(this.apiUrl);
  }

  getVehiculoPorMatricula(matricula: string): Observable<VehiculoModel> {
    return this.http.get<VehiculoModel>(`${this.apiUrl}/${matricula}`);
  }

  getVehiculosPorProvincia(ubicacion: Provincia): Observable<VehiculoModel[]> {
    return this.http.get<VehiculoModel[]>(`${this.apiUrl}/ubicacion/${ubicacion}`);
  }

  buscarPorTipoUbicacion(tipo: TipoVehiculo, ubicacion: Provincia): Observable<VehiculoModel[]> {
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('ubicacion', ubicacion);
    return this.http.get<VehiculoModel[]>(`${this.apiUrl}/buscar`, { params });
  }
  createVehiculo(vehiculo: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, vehiculo, { headers });
  }

  updateVehiculo(matricula: string, vehiculo: VehiculoModel): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${matricula}`, vehiculo, { headers });
  }

  deleteVehiculo(matricula: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${matricula}`, { headers });
  }
}
