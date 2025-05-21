import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import{TipoVehiculoModel} from '../models/tipo-vehiculo.model'
import{VehiculoModel} from '../models/vehiculo.model'
import { Provincia } from '../models/enums';


@Injectable({
  providedIn:'root'
})

export class VehiculoService{
  private http = inject(HttpClient);

  listAllVhiculo(){
    return this.http.get('http://localhost:8080/vehiculos',{withCredentials:false});
  }

  getOnePorMatricula(matricula:string){
    return this.http.get(`http://localhost:8080/vehiculos/${matricula}`,{withCredentials:false});

  }

   //------ Hay que crear unum Ubicacion-----

   getAllPorProvincia(ubicacionVehiculos:Provincia){
     return this.http.get(`http://localhost:8080/vehiculos/ubicacion/${ubicacionVehiculos}`,{withCredentials:false})
   }

  //------ Hay que crear modelo-----
  createVhiculo(vehiculo:VehiculoModel){
    return this.http.post('http://localhost:8080/vehiculos',vehiculo,{withCredentials:false});
   }

    //------ Hay que crear modelo-----
   updateVehiculo(matricula:string, vehiculo: VehiculoModel){

      return this.http.put(`http://localhost:8080/vehiculos/${matricula}`,vehiculo,{withCredentials:false});
   }


  deliteOneVehiculo(matricula:string){
    return this.http.delete(`http://localhost:8080/vehiculos/${matricula}`,{withCredentials:false});
  }


   buscarPorTipoUbicacion(ubicacionVehiculos:Provincia, vehiculoT:TipoVehiculoModel){

     return this.http.get(`http://localhost:8080/vehiculos/buscar`,{withCredentials:false});
   }

}
