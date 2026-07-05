import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Home, AlertCircle, Zap, Globe, Wifi } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

// High-quality space/cosmic images for the background
const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&q=80',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48a0?w=1600&q=80',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80',
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1600&q=80',
];

function NotFound() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  
  const bgRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const animationFrameRef = useRef(null);

  // --- Background animation ---
  useEffect(() => {
    const loadImages = async () => {
      const canvases = [];

      for (const src of BACKGROUND_IMAGES) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = src;
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          const canvas = document.createElement('canvas');
          const maxWidth = 1400;
          const scale = Math.min(1, maxWidth / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvases.push(canvas);
          }
        } catch (error) {
          // Fallback canvas with gradient
          const canvas = document.createElement('canvas');
          canvas.width = 1400;
          canvas.height = 788;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            const gradient = ctx.createRadialGradient(
              canvas.width/2, canvas.height/2, 0,
              canvas.width/2, canvas.height/2, canvas.width/2
            );
            gradient.addColorStop(0, '#1a1a3e');
            gradient.addColorStop(0.5, '#0a0a2e');
            gradient.addColorStop(1, '#000000');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add some stars
            for (let i = 0; i < 100; i++) {
              ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.1})`;
              ctx.beginPath();
              ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 1.5 + 0.5,
                0, Math.PI * 2
              );
              ctx.fill();
            }
            canvases.push(canvas);
          }
        }
      }

      if (canvases.length === 0) return;

      framesRef.current = canvases;
      setFramesReady(true);

      const displayCanvas = canvasRef.current;
      if (!displayCanvas) return;

      displayCanvas.width = canvases[0].width;
      displayCanvas.height = canvases[0].height;

      // Boomerang animation
      let index = 0;
      let direction = 1;
      let lastTime = performance.now();
      const interval = 1000 / 20;

      const render = (now) => {
        const displayCanvas = canvasRef.current;
        if (!displayCanvas) {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          return;
        }

        if (now - lastTime >= interval) {
          const ctx = displayCanvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
            ctx.drawImage(canvases[index], 0, 0);
          }
          
          index += direction;
          if (index >= canvases.length - 1) {
            index = canvases.length - 1;
            direction = -1;
          } else if (index <= 0) {
            index = 0;
            direction = 1;
          }
          lastTime = now;
        }
        animationFrameRef.current = requestAnimationFrame(render);
      };

      animationFrameRef.current = requestAnimationFrame(render);
    };

    loadImages();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // --- Mount animation ---
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Parallax effect ---
  useEffect(() => {
    if (!bgRef.current) return;

    const strength = 12;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * strength;
      targetY = ((e.clientY - cy) / cy) * strength;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`;
      }
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // --- Navigation handlers ---
  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="notfound-container">
      {/* Background */}
      <div ref={bgRef} className="notfound-background">
        <div className="notfound-background-wrapper">
          <canvas 
            ref={canvasRef} 
            className={`notfound-canvas ${framesReady ? 'visible' : ''}`}
          />
          
          {!framesReady && (
            <div className="notfound-fallback" />
          )}
          
          <div className="notfound-overlay" />
          <div className="notfound-radial" />
          <div className="notfound-grid" />
          
          {/* Glowing orbs */}
          <div className="notfound-orb notfound-orb-1" />
          <div className="notfound-orb notfound-orb-2" />
          <div className="notfound-orb notfound-orb-3" />
        </div>
      </div>

      {/* Content */}
      <div className={`notfound-content ${mounted ? 'mounted' : ''}`}>
        {/* Floating particles */}
        <div className="notfound-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="notfound-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 3}s`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
              }}
            />
          ))}
        </div>

        {/* 404 Error Code */}
        <div className="notfound-error-code">
          <span className="notfound-digit notfound-digit-1">4</span>
          <span className="notfound-digit notfound-digit-2">
            <AlertCircle size={clamp(60, 100, 120)} className="notfound-alert-icon" />
          </span>
          <span className="notfound-digit notfound-digit-3">4</span>
        </div>

        {/* Message */}
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-description">
          The signal you're looking for seems to have drifted into the void.
          <br />
          Let's get you back on track.
        </p>

        {/* Stats */}
        <div className="notfound-stats">
          <div className="notfound-stat">
            <Wifi size={16} className="notfound-stat-icon" />
            <span>Signal Lost</span>
          </div>
          <div className="notfound-stat">
            <Globe size={16} className="notfound-stat-icon" />
            <span>404 Error</span>
          </div>
          <div className="notfound-stat">
            <Zap size={16} className="notfound-stat-icon" />
            <span>Reconnect</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="notfound-buttons">
          <button onClick={goBack} className="notfound-btn notfound-btn-secondary">
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
          <button onClick={goHome} className="notfound-btn notfound-btn-primary">
            <Home size={20} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function for clamp
function clamp(min, value, max) {
  return Math.min(Math.max(value, min), max);
}

export default NotFound;