import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioAlquilarComponent } from "../formulario-alquilar/formulario-alquilar.component";
import { AuthService } from '../../../services/auth.service';
import { Rol } from '../../../models/enums';

@Component({
  selector: 'app-tipo-vehiculo-banner-first',
  standalone: true,
  imports: [CommonModule, FormularioAlquilarComponent],
  templateUrl: './tipo-vehiculo-banner-first.component.html',
  styleUrls: ['./tipo-vehiculo-banner-first.component.css']
})
export class TipoVehiculoBannerFirstComponent {
  mostrarFormularioAlquilar = false;
  esAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  eliminarVehiculo() {
    console.log("El vehiculo se tiene que eliminar");
  }

  ngOnInit() {
    this.authService.obtenerUsuarioActual().subscribe(usuario => {
      this.esAdmin = usuario?.rol === Rol.ADMIN;
    });
  }
}
