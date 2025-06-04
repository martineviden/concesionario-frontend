import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/Header_Footer/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/Header_Footer/footer/footer.component';
import { CatalogoComponentComponent } from '../../shared/components/Catalogo/catalogo-component/catalogo-component.component';

@Component({
  selector: 'app-catalogo',
  imports: [NavbarComponent, FooterComponent, CatalogoComponentComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

}
