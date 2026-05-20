/**
 * @file lib/utils.ts
 * @description Utilidades globales del proyecto.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind CSS de forma segura, resolviendo conflictos.
 * Wrapper sobre clsx + tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea una fecha ISO a formato legible en español.
 * @example formatDate("2025-03-15") => "15 de marzo de 2025"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formatea una fecha ISO a formato corto.
 * @example formatDateShort("2025-03-15") => "15 mar 2025"
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Calcula los días restantes hasta una fecha futura.
 * Retorna null si la fecha ya pasó.
 */
export function getDaysUntil(dateString: string): number | null {
  const now = new Date();
  const target = new Date(dateString + "T00:00:00");
  const diff = target.getTime() - now.getTime();
  if (diff < 0) return null;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
