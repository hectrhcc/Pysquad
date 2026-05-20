/**
 * @file components/miembros/MemberFilter.tsx
 * @description Barra de búsqueda client-side para filtrar miembros por nombre
 * o tecnología. Componente controlado que recibe onChange del padre.
 */

"use client";

import { Search, X } from "lucide-react";

interface MemberFilterProps {
  value: string;
  onChange: (value: string) => void;
  totalCount: number;
  filteredCount: number;
}

export default function MemberFilter({
  value,
  onChange,
  totalCount,
  filteredCount,
}: MemberFilterProps) {
  return (
    <div className="space-y-3">
      {/* Input de búsqueda */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#475569] pointer-events-none" />
        <input
          id="member-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar por nombre o tecnología (ej: Python, React...)"
          className="w-full rounded-xl border border-[#1e293b] bg-[#0d1117] py-3 pl-11 pr-10 text-sm text-[#f0f4ff] placeholder-[#475569] outline-none transition-colors duration-200 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
          style={{ paddingLeft: '2.75rem' }}
          aria-label="Buscar miembros"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-md text-[#475569] hover:text-[#94a3b8] hover:bg-white/5 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Contador de resultados */}
      <p className="text-xs text-[#475569]">
        {value ? (
          <>
            Mostrando{" "}
            <span className="text-[#a78bfa] font-medium">{filteredCount}</span>{" "}
            de {totalCount} miembros
          </>
        ) : (
          <>
            <span className="text-[#a78bfa] font-medium">{totalCount}</span>{" "}
            miembros en la comunidad
          </>
        )}
      </p>
    </div>
  );
}
