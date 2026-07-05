import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Shield, Wifi, Globe, Zap, Phone, ArrowRight,
  MapPin, Activity, Gauge, Clock, CheckCircle2, Building2,
  Home as HomeIcon, Router, Cable, Quote,
} from 'lucide-react';
import './Home.css';
import Tel1 from "../../assets/Tel1.webp";
import Tel2 from "../../assets/Tel2.webp";
import Tel3 from "../../assets/Tel3.webp";
import Tel4 from "../../assets/Tel4.webp";
import Tel5 from "../../assets/Tel5.webp";
import Tel6 from "../../assets/Tel6.webp";
import Tel7 from "../../assets/Tel7.webp";

// --- Constants ---
const ANIMATION_DURATION_MS = 4000;

// High-quality telecom/technology images for the "video" effect
const IMAGE_SOURCES = [
  Tel1,
  Tel2,
  Tel3,
  Tel4,
  Tel5,
  Tel6,
  Tel7,
];

// --- Shared scroll-reveal hook ---
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// --- Reusable duotone image ---
function DuoImage({ src, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`duo-image-wrap ${className}`}>
      {!failed && (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

// =====================================================================
// Section 1: Backbone / Coverage
// =====================================================================
const POP_NODES = [
  { x: 18, y: 30 }, { x: 28, y: 45 }, { x: 40, y: 38 }, { x: 50, y: 55 },
  { x: 60, y: 30 }, { x: 68, y: 62 }, { x: 78, y: 25 }, { x: 85, y: 48 },
  { x: 15, y: 65 },
];
const POP_LINKS = [[0,1],[1,2],[2,3],[2,4],[3,5],[4,5],[4,6],[6,7],[0,8],[8,1]];

function CoverageSection() {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} className={`section coverage-section ${inView ? 'in-view' : ''}`}>
      <div className="section-inner">
        <div className="section-copy">
          <span className="eyebrow"><MapPin size={12} /> Backbone</span>
          <h2 className="section-title">A private backbone,<br />not a rented one.</h2>
          <p className="section-body">
            Every point of presence on this map is ours — owned fiber, owned routing,
            no third-party bottlenecks between your building and the internet's core.
          </p>
          <div className="coverage-metrics">
            <div className="coverage-metric">
              <span className="coverage-metric-value">142</span>
              <span className="coverage-metric-label">points of presence</span>
            </div>
            <div className="coverage-metric">
              <span className="coverage-metric-value">6</span>
              <span className="coverage-metric-label">subsea cable routes</span>
            </div>
            <div className="coverage-metric">
              <span className="coverage-metric-value">0.8ms</span>
              <span className="coverage-metric-label">average node hop</span>
            </div>
          </div>
        </div>
        <div className="coverage-map liquid-glass">
          <svg viewBox="0 0 100 80" className="coverage-svg" preserveAspectRatio="xMidYMid meet">
            {POP_LINKS.map(([a, b], i) => (
              <line
                key={i}
                x1={POP_NODES[a].x} y1={POP_NODES[a].y}
                x2={POP_NODES[b].x} y2={POP_NODES[b].y}
                className="coverage-link"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
            {POP_NODES.map((n, i) => (
              <g key={i}>
                <circle cx={n.x} cy={n.y} className="coverage-node-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                <circle cx={n.x} cy={n.y} r="0.9" className="coverage-node" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// Interlude: full-bleed image break
// =====================================================================
function SignalInterlude() {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} className={`interlude ${inView ? 'in-view' : ''}`}>
      <DuoImage src={IMAGE_SOURCES[4]} className="interlude-image" />
      <div className="interlude-content">
        <span className="eyebrow"><Zap size={12} /> Infrastructure</span>
        <h2 className="interlude-title">
          Glass thinner than a<br />human hair, carrying<br />your entire day.
        </h2>
      </div>
    </section>
  );
}

// =====================================================================
// Section 2: Performance
// =====================================================================
const PERFORMANCE_STATS = [
  { icon: Gauge, value: '10 Gbps', label: 'Symmetrical, every plan' },
  { icon: Clock, value: '0.8 ms', label: 'Median backbone latency' },
  { icon: Activity, value: '99.99%', label: 'Verified network uptime' },
  { icon: Shield, value: '0.001%', label: 'Packet loss, peak hours' },
];

function PerformanceSection() {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} className={`section performance-section ${inView ? 'in-view' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow"><Activity size={12} /> Performance</span>
        <h2 className="section-title">Numbers you can call<br />and verify.</h2>
        <div className="performance-grid">
          {PERFORMANCE_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div className="performance-card liquid-glass" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                <Icon size={18} className="performance-icon" />
                <span className="performance-value">{stat.value}</span>
                <span className="performance-label">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// Section 3: Solutions
// =====================================================================
const SOLUTIONS = [
  {
    icon: HomeIcon, name: 'Home', image: Tel1,
    tagline: 'For households that never want to think about the router again.',
    features: ['Up to 10 Gbps symmetrical', 'Whole-home mesh included', 'No data caps, no contracts'],
  },
  {
    icon: Building2, name: 'Business', image: Tel2,
    tagline: 'Static IPs, priority routing, and a line that answers.',
    features: ['Dedicated bandwidth, not shared', '5 static IP addresses', '24/7 priority support queue'],
    featured: true,
  },
  {
    icon: Router, name: 'Enterprise', image: Tel3,
    tagline: 'Custom-built links for teams that measure downtime in revenue.',
    features: ['Diverse-path redundancy', 'SLA-backed response times', 'Dedicated account engineer'],
  },
];

function SolutionsSection() {
  const navigate = useNavigate();
  const [ref, inView] = useReveal();
  
  const handleGetPlan = (e, planName) => {
    e.preventDefault();
    navigate('/404');
  };

  return (
    <section ref={ref} className={`section solutions-section ${inView ? 'in-view' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow"><Sparkles size={12} /> Solutions</span>
        <h2 className="section-title">Built for how you<br />actually use it.</h2>
        <div className="solutions-grid">
          {SOLUTIONS.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <div className={`solution-card ${sol.featured ? 'liquid-glass-strong featured' : 'liquid-glass'}`} key={i}>
                <DuoImage src={sol.image} className="solution-image" />
                {sol.featured && <span className="solution-badge">Most connected</span>}
                <div className="solution-body">
                  <Icon size={22} className="solution-icon" />
                  <h3 className="solution-name">{sol.name}</h3>
                  <p className="solution-tagline">{sol.tagline}</p>
                  <ul className="solution-features">
                    {sol.features.map((f, j) => (
                      <li key={j}><CheckCircle2 size={14} className="icon-blue" /> {f}</li>
                    ))}
                  </ul>
                  {sol.featured ? (
                    <button 
                      onClick={(e) => handleGetPlan(e, sol.name)}
                      className="btn-primary"
                    >
                      <span className="btn-primary-content">
                        Get {sol.name.toLowerCase()} plan <ArrowRight size={14} />
                      </span>
                      <span className="btn-primary-overlay" />
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => handleGetPlan(e, sol.name)}
                      className="btn-secondary liquid-glass"
                    >
                      Get {sol.name.toLowerCase()} plan <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// Section 4: How it works
// =====================================================================
const STEPS = [
  { number: '01', title: 'Check your address', body: 'Enter your address and we tell you within seconds whether our fiber already reaches your building.' },
  { number: '02', title: 'Pick an install window', body: 'Choose a two-hour slot. Our technician runs the line and mounts the ONT — no drilling headaches on your end.' },
  { number: '03', title: 'Get connected', body: 'Your router activates automatically the moment the fiber lights up. Most homes are online in under an hour.' },
];

function HowItWorksSection() {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} className={`section steps-section ${inView ? 'in-view' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow"><Cable size={12} /> Getting connected</span>
        <h2 className="section-title">Three steps.<br />No surprises.</h2>
        <div className="steps-list">
          {STEPS.map((step, i) => (
            <div className="step-row" key={i} style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="step-number">{step.number}</span>
              <div className="step-copy">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// Section 5: Live network pulse
// =====================================================================
function LivePulseSection() {
  const [ref, inView] = useReveal();
  const [samples, setSamples] = useState(() => Array.from({ length: 24 }, () => 40 + Math.random() * 40));

  useEffect(() => {
    const id = setInterval(() => {
      setSamples((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        const delta = (Math.random() - 0.5) * 24;
        next.push(Math.min(96, Math.max(20, last + delta)));
        return next;
      });
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const points = samples.map((v, i) => `${(i / (samples.length - 1)) * 100},${100 - v}`).join(' ');

  return (
    <section ref={ref} className={`section pulse-section ${inView ? 'in-view' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow"><Activity size={12} /> Live</span>
        <h2 className="section-title">Watch the network<br />breathe.</h2>
        <div className="pulse-panel liquid-glass-strong">
          <div className="pulse-header">
            <span className="pulse-live"><span className="pulse-dot" /> Live throughput</span>
            <span className="pulse-region">Regional PoP — Chicago</span>
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pulse-graph">
            <polyline points={points} className="pulse-line" />
          </svg>
          <div className="pulse-readouts">
            <div><span className="pulse-readout-label">Upload</span><span className="pulse-readout-value">9.4 Gbps</span></div>
            <div><span className="pulse-readout-label">Download</span><span className="pulse-readout-value">9.8 Gbps</span></div>
            <div><span className="pulse-readout-label">Jitter</span><span className="pulse-readout-value">0.06 ms</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// Section 6: Testimonials
// =====================================================================
const TESTIMONIALS = [
  { quote: "We moved our render farm onto their backbone and stopped thinking about bandwidth entirely.", name: 'Priya N.', role: 'Studio lead, independent VFX house', image: Tel5 },
  { quote: "Support picked up in under a minute, on a Sunday. That never happens with our old provider.", name: 'Marcus O.', role: 'IT manager, regional logistics firm', image: Tel4 },
  { quote: "Installation took forty minutes. My kids were mid-stream and never noticed the switch.", name: 'Dana K.', role: 'Home fiber customer', image: Tel7 },
];

function TestimonialsSection() {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} className={`section testimonials-section ${inView ? 'in-view' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow"><Quote size={12} /> From the network</span>
        <h2 className="section-title">People who stopped<br />thinking about it.</h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card liquid-glass" key={i} style={{ transitionDelay: `${i * 100}ms` }}>
              <DuoImage src={t.image} className="testimonial-image" />
              <div className="testimonial-body">
                <Quote size={20} className="testimonial-mark icon-blue" />
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-attribution">
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// Section 7: CTA
// =====================================================================
function CtaSection() {
  const navigate = useNavigate();
  const [ref, inView] = useReveal();

  const handleCheckAddress = (e) => {
    e.preventDefault();
    navigate('/404');
  };

  const handleTalkToSales = (e) => {
    e.preventDefault();
    navigate('/404');
  };

  return (
    <section ref={ref} className={`section cta-section ${inView ? 'in-view' : ''}`}>
      <DuoImage src={Tel3} className="cta-image" />
      <div className="section-inner">
        <div className="cta-inner liquid-glass-strong">
          <h2 className="cta-title">Ready to stop<br />waiting on load times?</h2>
          <p className="cta-body">Check availability at your address in under ten seconds.</p>
          <div className="cta-actions">
            <button onClick={handleCheckAddress} className="btn-primary">
              <span className="btn-primary-content"><Sparkles size={16} /> Check my address</span>
              <span className="btn-primary-overlay" />
            </button>
            <button onClick={handleTalkToSales} className="btn-secondary liquid-glass">
              <Phone size={16} className="icon-blue" /> Talk to sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// Main Home Component
// =====================================================================
function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  const videoBgRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const framesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const stoppedRef = useRef(false);
  const stopTimeoutRef = useRef(null);

  // --- Navigation handlers for hero buttons ---
  const handleStartBuilding = (e) => {
    e.preventDefault();
    navigate('/404');
  };

  const handleExploreNetwork = (e) => {
    e.preventDefault();
    navigate('/404');
  };

  // --- Effect 1: Image sequence "boomerang" ---
  useEffect(() => {
    stoppedRef.current = false;

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

          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvases.push(canvas);
          }
        } catch (error) {
          console.warn('Failed to load image:', src, error);
          // Fallback canvas with gradient
          const canvas = document.createElement('canvas');
          canvas.width = 1200;
          canvas.height = 675;
          const ctx = canvas.getContext('2d');

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

      if (canvases.length === 0) {
        console.warn('No canvases loaded');
        return;
      }
      if (stoppedRef.current) return;

      framesRef.current = canvases;
      setFramesReady(true);

      const displayCanvas = displayCanvasRef.current;
      if (!displayCanvas) return;

      displayCanvas.width = canvases[0].width;
      displayCanvas.height = canvases[0].height;

      let index = 0;
      let direction = 1;
      let lastTime = performance.now();
      const interval = 1000 / 24;

      const drawFrame = (i) => {
        const canvas = displayCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(canvases[i], 0, 0);
        }
      };

      stopTimeoutRef.current = setTimeout(() => {
        stoppedRef.current = true;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        drawFrame(index);
      }, ANIMATION_DURATION_MS);

      const render = (now) => {
        if (stoppedRef.current) {
          animationFrameRef.current = null;
          return;
        }

        const displayCanvas = displayCanvasRef.current;
        if (!displayCanvas) {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          return;
        }

        if (now - lastTime >= interval) {
          drawFrame(index);

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
      stoppedRef.current = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
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
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Layer */}
        <div ref={videoBgRef} className="background-layer">
          <div className="background-wrapper">
            <canvas
              ref={displayCanvasRef}
              className={`background-canvas ${framesReady ? 'visible' : ''}`}
            />

            {!framesReady && (
              <div className="background-fallback" />
            )}

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

        {/* Bottom Section */}
        <div className={`bottom-section ${mounted ? 'mounted' : ''}`}>
          <div className="bottom-inner">
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

            <div className="buttons-container">
              <button onClick={handleStartBuilding} className="btn-primary">
                <span className="btn-primary-content">
                  <Sparkles size={16} />
                  <span className="btn-primary-text-sm">Start</span> building
                </span>
                <span className="btn-primary-overlay" />
              </button>
              <button onClick={handleExploreNetwork} className="btn-secondary liquid-glass">
                <Shield size={16} className="icon-blue" />
                <span className="btn-secondary-text">Explore</span> network
              </button>
            </div>

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

        <div className={`hero-scroll-cue ${mounted ? 'mounted' : ''}`}>
          <span className="hero-scroll-line" />
          scroll
        </div>
      </section>

      {/* Scrollable content below the hero */}
      <main className="page-sections">
        <CoverageSection />
        <SignalInterlude />
        <PerformanceSection />
        <SolutionsSection />
        <HowItWorksSection />
        <LivePulseSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </div>
  );
}

export default Home;