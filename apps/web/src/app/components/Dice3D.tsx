'use client';

import React from 'react';

/**
 * Dice3D - A reusable 3D Dice component for BaziGB project.
 * Standard dice orientation: 1 opposite 6, 2 opposite 5, 3 opposite 4.
 */

interface Dice3DProps {
  value: number;          // 1..6
  rolling?: boolean;      // true -> physics-like rolling animation
  size?: number;          // px, default 48
  className?: string;
}

const faceRotations = {
  1: 'rotateX(0deg) rotateY(0deg)',
  2: 'rotateX(0deg) rotateY(-90deg)',
  3: 'rotateX(-90deg) rotateY(0deg)',
  4: 'rotateX(90deg) rotateY(0deg)',
  5: 'rotateX(0deg) rotateY(90deg)',
  6: 'rotateX(0deg) rotateY(180deg)',
};

const Dot = () => <div className="w-[20%] h-[20%] rounded-full bg-slate-900" />;
const Empty = () => <div className="w-[20%] h-[20%]" />;

const DiceFace = ({ num }: { num: number }) => {
  // 3x3 Grid indices:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  const dots = Array(9).fill(false);
  switch (num) {
    case 1:
      dots[4] = true;
      break;
    case 2:
      dots[2] = dots[6] = true;
      break;
    case 3:
      dots[2] = dots[4] = dots[6] = true;
      break;
    case 4:
      dots[0] = dots[2] = dots[6] = dots[8] = true;
      break;
    case 5:
      dots[0] = dots[2] = dots[4] = dots[6] = dots[8] = true;
      break;
    case 6:
      dots[0] = dots[2] = dots[3] = dots[5] = dots[6] = dots[8] = true;
      break;
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-white border border-slate-200 rounded-[15%] flex items-center justify-center p-[18%] shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] backface-hidden">
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-0.5 place-items-center">
        {dots.map((hasDot, i) => (hasDot ? <Dot key={i} /> : <Empty key={i} />))}
      </div>
    </div>
  );
};

export default function Dice3D({ value, rolling = false, size = 48, className = '' }: Dice3DProps): JSX.Element {
  const rotation = faceRotations[value as keyof typeof faceRotations] || faceRotations[1];

  return (
    <div
      className={`relative group transition-transform hover:scale-110 active:scale-95 ${className}`}
      style={{
        width: size,
        height: size,
        perspective: `${size * 4}px`,
      }}
    >
      <style>{`
        @keyframes dice-rolling-keyframes {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          20% { transform: rotateX(180deg) rotateY(90deg) rotateZ(45deg); }
          40% { transform: rotateX(360deg) rotateY(180deg) rotateZ(90deg); }
          60% { transform: rotateX(540deg) rotateY(270deg) rotateZ(135deg); }
          80% { transform: rotateX(720deg) rotateY(360deg) rotateZ(180deg); }
          100% { transform: rotateX(900deg) rotateY(450deg) rotateZ(225deg); }
        }
        .dice-3d-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.3, 1.1);
        }
        .dice-3d-rolling {
          animation: dice-rolling-keyframes 0.6s linear infinite;
          transition: none;
        }
      `}</style>
      
      <div 
        className={`dice-3d-container ${rolling ? 'dice-3d-rolling' : ''}`}
        style={{
          transform: rolling ? undefined : rotation
        }}
      >
        {/* Front - Face 1 */}
        <div className="absolute inset-0" style={{ transform: `translateZ(${size/2}px)` }}>
          <DiceFace num={1} />
        </div>
        {/* Back - Face 6 */}
        <div className="absolute inset-0" style={{ transform: `rotateY(180deg) translateZ(${size/2}px)` }}>
          <DiceFace num={6} />
        </div>
        {/* Right - Face 2 */}
        <div className="absolute inset-0" style={{ transform: `rotateY(90deg) translateZ(${size/2}px)` }}>
          <DiceFace num={2} />
        </div>
        {/* Left - Face 5 */}
        <div className="absolute inset-0" style={{ transform: `rotateY(-90deg) translateZ(${size/2}px)` }}>
          <DiceFace num={5} />
        </div>
        {/* Top - Face 3 */}
        <div className="absolute inset-0" style={{ transform: `rotateX(90deg) translateZ(${size/2}px)` }}>
          <DiceFace num={3} />
        </div>
        {/* Bottom - Face 4 */}
        <div className="absolute inset-0" style={{ transform: `rotateX(-90deg) translateZ(${size/2}px)` }}>
          <DiceFace num={4} />
        </div>
      </div>
    </div>
  );
}
