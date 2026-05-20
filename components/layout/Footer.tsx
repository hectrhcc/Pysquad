/**
 * @file components/layout/Footer.tsx
 * @description Footer global de PySquad con links sociales y créditos.
 */

import Link from "next/link";
import { GitBranch, Link2, MessageCircle, Zap, Heart } from "lucide-react";

// ─── Links sociales ───────────────────────────────────────────────────────────
const socialLinks = [
  {
    href: "#",
    label: "GitHub",
    icon: GitBranch,
    id: "footer-github",
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: Link2,
    id: "footer-linkedin",
  },
  {
    href: "#",
    label: "WhatsApp / Discord",
    icon: MessageCircle,
    id: "footer-discord",
  },
];

// ─── Links de navegación ──────────────────────────────────────────────────────
const footerLinks = [
  { href: "/", label: "Inicio" },
  { href: "/miembros", label: "Miembros" },
  { href: "/eventos", label: "Eventos" },
];

// ─── Componente ───────────────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1e293b] bg-[#0d1117]" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20" style={{ paddingTop: '80px', paddingBottom: '80px', margin: '0 auto', width: '100%', maxWidth: '1280px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16" style={{ gap: '64px' }}>
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500">
                <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span className="text-gradient">Py</span>
                <span className="text-[#f0f4ff]">Squad</span>
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] leading-relaxed max-w-xs">
              Agrupación independiente de tecnología. Aprendemos, compartimos y
              conectamos a la comunidad tech.
            </p>
          </div>

          {/* Navegación */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#475569]">
              Navegación
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94a3b8] hover:text-[#a78bfa] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#475569]">
              Comunidad
            </h3>
            <div className="flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon, id }) => (
                <Link
                  key={id}
                  href={href}
                  id={id}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1e293b] text-[#94a3b8] hover:text-[#a78bfa] hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
            <p className="text-xs text-[#475569]">
              ¿Quieres contribuir? El proyecto es Open Source.{" "}
              <Link
                href="#"
                className="text-[#94a3b8] hover:text-[#a78bfa] underline transition-colors"
              >
                Ver en GitHub →
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1e293b] pt-6">
          <p className="text-xs text-[#475569]">
            © {currentYear} PySquad. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-[#475569]">
            Hecho con <Heart className="h-3 w-3 text-violet-400 fill-violet-400" /> por la comunidad PySquad
          </p>
        </div>
      </div>
    </footer>
  );
}
