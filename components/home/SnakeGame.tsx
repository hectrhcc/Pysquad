"use client";

import React, { useEffect, useRef } from "react";

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
    let time = 0;

    // Múltiples snakes moviéndose en diferentes direcciones
    const snakes = [
      { x: 0.2, y: 0.3, dx: 0.0005, dy: 0.0003, offset: 0 },
      { x: 0.8, y: 0.7, dx: -0.0004, dy: -0.0002, offset: Math.PI },
      { x: 0.5, y: 0.1, dx: 0.0003, dy: 0.0004, offset: Math.PI / 2 },
    ];

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0)";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 1;

      snakes.forEach((snake) => {
        // Dibujar línea serpentina
        ctx.strokeStyle = `rgba(167, 139, 250, ${0.3 + Math.sin(time * 0.01) * 0.2})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const centerX = canvas.width * snake.x;
        const centerY = canvas.height * snake.y;

        ctx.beginPath();

        // Crear camino serpentino
        for (let i = 0; i < 20; i++) {
          const angle = time * 0.005 + i * 0.3 + snake.offset;
          const radius = 50 + i * 15;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();

        // Puntos brillantes en la línea
        for (let i = 0; i < 20; i += 3) {
          const angle = time * 0.005 + i * 0.3 + snake.offset;
          const radius = 50 + i * 15;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          ctx.fillStyle = `rgba(96, 165, 250, ${0.4 + Math.sin(time * 0.01 + i) * 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, 3 + Math.sin(time * 0.01) * 2, 0, Math.PI * 2);
          ctx.fill();
        }
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
      className="absolute inset-0 pointer-events-none opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
