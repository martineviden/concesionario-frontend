import {Provincia} from "./enums"
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
  tipoV: VehiculoModel;

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
  tipoV: VehiculoModel,
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
    this.tipoV = tipoV;

  }


}
