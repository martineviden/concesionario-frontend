import {Provincia, TipoVehiculo} from "./enums"
import {Combustible} from "./enums"
import {EtiquetaAmbiental} from "./enums"
import {Transmision} from "./enums"
import { ReservaModel } from "./reserva.model";
import { TipoVehiculoModel } from "./tipo-vehiculo.model";


// Habria que corregir e incorporar reserva al vehiculo. Disponibilidad-en relacion a la reserva?

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

  tipoVehiculo: TipoVehiculoModel; // FK al tipo de vehículo
  reservas: ReservaModel[]; // array, no un único objeto


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
    tipoVehiculo: TipoVehiculoModel,
    reservas: ReservaModel[] = []

  ) {
    this.matricula = matricula;
    this.color = color;
    this.kilometraje = kilometraje;
    this.disponibilidad = disponibilidad;
    this.ubicacion = ubicacion;
    this.combustible = combustible;
    this.etiqueta = etiqueta;
    this.autonomia = autonomia;
    this.puertas = puertas;
    this.aireAcondicionado = aireAcondicionado;
    this.plazas = plazas;
    this.transmision = transmision;
    this.tipoVehiculo = tipoVehiculo;
    this.reservas = reservas;
  }


}
