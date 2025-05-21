import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import{TipoVehiculoClase} from '../models/tipo-vehiculo.model'


@Injectable({
  providedIn:'root'
})

export class TipoCocheServce{
  private http = inject(HttpClient);

  list(){
    return this.http.get('http://localhost:8080/tipos-vehiculo',{withCredentials:false});
  }

  get(id:number){
    return this.http.get(`http://localhost:8080/tipos-vehiculo/${id}`,{withCredentials:false});
  }
  create(vehiculoT:TipoVehiculoClase){
    return this.http.post('http://localhost:8080/tipos-vehiculo',vehiculoT),{withCredentials:false};
  }
  update(id:number,tipoVehiculo: any){

    return this.http.put(`http://localhost:8080/tipos-vehiculo/${id}`,tipoVehiculo,{withCredentials:false});
  }
  delite(id:number){
    return this.http.delete(`http://localhost:8080/tipos-vehiculo/${id}`,{withCredentials:false});
  }

}


