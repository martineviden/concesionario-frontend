import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoVehiculoService } from '../../../../services/tipo-vehiculo.service';
import {
  Provincia,
  Combustible,
  Transmision,
  EtiquetaAmbiental,
  TipoVehiculo
} from '../../../../models/enums';
import { VehiculoService } from '../../../../services/vehiculo.service';

type EspecificationKey = 'combustible' | 'transmision' | 'etiqueta' | 'plazas';
type DropdownKey = 'ubicacion' | EspecificationKey;

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
  styleUrls: ['./catalogo-component.component.css'],
})
export class CatalogoComponentComponent implements OnInit {
  // Estados para controlar mensajes
  mostrarMensajeInicial: boolean = true;
  mostrarMensajeSinResultados: boolean = false;
  cargando: boolean = false;

  // Filtros activos
  filtrosActivos: string[] = [];

  // Dropdowns
  dropdowns: Record<DropdownKey, boolean> = {
    ubicacion: false,
    combustible: false,
    transmision: false,
    etiqueta: false,
    plazas: false,
  };

  especificaciones: EspecificationKey[] = ['combustible', 'transmision', 'etiqueta', 'plazas'];
  dropdownKeys: DropdownKey[] = ['ubicacion', ...this.especificaciones];

  // Opciones para los filtros
  provincias = Object.keys(Provincia).filter(
    (k) => isNaN(Number(k)) && k !== 'keys'
  );
  tiposCombustible = Object.keys(Combustible).filter(
    (k) => isNaN(Number(k)) && k !== 'keys'
  );
  tiposTransmision = Object.keys(Transmision).filter(
    (k) => isNaN(Number(k)) && k !== 'keys'
  );
  etiquetasAmbientales = Object.keys(EtiquetaAmbiental).filter(
    (k) => isNaN(Number(k)) && k !== 'keys'
  );
  tiposVehiculo = Object.keys(TipoVehiculo).filter(
    (k) => isNaN(Number(k)) && k !== 'keys'
  );
  plazas: string[] = ['2', '4', '5', '7', '9'];

  // Datos de vehículos
  vehiculos: any[] = [];
  vehiculosFiltrados: any[] = [];
  tipoVehiculos: TipoVehiculoConVehiculos[] = [];

  constructor(
    private tipoVehiculoService: TipoVehiculoService,
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tipo = params['tipo'];
      const ubicacion = params['ubicacion'];

      this.cargarVehiculos(() => {
        if (tipo) this.toggleFiltro(`tipo:${tipo}`);
        if (ubicacion) this.toggleFiltro(`ubicacion:${ubicacion}`);

        // Si hay parámetros, ocultar mensaje inicial
        if (tipo || ubicacion) {
          this.mostrarMensajeInicial = false;
          this.aplicarBusqueda();
        }
      });
    });
  }

  // Carga los vehículos desde el servicio
  cargarVehiculos(callback?: () => void): void {
    this.cargando = true;
    this.tipoVehiculoService.listAllTipoVehiculo().subscribe({
      next: (response) => {
        const tipos = response as unknown as TipoVehiculoConVehiculos[];
        this.procesarVehiculos(tipos);
        if (callback) callback();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar vehículos:', err);
        this.cargando = false;
      }
    });
  }

  // Procesa los datos de los vehículos
  procesarVehiculos(tipos: TipoVehiculoConVehiculos[]): void {
    this.vehiculos = tipos.flatMap((tipo) => {
      const modeloNombre = tipo.modelo?.toLowerCase().replace(/\s+/g, '');
      const imagen = `assets/img/catalogo/${modeloNombre}.png`;

      return tipo.vehiculos.map((vehiculo) => ({
        ...vehiculo,
        marca: tipo.marca,
        modelo: tipo.modelo,
        tipo: tipo.tipo,
        precio: +(tipo.precio).toFixed(2),
        imagenBase: imagen.replace('.png', ''),
        imagen,
      }));
    });

    this.vehiculosFiltrados = [...this.vehiculos];
  }

  // Navega a la página de detalles
  verDetalles(vehiculo: any): void {
  this.router.navigate(['/especificaciones', vehiculo.matricula]);
}


  // Aplica los filtros seleccionados
  aplicarFiltros(): void {
    if (this.filtrosActivos.length === 0) {
      this.vehiculosFiltrados = [];
      return;
    }

    const filtrosPorTipo: Record<string, Set<string>> = {};
    for (const filtro of this.filtrosActivos) {
      const [clave, valor] = filtro.split(':');
      if (!filtrosPorTipo[clave]) {
        filtrosPorTipo[clave] = new Set();
      }
      filtrosPorTipo[clave].add(valor);
    }

    this.vehiculosFiltrados = this.vehiculos.filter((vehiculo) => {
      return Object.entries(filtrosPorTipo).every(([clave, valores]) => {
        const valorVehiculo = (vehiculo as any)[clave];
        return valores.has(valorVehiculo?.toString());
      });
    });
  }

  // Limpia todos los filtros
  limpiarFiltros(): void {
    this.filtrosActivos = [];
    this.vehiculosFiltrados = [];
    this.mostrarMensajeInicial = true;
    this.mostrarMensajeSinResultados = false;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  // Aplica la búsqueda con validación
  aplicarBusqueda(): void {
    const tieneTipo = this.filtrosActivos.some(f => f.startsWith('tipo:'));
    const tieneUbicacion = this.filtrosActivos.some(f => f.startsWith('ubicacion:'));

    if (!tieneTipo || !tieneUbicacion) {
      this.mostrarMensajeInicial = true;
      this.mostrarMensajeSinResultados = false;
      return;
    }

    this.aplicarFiltros();
    this.mostrarMensajeInicial = false;
    this.mostrarMensajeSinResultados = this.vehiculosFiltrados.length === 0;
  }

  // Maneja el cambio de ubicación
  onUbicacionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const ubicacion = select.value;

    // Eliminar filtros de ubicación previos
    this.filtrosActivos = this.filtrosActivos.filter(f => !f.startsWith('ubicacion:'));

    if (ubicacion) {
      this.filtrosActivos.push(`ubicacion:${ubicacion}`);
      this.aplicarBusqueda();
    }
  }

  // Alterna un filtro
  toggleFiltro(filtro: string): void {
    if (this.filtrosActivos.includes(filtro)) {
      this.filtrosActivos = this.filtrosActivos.filter((f) => f !== filtro);
    } else {
      this.filtrosActivos.push(filtro);
    }
    this.aplicarBusqueda();
  }

  // Alterna un dropdown
  toggleDropdown(nombre: DropdownKey): void {
    this.dropdowns[nombre] = !this.dropdowns[nombre];
  }

  // Selecciona un filtro de dropdown
  seleccionarFiltro(tipo: string, valor: string): void {
    const filtro = `${tipo}:${valor}`;
    this.toggleFiltro(filtro);
  }

  // Obtiene opciones para un filtro dropdown
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

  // Verifica si un dropdown tiene filtros activos
  isFiltroDropdownActivo(filtro: DropdownKey): boolean {
    return this.filtrosActivos.some((f) => f.startsWith(filtro + ':'));
  }

  // Obtiene cantidad de opciones seleccionadas en un dropdown
  getCantidadSeleccionados(filtro: DropdownKey): number {
    return this.filtrosActivos.filter((f) => f.startsWith(filtro + ':')).length;
  }

  // Obtiene título legible para una especificación
  getTituloEspecificacion(espec: string): string {
    const titulos: Record<string, string> = {
      'combustible': 'Combustible',
      'transmision': 'Transmisión',
      'etiqueta': 'Etiqueta ambiental',
      'plazas': 'Número de plazas'
    };
    return titulos[espec] || espec;
  }

  // Cierra dropdowns al hacer click fuera
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
