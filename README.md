# KARHUB - Concesionario y Alquiler de Vehículos

![Angular Version](https://img.shields.io/badge/Angular-19.2-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.6-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Descripción del Proyecto

**KARHUB** es una aplicación web moderna de concesionario y alquiler de vehículos desarrollada con Angular 19. La plataforma permite a los usuarios explorar, reservar y alquilar diferentes tipos de vehículos (coches, motos y furgonetas) con un sistema completo de gestión de usuarios, administración y reservas.

### 🌟 Características Principales

- **Sistema de Autenticación Completo**: Login, registro y gestión de perfiles con JWT
- **Catálogo de Vehículos**: Exploración avanzada con filtros por tipo, ubicación y especificaciones
- **Sistema de Reservas**: Proceso completo de alquiler con formularios validados
- **Panel de Administración**: Gestión de vehículos y tipos de vehículos para administradores
- **Responsive Design**: Interfaz adaptable a dispositivos móviles y escritorio
- **Especificaciones Detalladas**: Vista completa de cada vehículo con características técnicas

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (versión 8 o superior)
- **Angular CLI** (versión 19.2.11)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd concesionario-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar el backend**
   - Asegúrate de que el backend esté ejecutándose en `http://localhost:8080`
   - Verifica que los endpoints de la API estén disponibles

4. **Ejecutar la aplicación**
   ```bash
   ng serve
   # o alternativamente
   npx ng serve
   ```

5. **Acceder a la aplicación**
   - Abre tu navegador en `http://localhost:4200/`

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
src/
├── app/
│   ├── models/              # Modelos de datos
│   │   ├── enums.ts         # Enumeraciones (TipoVehiculo, Provincia, etc.)
│   │   ├── vehiculo.model.ts
│   │   ├── tipo-vehiculo.model.ts
│   │   ├── usuario.model.ts
│   │   ├── reserva.model.ts
│   │   └── resena.model.ts
│   ├── services/            # Servicios de negocio
│   │   ├── auth.service.ts  # Autenticación y autorización
│   │   ├── vehiculo.service.ts
│   │   ├── usuario.service.ts
│   │   ├── reserva.service.ts
│   │   └── tipo-vehiculo.service.ts
│   ├── shared/              # Componentes compartidos
│   │   └── components/
│   │       ├── Header_Footer/    # Navegación y pie de página
│   │       ├── Catalogo/        # Componentes del catálogo
│   │       ├── Perfil/          # Gestión de perfiles
│   │       ├── Home/            # Componentes de inicio
│   │       └── Informacion/     # Componentes informativos
│   ├── vistas/              # Páginas principales
│   │   ├── home/
│   │   ├── catalogo/
│   │   ├── perfil/
│   │   ├── especificaciones/
│   │   ├── contacto/
│   │   └── nosotros/
│   ├── app.routes.ts        # Configuración de rutas
│   └── app.component.ts     # Componente raíz
└── assets/                  # Recursos estáticos
    └── img/                 # Imágenes de vehículos y UI
```

### 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 19.2.0 | Framework principal |
| **TypeScript** | 5.7.2 | Lenguaje de programación |
| **Bootstrap** | 5.3.6 | Framework CSS |
| **Angular Material** | 19.2.15 | Componentes UI |
| **PrimeNG** | 19.1.3 | Componentes UI adicionales |
| **RxJS** | 7.8.0 | Programación reactiva |

## 📋 Funcionalidades Detalladas

### 🔐 Sistema de Autenticación

- **Registro de usuarios**: Formulario completo con validaciones
- **Inicio de sesión**: Autenticación con JWT tokens
- **Roles de usuario**: ADMIN y CLIENTE con permisos diferenciados
- **Gestión de perfil**: Edición de datos personales y cambio de contraseña

### 🚗 Gestión de Vehículos

#### Tipos de Vehículos Soportados:
- **Coches**: Sedanes, SUV, deportivos
- **Motos**: Deportivas, cruiser, touring
- **Furgonetas**: Carga, pasajeros, mixtas

#### Especificaciones Técnicas:
- Transmisión (Manual/Automática)
- Tipo de combustible (Gasolina, Diésel, Eléctrico, Híbrido)
- Número de puertas y asientos
- Kilometraje y autonomía
- Aire acondicionado
- Etiqueta ambiental (ECO, C, B, CERO)
- Color y ubicación

### 🎯 Sistema de Filtrado Avanzado

- **Por tipo**: Coche, Moto, Furgoneta
- **Por ubicación**: Todas las provincias españolas
- **Por especificaciones**: Combustible, transmisión, etiqueta ambiental
- **Por capacidad**: Número de plazas

### 📅 Sistema de Reservas

- **Formulario completo**: Datos personales y fechas
- **Cálculo automático**: Precio total basado en días de alquiler
- **Validaciones**: Campos obligatorios y formatos correctos
- **Confirmación**: Proceso de reserva con feedback al usuario

### 👑 Panel de Administración

- **Gestión de vehículos**: Crear, editar y eliminar vehículos
- **Tipos de vehículos**: Administrar marcas, modelos y precios
- **Dashboard**: Vista general del inventario

## 🔌 Configuración de API

### Endpoints Principales

```typescript
Base URL: http://localhost:8080

// Autenticación
POST /auth/login              # Iniciar sesión
POST /usuarios               # Registro de usuarios

// Vehículos
GET /vehiculos               # Listar todos los vehículos
GET /vehiculos/{matricula}   # Obtener vehículo específico
POST /vehiculos              # Crear vehículo (Admin)
PUT /vehiculos/{matricula}   # Actualizar vehículo (Admin)
DELETE /vehiculos/{matricula} # Eliminar vehículo (Admin)

// Tipos de Vehículos
GET /tipos-vehiculo          # Listar tipos
POST /tipos-vehiculo         # Crear tipo (Admin)
PUT /tipos-vehiculo/{id}     # Actualizar tipo (Admin)

// Reservas
GET /reservas                # Listar reservas
POST /reservas               # Crear reserva
```

## 🎨 Diseño y UX

### Características de Diseño:
- **Material Design**: Siguiendo las pautas de Google Material
- **Bootstrap Grid**: Sistema de rejilla responsive
- **Tipografía moderna**: Fuentes legibles y jerárquicas
- **Paleta de colores**: Esquema profesional con acentos morados
- **Iconografía**: Bootstrap Icons y Material Icons

### Responsive Design:
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Tablet (768px) y Desktop (1024px+)
- **Touch-friendly**: Botones y controles optimizados para táctil

## 🧪 Testing

### Comandos de Testing

```bash
# Ejecutar tests unitarios
ng test

# Ejecutar tests con coverage
ng test --code-coverage

# Ejecutar tests en modo watch
ng test --watch

# Ejecutar tests e2e
ng e2e
```

## 🚀 Deployment

### Build de Producción

```bash
# Build optimizado para producción
ng build --prod

# Build con análisis de bundle
ng build --prod --stats-json
```

### Variables de Entorno

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com'
};
```

## 🐛 Problemas Conocidos y TODOs

### Issues Identificados:

1. **Componentes Incompletos**: Algunos componentes tienen implementaciones marcadas con `/*...*/`
2. **Validación de Formularios**: Necesita mejoras en el manejo de errores
3. **Gestión de Estados**: Implementar estado global con NgRx
4. **Testing Coverage**: Ampliar cobertura de tests unitarios
5. **Optimización**: Implementar lazy loading para módulos

### Próximas Mejoras:

- [ ] Implementar sistema de reseñas completo
- [ ] Añadir notificaciones en tiempo real
- [ ] Integrar pasarela de pagos
- [ ] Mejorar SEO y meta tags
- [ ] Implementar PWA capabilities
- [ ] Añadir internacionalización (i18n)

## 📚 Guía de Desarrollo

### Estructura de Componentes

```typescript
// Ejemplo de componente típico
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent implements OnInit {
  // Propiedades, servicios e implementación
}
```

### Convenciones de Código:

- **PascalCase**: Para clases y interfaces
- **camelCase**: Para propiedades y métodos
- **kebab-case**: Para selectores y archivos
- **UPPER_CASE**: Para constantes y enums

### Git Workflow:

```bash
# Feature branch
git checkout -b feature/nueva-funcionalidad

# Commits descriptivos
git commit -m "feat: añadir sistema de reservas"

# Pull request
git push origin feature/nueva-funcionalidad
```

## 🤝 Contribución

### Pasos para Contribuir:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Código de Conducta:

- Seguir las convenciones de código del proyecto
- Escribir tests para nuevas funcionalidades
- Documentar cambios significativos
- Respetar la arquitectura existente

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte y Contacto

Para soporte técnico o consultas sobre el proyecto:

- **Email**: support@karhub.com
- **Issues**: [GitHub Issues](https://github.com/tu-repo/issues)
- **Documentación**: [Wiki del Proyecto](https://github.com/tu-repo/wiki)

---

**Desarrollado con ❤️ por el equipo de KARHUB**

*Última actualización: Junio 2025*
