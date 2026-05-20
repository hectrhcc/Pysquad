/**
 * @file types/index.ts
 * @description Interfaces TypeScript globales para PySquad.
 * Agrega nuevos tipos aquí a medida que el proyecto crece.
 */

// ─── Tecnologías disponibles ─────────────────────────────────────────────────
export type TechTag = string;

// ─── Categorías de eventos ────────────────────────────────────────────────────
export type EventCategory =
  | "Mobile"
  | "AI"
  | "DevOps"
  | "Web"
  | "Backend"
  | "Frontend"
  | "Cloud"
  | "Open Source"
  | "Data Science"
  | "Security"
  | "Career"
  | "General";

// ─── Estado del evento ────────────────────────────────────────────────────────
export type EventStatus = "upcoming" | "past";

// ─── Links sociales ───────────────────────────────────────────────────────────
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

// ─── Miembro de la comunidad ──────────────────────────────────────────────────
export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  technologies: TechTag[];
  social: SocialLinks;
  /** Indica si el miembro es parte del equipo organizador */
  isOrganizer?: boolean;
}

// ─── Evento (pasado o futuro) ─────────────────────────────────────────────────
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 format: "2025-03-15"
  time?: string; // e.g. "18:00"
  location?: string;
  speaker: string;
  speakerRole?: string;
  category: EventCategory;
  status: EventStatus;
  /** URL a las diapositivas del evento */
  slidesUrl?: string;
  /** URL al repositorio de código del evento */
  repoUrl?: string;
  /** URL de inscripción (solo para eventos futuros) */
  registrationUrl?: string;
  coverImage?: string;
}
