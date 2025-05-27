import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { VehiculoModel } from '../../../models/vehiculo.model';
import {
  Provincia,
  Combustible,
  Transmision,
  EtiquetaAmbiental,
  TipoVehiculo
} from '../../../models/enums';

type DropdownKey = 'ubicacion' | 'combustible' | 'transmision' | 'etiqueta' | 'plazas';

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

  tipoVehiculos: TipoVehiculoModel[] = [];
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
          const modeloNombre = `${vehiculo?.modelo}`.toLowerCase().replace(/\s+/g, '');
          return {
            ...tv,
            ...vehiculo,
            imagen: `assets/img/catalogo/${modeloNombre}`,
            precio: +(tv.precio / 30).toFixed(2)
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

    this.vehiculosFiltrados = this.vehiculos.filter(vehiculo => {
      return this.filtrosActivos.every(filtro => {
        const [clave, valor] = filtro.split(':');
        switch (clave) {
          case 'tipo':
            return vehiculo.tipo === valor;
          case 'ubicacion':
            return vehiculo.ubicacion === valor;
          case 'combustible':
            return vehiculo.combustible === valor;
          case 'transmision':
            return vehiculo.transmision === valor;
          case 'etiqueta':
            return vehiculo.etiqueta === valor;
          case 'plazas':
            return vehiculo.plazas?.toString() === valor;
          default:
            return true;
        }
      });
    });
  }

  limpiarFiltros(): void {
    this.filtrosActivos = [];
    this.aplicarFiltros();
  }

  toggleFiltro(filtro: string): void {
    const [clave, valor] = filtro.split(':');

    // Elimina cualquier filtro anterior del mismo tipo
    this.filtrosActivos = this.filtrosActivos.filter(f => !f.startsWith(clave + ':'));

    // Si no estaba ya seleccionado, lo agregamos
    if (!this.filtrosActivos.includes(filtro)) {
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
    this.toggleDropdown(tipo as DropdownKey);
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
