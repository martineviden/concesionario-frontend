import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { DatoHomeComponent } from '../../shared/components/dato-home/dato-home.component';
import { HechosHomeComponent } from '../../shared/components/hechos-home/hechos-home.component';
import { InfoBlock1Component } from '../../shared/components/info-block1/info-block1.component';
import { HomeBannerFirstComponent } from "../../shared/components/home-banner-first/home-banner-first.component";
import { PreviewCatalogoComponent } from "../../shared/components/preview-catalogo/preview-catalogo.component";

@Component({
  selector: 'app-home',
  imports: [FooterComponent, NavbarComponent, DatoHomeComponent, HechosHomeComponent, InfoBlock1Component, HomeBannerFirstComponent, PreviewCatalogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
