import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';

@Component({
  selector: 'app-preview-catalogo',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './preview-catalogo.component.html',
  styleUrls: ['./preview-catalogo.component.css']
})
export class PreviewCatalogoComponent implements OnInit {
  vehiculos: any[] = [];

  constructor(private tipoVehiculoService: TipoVehiculoService) {}

  ngOnInit(): void {
    this.tipoVehiculoService.listAllTipoVheculo().subscribe((response: any) => {
      const tipos = response;

      const vehiculosPlanos = tipos.flatMap((tipo: any) => {
        const modeloNombre = tipo.modelo?.toLowerCase().replace(/\s+/g, '');
        const imagen = `assets/img/catalogo/${modeloNombre}.png`;

        return tipo.vehiculos.map((vehiculo: any) => ({
          ...vehiculo,
          marca: tipo.marca,
          modelo: tipo.modelo,
          tipo: tipo.tipo,
          precio: +(tipo.precio / 30).toFixed(2),
          imagenBase: imagen.replace('.png', ''),
          imagen
        }));
      });

      // Mezclar aleatoriamente
      this.vehiculos = vehiculosPlanos.sort(() => Math.random() - 0.5).slice(0, 6); // por ejemplo, mostrar 6
    });
  }
}
