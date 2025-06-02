import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{TipoVehiculoModel, TipoVehiculoSinVhiculosModel} from '../models/tipo-vehiculo.model'

@Injectable({
  providedIn:'root'
})

export class TipoVehiculoService {
  private http = inject(HttpClient);

  listAllTipoVehiculo() {
    //const token = localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    //return this.http.get('http://localhost:8080/tipos-vehiculo', { headers: headers });

    return this.http.get('http://localhost:8080/tipos-vehiculo', { withCredentials: false });
  }

  getTipoVehiculoById(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    //return this.http.get(`http://localhost:8080/tipos-vehiculo/${id}`, { headers: headers });
  }
  getOneTipoVheculo(id:number){
    return this.http.get(`http://localhost:8080/tipos-vehiculo/${id}`,{withCredentials:false});
  }
  createOneTipoVheculo(vehiculoT:TipoVehiculoModel){
    return this.http.post('http://localhost:8080/tipos-vehiculo',vehiculoT,{withCredentials:false});
  }
  createOneTipoVheculoSinVheiculo(vehiculoT:TipoVehiculoSinVhiculosModel){
    return this.http.post('http://localhost:8080/tipos-vehiculo',vehiculoT,{withCredentials:false});
  }

  updateOneTipoVheculo(id:number,tipoVehiculo: any){

    return this.http.get(`http://localhost:8080/tipos-vehiculo/${id}`, { withCredentials: false });
  }

  createTipoVehiculo(vehiculoT: TipoVehiculoModel) {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    //return this.http.post('http://localhost:8080/tipos-vehiculo', vehiculoT, { headers: headers });

    return this.http.post('http://localhost:8080/tipos-vehiculo', vehiculoT, { withCredentials: false });

  }

  updateTipoVehiculo(id: number, tipoVehiculo: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    //return this.http.put(`http://localhost:8080/tipos-vehiculo/${id}`, tipoVehiculo, { headers: headers });

    return this.http.put(`http://localhost:8080/tipos-vehiculo/${id}`, tipoVehiculo, { withCredentials: false });

  }

  deleteTipoVehiculo(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    //return this.http.delete(`http://localhost:8080/tipos-vehiculo/${id}`, { headers: headers });

    return this.http.delete(`http://localhost:8080/tipos-vehiculo/${id}`, { withCredentials: false });

  }

}


