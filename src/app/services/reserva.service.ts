import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ReservaModel } from '../models/reserva.model';



@Injectable({
  providedIn:'root'
})
export class ReservaService{
  private http = inject(HttpClient);

  listAllReserva(){
    return this.http.get('http://localhost:8080/reservas', { withCredentials:false });
  }

  getReservaById(id: string){
    return this.http.get(`http://localhost:8080/reservas/${id}`, { withCredentials:false });
  }

  createReserva(reserva: ReservaModel){
    return this.http.post('http://localhost:8080/reservas', reserva, { withCredentials:false });
  }

  updateReserva(id: string, reserva: ReservaModel){
    return this.http.put(`http://localhost:8080/reservas/${id}`, reserva, { withCredentials:false });
  }

  deleteReserva(id: string){
     return this.http.delete(`http://localhost:8080/reservas/matricula/${id}`, { withCredentials:false });
  }

  getReservasByUsuario(idUsuario: string | number) {
    return this.http.get(`http://localhost:8080/reservas/usuario/${idUsuario}`, { withCredentials: false });
  }

}
