import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{TipoVehiculoModel} from '../models/tipo-vehiculo.model'
import{VehiculoModel} from '../models/vehiculo.model'
import { Provincia } from '../models/enums';
import { HttpParams } from '@angular/common/http';
import {TipoVehiculo} from '../models/enums'

@Injectable({
  providedIn:'root'
})

export class VehiculoService{

  private http = inject(HttpClient);
  //private httpParams= inject(HttpParams);

listAllVehiculo(): Observable<VehiculoModel[]> {
  return this.http.get<VehiculoModel[]>('http://localhost:8080/vehiculos');
}

getVehiculoPorMatricula(matricula: string) {
  return this.http.get(`http://localhost:8080/vehiculos/${matricula}`, { withCredentials:false });
}

getVehiculosPorProvincia(ubicacionVehiculos: Provincia) {
  return this.http.get(`http://localhost:8080/vehiculos/ubicacion/${ubicacionVehiculos}`, { withCredentials:false })
}

createVehiculo(vehiculo: VehiculoModel) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  return this.http.post('http://localhost:8080/vehiculos', vehiculo, { headers:headers });
}

updateVehiculo(matricula: string, vehiculo: VehiculoModel) {
  return this.http.put(`http://localhost:8080/vehiculos/${matricula}`, vehiculo, { withCredentials:false });
}

deleteVehiculo(matricula: string) {
  const url: string = `http://localhost:8080/vehiculos/${matricula}`;
  return this.http.delete(url, { withCredentials:false });
}

buscarPorTipoUbicacion(tipo: TipoVehiculo, ubicacion: Provincia) {
  let param = new HttpParams().set("tipo",tipo).set("ubicacion",ubicacion)
  return this.http.get(`http://localhost:8080/vehiculos/buscar?${param}`, { withCredentials:false });
}
}




