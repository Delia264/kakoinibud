'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Cell {
  id: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
  revealOrder?: number;
}

const BOARD_SIZE = 25;
const MINE_COUNT = 80;
const REVEAL_INTERVAL = 50;

const numberColors = [
  '',
  'text-[#3b82f6] drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]',
  'text-[#22c55e] drop-shadow-[0_0_12px_rgba(34,197,94,0.9)]',
  'text-[#ef4444] drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]',
  'text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]',
  'text-[#f59e0b] drop-shadow-[0_0_12px_rgba(245,158,11,0.9)]',
  'text-[#06b6d4] drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]',
  'text-[#ec4899] drop-shadow-[0_0_12px_rgba(236,72,153,0.9)]',
  'text-[#f97316] drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]',
];

const numberGlowColors = [
  '',
  '#3b82f6',
  '#22c55e',
  '#ef4444',
  '#a855f7',
  '#f59e0b',
  '#06b6d4',
  '#ec4899',
  '#f97316',
];

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  icon: string;
  rotation: number;
  scale: number;
  duration: number;
}

export default function MinesweeperSmoothAnimation() {
  const [board, setBoard] = useState<Cell[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [revealedCount, setRevealedCount] = useState(0);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0);
  const revealQueue = useRef<number[]>([]);

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
    setRevealedCount(0);
    setCurrentRevealIndex(0);
    revealQueue.current = [];
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    revealQueue.current = [];

    const safeCells = board
      .map((cell, index) => ({ ...cell, originalIndex: index }))
      .filter((cell) => !cell.isMine);

    const shuffled = safeCells.sort(() => Math.random() - 0.5);
    revealQueue.current = shuffled.map((c) => c.originalIndex);
    setCurrentRevealIndex(0);
  }, [board]);

  useEffect(() => {
    initializeBoard();
    generateFloatingElements();
  }, [initializeBoard]);

  useEffect(() => {
    if (board.length > 0) {
      const timeout = setTimeout(() => {
        startGame();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [board, startGame]);

  const generateFloatingElements = () => {
    const icons = ['💣', '🚩', '⬜', '◼️', '▪️'];
    const elements: FloatingElement[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: icons[Math.floor(Math.random() * icons.length)],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.8,
      duration: 15 + Math.random() * 10,
    }));
    setFloatingElements(elements);
  };

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
    (index: number, currentBoard: Cell[], order: number): Cell[] => {
      const newBoard = [...currentBoard];
      const cell = newBoard[index];

      if (cell.isRevealed || cell.isFlagged) return newBoard;

      cell.isRevealed = true;
      cell.revealOrder = order;

      if (cell.neighborCount === 0 && !cell.isMine) {
        const neighbors = getNeighbors(index, newBoard);
        neighbors.forEach((neighbor) => {
          if (!neighbor.isRevealed) {
            revealCell(neighbor.id, newBoard, order);
          }
        });
      }

      return newBoard;
    },
    []
  );

  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      if (revealQueue.current.length === 0) {
        setGameState('won');
        return;
      }

      const index = revealQueue.current.shift()!;
      setCurrentRevealIndex((prev) => prev + 1);

      setBoard((prevBoard) => {
        const cell = prevBoard[index];

        if (cell.isMine) {
          setGameState('lost');
          return prevBoard.map((c) => ({ ...c, isRevealed: c.isMine ? true : c.isRevealed }));
        }

        const newBoard = revealCell(index, [...prevBoard], currentRevealIndex);
        const newRevealedCount = newBoard.filter((c) => c.isRevealed && !c.isMine).length;
        setRevealedCount(newRevealedCount);

        const safeCellsCount = BOARD_SIZE * BOARD_SIZE - MINE_COUNT;
        if (newRevealedCount >= safeCellsCount) {
          setGameState('won');
        }

        return newBoard;
      });
    }, REVEAL_INTERVAL);

    return () => clearInterval(interval);
  }, [gameState, currentRevealIndex, revealCell]);

  useEffect(() => {
    if (gameState === 'won' || gameState === 'lost') {
      const timeout = setTimeout(() => {
        initializeBoard();
        setTimeout(() => {
          startGame();
        }, 500);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [gameState, initializeBoard, startGame]);

  const getCellStyles = (cell: Cell, index: number) => {
    const row = Math.floor(index / BOARD_SIZE);
    const col = index % BOARD_SIZE;
    const isDark = (row + col) % 2 === 0;

    if (!cell.isRevealed) {
      return `bg-gradient-to-br ${
        isDark ? 'from-slate-600 to-slate-800' : 'from-slate-500 to-slate-700'
      } shadow-md hover:brightness-110 transition-all duration-300`;
    }

    if (cell.isMine) {
      return 'bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_25px_rgba(239,68,68,0.8)] animate-pulse';
    }

    return `bg-gradient-to-br ${
      isDark ? 'from-slate-800/90 to-slate-900/90' : 'from-slate-700/70 to-slate-800/70'
    } shadow-inner`;
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-0" suppressHydrationWarning>
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />

      {/* Сетка на фоне */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Плавающие элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((item) => (
          <FloatingElement key={item.id} item={item} />
        ))}
      </div>

      {/* Игровое поле */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          className="grid gap-[2px] p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-white/10 shadow-2xl w-full h-full max-w-none"
          style={{
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <AnimatePresence>
            {board.map((cell, index) => (
              <motion.div
                key={cell.id}
                className={`
                  w-full h-full flex items-center justify-center
                  text-sm font-black rounded-[3px]
                  ${getCellStyles(cell, index)}
                `}
                initial={false}
                animate={{
                  scale: cell.isRevealed ? 1 : 1,
                  rotateY: cell.isRevealed ? 180 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
              >
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    cell.isRevealed
                      ? {
                          scale: 1,
                          opacity: 1,
                          rotateY: 180,
                        }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.2 }}
                >
                  {cell.isMine && cell.isRevealed && '💣'}
                  {cell.isRevealed && !cell.isMine && cell.neighborCount > 0 && (
                    <span
                      className={numberColors[cell.neighborCount]}
                      style={{
                        textShadow: `0 0 20px ${numberGlowColors[cell.neighborCount]}`,
                      }}
                    >
                      {cell.neighborCount}
                    </span>
                  )}
                </motion.span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Счётчик */}
      <div className="absolute top-8 right-8 text-sm font-bold opacity-80 z-20 bg-slate-900/50 backdrop-blur-xl px-6 py-4 rounded-xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">💣</span>
            <span className="text-lg">{MINE_COUNT}</span>
          </div>
          <div className="w-px h-6 bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-xl">◼️</span>
            <span className="text-lg">{revealedCount}</span>
          </div>
          <div className="w-px h-6 bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <span className="text-lg">
              {gameState === 'playing' ? 'Играем...' : gameState === 'won' ? 'Победа!' : 'Проигрыш'}
            </span>
          </div>
        </div>
      </div>

      {/* Индикатор прогресса */}
      {gameState === 'playing' && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            className="h-2 bg-slate-800/50 backdrop-blur-sm rounded-full overflow-hidden border border-white/10"
            style={{ width: 300 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${(revealedCount / (BOARD_SIZE * BOARD_SIZE - MINE_COUNT)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

function FloatingElement({ item }: { item: FloatingElement }) {
  return (
    <motion.div
      className="absolute opacity-[0.08] dark:opacity-[0.15]"
      style={{
        fontSize: `${item.scale}rem`,
        left: `${item.x}%`,
        top: `${item.y}%`,
      }}
      animate={{
        y: [item.y, item.y - 30, item.y],
        x: [item.x, item.x + (Math.random() - 0.5) * 20, item.x],
        rotate: [item.rotation, item.rotation + 180, item.rotation + 360],
        scale: [item.scale, item.scale * 1.2, item.scale],
      }}
      transition={{
        duration: item.duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {item.icon}
    </motion.div>
  );
}
