import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-pregunta-frecuente',
  imports: [CommonModule],
  templateUrl: './pregunta-frecuente.component.html',
  styleUrl: './pregunta-frecuente.component.css'
})
export class PreguntaFrecuenteComponent {
  preguntasFrecuentes = [
    {
      pregunta:'¿Cómo funciona?',
      respuesta:`Solo tienes que seleccionar el tipo de vehículo (coche, moto o furgoneta), 
        ubicación, seleccionar el vehiculo de su agrado y completar la reserva. 
        Recibirás una confirmación inmediata, y el día del alquiler solo 
        necesitas presentar tu documentación. ¡Y a disfrutar del viaje!`
    },{
      pregunta:'¿Puedo alquilar un coche sin tarjeta de crédito?',
      respuesta:`En KarHub, la mayoría de los alquileres 
        requieren una tarjeta de crédito a nombre del conductor principal. 
        Sin embargo, en algunas ubicaciones y según el tipo de vehículo,
        aceptamos tarjetas de débito. Te recomendamos consultar las condiciones
        específicas al hacer la reserva.`
    },{
      pregunta:'¿Cuáles son los requisitos para alquilar un coche?',
      respuesta:` Los requisitos para alquilar un vehículo con KarHub son:
          <ul>
            <li>Ser mayor de 21 años (la edad mínima puede variar según el vehículo).</li>
            <li>Tener un permiso de conducir válido y en vigor con al menos 1 año de antigüedad.</li>
            <li>Presentar un documento de identidad o pasaporte.</li>
            <li>Contar con una tarjeta de crédito o débito aceptada para el depósito.</li>
          </ul>`
    },{
      pregunta:'¿El alquiler de coches, furgonetas me permite remolcar o acoplar un enganche al vehículo de alquiler?',
      respuesta:`No. Por razones de seguridad y cobertura del seguro, 
        no está permitido remolcar ni instalar enganches, remolques u otros dispositivos
        en los vehículos de alquiler de KarHub. Todos nuestros vehículos deben 
        devolverse en su configuración original.`
    },{
      pregunta:'¿Karhub ofrece productos de cobertura para comprar con mi alquiler?',
      respuesta:`Actualmente, KarHub no ofrece productos 
        de cobertura adicionales. Estamos trabajando para 
        ofrecer opciones de protección extra muy pronto, con el objetivo de
        brindarte una experiencia aún más segura y completa.`
    }
  ]
}
