import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioAlquilarComponent } from "../formulario-alquilar/formulario-alquilar.component";
import { VehiculoModel } from '../../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../../models/tipo-vehiculo.model';
import { AuthService } from '../../../services/auth.service';
import { Rol } from '../../../models/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../../services/vehiculo.service';

@Component({
  selector: 'app-tipo-vehiculo-banner-first',
  standalone: true,
  imports: [CommonModule, FormularioAlquilarComponent],
  templateUrl: './tipo-vehiculo-banner-first.component.html',
  styleUrls: ['./tipo-vehiculo-banner-first.component.css']
})
export class TipoVehiculoBannerFirstComponent {
  mostrarFormularioAlquilar = false;
  @Input() vehiculo!: VehiculoModel;
  @Input() tipoVehiculo!: TipoVehiculoModel;
  esAdmin: boolean = false;
  matricula: string = '';

  constructor(
    private authService: AuthService,
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  eliminarVehiculo() {
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
    this.vehiculoService.deleteVehiculo(this.matricula).subscribe({
      next: () => {
        console.log('Vehiculo eliminado con matricula: ' + this.matricula);
        this.router.navigate(['/catalogo']);
      },
      error: err => console.log('Error al eliminar vehiculo')
    })
  }

  ngOnInit() {
    this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.esAdmin = usuario?.rol === Rol.ADMIN;
    });
  }
}