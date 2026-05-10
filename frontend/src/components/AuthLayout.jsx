// import "./auth.css";

/* ─── Star data ─────────────────────────────────────── */
const STARS = [
  { top: "8%",  left: "14%", size: 2,   d: "2.5s", delay: "0s",   minOp: 0.3,  maxOp: 0.9  },
  { top: "14%", left: "63%", size: 1.5, d: "3.5s", delay: "0.8s", minOp: 0.2,  maxOp: 0.7  },
  { top: "24%", left: "38%", size: 1,   d: "4s",   delay: "1.2s", minOp: 0.15, maxOp: 0.6  },
  { top: "32%", left: "80%", size: 2.5, d: "3s",   delay: "0.4s", minOp: 0.25, maxOp: 1    },
  { top: "48%", left: "22%", size: 1,   d: "4.5s", delay: "2s",   minOp: 0.2,  maxOp: 0.5  },
  { top: "58%", left: "54%", size: 1.5, d: "3s",   delay: "1.5s", minOp: 0.3,  maxOp: 0.8  },
  { top: "70%", left: "28%", size: 2,   d: "2.8s", delay: "0.6s", minOp: 0.2,  maxOp: 0.7  },
  { top: "78%", left: "72%", size: 1,   d: "5s",   delay: "2.5s", minOp: 0.15, maxOp: 0.5  },
  { top: "11%", left: "87%", size: 1.5, d: "3.2s", delay: "1s",   minOp: 0.2,  maxOp: 0.8  },
  { top: "43%", left: "9%",  size: 1,   d: "4.2s", delay: "1.8s", minOp: 0.15, maxOp: 0.6  },
  { top: "88%", left: "45%", size: 2,   d: "3.8s", delay: "0.3s", minOp: 0.2,  maxOp: 0.7  },
  { top: "5%",  left: "48%", size: 1,   d: "2.9s", delay: "1.6s", minOp: 0.15, maxOp: 0.55 },
];

/* ─── Brand icon ─────────────────────────────────────── */
function BrandIcon() {
  return (
    <svg
      className="auth-brand-icon"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
    >
      <rect
        width="34" height="34" rx="8"
        fill="rgba(124,58,237,0.18)"
        stroke="rgba(139,92,246,0.4)"
        strokeWidth="1"
      />
      <path
        d="M17 7 L24 11.5 L24 20.5 L17 25 L10 20.5 L10 11.5Z"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M17 7 L24 11.5 L17 16 L10 11.5Z" fill="rgba(167,139,250,0.28)" />
      <circle cx="17" cy="16" r="3" fill="#a78bfa" />
    </svg>
  );
}

/* ─── Rocket SVG ─────────────────────────────────────── */
function RocketSVG({ size = 180 }) {
  const h = Math.round(size * 1.45);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 140 210"
      fill="none"
      role="img"
      aria-label="Rocket launching upward"
    >
      <defs>
        <linearGradient id="rNose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="rBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#b8c4d4" />
          <stop offset="45%"  stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#8fa3be" />
        </linearGradient>
        <linearGradient id="rFin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="rFlame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#c4b5fd" />
          <stop offset="45%"  stopColor="#7c3aed" />
          <stop offset="100%" stopColor="rgba(109,40,217,0)" />
        </linearGradient>
        <linearGradient id="rFlameInner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(196,181,253,0)" />
        </linearGradient>
        <radialGradient id="rGlow" cx="50%" cy="0%">
          <stop offset="0%"   stopColor="rgba(109,40,217,0.7)" />
          <stop offset="100%" stopColor="rgba(109,40,217,0)" />
        </radialGradient>
      </defs>

      {/* Ground glow */}
      <ellipse cx="70" cy="200" rx="44" ry="16" fill="url(#rGlow)" />

      {/* Flame outer */}
      <path
        d="M52 160
           Q44 180 47 198 Q60 208 70 208 Q80 208 93 198
           Q96 180 88 160
           Q78 174 70 175 Q62 174 52 160Z"
        fill="url(#rFlame)"
        opacity="0.92"
      />

      {/* Flame inner */}
      <path
        d="M59 160
           Q56 175 58 188 Q64 198 70 199
           Q76 198 82 188 Q84 175 81 160
           Q75 170 70 171 Q65 170 59 160Z"
        fill="url(#rFlameInner)"
      />

      {/* Left fin */}
      <path
        d="M46 125 L26 162 Q30 166 42 157 L50 144Z"
        fill="url(#rFin)"
      />

      {/* Right fin */}
      <path
        d="M94 125 L114 162 Q110 166 98 157 L90 144Z"
        fill="url(#rFin)"
      />

      {/* Body */}
      <rect x="46" y="75" width="48" height="90" rx="4" fill="url(#rBody)" />

      {/* Nose cone */}
      <path d="M46 75 Q44 38 70 10 Q96 38 94 75Z" fill="url(#rNose)" />

      {/* Nozzle */}
      <rect x="52" y="160" width="36" height="10" rx="3" fill="#475569" />

      {/* Window ring */}
      <circle
        cx="70" cy="113" r="20"
        fill="#1e1b4b"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2"
      />
      {/* Window mid */}
      <circle cx="70" cy="113" r="13" fill="#312e81" />
      {/* Window inner */}
      <circle cx="70" cy="113" r="9" fill="#1e1b4b" />
      {/* Window highlight */}
      <circle cx="64" cy="107" r="5" fill="rgba(255,255,255,0.32)" />
      <circle cx="64" cy="107" r="2.5" fill="rgba(255,255,255,0.65)" />

      {/* Body seam lines */}
      <line
        x1="46" y1="97" x2="94" y2="97"
        stroke="rgba(148,163,184,0.35)"
        strokeWidth="1"
      />
      <line
        x1="46" y1="145" x2="94" y2="145"
        stroke="rgba(148,163,184,0.35)"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ─── Right branding panel ───────────────────────────── */
function AuthRightPanel() {
  return (
    <div className="auth-right" aria-hidden="true">
      {/* Twinkling stars */}
      <div className="auth-stars">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--d": s.d,
              "--delay": s.delay,
              "--min-op": s.minOp,
              "--max-op": s.maxOp,
            }}
          />
        ))}
        <div
          className="shooting-star"
          style={{ top: "16%", left: "28%", animationDelay: "1.2s" }}
        />
        <div
          className="shooting-star"
          style={{ top: "40%", left: "8%", animationDelay: "5.5s" }}
        />
      </div>

      {/* Planet glow at bottom */}
      <div className="auth-right-glow" />

      {/* Content */}
      <div className="auth-right-content">
        <div className="auth-rocket-wrap">
          <RocketSVG size={180} />
        </div>

        <h2>Secure. Fast. Reliable.</h2>
        <p className="auth-right-tagline">
          Your security is our priority. We use advanced encryption to keep
          your data safe.
        </p>

        <div className="auth-features">
          {/* Secure */}
          <div className="auth-feature">
            <div className="feature-icon-wrap">
              <svg
                width="16" height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="feature-name">Secure</span>
            <span className="feature-desc">256-bit SSL</span>
          </div>

          {/* Fast */}
          <div className="auth-feature">
            <div className="feature-icon-wrap">
              <svg
                width="16" height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="feature-name">Fast</span>
            <span className="feature-desc">Optimized</span>
          </div>

          {/* Reliable */}
          <div className="auth-feature">
            <div className="feature-icon-wrap">
              <svg
                width="16" height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <span className="feature-name">Reliable</span>
            <span className="feature-desc">99.9% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Layout ─────────────────────────────────────────── */
function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* LEFT — form panel */}
        <div className="auth-left">
          <div className="auth-brand">
            <BrandIcon />
            <span className="auth-brand-name">Authify</span>
          </div>

          <div className="auth-heading">
            {/* auth-heading-row constrains text width on mobile (leaves room for rocket) */}
            <div className="auth-heading-row">
              <h1>
                {title}{" "}
                <span aria-hidden="true">👋</span>
              </h1>
              <p>{subtitle}</p>
            </div>
          </div>

          {children}
        </div>

        {/* RIGHT — branding panel, hidden on mobile via CSS */}
        <AuthRightPanel />

        {/* MOBILE — rocket overlay, hidden on desktop via CSS */}
        <div className="auth-mobile-rocket">
          <RocketSVG size={125} />
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;