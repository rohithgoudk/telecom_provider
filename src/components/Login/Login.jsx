import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LogIn, User, ShieldCheck } from 'lucide-react';
import './Login.css';

const GMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const ROLES = [
  { id: 'user', label: 'User', icon: User, dashboard: '/user-dashboard' },
  { id: 'admin', label: 'Admin', icon: ShieldCheck, dashboard: '/admin-dashboard' },
];

const INITIAL_FORM = { email: '', password: '' };

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};

    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!GMAIL_PATTERN.test(form.email)) next.email = 'Only @gmail.com addresses are accepted.';

    if (!form.password) next.password = 'Password is required.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selected = ROLES.find((r) => r.id === role);
    navigate(selected.dashboard);
  };

  return (
    <div className="login-page">
      <button type="button" className="back-home-btn liquid-glass" onClick={() => navigate('/')}>
        <ArrowLeft size={15} /> Back to home
      </button>

      <div className="login-card liquid-glass-strong">
        <div className="login-header">
          <span className="eyebrow"><LogIn size={12} /> Sign in</span>
          <h1 className="login-title">Welcome back.</h1>
          <p className="login-subtitle">Pick how you're signing in.</p>
        </div>

        {/* Role toggle — determines which dashboard a successful login lands on */}
        <div className="role-toggle" role="radiogroup" aria-label="Sign in as">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const active = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`role-btn ${active ? 'active' : ''}`}
                onClick={() => setRole(r.id)}
              >
                <Icon size={15} />
                {r.label}
              </button>
            );
          })}
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
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

          {/* Single field, single toggle, bound only to this input's own state */}
          <div className="form-field">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              value={form.password}
              onChange={handleChange('password')}
              autoComplete="current-password"
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

          <div className="login-row">
            <label className="remember-row">
              <input type="checkbox" />
              <span className="remember-box" aria-hidden="true" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="forgot-link"
              onClick={() => navigate('/404')}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn-primary login-submit">
            <span className="btn-primary-content">
              Sign in as {ROLES.find((r) => r.id === role).label}
            </span>
            <span className="btn-primary-overlay" />
          </button>

          <p className="register-prompt">
            New here?{' '}
            <button
              type="button"
              className="register-link"
              onClick={() => navigate('/signup')}
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;