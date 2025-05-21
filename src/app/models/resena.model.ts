
import { ReservaModel } from "./reserva.model";
import { UsuarioModel } from "./usuario.model";
import { VehiculoModel } from "./vehiculo.model";

export class ResenaModel{
  id:number;
  texto:string;
  puntacion: number;
  fecha: Date;
  id_usuario: UsuarioModel["id"];
  matricula_vehiculo : VehiculoModel["matricula"];
  id_reserva: ReservaModel["id"];

  constructor(
  id:number,
  texto:string,
  puntacion: number,
  fecha: Date,
  id_usuario: UsuarioModel["id"],
  matricula_vehiculo : VehiculoModel["matricula"],
  id_reserva: ReservaModel["id"],
){
  this.id = id;
  this.texto = texto;
  this.puntacion = puntacion;
  this.fecha = fecha;
  this.id_usuario = id_usuario;
  this.matricula_vehiculo = matricula_vehiculo;
  this.id_reserva = id_reserva;
}
}
