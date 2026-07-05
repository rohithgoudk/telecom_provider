import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LifeBuoy, MessageCircle, Phone, Mail, ChevronDown, ArrowRight,
} from 'lucide-react';
import './Support.css';
import Tel1 from "../../assets/Tel1.webp";
import Tel2 from "../../assets/Tel2.webp";
import Tel3 from "../../assets/Tel3.webp";
import Tel4 from "../../assets/Tel4.webp";

const CHANNELS = [
  { icon: MessageCircle, title: 'Live chat', body: 'Under 60 seconds, 24/7.' },
  { icon: Phone, title: 'Phone', body: 'A person, not a menu tree.' },
  { icon: Mail, title: 'Email', body: 'For anything that can wait an hour.' },
];

const RESOURCES = [
  { 
    title: 'Setting up your mesh router', 
    duration: '3:12', 
    image: Tel1 
  },
  { 
    title: 'Reading your usage dashboard', 
    duration: '2:04', 
    image: Tel2 
  },
  { 
    title: 'Troubleshooting a slow connection', 
    duration: '4:47', 
    image: Tel3 
  },
];

const STATUS_COUNT = 36;
const WARN_INDEXES = new Set([9, 22]);

const FAQS = [
  { q: 'How fast can I get installed?', a: 'Most addresses can be scheduled within 3 business days, with same-day slots often available in core coverage areas.' },
  { q: 'Is there a data cap?', a: 'No. Every plan, home or business, is unlimited with no throttling after a threshold.' },
  { q: 'Can I keep my own router?', a: 'Yes — bring your own hardware, or use the one we provide at no extra cost.' },
  { q: 'What happens during an outage?', a: 'Our monitoring usually flags an issue before you do. Status updates post automatically to your account.' },
];

const STEPS = ['Open a ticket', 'Get matched to a specialist', 'Resolved or escalated'];

// Reusable duotone image (grayscale + blue color-blend)
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

// Native <details>/<summary> — no JS state needed for the accordion itself
function FaqItem({ q, a }) {
  return (
    <details className="faq-item">
      <summary className="faq-summary">
        <span>{q}</span>
        <ChevronDown size={16} className="faq-chevron" />
      </summary>
      <div className="faq-answer-wrap">
        <p className="faq-answer">{a}</p>
      </div>
    </details>
  );
}

// Signature: cursor-tracked spotlight — the image only reveals near the pointer,
// like shining a flashlight around for help
function SpotlightCta({ children }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  return (
    <div ref={ref} className="spotlight-cta" onMouseMove={handleMove}>
      <DuoImage
        src={Tel4}
        alt=""
        className="spotlight-image"
      />
      <div className="spotlight-veil" />
      <div className="spotlight-content">{children}</div>
    </div>
  );
}

function Support() {
  const navigate = useNavigate();

  return (
    <div className="support-page">
      {/* Hero, with a pure-CSS typewriter status line */}
      <section className="support-hero">
        <span className="eyebrow"><LifeBuoy size={12} /> Support</span>
        <h1 className="support-hero-title">Answers, or a<br />human — your call.</h1>
        <p className="support-status-line">
          <span className="pulse-dot" />
          <span className="status-typewriter">All systems operational.</span>
        </p>
      </section>

      <section className="support-channels">
        {CHANNELS.map((c, i) => {
          const Icon = c.icon;
          return (
            <div className="channel-card liquid-glass" key={i}>
              <Icon size={20} className="icon-blue" />
              <h3 className="channel-title">{c.title}</h3>
              <p className="channel-body">{c.body}</p>
            </div>
          );
        })}
      </section>

      {/* Resource library — thumbnails with a pure-CSS play button + duration badge */}
      <section className="support-resources">
        <span className="eyebrow">Learn</span>
        <h2 className="section-title">Short videos,<br />no ticket required.</h2>
        <div className="resource-grid">
          {RESOURCES.map((r, i) => (
            <div className="resource-card" key={i}>
              <div className="resource-thumb">
                <DuoImage src={r.image} alt={r.title} className="resource-image" />
                <span className="resource-play" aria-hidden="true" />
                <span className="resource-duration">{r.duration}</span>
              </div>
              <h3 className="resource-title">{r.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Live status wall — a grid of pulsing PoP health dots */}
      <section className="support-status-wall">
        <span className="eyebrow">Status</span>
        <h2 className="section-title">Every point of presence,<br />at a glance.</h2>
        <div className="status-wall">
          {Array.from({ length: STATUS_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`status-dot ${WARN_INDEXES.has(i) ? 'warn' : ''}`}
              style={{ animationDelay: `${(i % 12) * 0.15}s` }}
              title={WARN_INDEXES.has(i) ? 'Maintenance window' : 'Nominal'}
            />
          ))}
        </div>
        <p className="status-wall-caption">2 of 36 regions in a scheduled maintenance window.</p>
      </section>

      <section className="support-stepper">
        <span className="eyebrow">How it works</span>
        <ol className="stepper-list">
          {STEPS.map((step, i) => (
            <li className="stepper-item" key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="support-faq">
        <h2 className="section-title">Common questions</h2>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      <section className="support-cta">
        <SpotlightCta>
          <div className="spotlight-panel liquid-glass-strong">
            <h2 className="spotlight-title">Still stuck?</h2>
            <p className="spotlight-body">Move your cursor around — or just talk to a person instead.</p>
            <button type="button" className="btn-primary" onClick={() => navigate('/get-started')}>
              <span className="btn-primary-content"><ArrowRight size={16} /> Start a chat</span>
              <span className="btn-primary-overlay" />
            </button>
          </div>
        </SpotlightCta>
      </section>
    </div>
  );
}

export default Support;