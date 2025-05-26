import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  listAllVhiculo(){
    return this.http.get('http://localhost:8080/vehiculos',{withCredentials:false});
  }

  getOnePorMatricula(matricula:string){
    return this.http.get(`http://localhost:8080/vehiculos/${matricula}`,{withCredentials:false});

  }



   getAllPorProvincia(ubicacionVehiculos:Provincia){
     return this.http.get(`http://localhost:8080/vehiculos/ubicacion/${ubicacionVehiculos}`,{withCredentials:false})
   }


  createVhiculo(vehiculo:VehiculoModel){
    return this.http.post('http://localhost:8080/vehiculos',vehiculo,{withCredentials:false});
   }


   updateVehiculo(matricula:string, vehiculo: VehiculoModel){

      return this.http.put(`http://localhost:8080/vehiculos/${matricula}`,vehiculo,{withCredentials:false});
   }


  deliteOneVehiculo(matricula:string){
    return this.http.delete(`http://localhost:8080/vehiculos/${matricula}`,{withCredentials:false});
  }
  buscarPorTipoUbicacion(tipo:TipoVehiculo, ubicacion:Provincia){
      let param = new HttpParams().set("tipo",tipo).set("ubicacion",ubicacion)
      return this.http.get(`http://localhost:8080/vehiculos/buscar?${param}`,{withCredentials:false});
    }
}




