"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

export default function NotFound() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 15, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [windowSize, setWindowSize] = useState({ w: 1000, h: 1000 });
  
  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / windowSize.w) * 2 - 1; // -1 to 1
    const y = (e.clientY / windowSize.h) * 2 - 1; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Glitch offsets mapped to mouse movement
  const redX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const redY = useTransform(smoothY, [-1, 1], [-20, 20]);
  
  const blueX = useTransform(smoothX, [-1, 1], [40, -40]);
  const blueY = useTransform(smoothY, [-1, 1], [25, -25]);
  
  const greenX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const greenY = useTransform(smoothY, [-1, 1], [30, -30]);

  // Dynamic skew and scale for extra glitchiness at the edges
  const skewX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const textScale = useTransform(smoothY, [-1, 1], [0.95, 1.05]);

  return (
    <div 
      className="relative flex min-h-[100svh] flex-col items-center justify-center p-6 bg-transparent overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none">
        
        <div className="relative flex items-center justify-center h-[300px] w-full max-w-2xl mb-8">
          
          {/* Base white text */}
          <motion.h1 
            style={{ skewX, scale: textScale }}
            className="absolute text-[160px] sm:text-[240px] font-mono font-bold tracking-tighter text-white mix-blend-screen z-40"
          >
            404
          </motion.h1>
          
          {/* Red Glitch Layer */}
          <motion.h1 
            style={{ x: redX, y: redY, skewX, scale: textScale }}
            className="absolute text-[160px] sm:text-[240px] font-mono font-bold tracking-tighter text-[#ff0000] mix-blend-screen z-30 opacity-90 blur-[1px]"
          >
            404
          </motion.h1>
          
          {/* Blue Glitch Layer */}
          <motion.h1 
            style={{ x: blueX, y: blueY, skewX, scale: textScale }}
            className="absolute text-[160px] sm:text-[240px] font-mono font-bold tracking-tighter text-[#00ffff] mix-blend-screen z-20 opacity-90 blur-[1px]"
          >
            404
          </motion.h1>

          {/* Green Glitch Layer */}
          <motion.h1 
            style={{ x: greenX, y: greenY, skewX, scale: textScale }}
            className="absolute text-[160px] sm:text-[240px] font-mono font-bold tracking-tighter text-[#00ff00] mix-blend-screen z-10 opacity-90 blur-[1px]"
          >
            404
          </motion.h1>
        </div>

        <div className="text-center font-sans z-50 pointer-events-auto">
          <p className="mb-10 text-lg text-white/60 uppercase tracking-[0.3em] font-semibold">
            System Synchronization Lost
          </p>
          <Link
            href="/"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-black/50 px-10 text-sm font-semibold text-white transition-all hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 transition-colors group-hover:text-black">Reboot to Homepage</span>
            <div className="absolute inset-0 z-0 h-full w-full bg-white transition-transform duration-300 ease-in-out translate-y-[101%] group-hover:translate-y-0" />
          </Link>
        </div>

      </div>
    </div>
  );
}
