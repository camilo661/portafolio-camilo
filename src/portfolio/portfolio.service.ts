import { Injectable, NotFoundException } from '@nestjs/common';
import { PORTFOLIO } from './portfolio.data.js';
import type { Portfolio, Section } from './portfolio.types.js';

@Injectable()
export class PortfolioService {
  /** Portafolio completo: propietario + las 10 secciones (una por pieza del teléfono). */
  findAll(): Portfolio {
    return PORTFOLIO;
  }

  /** Una sección por su clave (inicio, sobre-mi, proyectos, …). */
  findSection(key: string): Section {
    const section = PORTFOLIO.sections.find((s) => s.key === key);
    if (!section) throw new NotFoundException(`No existe la sección "${key}"`);
    return section;
  }
}
