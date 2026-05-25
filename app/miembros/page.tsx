/**
 * @file app/miembros/page.tsx
 * @description Directorio de Miembros de PySquad.
 * - Filtrado client-side por nombre o tecnología
 * - Grid responsivo de MemberCards
 * - Estado vacío si no hay resultados
 */

"use client";

import { useState, useMemo } from "react";
import { Users } from "lucide-react";
import { members } from "@/data/mockData";
import MemberCard from "@/components/miembros/MemberCard";
import MemberFilter from "@/components/miembros/MemberFilter";

export default function MiembrosPage() {
  const [search, setSearch] = useState("");

  // Filtrado: por nombre o por tecnología (case-insensitive)
  const filteredMembers = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query) ||
        m.technologies.some((t) => t.toLowerCase().includes(query))
    );
  }, [search]);

  return (
    <div className="min-h-screen pb-16" style={{ paddingTop: '100px' }}>
      {/* Hero de la sección */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-500/5 to-transparent border-b border-[#1e293b]">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center" style={{ margin: '0 auto', width: '100%', maxWidth: '1280px' }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-[#60a5fa]">
            <Users className="h-3.5 w-3.5" />
            Directorio de Miembros
          </div>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-[#f0f4ff] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Conoce la{" "}
            <span className="text-gradient">comunidad</span>
          </h1>
          <p 
            className="text-[#94a3b8] text-center" 
            style={{ 
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '36rem'
            }}
          >
            Personas apasionadas por la tecnología que comparten, aprenden y
            construyen juntos. Cada perfil es una historia diferente.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10" style={{ margin: '0 auto', width: '100%', maxWidth: '1280px' }}>
        {/* Barra de búsqueda */}
        <div className="mb-8 max-w-xl">
          <MemberFilter
            value={search}
            onChange={setSearch}
            totalCount={members.length}
            filteredCount={filteredMembers.length}
          />
        </div>

        {/* Grid de miembros */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          /* Estado vacío */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#f0f4ff] mb-2">
              No encontramos miembros
            </h3>
            <p className="text-[#94a3b8] text-sm max-w-xs">
              No hay resultados para &ldquo;{search}&rdquo;. Intenta con otro
              nombre o tecnología.
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 rounded-lg border border-[#1e293b] px-4 py-2 text-sm text-[#94a3b8] hover:text-[#f0f4ff] hover:bg-white/5 transition-colors"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
