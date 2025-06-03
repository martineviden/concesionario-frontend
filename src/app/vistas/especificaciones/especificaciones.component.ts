import { Component, OnInit } from '@angular/core';
import { TipoVehiculoBannerFirstComponent } from '../../shared/components/tipo-vehiculo-banner-first/tipo-vehiculo-banner-first.component';
import { TipoVehiculoResennasComponent } from '../../shared/components/tipo-vehiculo-resennas/tipo-vehiculo-resennas.component';
import { VehiculoModel } from '../../models/vehiculo.model';
import { TipoVehiculoModel } from '../../models/tipo-vehiculo.model';
import { VehiculoService } from '../../services/vehiculo.service';
import { TipoVehiculoService } from '../../services/tipo-vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../shared/components/Header_Footer/footer/footer.component';
import { NavbarComponent } from '../../shared/components/Header_Footer/navbar/navbar.component';
import { PreviewCatalogoComponent } from '../../shared/components/Catalogo/preview-catalogo/preview-catalogo.component';
import { MarcasBlockComponent } from '../../shared/components/Contacto/marcas-block/marcas-block.component';

@Component({
  selector: 'app-especificaciones',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    TipoVehiculoBannerFirstComponent,
    TipoVehiculoResennasComponent,
    PreviewCatalogoComponent,
    MarcasBlockComponent
],
  templateUrl: './especificaciones.component.html',
  styleUrl: './especificaciones.component.css'
})
export class EspecificacionesComponent implements OnInit {
  tipoVehiculoSeleccionado!: TipoVehiculoModel;
  vehiculoSeleccionado!: VehiculoModel;

  constructor(
    private vehiculoService: VehiculoService,
    private tipoVehiculoService: TipoVehiculoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const matricula = params.get('matricula');
    if (matricula) {
      this.vehiculoService.getVehiculoPorMatricula(matricula).subscribe({
        next: (vehiculo: any) => {
          console.log('Vehículo recibido:', vehiculo);
          this.vehiculoSeleccionado = vehiculo;

          // Prueba accediendo directamente a diferentes posibilidades:
          const idTipo =
            vehiculo.id_tipo_vehiculo ??
            vehiculo.idTipoVehiculo ??
            vehiculo.tipoVehiculo?.id;

          if (idTipo) {
            this.tipoVehiculoService.getTipoVehiculoById(idTipo).subscribe({
              next: (tipo: any) => {
                console.log('TipoVehiculo:', tipo);
                this.tipoVehiculoSeleccionado = tipo;
              },
              error: err => {
                console.error('Error cargando tipo de vehículo', err);
              }
            });
          } else {
            console.error('⚠️ El vehículo no tiene ID de tipo. Vehículo:', vehiculo);
          }
        },
        error: err => {
          console.error('No se encontró el vehículo con esa matrícula', err);
        }
      });
    }
  });
}

}
