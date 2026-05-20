/**
 * @file app/eventos/page.tsx
 * @description Historial de Eventos de PySquad.
 * Timeline cronológico de todos los eventos pasados de la comunidad.
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import { getPastEvents, getUpcomingEvent } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import EventCard from "@/components/eventos/EventCard";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Historial completo de meetups, workshops y charlas organizadas por PySquad. Revive el conocimiento compartido.",
};

export default function EventosPage() {
  const pastEvents = getPastEvents();
  const upcomingEvent = getUpcomingEvent();

  return (
    <div className="min-h-screen pb-16" style={{ paddingTop: '160px' }}>
      {/* Hero de la sección */}
      <div className="relative overflow-hidden bg-gradient-to-b from-cyan-500/5 to-transparent border-b border-[#1e293b]">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-[#67e8f9]">
            <CalendarDays className="h-3.5 w-3.5" />
            Historial de Eventos
          </div>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-[#f0f4ff] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Nuestra{" "}
            <span className="text-gradient">historia</span>
          </h1>
          <p className="mx-auto max-w-xl text-[#94a3b8]">
            Cada evento es un capítulo de PySquad. Charlas, workshops y
            encuentros donde la comunidad creció junta.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Timeline principal */}
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-center gap-3">
              <h2
                className="text-xl font-bold text-[#f0f4ff]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Eventos Pasados
              </h2>
              <span className="inline-flex items-center rounded-full border border-[#1e293b] bg-[#1a2035] px-2.5 py-0.5 text-xs font-medium text-[#94a3b8]">
                {pastEvents.length}
              </span>
            </div>

            {pastEvents.length > 0 ? (
              <div className="space-y-0">
                {pastEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#1e293b] bg-[#0d1117] p-10 text-center">
                <p className="text-[#475569]">
                  Aún no hay eventos pasados registrados.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar: Próximo evento */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <h2
                className="text-xl font-bold text-[#f0f4ff]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Próximo Evento
              </h2>

              {upcomingEvent ? (
                <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-600/10 to-violet-600/5 p-6 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />

                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    <Sparkles className="h-3 w-3" />
                    {upcomingEvent.category}
                  </div>

                  {/* Título */}
                  <h3
                    className="mb-4 text-base font-bold text-[#f0f4ff] leading-snug"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {upcomingEvent.title}
                  </h3>

                  {/* Detalles */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                      <CalendarDays className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{formatDate(upcomingEvent.date)}</span>
                    </div>
                    {upcomingEvent.time && (
                      <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                        <Clock className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{upcomingEvent.time} hs</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                      <User className="h-3.5 w-3.5 text-violet-400 flex-shrink-0" />
                      <span className="font-medium text-[#f0f4ff]">
                        {upcomingEvent.speaker}
                      </span>
                    </div>
                    {upcomingEvent.location && (
                      <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{upcomingEvent.location}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={upcomingEvent.registrationUrl ?? "#"}
                    className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all duration-200 hover:scale-[1.02]"
                  >
                    Inscribirme
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ) : (
                <div className="rounded-2xl border border-[#1e293b] bg-[#0d1117] p-6 text-center">
                  <p className="text-sm text-[#475569]">
                    No hay eventos próximos confirmados aún.
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="rounded-2xl border border-[#1e293b] bg-[#0d1117] p-5">
                <h3 className="mb-4 text-sm font-semibold text-[#475569] uppercase tracking-wider">
                  Resumen
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Meetups realizados", value: pastEvents.length },
                    {
                      label: "Speakers",
                      value: new Set(pastEvents.map((e) => e.speaker)).size,
                    },
                    {
                      label: "Categorías",
                      value: new Set(pastEvents.map((e) => e.category)).size,
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-[#94a3b8]">{label}</span>
                      <span
                        className="text-lg font-bold text-gradient"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
