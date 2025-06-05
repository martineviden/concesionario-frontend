import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl:'./footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  @ViewChild('footer') footerElement!: ElementRef;
  private hasAnimated = false;

  ngOnInit() {
    // Esperar a que el DOM esté listo
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 0);
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          const footer = entry.target as HTMLElement;
          footer.classList.add('animate-footer');
          this.hasAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (this.footerElement?.nativeElement) {
      observer.observe(this.footerElement.nativeElement);
    }
  }
}
