import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-recomendado',
  imports: [],
  templateUrl: './perfil-recomendado.component.html',
  styleUrl: './perfil-recomendado.component.css'
})
export class PerfilRecomendadoComponent {
  recomendados = [
    {
      nombre: "Honda",
      modelo: "CB500F",
      anio: "2023",
      precio: "€25",
      moneda: "€",
      porDia: "por día",
      imagen: "assets/img/moto.png",
      specs: ["⚙️ Automática", "⛽ PB 95", "❌ No"]
    },
    {
      nombre: "Toyota",
      modelo: "Sedan",
      anio: "2016",
      precio: "$35",
      moneda: "$",
      porDia: "por día",
      imagen: "assets/img/coche.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
    },
    {
      nombre: "Volkswagen",
      modelo: "Transporter Kombi",
      anio: "2024",
      precio: "$40",
      moneda: "$",
      porDia: "por día",
      imagen: "assets/img/van.png",
      specs: ["⚙️ Automat", "⛽ PB 95", "❄️ Aire Acondicionado"]
    },
    {
      nombre: "Volkswagen",
      modelo: "Transporter Kombi",
      anio: "2024",
      precio: "$40",
      moneda: "$",
      porDia: "por día",
      imagen: "assets/img/coche.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
    },
    {
      nombre: "Honda",
      modelo: "CB500F",
      anio: "2023",
      precio: "€25",
      moneda: "€",
      porDia: "por día",
      imagen: "assets/img/moto.png",
      specs: ["⚙️ Automática", "⛽ PB 95", "❌ No"]
    },
    {
      nombre: "Toyota",
      modelo: "Sedan",
      anio: "2016",
      precio: "$35",
      moneda: "$",
      porDia: "por día",
      imagen: "assets/img/coche.png",
      specs: ["⚙️ Manual", "⛽ PB 95", "❄️ Aire Acondicionado"]
    }
  ];
}
