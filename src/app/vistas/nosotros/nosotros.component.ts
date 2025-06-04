import { Component } from '@angular/core';
import { VideoNosotrosComponent } from "../../shared/components/Informacion/video-nosotros/video-nosotros.component";
import { PreguntaFrecuenteComponent } from "../../shared/components/Informacion/pregunta-frecuente/pregunta-frecuente.component";
import { SeccionNosotrosComponent } from "../../shared/components/Informacion/seccion-nosotros/seccion-nosotros.component";
import { ReservaAhoraComponent } from "../../shared/components/Informacion/reserva-ahora/reserva-ahora.component";
import { NavbarComponent } from '../../shared/components/Header_Footer/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/Header_Footer/footer/footer.component';

@Component({
  selector: 'app-nosotros',
  imports: [NavbarComponent, FooterComponent, VideoNosotrosComponent, PreguntaFrecuenteComponent, SeccionNosotrosComponent, ReservaAhoraComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

}
