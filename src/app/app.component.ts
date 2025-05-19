import { InfoBlock1Component } from './shared/components/info-block1/info-block1.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HomeBannerFirstComponent } from './shared/components/home-banner-first/home-banner-first.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
<<<<<<< HEAD
import { PreviewCatalogoComponent } from './shared/components/preview-catalogo/preview-catalogo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, DatoHomeComponent, HechosHomeComponent, InfoBlock1Component, PreviewCatalogoComponent],
=======



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, InfoBlock1Component],
>>>>>>> parent of 37ea45b (Merge pull request #3 from martineviden/nav_menu)
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})





export class AppComponent {
  title = 'Frontend';
}
