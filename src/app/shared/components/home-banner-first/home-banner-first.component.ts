import { Component, inject, type OnInit } from "@angular/core"

import { TipoVehiculoService } from "../../../services/tipo-vehiculo.service"
import type { TipoVehiculoModel } from "../../../models/tipo-vehiculo.model"
import { Provincia, TipoVehiculo } from "../../../models/enums"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-home-banner-first",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home-banner-first.component.html",
  styleUrl: "./home-banner-first.component.css",
})
export class HomeBannerFirstComponent implements OnInit {
  private tipoVehiculoService = inject(TipoVehiculoService)
  private id = 2
  tipoCOCHE = TipoVehiculo.keys()
  ubicaciones = Provincia.keys()

  private nuevoCoche: TipoVehiculoModel = {
    id: 6,
    precio: 6000,
    marca: "Honda",
    modelo: "Civic",
    imagen: "/jaoidjaoi.jpg",
    tipo: TipoVehiculo.COCHE,
    vehiculo: "A78546-B",
  }

  ngOnInit(): void {
    this.tipoVehiculoService.listAllTipoVheculo().subscribe((tipoCoches) => {
      console.log(tipoCoches)
    })

    console.log(this.tipoCOCHE)
  }
}
