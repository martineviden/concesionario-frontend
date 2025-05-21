import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoVehiculo } from '../home-banner-first/home-banner-first.model'

@Injectable({
  providedIn:'root'
})

export class TipoVehiculoService {
  private http = inject(HttpClient);

  list(){
    return this.http.get('http://localhost:8080/tipos-vehiculo', {withCredentials:false});
  }

  get(id: number){
    return this.http.get(`http://localhost:8080/tipos-vehiculo/${id}`);
  }

  create(vehiculo: TipoVehiculo){
    return this.http.post('http://localhost:8080/tipos-vehiculo', vehiculo);
  }

  update(id: number, tipoVehiculo: any){
    return this.http.put(`http://localhost:8080/tipos-vehiculo/${id}`, tipoVehiculo);
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/tipos-vehiculo/${id}`);
  }

}


