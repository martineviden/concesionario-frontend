import { TipoVehiculo } from "./enums";

export class TipoVehiculoModel {
  id: number;
  precio:number;
  marca:string;
  modelo:string;
  imagen :string;
  tipo:TipoVehiculo;




  constructor(
    id_vehiculo:number,
    precio_vehiculo:number,
    marca_vehiculo:string,
    modelo_vehiculo:string,
    imagen_vehiculo:string,
    tipoVH:TipoVehiculo){

    this.id = id_vehiculo;
    this.precio = precio_vehiculo;
    this.marca = marca_vehiculo;
    this.modelo = modelo_vehiculo;
    this.imagen = imagen_vehiculo;
    this.tipo = tipoVH;

  }
}










