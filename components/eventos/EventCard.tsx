/**
 * @file components/eventos/EventCard.tsx
 * @description Tarjeta de evento pasado de PySquad.
 * - Título, speaker, fecha, categoría
 * - Badge de categoría con color codificado
 * - Botones opcionales de diapositivas y repositorio
 */

import Link from "next/link";
import {
  CalendarDays,
  User,
  ExternalLink,
  GitBranch,
  Presentation,
  MapPin,
} from "lucide-react";
import { Event, EventCategory } from "@/types";
import { formatDateShort } from "@/lib/utils";

// ─── Colores por categoría ────────────────────────────────────────────────────
const categoryStyles: Record<
  EventCategory,
  { label: string; className: string }
> = {
  AI: {
    label: "AI",
    className: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  Mobile: {
    label: "Mobile",
    className: "bg-cyan-500/12 text-cyan-300 border-cyan-500/25",
  },
  DevOps: {
    label: "DevOps",
    className: "bg-orange-500/12 text-orange-300 border-orange-500/25",
  },
  Web: {
    label: "Web",
    className: "bg-blue-500/12 text-blue-300 border-blue-500/25",
  },
  Backend: {
    label: "Backend",
    className: "bg-green-500/12 text-green-300 border-green-500/25",
  },
  Frontend: {
    label: "Frontend",
    className: "bg-pink-500/12 text-pink-300 border-pink-500/25",
  },
  Cloud: {
    label: "Cloud",
    className: "bg-sky-500/12 text-sky-300 border-sky-500/25",
  },
  "Open Source": {
    label: "Open Source",
    className: "bg-emerald-500/12 text-emerald-300 border-emerald-500/25",
  },
  "Data Science": {
    label: "Data Science",
    className: "bg-indigo-500/12 text-indigo-300 border-indigo-500/25",
  },
  Security: {
    label: "Security",
    className: "bg-red-500/12 text-red-300 border-red-500/25",
  },
  Career: {
    label: "Career",
    className: "bg-yellow-500/12 text-yellow-300 border-yellow-500/25",
  },
  General: {
    label: "General",
    className: "bg-slate-500/12 text-slate-300 border-slate-500/25",
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface EventCardProps {
  event: Event;
  /** Número del evento en el timeline (se muestra como indicador) */
  index: number;
}

// ─── Componente ───────────────────────────────────────────────────────────────
export default function EventCard({ event, index }: EventCardProps) {
  const category = categoryStyles[event.category] ?? categoryStyles.General;

  return (
    <article
      className="group relative flex gap-5 sm:gap-8"
      aria-label={`Evento: ${event.title}`}
    >
      {/* Timeline indicator */}
      <div className="relative flex flex-col items-center">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-500/40 bg-[#0d1117] text-sm font-bold text-[#60a5fa] z-10 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300">
          {String(index + 1).padStart(2, "0")}
        </div>
        {/* Línea conectora (no se muestra en el último elemento) */}
        <div className="mt-2 flex-1 w-px bg-gradient-to-b from-blue-500/30 to-transparent min-h-full" />
      </div>

      {/* Tarjeta */}
      <div className="flex-1 mb-10 rounded-2xl border border-[#1e293b] bg-[#0d1117] p-6 transition-all duration-300 hover:border-blue-500/25 hover:shadow-[0_0_30px_rgba(37, 99, 235,0.1)] hover:-translate-y-0.5">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${category.className}`}
          >
            {category.label}
          </span>
          <time
            dateTime={event.date}
            className="flex items-center gap-1.5 text-xs text-[#475569]"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDateShort(event.date)}
          </time>
        </div>

        {/* Título */}
        <h3
          className="mb-2 text-lg font-bold text-[#f0f4ff] leading-snug"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {event.title}
        </h3>

        {/* Descripción */}
        <p className="mb-4 text-sm leading-relaxed text-[#94a3b8] line-clamp-2">
          {event.description}
        </p>

        {/* Metadatos */}
        <div className="mb-5 flex flex-wrap gap-4 text-xs text-[#94a3b8]">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-blue-400" />
            <span>
              <span className="text-[#f0f4ff] font-medium">{event.speaker}</span>
              {event.speakerRole && (
                <span className="text-[#475569] ml-1">— {event.speakerRole}</span>
              )}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {/* Botones de recursos */}
        {(event.slidesUrl || event.repoUrl) && (
          <div className="flex flex-wrap gap-2 border-t border-[#1e293b] pt-4">
            {event.slidesUrl && (
              <Link
                href={event.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e293b] px-3 py-1.5 text-xs font-medium text-[#94a3b8] hover:text-[#60a5fa] hover:border-blue-500/40 hover:bg-blue-500/8 transition-all duration-200"
              >
                <Presentation className="h-3.5 w-3.5" />
                Ver Diapositivas
                <ExternalLink className="h-3 w-3 opacity-60" />
              </Link>
            )}
            {event.repoUrl && (
              <Link
                href={event.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e293b] px-3 py-1.5 text-xs font-medium text-[#94a3b8] hover:text-[#67e8f9] hover:border-cyan-500/40 hover:bg-cyan-500/8 transition-all duration-200"
              >
                <GitBranch className="h-3.5 w-3.5" />
                Código en GitHub
                <ExternalLink className="h-3 w-3 opacity-60" />
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
