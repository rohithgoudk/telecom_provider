import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X, Image as ImageIcon } from 'lucide-react';
import './Header.css';
import logo from '../../assets/logo.webp';

const NAV_LINKS = [
  { label: 'Home' , path: '/' },
  { label: 'Solutions', path: '/solution' },
  { label: 'Network', path: '/network' },
  { label: 'Support', path: '/support' },
  { label: 'Company', path: '/company' },
];

function LogoMark({ onNavigate }) {
  const [failed, setFailed] = useState(false);

  return (
    <a
      href="/"
      className="logo-link"
      onClick={(e) => {
        e.preventDefault();
        onNavigate('/');
      }}
    >
      <span className="logo-image-slot">
        {!failed ? (
          <img
            src={logo}
            alt="Company logo"
            className="logo-image"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="logo-placeholder" aria-hidden="true">
            <ImageIcon size={16} />
          </span>
        )}
      </span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="site-header">
      <nav className="nav-container">
        <div className="nav-inner liquid-glass">
          {/* Logo pinned to the far left */}
          <div className="nav-left">
            <LogoMark onNavigate={handleNavigate} />
          </div>

          {/* Links, sign in, CTA, and mobile toggle grouped at the far right */}
          <div className="nav-right">
            <div className="nav-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(link.path);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="/signin"
              className="nav-signin"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/signup');
              }}
            >
              Sign up
            </a>

            <a
              href="/get-started"
              className="nav-cta liquid-glass-strong"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/get-started');
              }}
            >
              <span className="nav-cta-text">Get started</span>
              <span className="nav-cta-icon">Start</span>
              <ArrowRight size={14} className="nav-cta-arrow" />
            </a>

            <button
              type="button"
              className="nav-menu-toggle liquid-glass"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        <div className={`nav-mobile-panel liquid-glass-strong ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.path}
              className="nav-mobile-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(link.path);
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className="nav-mobile-link nav-mobile-signin"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/login');
            }}
          >
            Sign in
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;