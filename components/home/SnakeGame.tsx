"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;
const CELL_SIZE = 20;

interface Position {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 7 },
    { x: 9, y: 7 },
    { x: 8, y: 7 },
  ]);
  const [food, setFood] = useState<Position>({ x: 15, y: 7 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
  const [gameActive, setGameActive] = useState(true);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout>();

  // Generar comida en posición aleatoria
  const generateFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };
    } while (
      currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    );
    return newFood;
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameActive) return;

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        setDirection(nextDirection);

        const head = prevSnake[0];
        let newHead: Position = { ...head };

        switch (nextDirection) {
          case "UP":
            newHead.y = (head.y - 1 + GRID_HEIGHT) % GRID_HEIGHT;
            break;
          case "DOWN":
            newHead.y = (head.y + 1) % GRID_HEIGHT;
            break;
          case "LEFT":
            newHead.x = (head.x - 1 + GRID_WIDTH) % GRID_WIDTH;
            break;
          case "RIGHT":
            newHead.x = (head.x + 1) % GRID_WIDTH;
            break;
        }

        // Colisión con sí mismo
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameActive(false);
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];

        // Colisión con comida
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => prev + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoopRef.current);
  }, [gameActive, food, nextDirection, generateFood]);

  // Control por teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setNextDirection("UP");
          e.preventDefault();
          break;
        case "ArrowDown":
          if (direction !== "UP") setNextDirection("DOWN");
          e.preventDefault();
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setNextDirection("LEFT");
          e.preventDefault();
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setNextDirection("RIGHT");
          e.preventDefault();
          break;
        case " ":
          setGameActive(!gameActive);
          e.preventDefault();
          break;
        case "r":
        case "R":
          setSnake([
            { x: 10, y: 7 },
            { x: 9, y: 7 },
            { x: 8, y: 7 },
          ]);
          setFood({ x: 15, y: 7 });
          setDirection("RIGHT");
          setNextDirection("RIGHT");
          setScore(0);
          setGameActive(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameActive]);

  return (
    <div className="fixed bottom-6 right-6 z-10 pointer-events-auto">
      {/* Contenedor Nokia 97 */}
      <div className="relative w-80 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl p-6 shadow-2xl border-4 border-gray-600">
        {/* Pantalla */}
        <div className="relative bg-green-300 rounded-lg p-3 border-4 border-gray-700 shadow-inner" style={{ aspectRatio: "1.33" }}>
          {/* Grid de juego */}
          <div
            className="relative bg-green-200 w-full h-full rounded-sm overflow-hidden"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
              gap: "1px",
              backgroundColor: "#b4d96b",
            }}
          >
            {/* Celdas del grid */}
            {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, i) => {
              const x = i % GRID_WIDTH;
              const y = Math.floor(i / GRID_WIDTH);
              const isSnake = snake.some((s) => s.x === x && s.y === y);
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={i}
                  className={`
                    ${isSnake ? "bg-green-800" : ""}
                    ${isFood ? "bg-red-600" : ""}
                    ${!isSnake && !isFood ? "bg-green-200" : ""}
                    transition-colors duration-75
                  `}
                  style={{ width: "100%", aspectRatio: "1" }}
                />
              );
            })}
          </div>
        </div>

        {/* Texto Nokia */}
        <div className="text-center mt-4 text-gray-300 font-bold text-sm tracking-wider">
          NOKIA SNAKE
        </div>

        {/* Panel inferior con botones */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-gray-300 text-xs font-mono">
            <div>Score: {score}</div>
            <div className="text-xs text-gray-400">
              {gameActive ? "Playing" : "Paused"}
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            onClick={() => setGameActive(!gameActive)}
            className="col-span-2 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-3 rounded text-xs transition"
          >
            {gameActive ? "PAUSE" : "PLAY"}
          </button>
          <button
            onClick={() => {
              setSnake([
                { x: 10, y: 7 },
                { x: 9, y: 7 },
                { x: 8, y: 7 },
              ]);
              setFood({ x: 15, y: 7 });
              setDirection("RIGHT");
              setNextDirection("RIGHT");
              setScore(0);
              setGameActive(true);
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-3 rounded text-xs transition"
          >
            RESET
          </button>
        </div>

        {/* Instrucciones */}
        <div className="mt-3 text-gray-400 text-xs text-center space-y-1 border-t border-gray-600 pt-3">
          <div>⬆️ ⬇️ ⬅️ ➡️ = Move</div>
          <div>SPACE = Pause</div>
          <div>R = Reset</div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-lg" style={{
          boxShadow: "inset 0 0 20px rgba(124, 58, 237, 0.1)"
        }} />
      </div>

      {/* Nota flotante */}
      <div className="mt-2 text-xs text-gray-400 text-right max-w-xs">
        🎮 Juega el clásico Snake como en el Nokia 97
      </div>
    </div>
  );
}
