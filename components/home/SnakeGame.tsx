"use client";

import React, { useEffect, useRef } from "react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuración
    const gridSize = 20;
    canvas.width = 400;
    canvas.height = 300;

    let snake = [
      { x: 10, y: 7 },
      { x: 9, y: 7 },
      { x: 8, y: 7 },
    ];
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };
    let food = { x: 15, y: 7 };
    let gameSpeed = 100;
    let lastTime = 0;

    const generateFood = () => {
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * (canvas.width / gridSize)),
          y: Math.floor(Math.random() * (canvas.height / gridSize)),
        };
      } while (snake.some((s) => s.x === newFood.x && s.y === newFood.y));
      return newFood;
    };

    const update = (deltaTime: number) => {
      lastTime += deltaTime;
      if (lastTime < gameSpeed) return;
      lastTime = 0;

      direction = nextDirection;
      const head = snake[0];
      const newHead = {
        x: (head.x + direction.x + Math.ceil(canvas.width / gridSize)) % Math.ceil(canvas.width / gridSize),
        y: (head.y + direction.y + Math.ceil(canvas.height / gridSize)) % Math.ceil(canvas.height / gridSize),
      };

      // Colisión consigo mismo
      if (snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        snake = [
          { x: 10, y: 7 },
          { x: 9, y: 7 },
          { x: 8, y: 7 },
        ];
        food = { x: 15, y: 7 };
        direction = { x: 1, y: 0 };
        nextDirection = { x: 1, y: 0 };
        return;
      }

      snake.unshift(newHead);

      // Comida
      if (newHead.x === food.x && newHead.y === food.y) {
        food = generateFood();
        gameSpeed = Math.max(50, gameSpeed - 2);
      } else {
        snake.pop();
      }
    };

    const draw = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < Math.ceil(canvas.width / gridSize); i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < Math.ceil(canvas.height / gridSize); i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // Snake
      snake.forEach((segment, idx) => {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#a78bfa");
        gradient.addColorStop(0.5, "#60a5fa");
        gradient.addColorStop(1, "#06b6d4");
        
        if (idx === 0) {
          ctx.fillStyle = "#c084fc";
        } else {
          ctx.fillStyle = gradient;
        }
        ctx.fillRect(
          segment.x * gridSize + 1,
          segment.y * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      });

      // Food
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const gameLoop = (timestamp: number) => {
      update(timestamp);
      draw();
      requestAnimationFrame(gameLoop);
    };

    // Controles
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) nextDirection = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (direction.y === 0) nextDirection = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (direction.x === 0) nextDirection = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (direction.x === 0) nextDirection = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className="border-2 border-violet-500/50 rounded-lg shadow-xl"
        style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.9))",
        }}
      />
      <div className="text-sm text-violet-300 font-medium">
        ⬆️ ⬇️ ⬅️ ➡️ para controlar
      </div>
    </div>
  );
}
