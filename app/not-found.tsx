"use client"
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function NotFound() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center p-6 bg-transparent overflow-hidden" ref={constraintsRef}>
      
      {/* Background massive 404 */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-10">
        <h1 className="text-[30vw] font-bold font-mono tracking-tighter text-white blur-sm select-none">404</h1>
      </div>

      <motion.div 
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.4}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        className="relative z-10 w-full max-w-md cursor-grab rounded-2xl border border-white/20 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
      >
        {/* macOS Window Header */}
        <div className="flex items-center justify-center border-b border-white/10 bg-white/5 py-3 px-4 rounded-t-2xl">
          <div className="absolute left-4 flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] border border-black/20" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] border border-black/20" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] border border-black/20" />
          </div>
          <span className="font-mono text-[11px] font-semibold text-white/60 tracking-wider">Error 404 — NovaTerm</span>
        </div>

        {/* Window Content */}
        <div className="p-8 text-center font-sans">
          <div className="mb-6 mx-auto flex h-20 w-20 items-center justify-center rounded-[1.25rem] bg-gradient-to-b from-white/20 to-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <path d="M12 9v4"/>
              <path d="M12 17h.01"/>
            </svg>
          </div>
          <h2 className="mb-3 text-3xl font-semibold text-white tracking-tight">Page Not Found</h2>
          <p className="mb-8 text-base text-white/60 leading-relaxed">
            The path you specified does not exist. Feel free to drag this window out of the way.
          </p>
          
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-8 text-sm font-semibold text-black shadow-[0_4px_14px_rgba(255,255,255,0.25)] transition-transform hover:scale-105 hover:bg-gray-100 active:scale-95"
            >
              Return Home
            </Link>
          </div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-12 z-0 text-white/40 text-sm font-sans tracking-wide animate-pulse pointer-events-none select-none">
        Grab the window to drag it around
      </div>
    </div>
  );
}
