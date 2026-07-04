import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Shield, Wifi, Globe, Zap, Phone, ArrowRight } from 'lucide-react';
import './Home.css';

// --- Constants ---
const NAV_LINKS = ['Solutions', 'Network', 'Support', 'Company'];

// High-quality telecom/technology images for the "video" effect
const IMAGE_SOURCES = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1600&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
  'https://images.unsplash.com/photo-1563770551462-6d1b2d8b8f6b?w=1600&q=80',
];

// --- LogoMark (inline SVG) ---
const LogoMark = () => (
  <svg className="logo-svg" width="44" height="26" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="3" width="14" height="20" rx="3" fill="currentColor" />
    <rect x="16" y="3" width="12" height="20" rx="3" fill="currentColor" />
    <rect x="30" y="3" width="14" height="20" rx="3" fill="currentColor" />
  </svg>
);

// --- Main App Component ---
function Home() {
  const [mounted, setMounted] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  const videoBgRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const framesRef = useRef([]);
  const animationFrameRef = useRef(null);

  // --- Effect 1: Image sequence "boomerang" setup ---
  useEffect(() => {
    const loadImages = async () => {
      const canvases = [];

      for (const src of IMAGE_SOURCES) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = src;
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          const canvas = document.createElement('canvas');
          const maxWidth = 1200;
          const scale = Math.min(1, maxWidth / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          
          // Check if ctx exists
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvases.push(canvas);
          }
        } catch (error) {
          // Fallback canvas with gradient
          const canvas = document.createElement('canvas');
          canvas.width = 1200;
          canvas.height = 675;
          const ctx = canvas.getContext('2d');
          
          // Check if ctx exists
          if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#0a1628');
            gradient.addColorStop(0.5, '#1a2a4a');
            gradient.addColorStop(1, '#0a1628');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            canvases.push(canvas);
          }
        }
      }

      if (canvases.length === 0) return;

      framesRef.current = canvases;
      setFramesReady(true);

      const displayCanvas = displayCanvasRef.current;
      if (!displayCanvas) return;

      displayCanvas.width = canvases[0].width;
      displayCanvas.height = canvases[0].height;

      // Start boomerang animation
      let index = 0;
      let direction = 1;
      let lastTime = performance.now();
      const interval = 1000 / 24;

      const render = (now) => {
        // Check if displayCanvas still exists
        const displayCanvas = displayCanvasRef.current;
        if (!displayCanvas) {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          return;
        }

        if (now - lastTime >= interval) {
          const ctx = displayCanvas.getContext('2d');
          
          // Check if ctx exists
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

  // --- Effect 2: Mount fade-in ---
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Effect 3: Parallax mouse tracking ---
  useEffect(() => {
    if (!videoBgRef.current) return;

    const strength = 16;
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
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      
      if (videoBgRef.current) {
        videoBgRef.current.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.08)`;
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

  return (
    <div className="app-container">
      {/* Background Layer with zoom effect */}
      <div ref={videoBgRef} className="background-layer">
        <div className="background-wrapper">
          <canvas 
            ref={displayCanvasRef} 
            className={`background-canvas ${framesReady ? 'visible' : ''}`}
          />
          
          {/* Fallback gradient while images load */}
          {!framesReady && (
            <div className="background-fallback" />
          )}
          
          {/* Overlay gradients */}
          <div className="background-overlay" />
          <div className="background-radial" />
          <div className="background-grid" />
        </div>
      </div>

      {/* Hero Title */}
      <div className="hero-content">
        <div className={`hero-title-wrapper ${mounted ? 'mounted' : ''}`}>
          <h1 className="hero-title">Connect Beyond</h1>
        </div>
        <p className={`hero-subtitle ${mounted ? 'mounted' : ''}`}>
          Next-generation fiber network for the digital frontier
        </p>
      </div>

      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-inner liquid-glass">
          <div className="nav-left">
            <LogoMark />
            <div className="nav-links">
              {NAV_LINKS.map((link) => (
                <a key={link} href="#" className="nav-link">
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          <div className="nav-right">
            <a href="#" className="nav-signin">Sign in</a>
            <a href="#" className="nav-cta liquid-glass-strong">
              <span className="nav-cta-text">Get started</span>
              <span className="nav-cta-icon">Start</span>
              <ArrowRight size={14} className="nav-cta-arrow" />
            </a>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className={`bottom-section ${mounted ? 'mounted' : ''}`}>
        <div className="bottom-inner">
          {/* Left Stats */}
          <div className="stats-container">
            <div className="stats-text">
              <div className="stats-item">
                <Wifi size={14} className="stats-icon" />
                <span>99.99% uptime</span>
              </div>
              <div className="stats-item">
                <Globe size={14} className="stats-icon" />
                <span>25+ countries covered</span>
              </div>
            </div>
          </div>

          {/* Center Buttons */}
          <div className="buttons-container">
            <a href="#" className="btn-primary">
              <span className="btn-primary-content">
                <Sparkles size={16} />
                <span className="btn-primary-text-sm">Start</span> building
              </span>
              <span className="btn-primary-overlay" />
            </a>
            <a href="#" className="btn-secondary liquid-glass">
              <Shield size={16} className="icon-blue" />
              <span className="btn-secondary-text">Explore</span> network
            </a>
          </div>

          {/* Right Stats */}
          <div className="stats-container">
            <div className="stats-text stats-right">
              <div className="stats-item">
                <Phone size={14} className="stats-icon" />
                <span>24/7 dedicated support</span>
              </div>
              <div className="stats-item">
                <Zap size={14} className="stats-icon" />
                <span>10Gbps symmetrical</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className={`mobile-stats ${mounted ? 'mounted' : ''}`}>
        <span className="mobile-stat">
          <Wifi size={12} /> 99.99%
        </span>
        <span className="mobile-stat">
          <Globe size={12} /> 25+
        </span>
        <span className="mobile-stat">
          <Zap size={12} /> 10Gbps
        </span>
      </div>
    </div>
  );
}

export default Home;