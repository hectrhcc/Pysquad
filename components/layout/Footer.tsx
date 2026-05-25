/**
 * @file components/layout/Footer.tsx
 * @description Footer global de PySquad con links sociales y créditos.
 */

import Link from "next/link";
import { GitBranch, Link2, MessageCircle, Heart } from "lucide-react";

// ─── Ícono serpiente (Python) ─────────────────────────────────────────────────
function SnakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.5 2 7.5 3.5 7.5 5.5V8H12V9H5.5C3.5 9 2 11 2 13.5C2 16 3.5 18 5.5 18H7V16H5.5C4.7 16 4 15.3 4 13.5C4 11.7 4.7 11 5.5 11H12C14.5 11 16.5 9.5 16.5 7.5V5.5C16.5 3.5 14.5 2 12 2ZM9.5 5.5C10.1 5.5 10.5 5.9 10.5 6.5C10.5 7.1 10.1 7.5 9.5 7.5C8.9 7.5 8.5 7.1 8.5 6.5C8.5 5.9 8.9 5.5 9.5 5.5Z" />
      <path d="M12 15H18.5C20.5 15 22 13 22 10.5C22 8 20.5 6 18.5 6H17V8H18.5C19.3 8 20 8.7 20 10.5C20 12.3 19.3 13 18.5 13H12C9.5 13 7.5 14.5 7.5 16.5V18.5C7.5 20.5 9.5 22 12 22C14.5 22 16.5 20.5 16.5 18.5V16H12V15ZM14.5 18.5C14.5 19.1 14.1 19.5 13.5 19.5C12.9 19.5 12.5 19.1 12.5 18.5C12.5 17.9 12.9 17.5 13.5 17.5C14.1 17.5 14.5 17.9 14.5 18.5Z" />
    </svg>
  );
}

// ─── Links sociales ───────────────────────────────────────────────────────────
const socialLinks = [
  {
    href: "https://github.com/hectrhcc/Pysquad",
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: '#3b82f6' }}>
                <SnakeIcon className="h-4 w-4 text-white" />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span className="text-blue-500">Py</span>
                <span style={{ color: '#FFD43B' }}>Squad</span>
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
                    className="text-sm text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200"
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1e293b] text-[#94a3b8] hover:text-[#60a5fa] hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
            <p className="text-sm text-slate-400">
              ¿Quieres contribuir? El proyecto es Open Source.{" "}
              <a
                href="https://github.com/hectrhcc/Pysquad"
                target="_blank"
                rel="noreferrer"
                className="text-[#60a5fa] hover:text-[#c4b5fd] hover:underline"
              >
                Ver en GitHub →
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1e293b] pt-6">
          <p className="text-xs text-[#475569]">
            © {currentYear} PySquad. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-[#475569]">
            Hecho con <Heart className="h-3 w-3 text-blue-400 fill-blue-400" /> por la comunidad PySquad
          </p>
        </div>
      </div>
    </footer>
  );
}
