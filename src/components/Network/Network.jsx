import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Radar, Gauge, ShieldCheck, Split, ArrowRight } from 'lucide-react';
import './Network.css';
import Tel1 from "../../assets/Tel1.webp";
import Tel2 from "../../assets/Tel2.webp";
import Tel3 from "../../assets/Tel3.webp";
import Tel4 from "../../assets/Tel4.webp";

const TICKER_ITEMS = [
  'Chicago PoP — nominal',
  'Dallas PoP — nominal',
  'Atlanta PoP — nominal',
  'Denver PoP — nominal',
  'Seattle PoP — maintenance window 02:00–02:30 CT',
  'New York PoP — nominal',
];

const NETWORK_STATS = [
  { icon: Gauge, value: '0.8ms', label: 'Median hop' },
  { icon: Activity, value: '99.99%', label: 'Rolling uptime' },
  { icon: ShieldCheck, value: '142', label: 'Points of presence' },
];

const BLIPS = [
  { top: '30%', left: '62%' },
  { top: '55%', left: '38%' },
  { top: '70%', left: '68%' },
  { top: '40%', left: '25%' },
  { top: '20%', left: '48%' },
];

const ROUTES = [
  { 
    title: 'Trans-Pacific route', 
    body: 'Direct subsea path linking West Coast PoPs to Asia-Pacific exchanges.', 
    image: Tel1 
  },
  { 
    title: 'Atlantic crossing', 
    body: 'A second, physically separate cable — if one fails, traffic never notices.', 
    image: Tel2 
  },
  { 
    title: 'Gulf Coast ring', 
    body: 'A closed loop between Houston, New Orleans, and Miami with no single point of failure.', 
    image: Tel3 
  },
  { 
    title: 'Midwest interconnect', 
    body: 'Chicago and Dallas cross-link, keeping the center of the map one hop from either coast.', 
    image: Tel4 
  },
  { 
    title: 'Northern spur', 
    body: 'Seattle to Denver, built for the routes everyone else treats as an afterthought.', 
    image: Tel1 
  },
];

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

function Network() {
  const navigate = useNavigate();

  return (
    <div className="network-page">
      {/* Section 1: Hero — headline with an image clipped into the accent phrase */}
      <section className="network-hero">
        <span className="eyebrow"><Radar size={12} /> Network</span>
        <h1 className="network-hero-title">
          The network, <span className="clipped-word">in real time.</span>
        </h1>
        <p className="network-hero-body">
          Every sweep of the radar below is a heartbeat from an actual point of presence.
        </p>
      </section>

      {/* Section 2: Radar sweep + live ticker */}
      <section className="network-live-section">
        <div className="radar-panel liquid-glass-strong">
          <div className="radar-sweep">
            <div className="radar-rings" />
            <div className="radar-blade" />
            {BLIPS.map((pos, i) => (
              <span
                key={i}
                className="radar-blip"
                style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.6}s` }}
              />
            ))}
          </div>
          <div className="radar-caption">
            <span className="pulse-dot" /> Live sweep — regional backbone
          </div>
        </div>

        <div className="ticker-wrap liquid-glass">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="ticker-item">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Uptime stats */}
      <section className="network-stats-section">
        <div className="network-stats">
          {NETWORK_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div className="network-stat-card liquid-glass" key={i}>
                <Icon size={18} className="icon-blue" />
                <span className="network-stat-value">{stat.value}</span>
                <span className="network-stat-label">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4: Redundant routes — horizontal scroll-snap gallery */}
      <section className="routes-section">
        <div className="routes-header">
          <span className="eyebrow"><Split size={12} /> Redundancy</span>
          <h2 className="section-title">One path fails,<br />traffic never learns about it.</h2>
        </div>
        <div className="routes-scroller">
          {ROUTES.map((route, i) => (
            <div className="route-card" key={i}>
              <DuoImage src={route.image} alt={route.title} className="route-image" />
              <div className="route-body">
                <h3 className="route-title">{route.title}</h3>
                <p className="route-text">{route.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="routes-scroll-hint">
          <span className="routes-scroll-track" />
          drag to explore
        </div>
      </section>

      {/* Section 5: CTA with a diagonally clipped image band */}
      <section className="network-cta-section">
        <div className="network-cta-image-band">
          <DuoImage
            src={Tel4}
            alt=""
            className="network-cta-image"
          />
        </div>
        <div className="network-cta-inner liquid-glass-strong">
          <h2 className="network-cta-title">Check coverage at your address.</h2>
          <p className="network-cta-body">Ten seconds to find out if we're already on your street.</p>
          <button type="button" className="btn-primary" onClick={() => navigate('/get-started')}>
            <span className="btn-primary-content"><ArrowRight size={16} /> Check my address</span>
            <span className="btn-primary-overlay" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Network;