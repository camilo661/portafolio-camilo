# Guía de contenido: CC-17 Pro Max

Todo lo que hay que reunir para llenar el portafolio. Sigue la misma estructura del portafolio de referencia (inicio, sobre mí, habilidades, proyectos, testimonios, trayectoria académica y laboral, más de mí y contacto), organizada por pieza del iPhone.

**Cómo usarla:** copia el bloque de una sección, llena lo que tengas y pégalo en el chat. Lo que dejes en blanco sigue apareciendo como "Por completar" dentro de su panel. El medidor **Contenido X/10** de la cabecera se llena a medida que se completa cada sección.

---

## ✅ Ya cargado
- Nombre: **Camilo Andrés Castro Acosta**
- Ubicación: **Pasto, Nariño, Colombia**
- Frase titular: **Software, telefonía e innovación**
- Presentación: **Estudiante de Ingeniería de Software y técnico en telefonía móvil, con más de 7 años de experiencia en microsoldadura y software.**
- Proyecto **Turbo Ratas** (texto, tecnologías, 5 capturas, demo y repositorio)
- Idioma: Español (nativo)

---

## 01 · Inicio (Pantalla)
```
Frase titular (3 a 5 palabras):      ej. "Software, diseño y creatividad."
Presentación corta (1 o 2 líneas):   qué estudias / a qué te dedicas y qué te interesa crear
Cifra 1 · Semestre:                  ej. 5°
Cifra 2 · Lenguajes:                 cuántos lenguajes de programación manejas
Cifra 3 · Inglés:                    nivel, ej. B1
Foto de perfil:                      (adjuntar) vertical 4:5 o cuadrada, mínimo 800 × 1000 px, buena luz y fondo limpio
                                     — es la imagen principal del panel de Inicio, junto a tu nombre
Hoja de vida:                        (adjuntar) PDF
```

## 02 · Sobre mí (Chip A19 Pro)
```
Frase corta:            ej. "Más que código, ideas que conectan."
Párrafo 1:              tu formación: carrera, semestre, universidad y qué te interesa del ciclo de un producto
Párrafo 2:              en qué programas y qué has construido (apps, APIs, videojuegos, etc.)
3 áreas de enfoque:     ej. Desarrollo de software · Arquitectura y patrones · IA aplicada
```

## 03 · Habilidades técnicas (RAM 12 GB)
Solo lo que de verdad hayas usado, de 3 a 5 por categoría.
```
Lenguajes de programación:
Frontend:
Backend:
Despliegue y control de versiones:
Bases de datos:
IA y asistentes:
```

## 04 · Proyectos (Almacenamiento NAND)
Ya está Turbo Ratas. Hay 2 ranuras libres y se pueden agregar más.
```
Frase introductoria de proyectos:
Enlace a todos tus repositorios:     ej. https://github.com/usuario?tab=repositories

— Proyecto (repetir por cada uno) —
Nombre:
Categoría corta:        ej. App móvil + IA, Arquitectura de software
Descripción:            2 a 4 líneas: qué es, qué resuelve, qué hiciste tú
Tecnologías:
Link demo:              (si existe)
Link repositorio:
Segundo repositorio:    (opcional, ej. versión web o mockup)
Capturas:               1 a 5 imágenes horizontales, ideal 1350 × 600 px
```

## 05 · Experiencia académica (Chasis)
```
— Pregrado —
Periodo:                ej. Actualidad
Tipo:                   ej. Pregrado · 5° semestre
Programa:
Universidad:
Campus / ciudad:

— Curso o certificado académico (repetir) —
Año · tipo:             ej. 2026 · Curso
Nombre:
Entidad:
Certificado:            (adjuntar imagen o PDF, o enlace)
```

## 06 · Experiencia laboral (Batería)
Trabajos, colaboraciones, proyectos personales o académicos. Del más reciente al más antiguo.
```
— Experiencia (repetir) —
Fechas:                 ej. Sep – Oct 2026
Nombre:
Rol:                    ej. Desarrollador backend, Autor y desarrollador
Tipo:                   Proyecto en equipo / personal / académico / trabajo
Descripción:            2 a 3 líneas: qué hiciste y qué aportaste
Tecnologías:
Enlaces:                repositorio, documentación, demo
```

## 07 · Testimonios (Taptic Engine)
Pide de 3 a 9 recomendaciones a profesores, compañeros, jefes o conocidos. **Pide permiso** para publicar su nombre.
```
— Testimonio (repetir) —
Nombre completo:
Profesión o cargo:      ej. Ingeniero de Sistemas
Testimonio:             3 a 6 líneas
Calificación:           de 1 a 5 (puede ser 4,5)
Año:
LinkedIn:               (opcional)
```

## 08 · Más de mí (Cámaras)
```
Frase introductoria:    ej. "Mis pasatiempos combinan…"

Pasión principal (ej. música):
  Texto:
  Habilidades / instrumentos:
  Grupos o proyectos:     nombre · rol · género o descripción · Instagram
  Reconocimiento:         año · nombre · entidad · diploma (adjuntar)

Arte, escritura o dibujo:
  Texto:
  Enlace a tu perfil:

Deportes:               qué practicas
Mascotas:               texto + foto opcional
Lectura:
  Texto:
  3 libros favoritos:     título · autor
```

## 09 · Aprendizaje continuo (Cámara de vapor)
```
Idiomas:                Español (nativo) · Inglés (nivel)  · otros
Otras experiencias:     monitorías, publicidad audiovisual, moderación, voluntariado
                        → año · título · entidad · tipo
Certificados adicionales:
                        → año · nombre · entidad · archivo (imagen o PDF)
```

## 10 · Contacto (Módem 5G + N1)
```
Frase de contacto:      ej. "Estoy abierto a conversar sobre software, proyectos creativos y nuevas oportunidades."
Correo:
LinkedIn:
GitHub:
Instagram:              (opcional)
```

---

### Consejos
- **Imágenes:** horizontales para proyectos; cuadrada para la foto de perfil. Revisa que no muestren datos personales.
- **Textos:** en primera persona, con frases cortas. Es mejor poco y concreto.
- **Enlaces:** verifica que los repositorios sean **públicos** antes de enviarlos.
- **Opcional:** el portafolio de referencia tiene versión en inglés (botón ES/EN). Si la quieres, al final se traduce todo el contenido.
- Los archivos (fotos, PDF, capturas) van en la carpeta `public/assets/`; el texto va en `src/portfolio/portfolio.data.ts` y lo entrega la API de NestJS (`GET /api/portfolio`).
