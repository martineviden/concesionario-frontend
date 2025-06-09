
import { ReservaModel } from "./reserva.model";
import { Usuario } from "./login.model";
import { VehiculoModel } from "./vehiculo.model";

export class ResenaModel{
  id?: number;
  comentario: string;
  puntuacion: number;
  fecha: string;
  usuario?: Usuario;
  vehiculo?: VehiculoModel;
  reserva?: ReservaModel;

  constructor(
    comentario: string,
    puntuacion: number,
    fecha: string,
    usuario?: Usuario,
    vehiculo?: VehiculoModel,
    reserva?: ReservaModel,
    id?: number
  ){
    this.comentario = comentario;
    this.puntuacion = puntuacion;
    this.fecha = fecha;
    this.usuario = usuario;
    this.vehiculo = vehiculo;
    this.reserva = reserva;
    this.id = id;
  }
}
