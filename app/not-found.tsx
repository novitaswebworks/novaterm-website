"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [text, setText] = useState('');
  const [showButton, setShowButton] = useState(false);
  
  const fullText = `> DIAGNOSTIC INITIATED...
> Analyzing requested route...
> ERROR 404: Endpoint unresolved.
> CAUSE: The requested dimension has collapsed, or the developer forgot to create this page.
> AI RECOMMENDATION: Immediate extraction to the root directory is advised.
> STATUS: Ready to execute fallback...`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 40); // typing speed
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center p-6 bg-transparent">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none" />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-black/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-10 font-mono">
        
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="h-3.5 w-3.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <div className="h-3.5 w-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            <div className="h-3.5 w-3.5 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
          <span className="text-xs text-primary font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            NovaTerm AI Tutor
          </span>
        </div>
        
        <div className="text-sm text-green-400 sm:text-base min-h-[200px] whitespace-pre-wrap leading-relaxed">
          {text}
          {!showButton && <span className="animate-pulse ml-1 inline-block w-2.5 h-5 bg-green-400 align-middle" />}
        </div>
        
        <div className={`mt-8 transition-opacity duration-1000 ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Link
            href="/"
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg border border-primary/50 bg-primary/10 px-8 font-sans text-sm font-semibold text-primary transition-all hover:bg-primary/20 shadow-[0_0_30px_color-mix(in_srgb,var(--primary)_10%,transparent)] hover:shadow-[0_0_40px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
          >
            Execute Fix (cd /)
          </Link>
        </div>
        
      </div>
    </div>
  );
}
