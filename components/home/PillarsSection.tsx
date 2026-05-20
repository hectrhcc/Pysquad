/**
 * @file components/home/PillarsSection.tsx
 * @description Sección "Quiénes Somos" con los 3 pilares de PySquad:
 * Compartir, Aprender, Conectar.
 * Tarjetas glassmorphism con hover animation y gradiente de borde.
 */

import { Share2, BookOpen, Users } from "lucide-react";

// ─── Datos de los pilares ─────────────────────────────────────────────────────
const pillars = [
  {
    id: "pillar-compartir",
    icon: Share2,
    title: "Compartir",
    description:
      "Creemos que el conocimiento vale más cuando se comparte. Cada miembro aporta su experiencia, proyectos y aprendizajes para enriquecer a toda la comunidad.",
    color: "violet",
    gradient: "from-violet-600/20 to-violet-500/5",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/40",
    glowHover: "hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]",
  },
  {
    id: "pillar-aprender",
    icon: BookOpen,
    title: "Aprender",
    description:
      "La tecnología avanza rápido. En PySquad organizamos meetups, workshops y sesiones técnicas para mantenernos al día, juntos, sin importar el nivel de experiencia.",
    color: "cyan",
    gradient: "from-cyan-600/20 to-cyan-500/5",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    borderHover: "hover:border-cyan-500/40",
    glowHover: "hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]",
  },
  {
    id: "pillar-conectar",
    icon: Users,
    title: "Conectar",
    description:
      "Más allá del código, somos personas. PySquad es un espacio para hacer networking genuino, encontrar colaboradores, mentores y amigos con los mismos intereses.",
    color: "emerald",
    gradient: "from-emerald-600/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/40",
    glowHover: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────
export default function PillarsSection() {
  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d1117]"
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <div className="w-full max-w-7xl" style={{ margin: '0 auto' }}>
        {/* Encabezado */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#7c3aed]">
            Quiénes Somos
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#f0f4ff] leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Más que una comunidad,
            <br />
            <span className="text-gradient">un ecosistema</span>
          </h2>
          <p 
            className="mx-auto max-w-2xl text-[#94a3b8]"
            style={{ marginTop: '32px', marginBottom: '64px' }}
          >
            PySquad nació con el espíritu de los GDG — una agrupación independiente donde la pasión por la tecnología es el único requisito de entrada.
          </p>
        </div>

        {/* Grid de pilares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(
            ({
              id,
              icon: Icon,
              title,
              description,
              gradient,
              iconBg,
              iconColor,
              borderHover,
              glowHover,
            }) => (
              <div
                key={id}
                id={id}
                className={`group relative overflow-hidden rounded-2xl border border-[#1e293b] bg-gradient-to-br ${gradient} p-8 transition-all duration-300 ${borderHover} ${glowHover} cursor-default`}
                style={{ padding: '2.5rem' }}
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 bg-gradient-to-br from-white to-transparent rounded-bl-full" />

                {/* Ícono */}
                <div
                  className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>

                {/* Contenido */}
                <h3
                  className="mb-3 text-xl font-bold text-[#f0f4ff]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#94a3b8]">
                  {description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animated-border`}
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
