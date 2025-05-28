import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';
import {
  Provincia,
  Combustible,
  Transmision,
  EtiquetaAmbiental,
  TipoVehiculo
} from '../../../models/enums';
import { Router } from '@angular/router';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { VehiculoModel } from '../../../models/vehiculo.model';
import { VehiculoService } from '../../../services/vehiculo.service';

type DropdownKey = 'ubicacion' | 'combustible' | 'transmision' | 'etiqueta' | 'plazas';

interface TipoVehiculoConVehiculos {
  id: number;
  marca: string;
  modelo: string;
  precio: number;
  tipo: string;
  imagen: string;
  vehiculos: {
    matricula: string;
    color: string;
    kilometraje: number;
    disponibilidad: boolean;
    ubicacion: string;
    combustible: string;
    etiqueta: string;
    autonomia: number | null;
    puertas: number | null;
    aireAcondicionado: boolean | null;
    plazas: number;
    transmision: string;
    reservas: any[];
  }[];
}

@Component({
  selector: 'app-catalogo-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo-component.component.html',
  styleUrls: ['./catalogo-component.component.css']
})
export class CatalogoComponentComponent implements OnInit {
  filtrosActivos: string[] = [];

  dropdowns: Record<DropdownKey, boolean> = {
    ubicacion: false,
    combustible: false,
    transmision: false,
    etiqueta: false,
    plazas: false
  };

  dropdownKeys: DropdownKey[] = ['ubicacion', 'combustible', 'transmision', 'etiqueta', 'plazas'];

  provincias = Object.keys(Provincia).filter(k => isNaN(Number(k)) && k !== 'keys');
  tiposCombustible = Object.keys(Combustible).filter(k => isNaN(Number(k)) && k !== 'keys');
  tiposTransmision = Object.keys(Transmision).filter(k => isNaN(Number(k)) && k !== 'keys');
  etiquetasAmbientales = Object.keys(EtiquetaAmbiental).filter(k => isNaN(Number(k)) && k !== 'keys');
  tiposVehiculo = Object.keys(TipoVehiculo).filter(k => isNaN(Number(k)) && k !== 'keys');
  plazas: string[] = ['2', '4', '5', '7', '9'];

  vehiculos: any[] = [];
  vehiculosFiltrados: any[] = [];

  constructor(
    private tipoVehiculoService: TipoVehiculoService,
    private vehiculoService: VehiculoService
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.tipoVehiculoService.listAllTipoVheculo().subscribe((tipos: any) => {
      this.tipoVehiculos = tipos;

      this.vehiculoService.listAllVhiculo().subscribe((vehiculos: any) => {
        this.vehiculos = this.tipoVehiculos.map((tv: TipoVehiculoModel) => {
          const vehiculo = vehiculos.find((v: VehiculoModel) => v.matricula === tv.vehiculo);
          return {
            ...tv,
            ...vehiculo
          };
        });

        this.aplicarFiltros();
      });
    });
  }

  aplicarFiltros(): void {
  if (this.filtrosActivos.length === 0) {
    this.vehiculosFiltrados = [...this.vehiculos];
    return;
  }

  // Agrupar filtros por tipo
  const filtrosPorTipo: Record<string, Set<string>> = {};
  for (const filtro of this.filtrosActivos) {
    const [clave, valor] = filtro.split(':');
    if (!filtrosPorTipo[clave]) {
      filtrosPorTipo[clave] = new Set();
    }
    filtrosPorTipo[clave].add(valor);
  }

  this.vehiculosFiltrados = this.vehiculos.filter(vehiculo => {
    return Object.entries(filtrosPorTipo).every(([clave, valores]) => {
      const valorVehiculo = (vehiculo as any)[clave];
      return valores.has(valorVehiculo?.toString());
    });
  });
}


  limpiarFiltros(): void {
    this.filtrosActivos = [];
    this.aplicarFiltros();
  }

  toggleFiltro(filtro: string): void {
    if (this.filtrosActivos.includes(filtro)) {
      this.filtrosActivos = this.filtrosActivos.filter(f => f !== filtro);
    } else {
      this.filtrosActivos.push(filtro);
    }
    this.aplicarFiltros();
  }

  toggleDropdown(nombre: DropdownKey): void {
    this.dropdowns[nombre] = !this.dropdowns[nombre];
  }

  seleccionarFiltro(tipo: string, valor: string): void {
    const filtro = `${tipo}:${valor}`;
    this.toggleFiltro(filtro);
  }

  getOpcionesFiltro(filtro: DropdownKey): string[] {
    switch (filtro) {
      case 'ubicacion':
        return this.provincias;
      case 'combustible':
        return this.tiposCombustible;
      case 'transmision':
        return this.tiposTransmision;
      case 'etiqueta':
        return this.etiquetasAmbientales;
      case 'plazas':
        return this.plazas;
      default:
        return [];
    }
  }

  isFiltroDropdownActivo(filtro: DropdownKey): boolean {
    return this.filtrosActivos.some(f => f.startsWith(filtro + ':'));
  }

  getCantidadSeleccionados(filtro: DropdownKey): number {
    return this.filtrosActivos.filter(f => f.startsWith(filtro + ':')).length;
  }

  openespecidicaciones(matricula: string): void {
  if (matricula) {
    this.router.navigate(['/especificaciones', matricula]);
  }
}

  @HostListener('document:click', ['$event'])
  cerrarDropdownsFuera(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const esClickEnDropdown = target.closest('.filtro-dropdown');
    if (!esClickEnDropdown) {
      for (const key of this.dropdownKeys) {
        this.dropdowns[key] = false;
      }
    }
  }
}
