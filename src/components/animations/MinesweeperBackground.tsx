'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Cell {
  id: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

const BOARD_SIZE = 30;
const MINE_COUNT = 100;
const CELL_SIZE = 56;
const MOVE_INTERVAL = 400;

const numberColors = [
  '',
  'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]',
  'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]',
  'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]',
  'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]',
  'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]',
  'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]',
  'text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]',
  'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]',
];

const fallingIcons = ['💣', '🚩', '⛏️', '🔲', '🟦', '⭐'];

interface FallingIconData {
  id: number;
  icon: string;
  startX: number;
  duration: number;
  delay: number;
  size: number;
}

interface ParticlePosition {
  x: number;
  y: number;
}

export default function MinesweeperAnimation() {
  const [board, setBoard] = useState<Cell[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [fallingIconsData, setFallingIconsData] = useState<FallingIconData[]>([]);
  const [windowHeight, setWindowHeight] = useState(0);
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([]);

  const initializeBoard = useCallback(() => {
    const newBoard: Cell[] = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => ({
      id: i,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborCount: 0,
    }));

    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const index = Math.floor(Math.random() * newBoard.length);
      if (!newBoard[index].isMine) {
        newBoard[index].isMine = true;
        minesPlaced++;
      }
    }

    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i].isMine) {
        const neighbors = getNeighbors(i, newBoard);
        newBoard[i].neighborCount = neighbors.filter((n) => n.isMine).length;
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setRevealedCount(0);
  }, []);

  useEffect(() => {
    initializeBoard();
    setWindowHeight(typeof window !== 'undefined' ? window.innerHeight : 1080);

    const updateWindowSize = () => {
      setWindowHeight(window.innerHeight);
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, [initializeBoard]);

  // Генерируем падающие иконки только на клиенте
  useEffect(() => {
    const icons: FallingIconData[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      icon: fallingIcons[i % fallingIcons.length],
      startX: Math.random() * 95 + 2.5,
      duration: 12 + Math.random() * 8,
      delay: i * 1.5,
      size: 3 + Math.random() * 3,
    }));
    setFallingIconsData(icons);

    const positions: ParticlePosition[] = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticlePositions(positions);
  }, []);

  const getNeighbors = (index: number, currentBoard: Cell[]): Cell[] => {
    const row = Math.floor(index / BOARD_SIZE);
    const col = index % BOARD_SIZE;
    const neighbors: Cell[] = [];

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
          neighbors.push(currentBoard[newRow * BOARD_SIZE + newCol]);
        }
      }
    }

    return neighbors;
  };

  const revealCell = useCallback(
    (index: number, currentBoard: Cell[]): Cell[] => {
      const newBoard = [...currentBoard];
      const cell = newBoard[index];

      if (cell.isRevealed || cell.isFlagged) return newBoard;

      cell.isRevealed = true;

      if (cell.neighborCount === 0 && !cell.isMine) {
        const neighbors = getNeighbors(index, newBoard);
        neighbors.forEach((neighbor) => {
          if (!neighbor.isRevealed) {
            revealCell(neighbor.id, newBoard);
          }
        });
      }

      return newBoard;
    },
    []
  );

  const simulateMove = useCallback(() => {
    if (gameOver || !autoPlay) return;

    setBoard((prevBoard) => {
      const unrevealedSafeCells = prevBoard
        .map((cell, index) => ({ ...cell, originalIndex: index }))
        .filter((cell) => !cell.isMine && !cell.isRevealed);

      if (unrevealedSafeCells.length === 0) {
        setGameOver(true);
        setAutoPlay(false);
        return prevBoard;
      }

      const randomCell =
        unrevealedSafeCells[Math.floor(Math.random() * unrevealedSafeCells.length)];
      const newBoard = revealCell(randomCell.originalIndex, [...prevBoard]);

      const revealedMine = newBoard.find((cell) => cell.isMine && cell.isRevealed);
      if (revealedMine) {
        setGameOver(true);
        setAutoPlay(false);
        return newBoard.map((cell) => ({
          ...cell,
          isRevealed: cell.isMine ? true : cell.isRevealed,
        }));
      }

      const newRevealedCount = newBoard.filter((cell) => cell.isRevealed && !cell.isMine).length;
      setRevealedCount(newRevealedCount);

      const safeCellsCount = BOARD_SIZE * BOARD_SIZE - MINE_COUNT;
      if (newRevealedCount >= safeCellsCount) {
        setGameOver(true);
        setAutoPlay(false);
      }

      return newBoard;
    });
  }, [gameOver, autoPlay, revealCell]);

  useEffect(() => {
    const interval = setInterval(simulateMove, MOVE_INTERVAL);
    return () => clearInterval(interval);
  }, [simulateMove]);

  const getCellColor = (cell: Cell, index: number): string => {
    const row = Math.floor(index / BOARD_SIZE);
    const col = index % BOARD_SIZE;
    const isDark = (row + col) % 2 === 0;

    if (!cell.isRevealed) {
      return isDark
        ? 'bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg'
        : 'bg-gradient-to-br from-gray-500 to-gray-700 shadow-lg';
    }

    if (cell.isMine) {
      return 'bg-gradient-to-br from-red-600 to-red-800 shadow-[0_0_20px_rgba(220,38,38,0.6)] animate-pulse';
    }

    return isDark
      ? 'bg-gradient-to-br from-slate-700/80 to-slate-900/80 shadow-md'
      : 'bg-gradient-to-br from-slate-600/60 to-slate-800/60 shadow-md';
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-0" suppressHydrationWarning>
      {/* Градиентный фон для глубины */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background/50" />

      {/* Плавающие элементы на фоне */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fallingIconsData.map((item) => (
          <FallingIcon key={item.id} item={item} windowHeight={windowHeight} />
        ))}
      </div>

      {/* Дополнительные плавающие частицы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <FloatingParticle key={`particle-${i}`} pos={pos} />
        ))}
      </div>

      {/* Игровое поле сапера */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="grid gap-1 opacity-20 hover:opacity-30 transition-opacity duration-500"
          style={{
            gridTemplateColumns: `repeat(${BOARD_SIZE}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, ${CELL_SIZE}px)`,
            transform: 'scale(1)',
          }}
        >
          {board.map((cell, index) => (
            <div
              key={cell.id}
              className={`
                w-full h-full flex items-center justify-center text-xs font-bold rounded-sm
                ${getCellColor(cell, index)}
                ${cell.isMine && cell.isRevealed ? 'animate-pulse' : ''}
              `}
              style={{ width: CELL_SIZE, height: CELL_SIZE }}
            >
              {cell.isRevealed && cell.isMine && '💣'}
              {cell.isRevealed && !cell.isMine && cell.neighborCount > 0 && (
                <span className={numberColors[cell.neighborCount]}>
                  {cell.neighborCount}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка перезапуска */}
      <div className="absolute bottom-8 right-8 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-auto z-20">
        <button
          onClick={() => {
            initializeBoard();
            setAutoPlay(true);
          }}
          className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-bold text-sm hover:scale-105 transition-all shadow-lg hover:shadow-xl border border-white/20"
        >
          🔄 Перезапустить
        </button>
      </div>

      {/* Счётчик */}
      <div className="absolute top-8 right-8 text-sm font-bold text-foreground/80 opacity-60 z-20 bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="text-lg">💣</span> {MINE_COUNT}
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span className="flex items-center gap-1">
            <span className="text-lg">🔲</span> {revealedCount}
          </span>
        </div>
      </div>
    </div>
  );
}

// Отдельный компонент для падающей иконки
function FallingIcon({ item, windowHeight }: { item: FallingIconData; windowHeight: number }) {
  return (
    <motion.div
      className="absolute opacity-8 dark:opacity-12 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      style={{
        fontSize: `${item.size}rem`,
        left: `${item.startX}%`,
        top: -100,
      }}
      animate={{
        y: windowHeight + 100,
        rotate: 720,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: item.duration,
        repeat: Infinity,
        ease: 'linear',
        delay: item.delay,
      }}
    >
      {item.icon}
    </motion.div>
  );
}

// Отдельный компонент для частицы
function FloatingParticle({ pos }: { pos: ParticlePosition }) {
  const controls = useAnimation();

  useEffect(() => {
    const animateParticle = async () => {
      await controls.start({
        y: [pos.y, pos.y - 50 - Math.random() * 50, pos.y],
        x: [pos.x, pos.x + (Math.random() - 0.5) * 100, pos.x],
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.6, 0.3],
        transition: {
          duration: 3 + Math.random() * 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 2,
        },
      });
    };

    animateParticle();
  }, [controls, pos.x, pos.y]);

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
      }}
      animate={controls}
    />
  );
}
