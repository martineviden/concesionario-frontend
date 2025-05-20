export class TipoCoche{

  id?: number;
  precio?:number;
  // enum Tipo_vehiculo{
  //   COCHE,
  //   MOTO,
  //   FURGONETA
  // };
  imagen?:string;
  marca?: string;
  modelo? : string;

  constructor(public id_tipoche :number, public precio_vh:number, public marca_vh:string, public modelo_vh:string){



  //  this.id= id_tipoche;
  //  this.precio = precio_vh;
  //  this.marca = marca_vh;
  //  this.modelo = modelo_vh;
  }


}
export class VehiculoModelo{

}
