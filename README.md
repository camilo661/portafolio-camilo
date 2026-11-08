# Portafolio · Camilo Andrés Castro Acosta

Portafolio personal presentado como un **iPhone 17 Pro Max desensamblado**: cada pieza del teléfono (pantalla, procesador, RAM, memoria, batería, cámaras…) abre una sección distinta del perfil.

**Stack:** HTML · Tailwind CSS v4 · NestJS 12 (TypeScript)

## Estructura

```
src/
├── main.ts                      # Arranque del servidor NestJS
├── app.module.ts                # Sirve el frontend (ServeStaticModule) + módulo del portafolio
├── portfolio/
│   ├── portfolio.data.ts        # ← TODO el contenido del portafolio (textos, proyectos, enlaces)
│   ├── portfolio.types.ts       # Tipos del contenido
│   ├── portfolio.service.ts
│   ├── portfolio.controller.ts  # GET /api/portfolio
│   └── portfolio.module.ts
└── styles/
    └── tailwind.css             # Tailwind: tokens del diseño, tema claro/oscuro y componentes
public/
├── index.html                   # Estructura de la página (utilidades de Tailwind)
├── js/app.js                    # Escena 3D, zoom por pieza, reloj, tema, navegación
├── css/styles.css               # Generado por Tailwind (no se edita a mano)
└── assets/                      # Imágenes, foto de perfil, CV
```

## Comandos

```bash
npm install          # instalar dependencias
npm run start:dev    # desarrollo: compila Tailwind y levanta NestJS con recarga
npm run watch:css    # (en otra terminal) recompila Tailwind al guardar
npm run build        # compilación de producción (Tailwind + NestJS)
npm start            # servidor de producción → http://localhost:3000
```

## API

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/portfolio` | Portafolio completo: propietario + 10 secciones |
| GET | `/api/portfolio/sections/:key` | Una sección (`inicio`, `sobre-mi`, `habilidades`, `proyectos`, `formacion`, `experiencia`, `testimonios`, `mas-de-mi`, `certificados`, `contacto`) |

## Agregar contenido

1. Edita `src/portfolio/portfolio.data.ts`.
2. Coloca imágenes y archivos en `public/assets/`.
3. Lo que quede en `null` o `[]` aparece en el sitio como **Por completar**.

La guía [GUIA-DE-CONTENIDO.md](GUIA-DE-CONTENIDO.md) lista todos los datos que hay que reunir.

## Despliegue en Vercel

Vercel detecta NestJS automáticamente (`src/main.ts`) y ejecuta `npm run build`, que compila Tailwind y NestJS. Basta con importar el repositorio en Vercel.
