import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import{TipoCoche} from '../home-banner-first/home-banner-first.model'


@Injectable({
  providedIn:'root'
})

export class TipoCocheServce{
  private http = inject(HttpClient);

  list(){
    return this.http.get('http://localhost:8080/tipos-vehiculo',{withCredentials:false});
  }

  get(id:number){
    return this.http.get(`http://localhost:8080/tipos-vehiculo/${id}`);
  }
  create(vehiculo:TipoCoche){
    return this.http.post('http://localhost:8080/tipos-vehiculo',vehiculo);
  }
  update(id:number,tipoVehiculo: any){

    return this.http.put(`http://localhost:8080/tipos-vehiculo/${id}`,tipoVehiculo);
  }
  delite(id:number){
    return this.http.delete(`http://localhost:8080/tipos-vehiculo/${id}`);
  }

}


