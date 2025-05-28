import {Provincia, TipoVehiculo} from "./enums"
import {Combustible} from "./enums"
import {EtiquetaAmbiental} from "./enums"
import {Transmision} from "./enums"


export class VehiculoModel{
  matricula: string;
  color: string;
  kilometraje: number;
  disponibilidad: boolean;
  ubicacion: Provincia;
  combustible: Combustible;
  etiqueta: EtiquetaAmbiental;
  autonomia: number;
  puertas: number;
  aireAcondicionado: boolean;
  plazas: number;
  transmision: Transmision;
  id_tipo_vehiculo: TipoVehiculo;

  constructor(
  matricula: string,
  color: string,
  kilometraje: number,
  disponibilidad: boolean,
  ubicacion: Provincia,
  combustible: Combustible,
  etiqueta: EtiquetaAmbiental,
  autonomia: number,
  puertas: number,
  aireAcondicionado: boolean,
  plazas: number,
  transmision: Transmision,
  id_tipo_vehiculo: TipoVehiculo, //Ver a lo mejor hace falta pasar el VheculoModelo
  ){
    this.matricula = matricula;
    this.color = color;
    this.kilometraje = kilometraje;
    this.disponibilidad = disponibilidad;
    this.ubicacion = ubicacion;
    this.combustible = combustible;
    this.etiqueta = etiqueta;
    this.autonomia = autonomia;
    this.puertas = puertas;
    this.plazas = plazas;
    this.aireAcondicionado = aireAcondicionado;
    this.transmision = transmision;
    this.id_tipo_vehiculo = id_tipo_vehiculo;

  }


}
