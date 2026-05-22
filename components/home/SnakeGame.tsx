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

    // Múltiples snakes moviéndose en línea recta, estilo Nokia 97
    const snakes = [
      { x: 100, y: 200, dx: 1, dy: 0, segments: [], color: "rgba(167, 139, 250, 0.6)" },
      { x: canvas.width - 100, y: 400, dx: -1, dy: 0, segments: [], color: "rgba(96, 165, 250, 0.6)" },
      { x: 300, y: 100, dx: 0, dy: 1, segments: [], color: "rgba(34, 197, 94, 0.6)" },
      { x: canvas.width - 300, y: canvas.height - 100, dx: 0, dy: -1, segments: [], color: "rgba(249, 115, 22, 0.6)" },
    ];

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0)";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 1;

      snakes.forEach((snake) => {
        // Mover la serpiente
        snake.x += snake.dx * 2;
        snake.y += snake.dy * 2;

        // Wraparound
        if (snake.x < -50) snake.x = canvas.width + 50;
        if (snake.x > canvas.width + 50) snake.x = -50;
        if (snake.y < -50) snake.y = canvas.height + 50;
        if (snake.y > canvas.height + 50) snake.y = -50;

        // Agregar segmento
        snake.segments.push({ x: snake.x, y: snake.y });
        if (snake.segments.length > 40) {
          snake.segments.shift();
        }

        // Dibujar la serpiente
        ctx.strokeStyle = snake.color;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        snake.segments.forEach((segment, idx) => {
          if (idx === 0) {
            ctx.moveTo(segment.x, segment.y);
          } else {
            ctx.lineTo(segment.x, segment.y);
          }
        });
        ctx.stroke();

        // Cabeza con punto brillante
        if (snake.segments.length > 0) {
          const head = snake.segments[snake.segments.length - 1];
          ctx.fillStyle = snake.color.replace("0.6", "0.9");
          ctx.beginPath();
          ctx.arc(head.x, head.y, 6, 0, Math.PI * 2);
          ctx.fill();

          // Brillo
          ctx.fillStyle = snake.color.replace("0.6", "0.3");
          ctx.beginPath();
          ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
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
      className="absolute inset-0 pointer-events-none opacity-70"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
