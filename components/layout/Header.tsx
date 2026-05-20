/**
 * @file components/layout/Header.tsx
 * @description Header global sticky con navegación principal de PySquad.
 * - Logo + nombre de la comunidad
 * - Links de navegación: Inicio, Miembros, Eventos
 * - CTA "Únete" destacado
 * - Backdrop blur al hacer scroll
 * - Menú hamburguesa para mobile
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Navegación ───────────────────────────────────────────────────────────────
const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/miembros", label: "Miembros" },
  { href: "/eventos", label: "Eventos" },
];

// ─── Componente ───────────────────────────────────────────────────────────────
export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para aplicar backdrop blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#080b14]/90 backdrop-blur-md border-b border-[#1e293b] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      )}
      style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ margin: '0 auto', width: '100%', maxWidth: '1280px' }}>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="PySquad — Ir al inicio"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 shadow-[0_0_16px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_24px_rgba(124,58,237,0.7)] transition-shadow duration-300">
              <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span className="text-blue-500">Py</span>
              <span className="text-[#f0f4ff]">Squad</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ padding: '12px 24px', display: 'inline-block', margin: '0 12px' }}
                className={cn(
                  "relative text-base font-medium rounded-lg transition-colors duration-200",
                  pathname === link.href
                    ? "text-[#a78bfa]"
                    : "text-[#94a3b8] hover:text-[#f0f4ff] hover:bg-white/5"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4/5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="#"
              id="cta-unirse-header"
              style={{ padding: '12px 32px' }}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(124,58,237,0.55)] hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <Zap className="h-3.5 w-3.5" />
              Únete
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-[#f0f4ff] hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-1 border-t border-[#1e293b] pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-[#a78bfa] bg-violet-500/10"
                    : "text-[#94a3b8] hover:text-[#f0f4ff] hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              id="cta-unirse-mobile"
              onClick={() => setIsOpen(false)}
              style={{ padding: '16px 24px' }}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-base font-semibold text-white"
            >
              <Zap className="h-3.5 w-3.5" />
              Únete a la Comunidad
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
