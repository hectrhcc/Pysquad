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
}

const SNAKE_COLOR = "#33ff33";
const GRID_SIZE = 20;
const MAX_SEGMENTS = 50;
const MOVE_INTERVAL = 3; // frames entre cada movimiento
const TURN_INTERVAL = 12; // frames base entre cambios de dirección

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

    // Alinear posiciones iniciales a la cuadrícula
    const snapToGrid = (v: number) => Math.round(v / GRID_SIZE) * GRID_SIZE;

    // Múltiples serpientes con movimiento rectilíneo tipo Snake 97
    const snakes: Snake[] = [
      { x: snapToGrid(100), y: snapToGrid(200), dx: GRID_SIZE, dy: 0, segments: [], turnTimer: 0 },
      { x: snapToGrid(canvas.width - 100), y: snapToGrid(400), dx: -GRID_SIZE, dy: 0, segments: [], turnTimer: 0 },
      { x: snapToGrid(300), y: snapToGrid(100), dx: 0, dy: GRID_SIZE, segments: [], turnTimer: 0 },
      { x: snapToGrid(canvas.width - 300), y: snapToGrid(canvas.height - 100), dx: 0, dy: -GRID_SIZE, segments: [], turnTimer: 0 },
    ];

    const changeDirection = (snake: Snake) => {
      const directions = [
        { dx: GRID_SIZE, dy: 0 },
        { dx: -GRID_SIZE, dy: 0 },
        { dx: 0, dy: GRID_SIZE },
        { dx: 0, dy: -GRID_SIZE },
      ];
      // Evitar que retroceda sobre sí misma
      const available = directions.filter(
        (d) => !(d.dx === -snake.dx && d.dy === -snake.dy)
      );
      const next = available[Math.floor(Math.random() * available.length)];
      snake.dx = next.dx;
      snake.dy = next.dy;
      snake.turnTimer = 0;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCount++;

      snakes.forEach((snake) => {
        // Movimiento discreto: avanza un paso de cuadrícula cada MOVE_INTERVAL frames
        if (frameCount % MOVE_INTERVAL === 0) {
          // Cambiar dirección aleatoriamente (zigzag rectilíneo)
          snake.turnTimer++;
          if (snake.turnTimer >= TURN_INTERVAL + Math.floor(Math.random() * 8)) {
            changeDirection(snake);
          }

          // Avanzar un paso en la cuadrícula
          snake.x += snake.dx;
          snake.y += snake.dy;

          // Wraparound con margen
          const margin = GRID_SIZE * 2;
          if (snake.x < -margin) snake.x = canvas.width + margin;
          if (snake.x > canvas.width + margin) snake.x = -margin;
          if (snake.y < -margin) snake.y = canvas.height + margin;
          if (snake.y > canvas.height + margin) snake.y = -margin;

          // Agregar segmento en la nueva posición
          snake.segments.push({ x: snake.x, y: snake.y });
          if (snake.segments.length > MAX_SEGMENTS) {
            snake.segments.shift();
          }
        }

        // Dibujar la serpiente (estilo bloque retro)
        if (snake.segments.length === 0) return;

        // Cuerpo — solo dibujar si hay al menos 2 segmentos
        if (snake.segments.length >= 2) {
          // Sombra / glow exterior
          ctx.save();
          ctx.strokeStyle = SNAKE_COLOR;
          ctx.globalAlpha = 0.15;
          ctx.lineWidth = GRID_SIZE;
          ctx.lineCap = "square";
          ctx.lineJoin = "miter";
          ctx.beginPath();
          snake.segments.forEach((seg, idx) => {
            if (idx === 0) ctx.moveTo(seg.x, seg.y);
            else ctx.lineTo(seg.x, seg.y);
          });
          ctx.stroke();
          ctx.restore();

          // Cuerpo principal (bloques conectados)
          ctx.save();
          ctx.strokeStyle = SNAKE_COLOR;
          ctx.globalAlpha = 0.6;
          ctx.lineWidth = GRID_SIZE - 4;
          ctx.lineCap = "square";
          ctx.lineJoin = "miter";
          ctx.beginPath();
          snake.segments.forEach((seg, idx) => {
            if (idx === 0) ctx.moveTo(seg.x, seg.y);
            else ctx.lineTo(seg.x, seg.y);
          });
          ctx.stroke();
          ctx.restore();
        }

        // Cabeza (cuadrada, más brillante)
        const head = snake.segments[snake.segments.length - 1];

        // Cabeza - bloque sólido
        ctx.save();
        ctx.fillStyle = SNAKE_COLOR;
        ctx.globalAlpha = 0.85;
        const halfG = GRID_SIZE / 2;
        ctx.fillRect(
          head.x - halfG + 2,
          head.y - halfG + 2,
          GRID_SIZE - 4,
          GRID_SIZE - 4
        );
        ctx.restore();

        // Ojos de la serpiente (píxel art)
        ctx.save();
        ctx.fillStyle = "#0a0a0a";
        ctx.globalAlpha = 0.9;
        const eyeOffset = 4;
        const eyeSize = 3;
        // Posicionar ojos según dirección
        let ex1 = head.x, ey1 = head.y, ex2 = head.x, ey2 = head.y;
        if (snake.dx === GRID_SIZE) {
          ex1 = head.x + eyeOffset; ey1 = head.y - eyeOffset;
          ex2 = head.x + eyeOffset; ey2 = head.y + eyeOffset;
        } else if (snake.dx === -GRID_SIZE) {
          ex1 = head.x - eyeOffset; ey1 = head.y - eyeOffset;
          ex2 = head.x - eyeOffset; ey2 = head.y + eyeOffset;
        } else if (snake.dy === GRID_SIZE) {
          ex1 = head.x - eyeOffset; ey1 = head.y + eyeOffset;
          ex2 = head.x + eyeOffset; ey2 = head.y + eyeOffset;
        } else {
          ex1 = head.x - eyeOffset; ey1 = head.y - eyeOffset;
          ex2 = head.x + eyeOffset; ey2 = head.y - eyeOffset;
        }
        ctx.fillRect(ex1 - 1, ey1 - 1, eyeSize, eyeSize);
        ctx.fillRect(ex2 - 1, ey2 - 1, eyeSize, eyeSize);
        ctx.restore();
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
