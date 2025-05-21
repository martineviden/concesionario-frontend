import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario.model';
import { Rol } from '../models/enums';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService{
  private http = Inject(HttpClient);

  listAllUsuario(){

    return this.http.get('http://localhost:8080/usuarios',{withCredentials:false});
  }

  getOneById(id:string){
    return this.http.get(`http://localhost:8080/usuarios/${id}`,{withCredentials:false});
  }

   createUsuario(usuario:UsuarioModel){
      return this.http.post('http://localhost:8080/usuarios',usuario,{withCredentials:false});
     }

  updateUsuario(id:string, usuario: UsuarioModel){

        return this.http.put(`http://localhost:8080/usuarios/${id}`,usuario,{withCredentials:false});
     }


    deliteOneUsuario(id:string){
      return this.http.delete(`http://localhost:8080/usuarios/${id}`,{withCredentials:false});
    }

}

