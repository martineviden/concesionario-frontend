import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-contacto-banner',
  imports: [CommonModule, RouterModule],
  templateUrl: './contacto-banner.component.html',
  styleUrl: './contacto-banner.component.css'
})
export class ContactoBannerComponent {
 preguntasFrecuentes = [
    {
      pregunta: '¿Cuánto tardan en responder?',
      respuesta: 'Normalmente respondemos en un plazo de 24-48 horas hábiles.'
    },
    {
      pregunta: '¿Qué información debo incluir?',
      respuesta: 'Por favor, incluye todos los detalles relevantes sobre tu consulta para que podamos ayudarte mejor.'
    },
    {
      pregunta: '¿Tienen soporte telefónico?',
      respuesta: 'Sí, nuestro número de atención al cliente es +34 123 456 789.'
    },
    {
      pregunta: '¿Cuáles son los horarios de atención?',
      respuesta: 'Nuestro equipo está disponible de lunes a viernes de 9:00 a 18:00 y sábados de 10:00 a 14:00.'
    }
  ];
}
