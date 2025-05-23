import { UsuarioModel } from "./usuario.model";
import { VehiculoModel } from "./vehiculo.model";

// Seguramente habra que incuir en el constructor las relaciones correspondientes
export class ReservaModel{

  id:string;
  vehiculo:VehiculoModel["matricula"];
  usuario: UsuarioModel["id"];
  fechaReserva: Date;
  diasReserva :number;
  precio:number;



  constructor(
  id:string,
  vehiculo:VehiculoModel["matricula"],
  usuario: UsuarioModel["id"],
  fechaReserva: Date,
  diasReserva :number,
  precio:number,
  ){
    this.id=id;
    this.vehiculo = vehiculo;
    this.usuario = usuario;
    this.fechaReserva = fechaReserva;
    this.diasReserva = diasReserva;
    this.precio = precio;
  }



}
