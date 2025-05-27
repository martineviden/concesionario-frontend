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
import { Router } from '@angular/router';

type DropdownKey = 'ubicacion' | 'combustible' | 'transmision' | 'etiqueta' | 'plazas';

@Component({
  selector: 'app-catalogo-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo-component.component.html',
  styleUrls: ['./catalogo-component.component.css']
})
export class CatalogoComponentComponent implements OnInit {
  filtrosActivos: string[] = ['Todos los vehículos'];

  dropdowns: Record<DropdownKey, boolean> = {
    ubicacion: false,
    combustible: false,
    transmision: false,
    etiqueta: false,
    plazas: false
  };

  dropdownKeys: DropdownKey[] = ['ubicacion', 'combustible', 'transmision', 'etiqueta', 'plazas'];

  provincias = Object.keys(Provincia).filter(k => isNaN(Number(k)));
  tiposCombustible = Object.keys(Combustible).filter(k => isNaN(Number(k)));
  tiposTransmision = Object.keys(Transmision).filter(k => isNaN(Number(k)));
  etiquetasAmbientales = Object.keys(EtiquetaAmbiental).filter(k => isNaN(Number(k)));
  tiposVehiculo = Object.keys(TipoVehiculo).filter(k => isNaN(Number(k)));
  plazas: string[] = ['2', '4', '5', '7', '9'];

  tipoVehiculos: TipoVehiculoModel[] = [];
  vehiculos: any[] = [];
  vehiculosFiltrados: any[] = [];

  constructor(
    private tipoVehiculoService: TipoVehiculoService,
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
  this.tipoVehiculoService.listAllTipoVheculo().subscribe((tipos: any) => {
    this.tipoVehiculos = tipos;

    this.vehiculoService.listAllVhiculo().subscribe((vehiculosRaw: any[]) => {
      // Adaptar propiedades del backend a tu modelo
      const vehiculosAdaptados: VehiculoModel[] = vehiculosRaw.map(v => ({
        matricula: v.matricula,
        color: v.color,
        kilometraje: v.kilometraje,
        disponibilidad: v.disponibilidad,
        ubicacion: v.ubicacion,
        combustible: v.combustible,
        etiqueta: v.etiqueta,
        autonomia: v.autonomia,
        puertas: v.puertas,
        aireAcondicionado: v.aire_acondicionado, // ojo aquí
        plazas: v.plazas,
        transmision: v.transmision,
        tipoV: v.tipo // o el campo correcto si viene diferente
      }));

      // Fusionar con tipoVehiculo
      this.vehiculos = vehiculosAdaptados.map((vehiculo: VehiculoModel) => {
        const tipo = this.tipoVehiculos.find((tv: TipoVehiculoModel) => tv.id === Number(vehiculo.tipoV));
        return {
          ...vehiculo,
          ...tipo
        };
      });

      this.aplicarFiltros();
    });
  });
}



  aplicarFiltros(): void {
    if (this.filtrosActivos.includes('Todos los vehículos')) {
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
    this.filtrosActivos = ['Todos los vehículos'];
    this.aplicarFiltros();
  }

  toggleFiltro(filtro: string): void {
    if (filtro === 'Todos los vehículos') {
      this.filtrosActivos = ['Todos los vehículos'];
    } else {
      const index = this.filtrosActivos.indexOf(filtro);
      if (index > -1) {
        this.filtrosActivos.splice(index, 1);
      } else {
        this.filtrosActivos = this.filtrosActivos.filter(f => f !== 'Todos los vehículos');
        this.filtrosActivos.push(filtro);
      }

      if (this.filtrosActivos.length === 0) {
        this.filtrosActivos = ['Todos los vehículos'];
      }
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
