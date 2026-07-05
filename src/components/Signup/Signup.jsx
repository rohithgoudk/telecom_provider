import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, UserPlus } from 'lucide-react';
import './Signup.css';

const NAME_PATTERN = /^[A-Za-z\s]*$/;
const USERNAME_PATTERN = /^[A-Za-z]*$/;
const GMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

// Monochrome inline SVGs — kept local rather than pulled from lucide-react,
// since brand marks aren't guaranteed to stay exported across its versions.
function IconGoogle({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
    </svg>
  );
}

function IconApple({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
    </svg>
  );
}

function IconGithub({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .32.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const SOCIALS = [
  { label: 'Google', icon: IconGoogle },
  { label: 'Apple', icon: IconApple },
  { label: 'GitHub', icon: IconGithub },
];

const INITIAL_FORM = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreed: false,
};

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Letters-only fields filter out anything else as the user types,
  // rather than accepting bad input and complaining after the fact.
  const handleNameChange = (e) => {
    const { value } = e.target;
    if (NAME_PATTERN.test(value)) {
      setForm((f) => ({ ...f, fullName: value }));
    }
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    if (USERNAME_PATTERN.test(value)) {
      setForm((f) => ({ ...f, username: value }));
    }
  };

  const handleChange = (field) => (e) => {
    const value = field === 'agreed' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const validate = () => {
    const next = {};

    if (!form.fullName.trim()) next.fullName = 'Full name is required.';
    else if (!NAME_PATTERN.test(form.fullName)) next.fullName = 'Letters only, please.';

    if (!form.username.trim()) next.username = 'Username is required.';
    else if (!USERNAME_PATTERN.test(form.username)) next.username = 'Letters only, no spaces or numbers.';

    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!GMAIL_PATTERN.test(form.email)) next.email = 'Only @gmail.com addresses are accepted.';

    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 8) next.password = 'Use at least 8 characters.';

    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password.';
    else if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';

    if (!form.agreed) next.agreed = 'You must accept the Terms & Conditions to register.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/404');
    }
  };

  return (
    <div className="signup-page">
      <button type="button" className="back-home-btn liquid-glass" onClick={() => navigate('/')}>
        <ArrowLeft size={15} /> Back to home
      </button>

      <div className="signup-card liquid-glass-strong">
        <div className="signup-header">
          <span className="eyebrow"><UserPlus size={12} /> Create account</span>
          <h1 className="signup-title">Join the network.</h1>
          <p className="signup-subtitle">A few details and you're in.</p>
        </div>

        <div className="signup-socials">
          {SOCIALS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="social-btn liquid-glass"
              onClick={() => navigate('/404')}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="signup-divider">
          <span>or</span>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder=" "
              value={form.fullName}
              onChange={handleNameChange}
              autoComplete="name"
            />
            <label htmlFor="fullName">Full name</label>
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className="form-field">
            <input
              id="username"
              name="username"
              type="text"
              placeholder=" "
              value={form.username}
              onChange={handleUsernameChange}
              autoComplete="username"
            />
            <label htmlFor="username">Username</label>
            {errors.username && <span className="field-error">{errors.username}</span>}
          </div>

          <div className="form-field">
            <input
              id="email"
              name="email"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange('email')}
              autoComplete="email"
            />
            <label htmlFor="email">Gmail address</label>
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              value={form.password}
              onChange={handleChange('password')}
              autoComplete="new-password"
              className="has-toggle"
            />
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="eye-toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-field">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder=" "
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              autoComplete="new-password"
              className="has-toggle"
            />
            <label htmlFor="confirmPassword">Confirm password</label>
            <button
              type="button"
              className="eye-toggle"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowConfirmPassword((v) => !v)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <label className="terms-row">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={handleChange('agreed')}
            />
            <span className="terms-box" aria-hidden="true" />
            <span className="terms-text">
              I agree to the <a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/404'); }}>Terms &amp; Conditions</a>
            </span>
          </label>
          {errors.agreed && <span className="field-error terms-error">{errors.agreed}</span>}

          <button type="submit" className="btn-primary signup-submit">
            <span className="btn-primary-content">Register</span>
            <span className="btn-primary-overlay" />
          </button>

          <p className="signin-prompt">
            Already have an account?{' '}
            <button
              type="button"
              className="signin-link"
              onClick={() => navigate('/login')}
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;