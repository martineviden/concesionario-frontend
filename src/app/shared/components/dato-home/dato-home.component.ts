import { Component, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-dato-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dato-home.component.html",
  styleUrl: "./dato-home.component.css",
})
export class DatoHomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.setupIntersectionObserver()
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // 10% del elemento visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Añadir clase visible cuando el elemento entra en el viewport
          entry.target.classList.add("visible")

          // Dejar de observar el elemento una vez que se ha mostrado
          observer.unobserve(entry.target)
        }
      })
    }, options)

    // Observar el título principal
    const mainTitle = document.querySelector(".main-title")
    if (mainTitle) {
      observer.observe(mainTitle)
    }

    // Observar todos los elementos con la clase step-item
    const stepItems = document.querySelectorAll(".step-item")
    stepItems.forEach((item) => {
      observer.observe(item)
    })
  }
}
