import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail, Phone, Image as ImageIcon } from 'lucide-react';
import './Footer.css';
import logo from '../../assets/logo.webp';

// Brand marks as self-contained inline SVGs — lucide-react doesn't
// guarantee logo/brand icons stay exported across versions, so these
// avoid depending on it entirely.
function IconGithub({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .32.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconX({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedin({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconInstagram({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconYoutube({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.498 6.186a2.994 2.994 0 0 0-2.108-2.117C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.39.524A2.994 2.994 0 0 0 .502 6.186 31.223 31.223 0 0 0 0 12a31.223 31.223 0 0 0 .502 5.814 2.994 2.994 0 0 0 2.108 2.117c1.885.524 9.39.524 9.39.524s7.505 0 9.39-.524a2.994 2.994 0 0 0 2.108-2.117A31.223 31.223 0 0 0 24 12a31.223 31.223 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z" />
    </svg>
  );
}

// Same set as the header nav, kept in sync so Quick Links always matches
const QUICK_LINKS = [
  { label: 'Solutions', path: '/solutions' },
  { label: 'Network', path: '/network' },
  { label: 'Support', path: '/support' },
  { label: 'Company', path: '/company' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', icon: IconGithub },
  { label: 'Twitter', icon: IconX },
  { label: 'LinkedIn', icon: IconLinkedin },
  { label: 'Instagram', icon: IconInstagram },
  { label: 'YouTube', icon: IconYoutube },
];

function FooterLogo({ onNavigate }) {
  const [failed, setFailed] = useState(false);

  return (
    <a
      href="/"
      className="footer-logo-link"
      onClick={(e) => {
        e.preventDefault();
        onNavigate('/');
      }}
    >
      <span className="footer-logo-slot">
        {!failed ? (
          <img
            src={logo}
            alt="Company logo"
            className="footer-logo-image"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="footer-logo-placeholder" aria-hidden="true">
            <ImageIcon size={16} />
          </span>
        )}
      </span>
    </a>
  );
}

function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => navigate(path);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand column */}
          <div className="footer-brand">
            <FooterLogo onNavigate={handleNavigate} />
            <p className="footer-tagline">
              Next-generation fiber network for the digital frontier.
            </p>
            <div className="footer-socials">
              {SOCIAL_LINKS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="footer-social-btn liquid-glass"
                  aria-label={label}
                  onClick={() => handleNavigate('/404')}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links — mirrors the header nav */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick links</h3>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="footer-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(link.path);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div className="footer-column">
            <h3 className="footer-heading">Head office</h3>
            <ul className="footer-address">
              <li>
                <MapPin size={14} className="icon-blue" />
                <span>4th Floor, Madhapur, 221 Avenue, Hyderbad, 502345</span>
              </li>
              <li>
                <Phone size={14} className="icon-blue" />
                <span>+91 9876543211</span>
              </li>
              <li>
                <Mail size={14} className="icon-blue" />
                <span>Stackly@connectbeyond.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} Connect Beyond. All rights reserved.
          </span>
          <span className="footer-signature">Built on fiber, not promises.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;