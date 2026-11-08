/* ==========================================================================
   CONTENIDO DEL PORTAFOLIO — Camilo Andrés Castro Acosta
   --------------------------------------------------------------------------
   Todo el texto vive aquí. Lo que esté en null o en [] aparece en el sitio
   como "pendiente". Consulta GUIA-DE-CONTENIDO.md para saber qué reunir.
   Cada sección está asociada a una pieza del iPhone (campos `hs` y `part`).
   ========================================================================== */

window.PORTFOLIO = {
  owner: {
    name: 'Camilo Andrés Castro Acosta',
    short: 'Camilo Castro',
    first: 'Camilo',
    monogram: 'CC',
    location: 'Pasto, Nariño, Colombia',
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
        photo: null,          // ej. 'assets/camilo.jpg'  (vertical 4:5, mínimo 800 × 1000 px)
        stats: [              // cifras destacadas
          { value: null, label: 'Semestre' },
          { value: null, label: 'Lenguajes' },
          { value: null, label: 'Inglés' },
        ],
      },
    },

    /* 02 ─ CHIP A19 PRO → SOBRE MÍ */
    {
      hs: 'cpu', part: 'Procesador', key: 'sobre-mi', type: 'about', accent: 'teal',
      eyebrow: 'Sobre mí', title: 'Más que código',
      data: {
        headline: null,       // frase corta, ej. 'Más que código, ideas que conectan.'
        paragraphs: [],       // 2 párrafos: formación + qué programas / qué has construido
        focus: [],            // 3 áreas, ej. ['Desarrollo de software', 'Arquitectura', 'IA aplicada']
      },
    },

    /* 03 ─ RAM → HABILIDADES TÉCNICAS */
    {
      hs: 'ram', part: 'RAM', key: 'habilidades', type: 'skills', accent: 'steel',
      eyebrow: 'Habilidades técnicas', title: 'Stack en memoria',
      data: {
        intro: 'Tecnologías y herramientas con las que he trabajado.',
        groups: [
          { name: 'Lenguajes de programación', items: [] },
          { name: 'Frontend', items: [] },
          { name: 'Backend', items: [] },
          { name: 'Despliegue y control de versiones', items: [] },
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
        intro: null,          // 1 línea sobre qué reflejan tus proyectos
        githubAll: null,      // ej. 'https://github.com/camilo661?tab=repositories'
        emptySlots: 2,
        items: [
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
              { label: 'Jugar demo', href: 'https://race-rober-game.vercel.app/', primary: true },
              { label: 'Ver repositorio', href: 'https://github.com/Andres-Maya/RaceRoberGame' },
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
        languages: [{ name: 'Español', level: 'Nativo' }, { name: 'Inglés', level: null }],
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
        github: null,         // ej. 'https://github.com/camilo661'
        instagram: null,
      },
    },
  ],
};
