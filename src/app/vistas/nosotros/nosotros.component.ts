import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { VideoNosotrosComponent } from "../../shared/components/video-nosotros/video-nosotros.component";
import { PreguntaFrecuenteComponent } from "../../shared/components/pregunta-frecuente/pregunta-frecuente.component";
import { SeccionNosotrosComponent } from "../../shared/components/seccion-nosotros/seccion-nosotros.component";
import { ReservaAhoraComponent } from "../../shared/components/reserva-ahora/reserva-ahora.component";

@Component({
  selector: 'app-nosotros',
  imports: [NavbarComponent, FooterComponent, VideoNosotrosComponent, PreguntaFrecuenteComponent, SeccionNosotrosComponent, ReservaAhoraComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

}
