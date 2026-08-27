"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const [history, setHistory] = useState([
    { type: 'command', text: 'cd ./unknown-path' },
    { type: 'error', text: 'bash: cd: ./unknown-path: No such file or directory (404)' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keep focus on input
  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'command', text: cmd }];
      
      if (cmd === 'ls') {
        newHistory.push({ type: 'output', text: 'lost_files/  void/  empty_space.txt  black_hole.sh' });
      } else if (cmd === 'pwd') {
        newHistory.push({ type: 'output', text: '/users/wandering_dev/nowhere' });
      } else if (cmd === 'help') {
        newHistory.push({ type: 'output', text: 'Available commands: ls, pwd, whoami, clear, cd /, help' });
      } else if (cmd === 'whoami') {
        newHistory.push({ type: 'output', text: 'a_lost_developer' });
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd.startsWith('cd')) {
        if (cmd === 'cd' || cmd === 'cd /' || cmd === 'cd ~') {
          router.push('/');
          return;
        } else {
          newHistory.push({ type: 'error', text: `bash: cd: ${cmd.slice(3)}: Permission denied` });
        }
      } else if (cmd === '') {
        // do nothing
      } else {
        newHistory.push({ type: 'error', text: `bash: ${cmd}: command not found. Try 'help'.` });
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div 
      className="relative flex min-h-[100svh] flex-col items-center justify-center p-6 bg-transparent" 
      onClick={() => inputRef.current?.focus()}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none" />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-black/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-10 font-mono">
        <div className="mb-6 flex items-center gap-2.5 border-b border-white/10 pb-5">
          <div className="h-3.5 w-3.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <div className="h-3.5 w-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
          <div className="h-3.5 w-3.5 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span className="ml-2 text-xs text-white/50 tracking-wider">novaterm — interactive bash — 80x24</span>
        </div>
        <div className="text-sm text-white sm:text-base max-h-[60vh] overflow-y-auto overflow-x-hidden pb-4">
          {history.map((line, i) => (
            <div key={i} className="mb-2">
              {line.type === 'command' && (
                <div className="flex gap-2 text-white/80">
                  <span className="text-primary font-semibold">~/novaterm</span>
                  <span className="text-white/40">$</span>
                  <span>{line.text}</span>
                </div>
              )}
              {line.type === 'error' && <div className="text-red-400">{line.text}</div>}
              {line.type === 'output' && <div className="text-blue-300">{line.text}</div>}
            </div>
          ))}
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-primary font-semibold">~/novaterm</span>
            <span className="text-white/40">$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent outline-none flex-1 text-white border-none focus:ring-0 p-0 m-0 leading-none shadow-none"
              autoFocus
              spellCheck={false}
            />
          </div>
          <p className="mt-8 text-xs text-white/30 italic">Type 'help' for commands, or 'cd /' to return home.</p>
        </div>
      </div>
    </div>
  );
}
