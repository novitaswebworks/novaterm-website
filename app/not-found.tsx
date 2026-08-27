"use client"
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Full screen setup
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Game objects
    const paddle = { w: 12, h: 120 };
    const player = { x: 40, y: canvas.height / 2 - paddle.h / 2, score: 0 };
    const ai = { x: canvas.width - 52, y: canvas.height / 2 - paddle.h / 2, score: 0 };
    const ball = { x: canvas.width / 2, y: canvas.height / 2, r: 8, dx: 6, dy: 6, speed: 7 };
    
    let mouseY = canvas.height / 2;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;

    const resetBall = () => {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
      ball.dy = (Math.random() * 2 - 1) * ball.speed;
    };

    const draw = () => {
      // Clear with trailing blur effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Center Line
      ctx.setLineDash([15, 15]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      // Setup glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#fff';
      
      // Update & Draw Player
      player.y = mouseY - paddle.h / 2;
      if (player.y < 0) player.y = 0;
      if (player.y + paddle.h > canvas.height) player.y = canvas.height - paddle.h;
      
      ctx.fillStyle = '#00ffff';
      ctx.shadowColor = '#00ffff';
      ctx.fillRect(player.x, player.y, paddle.w, paddle.h);

      // Update & Draw AI (Tracks the ball with slight delay)
      const targetY = ball.y - paddle.h / 2;
      ai.y += (targetY - ai.y) * 0.08;
      if (ai.y < 0) ai.y = 0;
      if (ai.y + paddle.h > canvas.height) ai.y = canvas.height - paddle.h;
      
      ctx.fillStyle = '#ff0055';
      ctx.shadowColor = '#ff0055';
      ctx.fillRect(ai.x, ai.y, paddle.w, paddle.h);

      // Draw Ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.fill();

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall bounce (Top & Bottom)
      if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) {
        ball.dy *= -1;
      }

      // Paddle collision
      const hitPlayer = ball.x - ball.r < player.x + paddle.w && ball.y > player.y && ball.y < player.y + paddle.h;
      const hitAI = ball.x + ball.r > ai.x && ball.y > ai.y && ball.y < ai.y + paddle.h;

      if (hitPlayer || hitAI) {
        ball.dx *= -1.05; // speed up slightly on hit
        
        // Add spin/english based on where it hit the paddle
        const hitPos = hitPlayer ? (ball.y - (player.y + paddle.h/2)) : (ball.y - (ai.y + paddle.h/2));
        ball.dy = hitPos * 0.15;
        
        // Ensure ball doesn't get stuck inside paddle
        if (hitPlayer) ball.x = player.x + paddle.w + ball.r;
        if (hitAI) ball.x = ai.x - ball.r;
      }

      // Scoring
      if (ball.x < 0) {
        ai.score++;
        resetBall();
      } else if (ball.x > canvas.width) {
        player.score++;
        resetBall();
      }

      // Draw Score & Background Text
      ctx.shadowBlur = 0;
      
      // Giant 404 Text in background
      ctx.font = '900 15vw monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('404', canvas.width / 2, canvas.height / 2);
      
      // Scores
      ctx.font = 'bold 60px monospace';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
      ctx.fillText(player.score.toString(), canvas.width / 4, 100);
      ctx.fillStyle = 'rgba(255, 0, 85, 0.8)';
      ctx.fillText(ai.score.toString(), 3 * canvas.width / 4, 100);

      animationId = requestAnimationFrame(draw);
    };

    resetBall();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center bg-black overflow-hidden cursor-none">
      
      {/* Game Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 block w-full h-full" />
      
      {/* UI Overlay */}
      <div className="absolute bottom-12 z-10 flex flex-col items-center gap-6 pointer-events-auto">
        <p className="font-mono text-white text-sm tracking-[0.2em] uppercase font-bold drop-shadow-md">
          You are Player 1 (Cyan). Beat the AI to escape.
        </p>
        <Link
          href="/"
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-black/80 px-8 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span className="relative z-10 transition-colors group-hover:text-black">Surrender & Return Home</span>
          <div className="absolute inset-0 z-0 h-full w-full bg-white transition-transform duration-300 ease-in-out translate-y-[101%] group-hover:translate-y-0" />
        </Link>
      </div>
      
    </div>
  );
}
