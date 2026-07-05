import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon, Building2, Router, Wifi, Shield, Server, ArrowRight,
  Zap, Clock, CheckCircle2,
} from 'lucide-react';
import './Solution.css';
import Tel1 from "../../assets/Tel1.webp";
import Tel2 from "../../assets/Tel2.webp";
import Tel3 from "../../assets/Tel3.webp";
import Tel4 from "../../assets/Tel4.webp";

// --- Signature: pointer-tracked 3D tilt + light-sheen, per tile ---
function useTilt(strength = 10) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--ry', `${px * strength}deg`);
    el.style.setProperty('--rx', `${-py * strength}deg`);
    el.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return { ref, onMove, onLeave };
}

function TiltCard({ className = '', children }) {
  const { ref, onMove, onLeave } = useTilt();
  return (
    <div
      ref={ref}
      className={`tilt-card liquid-glass ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="tilt-sheen" />
      <div className="tilt-content">{children}</div>
    </div>
  );
}

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

const TILES = [
  { icon: HomeIcon, title: 'Home', span: 'wide', body: 'Up to 10 Gbps symmetrical, whole-home mesh included, zero data caps.' },
  { icon: Building2, title: 'Business', span: 'tall', body: 'Dedicated bandwidth and 5 static IPs, with a support queue that answers.' },
  { icon: Router, title: 'Enterprise', span: '', body: 'Diverse-path redundancy and an SLA that means something.' },
  { icon: Wifi, title: 'Mesh add-on', span: '', body: 'Blanket every room — no dead zones, no extra router to manage.' },
  { icon: Shield, title: 'Managed security', span: '', body: 'Network-level filtering, patched automatically, no client software.' },
  { icon: Server, title: 'Colocation', span: 'wide', body: 'Rack space in our own facilities, on the same backbone as everything else.' },
];

const INCLUDED_FEATURES = [
  { icon: Zap, title: 'No data caps', body: 'Every tier, home or enterprise, runs unlimited with no throttling after a threshold.' },
  { icon: Shield, title: 'Network-level security', body: 'Filtering and patching happen upstream — nothing to install, nothing to maintain.' },
  { icon: Clock, title: '24/7 monitoring', body: 'Most issues get flagged and fixed before you notice anything changed.' },
];

const GALLERY = [
  {
    title: 'In the home',
    body: 'One router, mesh nodes tucked out of sight, and a connection that keeps up with everyone in the house at once.',
    image: Tel1,
  },
  {
    title: 'In the office',
    body: 'Dedicated bandwidth per floor, static IPs for anything that needs one, and a line that survives a full building of video calls.',
    image: Tel2,
  },
  {
    title: 'In the rack',
    body: 'Colocation on the same backbone as everything else we run — no extra hop between your hardware and the core.',
    image: Tel3,
  },
];

function Solution() {
  const navigate = useNavigate();

  return (
    <div className="solutions-page">
      {/* Section 1: Hero + interactive tilt bento grid */}
      <section className="solutions-hero-section">
        <div className="solutions-hero">
          <span className="eyebrow">Solutions</span>
          <h1 className="solutions-hero-title">Built around how<br />you actually connect.</h1>
          <p className="solutions-hero-body">
            Six ways in, one backbone underneath. Move your mouse over a tile.
          </p>
        </div>

        <div className="solutions-bento">
          {TILES.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <TiltCard key={i} className={tile.span}>
                <Icon size={22} className="tilt-icon" />
                <h3 className="tilt-title">{tile.title}</h3>
                <p className="tilt-body">{tile.body}</p>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* Section 2: Universal features, paired with an image */}
      <section className="solutions-included">
        <div className="included-image-col">
          <DuoImage
            src={Tel4}
            alt="Fiber optic strands"
            className="included-image"
          />
        </div>
        <div className="included-copy-col">
          <span className="eyebrow">Every plan</span>
          <h2 className="section-title">Included, no matter<br />what you pick.</h2>
          <div className="included-list">
            {INCLUDED_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div className="included-item" key={i}>
                  <Icon size={18} className="icon-blue" />
                  <div>
                    <h3 className="included-item-title">{f.title}</h3>
                    <p className="included-item-body">{f.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Use-case gallery */}
      <section className="solutions-gallery-section">
        <div className="gallery-header">
          <span className="eyebrow">Where it fits</span>
          <h2 className="section-title">See it in a real space.</h2>
        </div>
        <div className="solutions-gallery">
          {GALLERY.map((item, i) => (
            <div className="gallery-card" key={i}>
              <DuoImage src={item.image} alt={item.title} className="gallery-image" />
              <div className="gallery-body">
                <h3 className="gallery-title">{item.title}</h3>
                <p className="gallery-text">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: CTA with image backdrop */}
      <section className="solutions-cta-section">
        <DuoImage
          src={Tel3}
          alt=""
          className="solutions-cta-image"
        />
        <div className="solutions-cta-inner liquid-glass-strong">
          <h2 className="solutions-cta-title">Not sure which one fits?</h2>
          <p className="solutions-cta-body">Tell us how you use the internet — we'll tell you which plan to skip.</p>
          <div className="solutions-cta-actions">
            <button type="button" className="btn-primary" onClick={() => navigate('/get-started')}>
              <span className="btn-primary-content"><ArrowRight size={16} /> Talk to sales</span>
              <span className="btn-primary-overlay" />
            </button>
            <button type="button" className="btn-secondary liquid-glass" onClick={() => navigate('/support')}>
              <CheckCircle2 size={16} className="icon-blue" /> Compare plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Solution;