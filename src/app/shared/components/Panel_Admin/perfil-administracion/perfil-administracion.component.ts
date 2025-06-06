import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../Header_Footer/navbar/navbar.component';
import { TipoVehiculoModel } from '../../../../models/tipo-vehiculo.model';
import { VehiculoModel } from '../../../../models/vehiculo.model';
import { Usuario } from '../../../../models/login.model';
import { Rol } from '../../../../models/enums';
import { AuthService } from '../../../../services/auth.service';
import { TipoVehiculoService } from '../../../../services/tipo-vehiculo.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { forkJoin, Subscription } from 'rxjs';
import { CrearTipoVehiculoComponent } from '../crear-tipo-vehiculo/crear-tipo-vehiculo.component';
import { CrearVehiculoComponent } from '../crear-vehiculo/crear-vehiculo.component';
import { EditarTipoVehiculoComponent } from '../editar-tipo-vehiculo/editar-tipo-vehiculo.component';
import { EditarVehiculoComponent } from "../editar-vehiculo/editar-vehiculo.component";

@Component({
  selector: 'app-perfil-administracion',
  standalone: true,
  imports: [CommonModule, RouterModule, CrearVehiculoComponent, CrearTipoVehiculoComponent, NavbarComponent, EditarTipoVehiculoComponent, EditarVehiculoComponent],
  templateUrl: './perfil-administracion.component.html',
  styleUrls: ['./perfil-administracion.component.css']
})
export class PerfilAdministracionComponent implements OnInit, OnDestroy {

  usuarioActual: Usuario | null = null;
  estaAutenticado = false;
  esAdmin = false;

  tipoVehiculosList: TipoVehiculoModel[] = [];
  vehiculosList: VehiculoModel[] = [];
  vehiculosConTipo: Array<{ vehiculo: VehiculoModel, tipo: TipoVehiculoModel }> = [];
  tipoEnEdicion: TipoVehiculoModel | null = null;
  vehiculoEnEdicion: { vehiculo: VehiculoModel, tipo: TipoVehiculoModel } | null = null;

  private authSubscription: Subscription | null = null;

  // Mostrar modales
  showAgregarModalVehiculo = false;
  showAgregarModalTipoVehiculo = false;
  showEditarModalTipoVehiculo = false;
  showEditarModalVehiculo = false;

  mostrarTiposVehiculos: boolean = false; // Para mostrar/ocultar tabla tipos
  mostrarVehiculos: boolean = true;       // Para mostrar/ocultar vehículos

  constructor(
    private authService: AuthService,
    private tipoVehiculoService: TipoVehiculoService,
    private vehiculoService: VehiculoService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.usuarioActual = usuario;
      this.estaAutenticado = !!usuario;
      this.esAdmin = usuario?.rol === Rol.ADMIN;
    });

    this.cargarDatosVehiculosYTipos();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  cargarDatosVehiculosYTipos(): void {
    forkJoin({
      tipos: this.tipoVehiculoService.listAllTipoVehiculo(),
      vehiculos: this.vehiculoService.listAllVehiculo()
    }).subscribe(({ tipos, vehiculos }) => {
      console.log('Tipos:', tipos);
      console.log('Vehículos:', vehiculos);

      this.tipoVehiculosList = tipos;
      this.vehiculosList = vehiculos;

      // Crear un map de tipos por ID para un rápido lookup
      const tiposMap = new Map<number, TipoVehiculoModel>();
      tipos.forEach(tipo => tiposMap.set(tipo.id, tipo));

     // Map vehicles to their types
      this.vehiculosConTipo = vehiculos.map(vehiculo => {
        // Get the type ID - handles both cases where tipoVehiculo is an object or just an ID
        let tipoId: number;

        if (typeof vehiculo.tipoVehiculo === 'object' && vehiculo.tipoVehiculo !== null) {
          // Case when tipoVehiculo is the full object
          tipoId = vehiculo.tipoVehiculo.id;
        } else {
          // Case when tipoVehiculo is just the ID
          tipoId = vehiculo.tipoVehiculo as number;
        }

        if (!tipoId) {
          console.warn('Vehicle has no type ID:', vehiculo);
          return {
            vehiculo,
            tipo: { marca: 'Desconocida', modelo: 'Desconocido' } as TipoVehiculoModel
          };
        }

        const tipo = tiposMap.get(tipoId);
        if (!tipo) {
          console.warn('Type not found for ID:', tipoId, 'in vehicle:', vehiculo);
        }

        return {
          vehiculo,
          tipo: tipo || { marca: 'Desconocida', modelo: 'Desconocido' } as TipoVehiculoModel
        };
      });

      console.log('Final vehicles with types:', this.vehiculosConTipo);
    });
  }

  cargarTipoVehiculos(): void {
    this.tipoVehiculoService.listAllTipoVehiculo().subscribe((tipos: TipoVehiculoModel[]) => {
      this.tipoVehiculosList = tipos;
    });
  }

  cargarVehiculos(): void {
    this.vehiculoService.listAllVehiculo().subscribe((vehiculos: VehiculoModel[]) => {
      this.vehiculosList = vehiculos;
    });
  }

  // Modal de agregar vehículo
  abrirAgregarVehiculo(): void {
    this.showAgregarModalVehiculo = true;
  }
  cerrarAgregarVehiculo(): void {
    this.showAgregarModalVehiculo = false;
  }

  // Modal de agregar tipo de vehículo
  abrirAgregarTipoVehiculo(): void {
    this.showAgregarModalTipoVehiculo = true;
  }
  cerrarAgregarTipoVehiculo(): void {
    this.showAgregarModalTipoVehiculo = false;
  }

  // Modal de editar tipo de vehículo
  abrirEditarTipoVehiculo(): void {
    this.showEditarModalTipoVehiculo = true;
  }
  cerrarEditarTipoVehiculo(): void {
    this.showEditarModalTipoVehiculo = false;
  }

  // Modal de editar vehículo
  abrirEditarVehiculo(): void {
    this.showEditarModalVehiculo = true;
  }


  // Mostrar/ocultar tablas
  toggleMostrarTiposVehiculos(): void {
    this.mostrarTiposVehiculos = !this.mostrarTiposVehiculos;
  }

  toggleMostrarVehiculos(): void {
    this.mostrarVehiculos = !this.mostrarVehiculos;
  }

  // Mostrar el formulario de edición
  editarTipo(tipo: TipoVehiculoModel): void {
    this.tipoEnEdicion = tipo;
    this.showEditarModalTipoVehiculo = true;
  }

  cerrarEditarModal(): void {
    this.showEditarModalTipoVehiculo = false;
    this.tipoEnEdicion = null;
  }

   // Cancelar edición
  cancelarEdicion(): void {
    this.tipoEnEdicion = null;
  }

  guardarTipoEditado(tipoActualizado: TipoVehiculoModel): void {
    if (!tipoActualizado.id) return;

    this.tipoVehiculoService.updateTipoVehiculo(tipoActualizado.id, tipoActualizado).subscribe(() => {
      this.showEditarModalTipoVehiculo = false;
      this.tipoEnEdicion = null;
      this.cargarTipoVehiculos();
    }, error => {
      console.error('Error actualizando tipo vehículo:', error);
    });
  }

  eliminarTipo(): void {
    if (!this.tipoEnEdicion?.id) return;

    this.tipoVehiculoService.deleteTipoVehiculo(this.tipoEnEdicion.id).subscribe(() => {
      this.showEditarModalTipoVehiculo = false;
      this.tipoEnEdicion = null;
      this.cargarTipoVehiculos();
    }, error => {
      console.error('Error eliminando tipo vehículo:', error);
    });
  }

  // Mostrar el formulario de edición de vehículo
  editarVehiculo(item: { vehiculo: VehiculoModel, tipo: TipoVehiculoModel }): void {
    this.vehiculoEnEdicion = item;
    this.showEditarModalVehiculo = true;
  }
  cerrarEditarVehiculo(): void {
  this.showEditarModalVehiculo = false;
  this.vehiculoEnEdicion = null;
  }
  guardarVehiculoEditado(vehiculoActualizado: VehiculoModel): void {
    if (!vehiculoActualizado.id) return;

    this.vehiculoService.updateVehiculo(vehiculoActualizado.id.toString(), vehiculoActualizado).subscribe(() => {
      this.showEditarModalVehiculo = false;
      this.vehiculoEnEdicion = null;
      this.cargarDatosVehiculosYTipos();
    }, error => {
      console.error('Error actualizando vehículo:', error);
    });
  }
  eliminarVehiculo(): void {
    if (!this.vehiculoEnEdicion?.vehiculo?.id) return;

    this.vehiculoService.deleteVehiculo(this.vehiculoEnEdicion.vehiculo.id.toString()).subscribe(() => {
      this.showEditarModalVehiculo = false;
      this.vehiculoEnEdicion = null;
      this.cargarDatosVehiculosYTipos();
    }, error => {
      console.error('Error eliminando vehículo:', error);
    });
  }

  getImagenPorTipoYModelo(tipo: string, modelo: string): string {
  const tipoLower = tipo.toLowerCase();
  const modeloLower = modelo.toLowerCase();

  switch (tipoLower) {
    case 'coche':
      switch (modeloLower) {
        case 'a3':
          return 'assets/img/catalogo/a3.png';
        case 'serie 3':
          return 'assets/img/catalogo/serie3.png';
        case 'focus':
          return 'assets/img/catalogo/focus.png';
        case 'i20n':
          return 'assets/img/catalogo/i20n.png';
        case '208':
          return 'assets/img/catalogo/208.png';
        case 'clio':
          return 'assets/img/catalogo/clio.png';
        case 'ibiza':
          return 'assets/img/catalogo/ibiza.png';
        case 'model 3':
          return 'assets/img/catalogo/model3.png';
        case 'corolla':
          return 'assets/img/catalogo/corolla.png';
        default:
          return 'assets/img/catalogo/default.png';
      }

    case 'moto':
      switch (modeloLower) {
        case 'monster 821':
          return 'assets/img/catalogo/monster821.png';
        case 'iron 883':
          return 'assets/img/catalogo/iron883.png';
        case 'cbr600rr':
          return 'assets/img/catalogo/cbr600rr.png';
        case 'gsx-r750':
          return 'assets/img/catalogo/gsx-r750.png';
        case 'ninja 400':
          return 'assets/img/catalogo/ninja400.png';
        case 'mt-07':
          return 'assets/img/catalogo/mt-07.png';
        default:
          return 'assets/img/catalogo/default.png';
      }

    case 'furgoneta':
      switch (modeloLower) {
        case 'berlingo':
          return 'assets/img/catalogo/berlingo.png';
        case 'ducato':
          return 'assets/img/catalogo/ducato.png';
        case 'sprinter':
          return 'assets/img/catalogo/sprinter.png';
        case 'combo life':
          return 'assets/img/catalogo/combolife.png';
        case 'transporter':
          return 'assets/img/catalogo/transporter.png';
        default:
          return 'assets/img/catalogo/default.png';
      }

    default:
      return 'assets/img/catalogo/default.png';
  }
}

}
