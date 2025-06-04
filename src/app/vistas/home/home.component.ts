import { Component } from '@angular/core';
import { InfoBlock1Component } from '../../shared/components/Home/info-block1/info-block1.component';
import { HomeBannerFirstComponent } from "../../shared/components/Home/home-banner-first/home-banner-first.component";
import { FooterComponent } from '../../shared/components/Header_Footer/footer/footer.component';
import { NavbarComponent } from '../../shared/components/Header_Footer/navbar/navbar.component';
import { DatoHomeComponent } from '../../shared/components/Home/dato-home/dato-home.component';
import { HechosHomeComponent } from '../../shared/components/Home/hechos-home/hechos-home.component';
import { PreviewCatalogoComponent } from '../../shared/components/Home/preview-catalogo/preview-catalogo.component';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, NavbarComponent, DatoHomeComponent, HechosHomeComponent, InfoBlock1Component, HomeBannerFirstComponent, PreviewCatalogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
