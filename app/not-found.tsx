import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @font-face {
          font-family: "Geist Mono SemiBold";
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url("https://static.figma.com/font/GeistMono_wght__1") format("woff2");
        }

        html, body {
          margin: 0;
          padding: 0;
          background-color: #000;
          overflow: hidden;
        }

        .not-found-page {
          position: relative;
          min-height: 100svh;
          width: 100%;
          background-color: #000;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
          z-index: 0;
        }

        .header-logo {
          position: absolute;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .header-logo img {
          width: 40px;
          height: 40px;
          border-radius: 8px;
        }
        
        .header-logo-text {
          color: white;
          font-family: var(--font-sans), sans-serif;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.03em;
        }

        .main-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 483px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 44px;
          z-index: 10;
        }

        .heading-404 {
          font-family: "Geist Mono SemiBold", monospace;
          font-size: 295.751px;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -24.6459px;
          margin: 0;
          padding-bottom: 20px; /* Room for baseline */
          background-image: linear-gradient(
            247.3282658084845deg,
            rgb(255, 255, 255) 2.5334%,
            rgba(255, 255, 255, 0.4) 93.612%
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          height: auto;
          min-height: 0;
        }

        .divider {
          width: 425px;
          height: 1px;
          background-color: #ffffff;
        }

        .message {
          font-family: "Geist Mono SemiBold", monospace;
          font-size: 24px;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -2px;
          color: #ffffff;
          margin: 0;
        }

        @media (max-width: 640px) {
          .not-found-page {
            overflow-y: auto;
          }
          .header-logo {
            top: 32px;
            transform: translateX(-50%) scale(0.75);
          }
          .main-content {
            width: min(100% - 40px, 360px);
            gap: 28px;
          }
          .heading-404 {
            font-size: clamp(140px, 52vw, 200px);
            letter-spacing: -0.09em;
          }
          .divider {
            width: 100%;
          }
          .message {
            font-size: clamp(16px, 4.5vw, 20px);
            letter-spacing: -1.3px;
          }
        }
      `}} />
      <main className="not-found-page">
        <video
          className="bg-video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        
        <Link href="/" className="header-logo" aria-label="NovaTerm">
          <img src="/novaterm_icon_256.png" alt="NovaTerm Icon" />
          <span className="header-logo-text">NovaTerm</span>
        </Link>
        
        <div className="main-content">
          <h1 className="heading-404">404</h1>
          <div className="divider" />
          <p className="message">The path may be broken, but the journey isn't. Let's get you back.</p>
        </div>
      </main>
    </>
  );
}
