"use client";

import React, { useEffect, useRef } from "react";

interface Segment {
  x: number;
  y: number;
}

interface Snake {
  x: number;
  y: number;
  dx: number;
  dy: number;
  segments: Segment[];
  turnTimer: number;
  color: string;
}

const GRID_SIZE = 20;
const BLOCK_SIZE = 14; // cada bloque es un cuadrado de 14px (con 6px de separación entre bloques)
const MAX_SEGMENTS = 14;
const MOVE_INTERVAL = 3; // frames entre cada movimiento
const TURN_INTERVAL = 16; // frames base entre cambios de dirección

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let frameCount = 0;

    const snapToGrid = (v: number) => Math.round(v / GRID_SIZE) * GRID_SIZE;

    // Menos serpientes, cada una con un tono de verde distinto (más oscuro)
    const snakes: Snake[] = [
      { x: snapToGrid(100), y: snapToGrid(200), dx: GRID_SIZE, dy: 0, segments: [], turnTimer: 0, color: "#2d8c2d" },
      { x: snapToGrid(canvas.width - 100), y: snapToGrid(400), dx: -GRID_SIZE, dy: 0, segments: [], turnTimer: 0, color: "#1a5c1a" },
    ];

    const changeDirection = (snake: Snake) => {
      const directions = [
        { dx: GRID_SIZE, dy: 0 },
        { dx: -GRID_SIZE, dy: 0 },
        { dx: 0, dy: GRID_SIZE },
        { dx: 0, dy: -GRID_SIZE },
      ];
      const available = directions.filter(
        (d) => !(d.dx === -snake.dx && d.dy === -snake.dy)
      );
      const next = available[Math.floor(Math.random() * available.length)];
      snake.dx = next.dx;
      snake.dy = next.dy;
      snake.turnTimer = 0;
    };

    const halfGrid = GRID_SIZE / 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCount++;

      snakes.forEach((snake) => {
        // Movimiento discreto
        if (frameCount % MOVE_INTERVAL === 0) {
          snake.turnTimer++;
          if (snake.turnTimer >= TURN_INTERVAL + Math.floor(Math.random() * 10)) {
            changeDirection(snake);
          }

          snake.x += snake.dx;
          snake.y += snake.dy;

          const margin = GRID_SIZE * 2;
          if (snake.x < -margin) snake.x = canvas.width + margin;
          if (snake.x > canvas.width + margin) snake.x = -margin;
          if (snake.y < -margin) snake.y = canvas.height + margin;
          if (snake.y > canvas.height + margin) snake.y = -margin;

          snake.segments.push({ x: snake.x, y: snake.y });
          if (snake.segments.length > MAX_SEGMENTS) {
            snake.segments.shift();
          }
        }

        if (snake.segments.length === 0) return;

        // ==========================================
        // Dibujar cuerpo: cada segmento es un CUADRO individual
        // como en el Snake 97 de Motorola
        // ==========================================

        const offset = (GRID_SIZE - BLOCK_SIZE) / 2; // 3px de separación a cada lado
        const gap = 2; // separación extra entre bloques en píxeles

        // --- Sombra / glow exterior (efecto decorativo detrás) ---
        ctx.save();
        ctx.fillStyle = snake.color;
        ctx.globalAlpha = 0.08;
        snake.segments.forEach((seg) => {
          ctx.fillRect(
            seg.x - halfGrid + 1,
            seg.y - halfGrid + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
          );
        });
        ctx.restore();

        // --- Cuerpo: cuadros individuales con borde ---
        const totalSegs = snake.segments.length;

        snake.segments.forEach((seg, idx) => {
          const isHead = idx === totalSegs - 1;

          // Posición del bloque centrado en la cuadrícula
          const bx = seg.x - halfGrid + offset;
          const by = seg.y - halfGrid + offset;
          const bw = BLOCK_SIZE - gap;
          const bh = BLOCK_SIZE - gap;

          ctx.save();

          if (isHead) {
            // Cabeza: bloque más brillante con ojos
            ctx.fillStyle = snake.color;
            ctx.globalAlpha = 0.9;
            ctx.fillRect(bx, by, bw, bh);

            // Ojos pixel-art (miran en la dirección)
            ctx.fillStyle = "#0a0a0a";
            ctx.globalAlpha = 0.95;
            const eyeOff = 4;
            const eyeSz = 3;
            let ex1 = seg.x, ey1 = seg.y, ex2 = seg.x, ey2 = seg.y;

            if (snake.dx === GRID_SIZE) {
              ex1 = seg.x + eyeOff; ey1 = seg.y - eyeOff;
              ex2 = seg.x + eyeOff; ey2 = seg.y + eyeOff;
            } else if (snake.dx === -GRID_SIZE) {
              ex1 = seg.x - eyeOff; ey1 = seg.y - eyeOff;
              ex2 = seg.x - eyeOff; ey2 = seg.y + eyeOff;
            } else if (snake.dy === GRID_SIZE) {
              ex1 = seg.x - eyeOff; ey1 = seg.y + eyeOff;
              ex2 = seg.x + eyeOff; ey2 = seg.y + eyeOff;
            } else {
              ex1 = seg.x - eyeOff; ey1 = seg.y - eyeOff;
              ex2 = seg.x + eyeOff; ey2 = seg.y - eyeOff;
            }
            ctx.fillRect(ex1 - 1, ey1 - 1, eyeSz, eyeSz);
            ctx.fillRect(ex2 - 1, ey2 - 1, eyeSz, eyeSz);
          } else {
            // Cuerpo: cada bloque es un cuadrado con borde oscuro
            // para que se distinga cada "cuadro" de la serpiente
            ctx.fillStyle = snake.color;
            ctx.globalAlpha = 0.55;
            ctx.fillRect(bx, by, bw, bh);

            // Borde más oscuro alrededor de cada bloque
            ctx.strokeStyle = snake.color;
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, by, bw, bh);
          }

          ctx.restore();
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
