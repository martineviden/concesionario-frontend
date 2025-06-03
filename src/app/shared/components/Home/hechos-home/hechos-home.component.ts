import { Component, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-hechos-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./hechos-home.component.html",
  styleUrl: "./hechos-home.component.css",
})
export class HechosHomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.setupIntersectionObserver()
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15, // Elemento visible al 15%
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, options)

    // Observar todas las secciones
    document.querySelectorAll(".animate-section").forEach((section) => {
      // Primero observamos la sección
      observer.observe(section)

      // Luego configuramos un nuevo observer para los elementos dentro de la sección
      this.setupElementObserver(section)
    })
  }

  private setupElementObserver(section: Element): void {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, options)

    // Observar todos los elementos animables dentro de la sección
    section.querySelectorAll(".animate-element").forEach((element) => {
      observer.observe(element)
    })
  }

  private animateElement(element: Element): void {
    // Añadir un pequeño retraso antes de añadir la clase visible
    const delay = element.getAttribute("data-delay") || "0"

    setTimeout(() => {
      element.classList.add("visible")
    }, Number.parseInt(delay))
  }
}
