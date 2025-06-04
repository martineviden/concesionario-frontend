import { TipoVehiculo } from "./enums";
import { VehiculoModel } from "./vehiculo.model";

export class TipoVehiculoModel {
  id: number;
  precio:number;
  marca:string;
  modelo:string;
  imagen :string;
  tipo:TipoVehiculo;
  vehiculo: VehiculoModel[];


  constructor(
    id_vehiculo:number,
    precio_vehiculo:number,
    marca_vehiculo:string,
    modelo_vehiculo:string,
    imagen_vehiculo:string,
    tipoVH:TipoVehiculo,
    vehiculo: VehiculoModel[]
  ){

    this.id = id_vehiculo;
    this.precio = precio_vehiculo;
    this.marca = marca_vehiculo;
    this.modelo = modelo_vehiculo;
    this.imagen = imagen_vehiculo;
    this.tipo = tipoVH;
    this.vehiculo = vehiculo;

  }

}
