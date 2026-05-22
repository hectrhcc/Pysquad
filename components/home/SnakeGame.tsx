"use client";

import React, { useEffect, useState } from "react";

interface Point {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const GRID_SIZE = 30;
  const [snakePath, setSnakePath] = useState<Point[]>([]);

  useEffect(() => {
    // Generar una ruta serpentina como efecto visual
    const path: Point[] = [];
    
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        // Patrón serpentín: alterna dirección en cada fila
        if (i % 2 === 0) {
          path.push({ x: j, y: i });
        } else {
          path.push({ x: GRID_SIZE - 1 - j, y: i });
        }
      }
    }

    setSnakePath(path);
  }, []);

  const CELL_SIZE = 8;
  
  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
      {/* Fondo con efecto snake */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg 
          width="100%" 
          height="100%" 
          className="absolute inset-0"
          style={{ mixBlendMode: "screen" }}
        >
          <defs>
            <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Línea serpentina animada */}
          {snakePath.map((point, idx) => {
            const nextPoint = snakePath[idx + 1];
            if (!nextPoint) return null;

            return (
              <line
                key={idx}
                x1={`${(point.x / GRID_SIZE) * 100}%`}
                y1={`${(point.y / GRID_SIZE) * 100}%`}
                x2={`${(nextPoint.x / GRID_SIZE) * 100}%`}
                y2={`${(nextPoint.y / GRID_SIZE) * 100}%`}
                stroke="url(#snakeGradient)"
                strokeWidth="2"
                opacity={0.5}
                style={{
                  animation: `slideSnake ${2 + (idx % 3)}s ease-in-out infinite`,
                  animationDelay: `${idx * 0.05}s`,
                }}
              />
            );
          })}

          {/* Puntos flotantes */}
          {snakePath.slice(0, 50).map((point, idx) => (
            <circle
              key={`dot-${idx}`}
              cx={`${(point.x / GRID_SIZE) * 100}%`}
              cy={`${(point.y / GRID_SIZE) * 100}%`}
              r="3"
              fill="#a78bfa"
              opacity={0.6}
              style={{
                animation: `float ${3 + (idx % 5)}s ease-in-out infinite`,
                animationDelay: `${idx * 0.1}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Contenido con estilos globales para las animaciones */}
      <style>{`
        @keyframes slideSnake {
          0%, 100% { opacity: 0.3; stroke-width: 2px; }
          50% { opacity: 0.8; stroke-width: 3px; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0);
            opacity: 0.4;
          }
          50% { 
            transform: translate(10px, -10px);
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Contenedor con texto informativo */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/50 mb-6">
          <span className="text-sm text-purple-300 font-medium">🐍 Efecto Visual</span>
        </div>
      </div>
    </section>
  );
}
