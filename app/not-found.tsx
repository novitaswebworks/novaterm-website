import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center p-6 bg-transparent">
      
      {/* Subtle overlay to ensure the terminal card pops against the video */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-10">
        {/* Terminal Header */}
        <div className="mb-6 flex items-center gap-2.5 border-b border-white/10 pb-5">
          <div className="h-3.5 w-3.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <div className="h-3.5 w-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
          <div className="h-3.5 w-3.5 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span className="ml-2 font-mono text-xs text-white/50 tracking-wider">novaterm — bash — 80x24</span>
        </div>

        {/* Terminal Body */}
        <div className="font-mono text-base text-white sm:text-lg">
          <div className="mb-4 flex items-center gap-2.5 font-semibold">
            <span className="text-primary">~/novaterm</span>
            <span className="text-blue-400">master</span>
            <span className="text-white/40">$</span>
            <span className="text-white ml-1">cd ./unknown-path</span>
          </div>
          
          <p className="mb-6 text-red-400">
            {">"} bash: cd: ./unknown-path: No such file or directory (404)
          </p>
          
          <p className="mb-8 text-white/60 leading-relaxed font-sans">
            The path you are looking for has been moved, deleted, or never existed in this workspace. Our AI agent couldn't resolve this route.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-primary font-semibold">~/novaterm</span>
            <span className="text-blue-400 font-semibold">master</span>
            <span className="text-white/40 font-semibold">$</span>
            <span className="inline-block h-5 w-2.5 bg-white/70 animate-pulse ml-2" />
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 font-sans text-sm font-medium text-white transition-all hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              cd ~/home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
