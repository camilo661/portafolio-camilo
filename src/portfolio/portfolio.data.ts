/* ==========================================================================
   CONTENIDO DEL PORTAFOLIO — Camilo Andrés Castro Acosta
   --------------------------------------------------------------------------
   Todo el texto vive aquí y lo entrega la API en GET /api/portfolio.
   Lo que esté en null o en [] aparece en el sitio como "Por completar".
   Consulta GUIA-DE-CONTENIDO.md para saber qué reunir.
   ========================================================================== */

import type { Portfolio } from './portfolio.types.js';

export const PORTFOLIO: Portfolio = {
  owner: {
    name: 'Camilo Andrés Castro Acosta',
    short: 'Camilo Castro',
    first: 'Camilo',
    monogram: 'CC',
    location: 'Pasto, Nariño, Colombia',
    role: 'Desarrollador Full Stack',
    avatar: 'assets/camilo/camilo-avatar.jpg',
  },

  sections: [
    /* 01 ─ PANTALLA → INICIO */
    {
      hs: 'display', part: 'Pantalla', key: 'inicio', type: 'hero', accent: 'teal',
      eyebrow: 'Inicio', title: 'Hola, soy Camilo',
      data: {
        tagline: 'Software, telefonía e innovación',
        intro: 'Estudiante de Ingeniería de Software y técnico en telefonía móvil, con más de 7 años de experiencia en microsoldadura y software.',
        cv: null,             // ej. 'assets/CamiloCastroCV.pdf'
        photo: 'assets/camilo/camilo-hoja-de-vida.jpg',
        photoFull: 'assets/camilo/camilo-completa.jpg',
        stats: [              // cifras destacadas
          { value: null, label: 'Semestre' },
          { value: '6', label: 'Lenguajes' },
          { value: 'Nivel 5', label: 'Inglés' },
        ],
      },
    },

    /* 02 ─ CHIP A19 PRO → SOBRE MÍ */
    {
      hs: 'cpu', part: 'Procesador', key: 'sobre-mi', type: 'about', accent: 'teal',
      eyebrow: 'Sobre mí', title: 'Más que código',
      data: {
        headline: 'Del cautín al código: entiendo la tecnología por dentro y por fuera.',
        paragraphs: [
          'Soy estudiante de Ingeniería de Software en Pasto, Nariño, y técnico en telefonía móvil. Durante más de siete años he reparado teléfonos a nivel de placa con microsoldadura, y ese trabajo me enseñó a diagnosticar con paciencia y a no dejar un detalle sin revisar.',
          'Hoy llevo esa misma precisión al software. Construyo aplicaciones para macOS, Android y Wear OS, sistemas web con Java, Spring Boot, NestJS y React, y proyectos que usan inteligencia artificial para resolver problemas reales: traducir una llamada, controlar el televisor con la voz o navegar sin tocar el teclado.',
        ],
        focus: ['Desarrollo Full Stack', 'Apps móviles con IA', 'Patrones de diseño'],
      },
    },

    /* 03 ─ RAM → HABILIDADES TÉCNICAS */
    {
      hs: 'ram', part: 'RAM', key: 'habilidades', type: 'skills', accent: 'steel',
      eyebrow: 'Habilidades técnicas', title: 'Stack en memoria',
      data: {
        intro: 'Desarrollador Full Stack: tecnologías y herramientas con las que he trabajado.',
        groups: [
          {
            name: 'Lenguajes de programación',
            items: [
              { name: 'Java', icon: 'assets/icons/java.svg' },
              { name: 'Kotlin', icon: 'assets/icons/kotlin.svg' },
              { name: 'JavaScript', icon: 'assets/icons/javascript.svg' },
              { name: 'TypeScript', icon: 'assets/icons/typescript.svg' },
              { name: 'Python', icon: 'assets/icons/python.svg' },
              { name: 'Swift', icon: 'assets/icons/swift.svg' },
            ],
          },
          { name: 'Frontend', items: [{ name: 'HTML5', icon: 'assets/icons/html5.svg' }, { name: 'CSS3', icon: 'assets/icons/css3.svg' }, { name: 'Tailwind CSS', icon: 'assets/icons/tailwindcss.svg' }] },
          { name: 'Backend', items: [{ name: 'Node.js', icon: 'assets/icons/nodejs.svg' }, { name: 'NestJS', icon: 'assets/icons/nestjs.svg' }] },
          {
            name: 'Despliegue y control de versiones',
            items: [{ name: 'Git', icon: 'assets/icons/git.svg' }, { name: 'GitHub', icon: 'assets/icons/github.svg', mono: true }, { name: 'Docker', icon: 'assets/icons/docker.svg' }],
          },
          { name: 'Bases de datos', items: [] },
          { name: 'IA y asistentes', items: [] },
        ],
      },
    },

    /* 04 ─ NAND → PROYECTOS */
    {
      hs: 'nand', part: 'Memoria', key: 'proyectos', type: 'projects', accent: 'sand',
      eyebrow: 'Trabajo seleccionado', title: 'Proyectos destacados',
      data: {
        intro: 'Ideas que empezaron como una pregunta y terminaron funcionando: apps con inteligencia artificial, sistemas web y patrones de diseño puestos en práctica.',
        githubAll: 'https://github.com/camilo661?tab=repositories',
        items: [
          {
            kicker: 'App de macOS + IA',
            title: 'Conclave',
            description:
              'Navegador web privado para macOS con búsqueda y órdenes por voz. Al abrirse empieza a escuchar: distingue una búsqueda («el clima en Bogotá») de una orden («cambia el tema a blanco») y la ejecuta. Bloquea rastreadores y anuncios, abre pestañas privadas y muestra los resultados en su propia página. Usa la IA de Apple dentro del Mac, sin servicios de pago ni en la nube.',
            tech: ['Swift', 'SwiftUI', 'WebKit', 'Speech', 'Apple Intelligence'],
            images: [
              { src: 'assets/conclave/conclave-oscuro.jpg', alt: 'Página de inicio de Conclave en tema negro, con la búsqueda por voz y las búsquedas recientes' },
              { src: 'assets/conclave/conclave-claro-historial.jpg', alt: 'Conclave en tema blanco con el panel de historial agrupado por día' },
            ],
            links: [
              { label: 'Descargar para macOS', href: 'downloads/Conclave-1.0.0.dmg', kind: 'download', primary: true },
              { label: 'Ver en GitHub', href: 'https://github.com/camilo661/conclave', kind: 'github' },
            ],
          },
          {
            kicker: 'App de Wear OS + IA',
            title: 'TuControl',
            description:
              'Control remoto universal por voz para relojes Wear OS. Le hablas al reloj («sube el volumen 5», «abre Netflix», «apaga la tele») y controla el televisor por Wi‑Fi. Encuentra solo los televisores de la red y funciona con Samsung, LG, Sony, Roku y Android TV. Las órdenes simples se entienden sin internet y las frases libres las interpreta una IA.',
            tech: ['Kotlin', 'Compose for Wear OS', 'WebSocket', 'SSDP / mDNS', 'Claude API'],
            images: [],
            links: [
            ],
          },
          {
            kicker: 'App Android + IA',
            title: 'Traduya',
            description:
              'Traductor de llamadas en tiempo real para Android. Llamas o contestas como siempre y en pantalla ves, en español y palabra a palabra, lo que dice la otra persona en inglés o chino. Quien te llama puede hacerlo desde el navegador con un enlace o un código QR, sin instalar nada. La voz se reconoce y se traduce dentro del teléfono, y cada llamada queda grabada con su traducción.',
            tech: ['Kotlin', 'Jetpack Compose', 'Vosk', 'ML Kit', 'WebRTC', 'Firebase'],
            images: [],
            links: [
              { label: 'Descargar APK', href: 'https://github.com/camilo661/Traduya/releases/download/v1.9.0/Traduya-1.9.0.apk', kind: 'download', primary: true },
              { label: 'Ver en GitHub', href: 'https://github.com/camilo661/Traduya', kind: 'github' },
            ],
          },
          {
            kicker: 'Videojuego web + IA',
            title: 'Turbo Ratas',
            description: 'Videojuego 2D de persecuciones en vista cenital al estilo GTA 1. Una banda de ladrones roba el Banco Central de Ciudad Cobalto y huye de la policía, una banda rival y mutantes. Una IA ajusta cada nivel a tu forma de conducir. Se juega en PC o móvil, solo o con un amigo en línea.',
            tech: ['TypeScript', 'Three.js', 'Rapier', 'Vite', 'WebRTC'],
            images: [
              { src: 'assets/turbo-ratas/TurboRatasGame1.png', alt: 'Vista cenital de Turbo Ratas: el auto de los ladrones huye entre edificios en la Zona 2, Tierra Baldía' },
              { src: 'assets/turbo-ratas/TurboRatasGame2.png', alt: 'Captura 2 de Turbo Ratas' },
              { src: 'assets/turbo-ratas/TurboRatasGame3.png', alt: 'Captura 3 de Turbo Ratas' },
              { src: 'assets/turbo-ratas/TurboRatasGame4.png', alt: 'Captura 4 de Turbo Ratas' },
              { src: 'assets/turbo-ratas/TurboRatasGame5.png', alt: 'Captura 5 de Turbo Ratas' },
            ],
            links: [
              { label: 'Jugar demo', href: 'https://race-rober-game.vercel.app/', kind: 'demo', primary: true },
              { label: 'Ver en GitHub', href: 'https://github.com/Andres-Maya/RaceRoberGame', kind: 'github' },
            ],
          },
        ],
        others: [
            {
              kicker: 'Web · React',
              title: 'Seat Deck',
              description:
                'Compra y venta de puestos de avión con tres cabinas (Ejecutiva, Premium y Económica), selección mínima de cuatro asientos, valor total en tiempo real y un selector de fuselaje animado para moverse entre cabinas.',
              tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
              images: [
                { src: 'assets/proyectos/seat-deck.jpg', alt: 'Seat Deck: selección de asientos de la cabina ejecutiva' },
              ],
              links: [
                { label: 'Ver demo', href: 'https://flight-seats-2.vercel.app', kind: 'demo', primary: true },
                { label: 'GitHub', href: 'https://github.com/camilo661/flight-seats-2', kind: 'github' },
              ],
            },
            {
              kicker: 'Full stack · patrón Proxy',
              title: 'NeuralProxy',
              description:
                'Plataforma de chat con IA que controla el uso con una cadena de proxies: límite de peticiones por minuto y cuota de tokens según el plan del usuario. Muestra la cuota en tiempo real y el uso de los últimos siete días.',
              tech: ['Java', 'Spring Boot', 'React', 'Vite'],
              images: [
                { src: 'assets/proyectos/neural-proxy.jpg', alt: 'NeuralProxy: chat con IA, cuota en tiempo real y cadena de proxies activa' },
              ],
              links: [
                { label: 'Ver demo', href: 'https://ai-proxy-frontend-mu.vercel.app', kind: 'demo', primary: true },
                { label: 'Backend', href: 'https://github.com/camilo661/17-04-2026', kind: 'github' },
                { label: 'Frontend', href: 'https://github.com/camilo661/17-04-2026FRONT', kind: 'github' },
              ],
            },
            {
              kicker: 'Full stack · patrón Facade',
              title: 'Sistema de gestión médica',
              description:
                'Gestión de pacientes, citas, historia clínica, laboratorio y prescripciones, con registro e inicio de sesión.',
              tech: ['Java', 'Spring Boot', 'React'],
              images: [],
              links: [
                { label: 'Backend', href: 'https://github.com/camilo661/backensistemamedico', kind: 'github' },
                { label: 'Frontend', href: 'https://github.com/camilo661/frontsistemamedico', kind: 'github' },
              ],
            },
            {
              kicker: 'Backend · TypeScript',
              title: 'CastroReproductor',
              description:
                'Sistema de reproductor de música que busca canciones y lanzamientos en Spotify y YouTube, los une en un solo catálogo y notifica los nuevos lanzamientos.',
              tech: ['TypeScript', 'Node.js', 'Spotify API', 'YouTube API'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/CASTROREPRODUCTOR-', kind: 'github' },
              ],
            },
            {
              kicker: 'Python · Streamlit',
              title: 'GitCamiloHub',
              description:
                'Panel que simula una plataforma de integración y despliegue continuo: pipelines, agentes, trabajos, despliegues, registros y métricas.',
              tech: ['Python', 'Streamlit'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/gitcamilohub', kind: 'github' },
              ],
            },
            {
              kicker: 'Python · Flask',
              title: 'TaxisDrive',
              description:
                'Gestión de una flota de taxis y sus pedidos sobre listas doblemente enlazadas, con API REST y una interfaz web.',
              tech: ['Python', 'Flask', 'JavaScript'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/09-04-2026', kind: 'github' },
              ],
            },
            {
              kicker: 'Python · escritorio',
              title: 'CASTRO Watch',
              description:
                'Reloj de escritorio orientado a objetos, con temas, calendario y panel de configuración.',
              tech: ['Python'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/RELOJ-TALLER-', kind: 'github' },
              ],
            },
            {
              kicker: 'Python · Tkinter',
              title: 'Simulador de ventas de planes móviles',
              description:
                'Simulación de ventas de recargas y planes móviles en Colombia, hecha en Python puro con interfaz gráfica.',
              tech: ['Python', 'Tkinter'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/TRABAJO14-05-2026', kind: 'github' },
              ],
            },
            {
              kicker: 'TypeScript',
              title: 'CamiloSistem',
              description:
                'Flujo de pedidos con cotización, factura y remisión, historial de cambios y roles de usuario.',
              tech: ['TypeScript', 'HTML'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/12-03-2026', kind: 'github' },
              ],
            },
            {
              kicker: 'Java · patrón Decorator',
              title: 'Torre de Camilo',
              description:
                'Juego de defensa por oleadas en el que la torre se mejora con decoradores; servidor HTTP en Java y cliente web.',
              tech: ['Java', 'HTML'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/20-03-2026', kind: 'github' },
              ],
            },
            {
              kicker: 'Java · Spring Boot',
              title: 'API de biblioteca',
              description:
                'API REST para administrar libros, usuarios y préstamos.',
              tech: ['Java', 'Spring Boot'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/tallerdise-odesoft', kind: 'github' },
              ],
            },
            {
              kicker: 'Java · patrón Adapter',
              title: 'Convertidor de documentos',
              description:
                'Convierte documentos de texto a CSV, JSON, XML y Markdown, con historial de conversiones e interfaz gráfica.',
              tech: ['Java'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/13-03-2026-1', kind: 'github' },
              ],
            },
            {
              kicker: 'Java · Factory y Strategy',
              title: 'Procesador de documentos por país',
              description:
                'Valida y procesa documentos de Colombia, México, Argentina y Chile con fábricas, estrategias de validación y eventos.',
              tech: ['Java'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/06-03-2026', kind: 'github' },
              ],
            },
            {
              kicker: 'Java · patrón State',
              title: 'Venta de planes móviles por estados',
              description:
                'Flujo de venta de planes móviles que pasa por los estados pendiente, validación, pago, activo y cancelado.',
              tech: ['Java', 'HTML'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/patronstate', kind: 'github' },
              ],
            },
            {
              kicker: 'Java · Abstract Factory',
              title: 'Planes de operadores móviles',
              description:
                'Planes básicos y premium de Claro, Movistar y Tigo creados con fábricas abstractas.',
              tech: ['Java'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/27-02-2026', kind: 'github' },
              ],
            },
            {
              kicker: 'Java · polimorfismo',
              title: 'Sistema de notificaciones universitarias',
              description:
                'Avisos de inscripción, calificaciones, pagos y cancelaciones enviados por correo, SMS o app.',
              tech: ['Java'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/Polimorfismo-', kind: 'github' },
              ],
            },
            {
              kicker: 'Python · estructuras de datos',
              title: 'Organizador con lista enlazada',
              description:
                'Organizador con interfaz gráfica construido sobre una lista enlazada propia.',
              tech: ['Python'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/19-03-2026', kind: 'github' },
              ],
            },
            {
              kicker: 'Python · estructuras de datos',
              title: 'Simulador de pila, cola y arreglo circular',
              description:
                'Simulador visual de las estructuras pila, cola y arreglo circular.',
              tech: ['Python'],
              images: [],
              links: [
                { label: 'GitHub', href: 'https://github.com/camilo661/05-03-2026', kind: 'github' },
              ],
            },
        ],
      },
    },

    /* 05 ─ CHASIS → TRAYECTORIA ACADÉMICA */
    {
      hs: 'frame', part: 'Chasis', key: 'formacion', type: 'timeline', accent: 'steel',
      eyebrow: 'Trayectoria', title: 'Experiencia académica',
      data: {
        intro: 'La estructura que lo sostiene todo: mi formación.',
        items: [],            // { period, kind, title, org, place, link }
      },
    },

    /* 06 ─ BATERÍA → EXPERIENCIA LABORAL */
    {
      hs: 'battery', part: 'Batería', key: 'experiencia', type: 'work', accent: 'sand',
      eyebrow: 'Trayectoria', title: 'Experiencia laboral',
      data: {
        intro: 'La energía acumulada: trabajos, colaboraciones y proyectos.',
        githubAll: null,
        items: [],            // { date, title, role, kind, description, tech: [], links: [{label, href}] }
      },
    },

    /* 07 ─ TAPTIC ENGINE → TESTIMONIOS */
    {
      hs: 'taptic', part: 'Altavoces', key: 'testimonios', type: 'testimonials', accent: 'teal',
      eyebrow: 'Testimonios', title: 'Lo que dicen de mi trabajo',
      data: {
        items: [],            // { name, role, link, text, rating (0–5), year }
      },
    },

    /* 08 ─ CÁMARAS → MÁS DE MÍ */
    {
      hs: 'camera', part: 'Cámaras', key: 'mas-de-mi', type: 'more', accent: 'sand',
      eyebrow: 'Más allá del código', title: 'Más de mí',
      data: {
        intro: null,          // 1 línea sobre tus pasatiempos
        blocks: [
          { title: 'Música / pasión principal', text: null, tags: [], groups: [] },  // groups: { name, role, genre, link }
          { title: 'Arte, escritura o dibujo', text: null, link: null },
          { title: 'Deportes', text: null },
          { title: 'Mascotas', text: null },
          { title: 'Lectura', text: null, books: [] },  // books: { title, author }
        ],
      },
    },

    /* 09 ─ CÁMARA DE VAPOR → IDIOMAS, OTRAS EXPERIENCIAS Y CERTIFICADOS */
    {
      hs: 'vapor', part: 'Refrigeración', key: 'certificados', type: 'learning', accent: 'steel',
      eyebrow: 'Aprendizaje continuo', title: 'Idiomas y certificados',
      data: {
        languages: [
          { name: 'Español', level: 'Nativo', detail: 'Lengua materna' },
          { name: 'Inglés', level: 'Intermedio', detail: 'Nivel 5' },
        ],
        experiences: [],      // comunicación / monitorías / audiovisual: { year, title, org, kind }
        certificates: [],     // { year, title, org, link }
      },
    },

    /* 10 ─ MÓDEM 5G + N1 → CONTACTO */
    {
      hs: 'modem', part: 'Antenas', key: 'contacto', type: 'contact', accent: 'teal',
      eyebrow: 'Contacto', title: '¿Creamos algo juntos?',
      data: {
        text: null,           // 1 línea: sobre qué estás abierto a conversar
        email: null,
        linkedin: null,
        github: 'https://github.com/camilo661',
        instagram: null,
      },
    },
  ],
};
