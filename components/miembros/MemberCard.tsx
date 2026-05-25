/**
 * @file components/miembros/MemberCard.tsx
 * @description Tarjeta de perfil de un miembro de la comunidad PySquad.
 * - Avatar circular con borde gradiente
 * - Nombre, rol, bio corta
 * - Tags de tecnologías con colores codificados
 * - Links GitHub / LinkedIn con iconos
 * - Hover: elevación + glow
 */

import Link from "next/link";
import { GitBranch, Link2, Globe, Crown } from "lucide-react";
import { Member, TechTag } from "@/types";

// ─── Colores de tags por tecnología ──────────────────────────────────────────
const tagColorMap: Partial<Record<TechTag, string>> = {
  React: "tag-cyan",
  "Next.js": "tag-blue",
  TypeScript: "tag-cyan",
  Python: "tag-green",
  Flutter: "tag-cyan",
  Dart: "tag-cyan",
  "Node.js": "tag-green",
  FastAPI: "tag-green",
  Django: "tag-green",
  Go: "tag-cyan",
  Rust: "tag-orange",
  Docker: "tag-cyan",
  Kubernetes: "tag-blue",
  AWS: "tag-orange",
  GCP: "tag-cyan",
  Azure: "tag-cyan",
  DevOps: "tag-orange",
  "Machine Learning": "tag-blue",
  AI: "tag-blue",
  TensorFlow: "tag-orange",
  PyTorch: "tag-orange",
  "UI/UX": "tag-pink",
  Figma: "tag-pink",
  Vue: "tag-green",
  Angular: "tag-pink",
  PostgreSQL: "tag-cyan",
  MongoDB: "tag-green",
  Redis: "tag-orange",
  GraphQL: "tag-pink",
  "REST API": "tag-green",
};

const defaultTagColor = "tag-blue";

// ─── Props ────────────────────────────────────────────────────────────────────
interface MemberCardProps {
  member: Member;
}

// ─── Componente ───────────────────────────────────────────────────────────────
export default function MemberCard({ member }: MemberCardProps) {
  return (
    <article
      className="group relative flex flex-col rounded-2xl border border-[#1e293b] bg-[#0d1117] p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(37, 99, 235,0.12)] hover:-translate-y-1"
      aria-label={`Perfil de ${member.name}`}
    >
      {/* Badge organizador */}
      {member.isOrganizer && (
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-300">
          <Crown className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          Organizador
        </div>
      )}

      {/* Avatar */}
      <div className="mb-5 flex justify-center">
        <div className="relative">
          {/* Borde gradiente */}
          <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-blue-500 to-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-[#0d1117] bg-[#1a2035]">
            <img
              src={member.avatar}
              alt={`Avatar de ${member.name}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Nombre y Rol */}
      <div className="mb-4 text-center">
        <h3
          className="text-lg font-bold text-[#f0f4ff]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-[#2563eb] font-medium">{member.role}</p>
      </div>

      {/* Bio */}
      <p className="mb-5 flex-1 text-center text-xs leading-relaxed text-[#94a3b8] line-clamp-3">
        {member.bio}
      </p>

      {/* Tags de tecnologías */}
      <div className="mb-5 flex flex-wrap justify-center gap-1.5">
        {member.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${tagColorMap[tech] ?? defaultTagColor}`}
          >
            {tech}
          </span>
        ))}
        {member.technologies.length > 4 && (
          <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium text-[#475569] border border-[#1e293b] bg-[#1a2035]">
            +{member.technologies.length - 4}
          </span>
        )}
      </div>

      {/* Links sociales */}
      <div className="flex justify-center gap-2 border-t border-[#1e293b] pt-4">
        {member.social.github && (
          <Link
            href={member.social.github}
            aria-label={`GitHub de ${member.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e293b] text-[#94a3b8] hover:text-[#f0f4ff] hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200"
          >
            <GitBranch className="h-3.5 w-3.5" />
          </Link>
        )}
        {member.social.linkedin && (
          <Link
            href={member.social.linkedin}
            aria-label={`LinkedIn de ${member.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e293b] text-[#94a3b8] hover:text-[#f0f4ff] hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200"
          >
            <Link2 className="h-3.5 w-3.5" />
          </Link>
        )}
        {member.social.website && (
          <Link
            href={member.social.website}
            aria-label={`Sitio web de ${member.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e293b] text-[#94a3b8] hover:text-[#f0f4ff] hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200"
          >
            <Globe className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </article>
  );
}
