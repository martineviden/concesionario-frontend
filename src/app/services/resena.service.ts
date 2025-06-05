import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ResenaModel } from '../models/resena.model';

@Injectable({
  providedIn:'root'
})
export class ResenaService{
  private http = inject(HttpClient);

  listAllResena(){
    return this.http.get('http://localhost:8080/resenas', { withCredentials:false });
  }

  getOneById(id: string){
    return this.http.get(`http://localhost:8080/resenas/${id}`, { withCredentials:false });
  }

  createResena(resena: ResenaModel){
    return this.http.post('http://localhost:8080/resenas', resena, { withCredentials:false });
  }

  updateResena(id: string, resena: ResenaModel){
    return this.http.put(`http://localhost:8080/resenas/${id}`, resena, { withCredentials:false });
  }

  deleteResena(id: string){
    return this.http.delete(`http://localhost:8080/resenas/${id}`, { withCredentials:false });
  }

  deleteResenasByMatricula(matricula: string){
    return this.http.delete(`http://localhost:8080/resenas/matricula/${matricula}`, { withCredentials: false });
  }

}
