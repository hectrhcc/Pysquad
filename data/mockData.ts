/**
 * @file data/mockData.ts
 * @description Datos de ejemplo (mock) para desarrollo local de PySquad.
 * Reemplazar con llamadas a API/base de datos en fases posteriores.
 *
 * CONTRIBUIDORES: Para agregar miembros o eventos reales, sigue la misma
 * estructura de objetos y crea un PR. Ver CONTRIBUTING.md.
 */

import { Member, Event } from "@/types";

// ─── MIEMBROS ─────────────────────────────────────────────────────────────────

export const members: Member[] = [
  {
    id: "member-001",
    name: "Mario Guerrero",
    role: "DevOps & Full Stack Developer",
    bio: "Se especializa en Python, Django y diversas herramientas del mundo de DevOps para optimizar procesos.",
    avatar: "/avatars/mario.jpg",
    technologies: ["Python", "Django", "DevOps"],
    social: { github: "#", linkedin: "#" },
    isOrganizer: true,
  },
  {
    id: "member-002",
    name: "Jose Acevedo",
    role: "Ingeniero Electrónico",
    bio: "Especialista en hardware, programación de microcontroladores (Arduino) y proyectos de la Internet de las Cosas (IoT).",
    avatar: "/avatars/jose.jpg",
    technologies: ["Arduino", "IoT", "Electrónica"],
    social: { github: "#", linkedin: "#" },
    isOrganizer: true,
  },
  {
    id: "member-003",
    name: "Alvaro Marquez",
    role: "Full Stack Developer",
    bio: "Desarrollador web con amplia experiencia trabajando con PHP y el ecosistema de Laravel.",
    avatar: "/avatars/alvaro.jpg",
    technologies: ["PHP", "Laravel", "Full Stack"],
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "member-004",
    name: "Emerson Terrazas",
    role: "Full Stack Developer",
    bio: "Se especializa en tecnologías inmersivas como Realidad Aumentada (AR) y desarrollo en Visión Computacional.",
    avatar: "/avatars/emerson.jpg",
    technologies: ["Realidad Aumentada", "Visión Computacional"],
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "member-005",
    name: "Juan Aguirre",
    role: "Ingeniero en Mecánica",
    bio: "Experto en diseño paramétrico, modelado 3D y renderizado utilizando herramientas como Blender.",
    avatar: "/avatars/juan.jpg",
    technologies: ["Blender", "Modelado 3D", "Mecánica"],
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "member-006",
    name: "Héctor Contreras",
    role: "Full Stack Developer",
    bio: "Especialista en desarrollo web moderno. Apasionado por JavaScript, React, Express, PHP y el diseño de UI/UX.",
    avatar: "/avatars/hector.png",
    technologies: ["JavaScript", "React", "Express", "PHP", "UI/UX"],
    social: { github: "#", linkedin: "#" },
  },
];

// ─── EVENTOS ──────────────────────────────────────────────────────────────────

export const events: Event[] = [
  // Próximo evento (featured)
  {
    id: "event-future-001",
    title: "PySquad Meetup #4: El Futuro del Desarrollo Web con AI",
    description:
      "Exploraremos cómo la inteligencia artificial está transformando el desarrollo web: desde Copilots hasta agentes autónomos que escriben código. Una sesión técnica + debate abierto.",
    date: "2025-07-18",
    time: "18:00",
    location: "Hub de Innovación Tecnológica — Sala Principal",
    speaker: "Héctor Contreras",
    speakerRole: "Cloud Architect",
    category: "AI",
    status: "upcoming",
    registrationUrl: "#",
  },

  // Eventos pasados
  {
    id: "event-001",
    title: "PySquad Meetup #3: DevOps para Desarrolladores",
    description:
      "Una sesión práctica sobre cómo integrar prácticas DevOps en el día a día del desarrollo. CI/CD, contenedores y automatización desde cero.",
    date: "2025-04-10",
    time: "18:30",
    location: "Coworking Space Central",
    speaker: "Emerson Terrazas",
    speakerRole: "DevOps & Cloud Engineer",
    category: "DevOps",
    status: "past",
    slidesUrl: "#",
    repoUrl: "#",
  },
  {
    id: "event-002",
    title: "PySquad Meetup #2: Flutter desde Cero hasta Producción",
    description:
      "Recorrido completo del ecosistema Flutter: configuración, state management con Riverpod y despliegue en Play Store y App Store.",
    date: "2025-02-20",
    time: "18:00",
    location: "Universidad Tecnológica — Aula 301",
    speaker: "Alvaro Marquez",
    speakerRole: "Mobile Developer",
    category: "Mobile",
    status: "past",
    slidesUrl: "#",
    repoUrl: "#",
  },
  {
    id: "event-003",
    title: "PySquad Kickoff: ¡Bienvenidos a la Comunidad!",
    description:
      "El evento fundacional de PySquad. Presentamos la visión de la comunidad, conocimos a los primeros miembros y establecimos la cultura de compartir y aprender juntos.",
    date: "2024-11-08",
    time: "19:00",
    location: "Café Tech Hub",
    speaker: "Mario Guerrero & Jose Acevedo",
    speakerRole: "Organizadores",
    category: "General",
    status: "past",
    slidesUrl: "#",
  },
  {
    id: "event-004",
    title: "Workshop: APIs con FastAPI y PostgreSQL",
    description:
      "Taller hands-on para construir una API REST production-ready con Python, FastAPI, SQLAlchemy y PostgreSQL. Incluye autenticación JWT.",
    date: "2025-01-15",
    time: "09:00",
    location: "Online (Google Meet)",
    speaker: "Jose Acevedo",
    speakerRole: "Backend Engineer",
    category: "Backend",
    status: "past",
    slidesUrl: "#",
    repoUrl: "#",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Retorna el próximo evento futuro (el más cercano en fecha) */
export const getUpcomingEvent = (): Event | undefined =>
  events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

/** Retorna los eventos pasados ordenados del más reciente al más antiguo */
export const getPastEvents = (): Event[] =>
  events
    .filter((e) => e.status === "past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
