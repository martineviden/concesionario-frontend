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
    return this.http.get('localhost:8080/tipos-vehiculo');
  }

  get(id:number){
    return this.http.get(`http://localhost:8080/tipos-vehiculo/${id}`);
  }
  create(tipoVehiculo: any){
    return this.http.post('http://localhost:8080/tipos-vehiculo',tipoVehiculo);
  }
  update(id:number,tipoVehiculo: any){

    return this.http.put(`http://localhost:8080/tipos-vehiculo/${id}`,tipoVehiculo);
  }
  delite(id:number){
    return this.http.delete(`http://localhost:8080/tipos-vehiculo/${id}`);
  }

}


