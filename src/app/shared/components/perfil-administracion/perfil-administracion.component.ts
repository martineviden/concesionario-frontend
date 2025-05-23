import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-administracion',
  imports: [
 CommonModule
],
  templateUrl: './perfil-administracion.component.html',
  styleUrls: ['./perfil-administracion.component.css']
})
export class PerfilAdministracionComponent {
  vehiculos = [
    {
      nombre: "Honda",
      modelo: "CB500F",
      anio: "2023",
      precio: "€25",
      imagen: "assets/img/moto.png",
      specs: ["⚙️ Automática", "⛽ PB 95", "❄️ No"]
    },
    {
      nombre: "Yamaha",
      modelo: "NMAX 155",
      anio: "2024",
      precio: "$50",
      imagen: "assets/img/moto.png",
      specs: ["⚙️ Manual", "⛽ PB 98", "❄️ No"]
    },
    {
      nombre: "BMW",
      modelo: "R 1250 GS",
      anio: "2023",
      precio: "$45",
      imagen: "assets/img/moto.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ No"]
    },
    {
      nombre: "Volkswagen",
      modelo: "Transporter Kombi",
      anio: "2024",
      precio: "$40",
      imagen: "assets/img/van.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
    },
    {
      nombre: "Toyota",
      modelo: "Sedan",
      anio: "2016",
      precio: "$35",
      imagen: "assets/img/coche.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
    },
    {
      nombre: "Porsche",
      modelo: "SUV",
      anio: "2017",
      precio: "$50",
      imagen: "assets/img/coche.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
    }
  ];
}
