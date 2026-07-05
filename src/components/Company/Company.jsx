import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import './Company.css';
import img1 from "../../assets/img1.webp";
import img2 from "../../assets/img2.webp";
import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";

const TEAM_PHOTOS = [
  img1,
  img2,
  img3,
  img4,
];

const TEAM = [
  { name: 'Elena Voss', role: 'Co-founder & CEO', image: TEAM_PHOTOS[0] },
  { name: 'Marcus Aldana', role: 'Co-founder & Network Architect', image: TEAM_PHOTOS[1] },
  { name: 'Priya Rao', role: 'Head of Field Operations', image: TEAM_PHOTOS[2] },
  { name: 'Tomasz Nowak', role: 'Head of Support', image: TEAM_PHOTOS[3] },
];

const MILESTONES = [
  { year: '2018', label: 'First backbone segment lit' },
  { year: '2020', label: '10,000th home connected' },
  { year: '2023', label: 'Expanded to 6 subsea routes' },
  { year: '2026', label: '142 points of presence' },
];

const CONTACT_DETAILS = [
  { icon: MapPin, label: '4th Floor, Beacon Tower, 221 Fiberline Ave, Austin, TX 78701' },
  { icon: Phone, label: '+1 (800) 555-1234' },
  { icon: Mail, label: 'hello@connectbeyond.com' },
];

// Floating-label field: label sits inside the input until it's focused
// or filled, using :placeholder-shown rather than any JS state.
function FloatingField({ id, label, type = 'text', textarea = false }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="form-field">
      <Tag id={id} name={id} type={textarea ? undefined : type} placeholder=" " required />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function Company() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="company-page">
      <section className="company-hero">
        <span className="eyebrow"><Sparkles size={12} /> Company</span>
        <h1 className="company-hero-title">Built by people who<br />hated their old ISP too.</h1>
      </section>

      {/* Signature: quote pinned via position: sticky while milestones scroll past it */}
      <section className="company-pin-section">
        <div className="company-pin-sticky">
          <p className="company-pin-quote">
            "We got tired of apologizing for someone else's network,<br />
            so we built our own."
          </p>
        </div>
        <div className="company-milestones">
          {MILESTONES.map((m, i) => (
            <div className="milestone-row" key={i}>
              <span className="milestone-year">{m.year}</span>
              <span className="milestone-label">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="company-team">
        <h2 className="section-title">The people behind it</h2>
        <div className="team-grid">
          {TEAM.map((person, i) => (
            <div className="team-card" key={i}>
              <div className="team-photo-wrap">
                <img src={person.image} alt={person.name} className="team-photo" loading="lazy" />
              </div>
              <span className="team-name">{person.name}</span>
              <span className="team-role">{person.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact — details column + a form inside an animated rotating-gradient border */}
      <section className="company-contact">
        <div className="contact-info">
          <span className="eyebrow">Get in touch</span>
          <h2 className="section-title">Say hello, or<br />send a complaint.</h2>
          <p className="contact-body">
            We read every message ourselves — no ticket queue, no auto-reply loop.
          </p>
          <ul className="contact-details">
            {CONTACT_DETAILS.map((d, i) => {
              const Icon = d.icon;
              return (
                <li key={i}>
                  <Icon size={16} className="icon-blue" />
                  <span>{d.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="contact-form-wrap">
          <div className="contact-form-inner">
            {sent ? (
              <div className="contact-success">
                <CheckCircle2 size={28} className="icon-blue" />
                <h3>Message sent</h3>
                <p>We'll get back to you within a day.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <FloatingField id="name" label="Your name" />
                <FloatingField id="email" label="Email address" type="email" />
                <FloatingField id="message" label="What's on your mind?" textarea />
                <button type="submit" className="btn-primary contact-submit">
                  <span className="btn-primary-content"><Send size={15} /> Send message</span>
                  <span className="btn-primary-overlay" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="company-cta">
        <button type="button" className="btn-primary" onClick={() => navigate('/get-started')}>
          <span className="btn-primary-content">Join the network</span>
          <span className="btn-primary-overlay" />
        </button>
      </section>
    </div>
  );
}

export default Company;