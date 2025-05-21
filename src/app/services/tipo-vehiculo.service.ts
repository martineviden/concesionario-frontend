import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{TipoVehiculoModel} from '../models/tipo-vehiculo.model'


@Injectable({
  providedIn:'root'
})

export class TipoVehiculoService {
  private http = inject(HttpClient);

  listAllTipoVheculo(){
    return this.http.get('http://localhost:8080/tipos-vehiculo', {withCredentials:false});
  }

  getOneTipoVheculo(id:number){
    return this.http.get(`http://localhost:8080/tipos-vehiculo/${id}`,{withCredentials:false});
  }
  createOneTipoVheculo(vehiculoT:TipoVehiculoModel){
    return this.http.post('http://localhost:8080/tipos-vehiculo',vehiculoT),{withCredentials:false};
  }
  updateOneTipoVheculo(id:number,tipoVehiculo: any){

    return this.http.put(`http://localhost:8080/tipos-vehiculo/${id}`,tipoVehiculo,{withCredentials:false});
  }
  deliteOneTipoVheculo(id:number){
    return this.http.delete(`http://localhost:8080/tipos-vehiculo/${id}`,{withCredentials:false});
  }

}


