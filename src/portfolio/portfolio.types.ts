/* Tipos del contenido del portafolio.
   Cada sección está asociada a una pieza del iPhone (campos `hs` y `part`). */

export type Accent = 'teal' | 'steel' | 'sand';
export type Hotspot = 'display' | 'cpu' | 'ram' | 'nand' | 'frame' | 'battery' | 'taptic' | 'camera' | 'vapor' | 'modem';
export type Maybe<T> = T | null;

export interface Owner {
  name: string;
  short: string;
  first: string;
  monogram: string;
  location: string;
  /** Rol profesional, ej. 'Desarrollador Full Stack' */
  role: Maybe<string>;
  /** Foto pequeña y cuadrada para la cabecera */
  avatar: Maybe<string>;
}

export type LinkKind = 'demo' | 'github' | 'download';
export interface Link {
  label: string;
  href: string;
  primary?: boolean;
  /** Tipo de enlace: define el ícono del botón */
  kind?: LinkKind;
}
export interface Image { src: string; alt: string }

export interface HeroData {
  tagline: Maybe<string>;
  intro: Maybe<string>;
  cv: Maybe<string>;
  /** Foto estilo hoja de vida (panel de Inicio) */
  photo: Maybe<string>;
  /** Foto de cuerpo completo (portada) */
  photoFull: Maybe<string>;
  stats: { value: Maybe<string>; label: string }[];
}
export interface AboutData { headline: Maybe<string>; paragraphs: string[]; focus: string[] }
export interface SkillItem {
  name: string;
  /** Ruta del ícono SVG en public/ */
  icon?: string;
  /** Ícono monocromo: se invierte en el tema oscuro */
  mono?: boolean;
}
export interface SkillsData { intro: string; groups: { name: string; items: (string | SkillItem)[] }[] }
export interface Project {
  kicker: string;
  title: string;
  description: string;
  tech: string[];
  images: Image[];
  links: Link[];
}
export interface ProjectsData {
  intro: Maybe<string>;
  githubAll: Maybe<string>;
  /** Proyectos principales: galería de capturas (o espacio reservado si aún no hay) */
  items: Project[];
  /** Otros proyectos públicos: tarjeta compacta; imagen solo si están desplegados */
  others: Project[];
}
export interface TimelineData {
  intro: string;
  items: { period: string; kind: string; title: string; org: string; place?: string; link?: string }[];
}
export interface WorkData {
  intro: string;
  githubAll: Maybe<string>;
  items: { date: string; title: string; role: string; kind: string; description: string; tech?: string[]; links?: Link[] }[];
}
export interface TestimonialsData {
  items: { name: string; role: string; link?: string; text: string; rating: number; year: string }[];
}
export interface MoreData {
  intro: Maybe<string>;
  blocks: {
    title: string;
    text: Maybe<string>;
    tags?: string[];
    groups?: { name: string; role: string; genre: string; link?: string }[];
    link?: Maybe<string>;
    books?: { title: string; author: string }[];
  }[];
}
export interface LearningData {
  languages: { name: string; level: Maybe<string>; detail?: string }[];
  experiences: { year: string; title: string; org: string; kind: string }[];
  certificates: { year: string; title: string; org: string; link?: string }[];
}
export interface ContactData {
  text: Maybe<string>;
  email: Maybe<string>;
  linkedin: Maybe<string>;
  github: Maybe<string>;
  instagram: Maybe<string>;
}

interface SectionBase<T extends string, D> {
  hs: Hotspot;
  part: string;
  key: string;
  type: T;
  accent: Accent;
  eyebrow: string;
  title: string;
  data: D;
}

export type Section =
  | SectionBase<'hero', HeroData>
  | SectionBase<'about', AboutData>
  | SectionBase<'skills', SkillsData>
  | SectionBase<'projects', ProjectsData>
  | SectionBase<'timeline', TimelineData>
  | SectionBase<'work', WorkData>
  | SectionBase<'testimonials', TestimonialsData>
  | SectionBase<'more', MoreData>
  | SectionBase<'learning', LearningData>
  | SectionBase<'contact', ContactData>;

export interface Portfolio {
  owner: Owner;
  sections: Section[];
}
