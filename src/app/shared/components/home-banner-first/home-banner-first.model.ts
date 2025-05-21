import { Vehiculo } from "./tipoVehiculo";

export class TipoVehiculo {
  id: number;
  precio: number;
  marca: string;
  modelo: string;
  imagen: string;
  tipo: Vehiculo;

  constructor(id_vh: number, precio_vh: number, marca_vh: string, modelo_vh: string, imagen_vh: string, tipo_vh: Vehiculo) {
    this.id = id_vh;
    this.precio = precio_vh;
    this.marca = marca_vh;
    this.modelo = modelo_vh;
    this.imagen = imagen_vh;
    this.tipo = tipo_vh;
  }
}

export class VehiculoModelo{

}
