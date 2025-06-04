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
import { Subscription } from 'rxjs';
import { CrearTipoVehiculoComponent } from '../crear-tipo-vehiculo/crear-tipo-vehiculo.component';
import { CrearVehiculoComponent } from '../crear-vehiculo/crear-vehiculo.component';

@Component({
  selector: 'app-perfil-administracion',
  standalone: true,
  imports: [ CommonModule, RouterModule, CrearVehiculoComponent, CrearTipoVehiculoComponent, NavbarComponent],
  templateUrl: './perfil-administracion.component.html',
  styleUrls: ['./perfil-administracion.component.css']
})
export class PerfilAdministracionComponent implements OnInit, OnDestroy {

  usuarioActual: Usuario | null = null;
  estaAutenticado = false;
  esAdmin = false;

  tipoVehiculosList: TipoVehiculoModel[] = [];
  vehiculosList: VehiculoModel[] = [];

  private authSubscription: Subscription | null = null;

  // Mostrar modales
  showAgregarModalVehiculo = false;
  showAgregarModalTipoVehiculo = false;

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

    this.cargarTipoVehiculos();
    this.cargarVehiculos();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  cargarTipoVehiculos(): void {
    this.tipoVehiculoService.listAllTipoVehiculo().subscribe((tipos: TipoVehiculoModel[]) => {
      this.tipoVehiculosList = tipos;
    });
  }

  vehiculosConTipo: Array<{ vehiculo: VehiculoModel, tipo: TipoVehiculoModel }> = [];

  cargarVehiculos(): void {
    this.vehiculoService.listAllVehiculo().subscribe((vehiculos: VehiculoModel[]) => {
    this.vehiculosList = vehiculos;

    // Combinar con los tipos de vehículo ya cargados
    this.vehiculosConTipo = this.vehiculosList.map(vehiculo => {
      const tipo = this.tipoVehiculosList.find(t => t.id === vehiculo.id_tipo_vehiculo)!;
      return { vehiculo, tipo };
    });
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

  toggleMostrarTiposVehiculos(): void {
    this.mostrarTiposVehiculos = !this.mostrarTiposVehiculos;
  }

  toggleMostrarVehiculos(): void {
    this.mostrarVehiculos = !this.mostrarVehiculos;
  }
}
