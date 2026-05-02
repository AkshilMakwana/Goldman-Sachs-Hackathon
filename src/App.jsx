import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./index.css";
import './App.css';
import { EXPLORE_MOCK_INVESTMENTS, parseExplorePrice } from "./exploreMockData";

function SidebarNavIcon({ tab }) {
  const c = "app-sidebar__nav-icon";
  switch (tab) {
    case "Home":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
        </svg>
      );
    case "Explore":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      );
    case "Goals":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
      );
    case "Practice":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="13" width="4" height="8" rx="0.8" fill="currentColor" />
          <rect x="11" y="9" width="4" height="12" rx="0.8" fill="currentColor" />
          <rect x="17" y="6" width="4" height="15" rx="0.8" fill="currentColor" />
        </svg>
      );
    case "Holdings":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-8-2h4v2h-4V5zm8 14H4V9h16v10z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function Sidebar({ tabs, activeTab, setActiveTab, handleLogout }) {
  return (
    <aside className="app-sidebar" aria-label="Primary">
      <div className="app-sidebar__brand">
        <div className="app-sidebar__logo-mark" aria-hidden="true">
          <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="32">
            <title>Zenith</title>
            <path
              d="M0 70 L20 35 L35 50 L50 25 L65 45 L80 30 L95 48 L110 20 L120 35 L120 70 Z"
              fill="rgba(141,191,232,0.08)"
            />
            <path
              d="M0 70 L15 42 L28 55 L45 28 L58 48 L72 32 L88 50 L100 22 L115 38 L120 70 Z"
              fill="rgba(141,191,232,0.14)"
            />
            <path
              d="M0 70 L25 48 L40 60 L60 20 L80 55 L95 38 L120 70 Z"
              fill="rgba(141,191,232,0.22)"
              stroke="rgba(141,191,232,0.5)"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <path d="M60 20 L52 36 L68 36 Z" fill="rgba(245,248,251,0.85)" />
            <path d="M95 38 L90 48 L100 48 Z" fill="rgba(245,248,251,0.65)" />
            <line
              x1="0"
              y1="70"
              x2="120"
              y2="70"
              stroke="var(--accent)"
              strokeWidth="1.2"
              opacity="0.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="app-sidebar__brand-name">Zenith</p>
          <p className="app-sidebar__brand-tag">U.S. markets · demo data</p>
        </div>
      </div>

      <nav className="app-sidebar__nav" aria-label="Main navigation">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`app-sidebar__nav-item${activeTab === tab ? " app-sidebar__nav-item--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            <SidebarNavIcon tab={tab} />
            <span className="app-sidebar__nav-label">{tab}</span>
          </button>
        ))}
      </nav>

      <div className="app-sidebar__footer">
        <div className="app-sidebar-ai" role="note">
          <p className="app-sidebar-ai__title">Zenith AI</p>
          <p className="app-sidebar-ai__copy">
            Explains moves and terms in plain language—always supplemental to your goals and research.
          </p>
          <button type="button" className="app-sidebar-ai__cta">
            Learn more
          </button>
        </div>
        <div className="app-sidebar-market" aria-live="polite">
          <p className="app-sidebar-market__title">Market Status</p>
          <div className="app-sidebar-market__row">
            <span className="app-sidebar-market__dot" aria-hidden="true" />
            <span className="app-sidebar-market__label">Market is open</span>
          </div>
          <p className="app-sidebar-market__closes">Closes in 03:42:17</p>
        </div>
        <button type="button" className="app-sidebar__logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </aside>
  );
}

function greetingForTime() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function DashboardHeader({ activeTab }) {
  return (
    <header className="dash-header" data-active-tab={activeTab}>
      <div className="dash-header__left">
        <p className="dash-header__greeting">
          {greetingForTime()}, <span className="dash-header__name">Investor</span> 👋
        </p>
        <p className="dash-header__sub">Here&apos;s an overview of your portfolio and the market.</p>
      </div>
      <div className="dash-header__controls">
        <label className="dash-header-search-wrap">
          <span className="visually-hidden">Search</span>
          <svg className="dash-header-search__icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
          <input
            type="search"
            className="dash-header-search"
            placeholder="Search stocks, funds, ETFs..."
          />
        </label>
        <button type="button" className="dash-header-icon-btn" aria-label="Notifications">
          <span className="dash-header-icon-btn__dot" aria-hidden="true" />
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
            />
          </svg>
        </button>
        <div className="dash-header-avatar" role="img" aria-label="Account">
          I
        </div>
      </div>
    </header>
  );
}

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (mode === "login") {
      const saved = localStorage.getItem("zenith_user");
      if (saved) {
        const user = JSON.parse(saved);
        if (user.email === email.trim()) {
          onLogin(user);
          return;
        }
      }
      setError("No account found. Please sign up.");
      return;
    }
    onLogin({ name: name.trim(), email: email.trim(), onboardingComplete: false });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(141,191,232,0.1), transparent 30%), linear-gradient(135deg, #04101b, #071522)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <svg
            viewBox="0 0 120 80"
            fill="none"
            width="60"
            height="40"
            style={{ margin: "0 auto 12px", display: "block" }}
          >
            <path
              d="M0 70 L20 35 L35 50 L50 25 L65 45 L80 30 L95 48 L110 20 L120 35 L120 70 Z"
              fill="rgba(141,191,232,0.08)"
            />
            <path
              d="M0 70 L15 42 L28 55 L45 28 L58 48 L72 32 L88 50 L100 22 L115 38 L120 70 Z"
              fill="rgba(141,191,232,0.14)"
            />
            <path
              d="M0 70 L25 48 L40 60 L60 20 L80 55 L95 38 L120 70 Z"
              fill="rgba(141,191,232,0.22)"
              stroke="rgba(141,191,232,0.5)"
              strokeWidth="0.8"
            />
            <path d="M60 20 L52 36 L68 36 Z" fill="rgba(245,248,251,0.85)" />
            <path d="M95 38 L90 48 L100 48 Z" fill="rgba(245,248,251,0.65)" />
            <line x1="0" y1="70" x2="120" y2="70" stroke="#c47a35" strokeWidth="1.2" opacity="0.6" />
          </svg>
          <h1
            style={{
              color: "#f5f8fb",
              fontSize: "2rem",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              margin: "0",
            }}
          >
            ZENITH
          </h1>
          <p style={{ color: "#9fb0c0", fontSize: "0.875rem", marginTop: "6px" }}>
            Your personal financial guardian
          </p>
        </div>

        <div
          style={{
            background: "#0d2131",
            border: "1px solid rgba(141,191,232,0.18)",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "10px",
              padding: "4px",
              marginBottom: "28px",
            }}
          >
            {["login", "signup"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  border: "none",
                  background: mode === m ? "#132b3e" : "transparent",
                  color: mode === m ? "#f5f8fb" : "#9fb0c0",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {mode === "signup" ? (
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  color: "#9fb0c0",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aakanksha Bhat"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(141,191,232,0.18)",
                  borderRadius: "8px",
                  padding: "12px 14px",
                  color: "#f5f8fb",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8dbfe8")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(141,191,232,0.18)")}
              />
            </div>
          ) : null}

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                color: "#9fb0c0",
                fontSize: "0.8rem",
                fontWeight: "600",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="e.g. you@example.com"
              type="email"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(141,191,232,0.18)",
                borderRadius: "8px",
                padding: "12px 14px",
                color: "#f5f8fb",
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#8dbfe8")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(141,191,232,0.18)")}
            />
          </div>

          {error ? (
            <p
              style={{
                color: "#f87171",
                fontSize: "0.8rem",
                marginBottom: "16px",
                background: "rgba(248,113,113,0.08)",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(248,113,113,0.2)",
              }}
            >
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "10px",
              border: "none",
              background: "#c47a35",
              color: "white",
              fontWeight: "700",
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {mode === "login" ? "Log In →" : "Create Account →"}
          </button>

          <p style={{ color: "#9fb0c0", fontSize: "0.75rem", textAlign: "center", marginTop: "20px", lineHeight: "1.5" }}>
            Demo app — no real money involved. Educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}

function OnboardingFlow({ user, onComplete }) {
  const [step, setStep] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [riskProfile, setRiskProfile] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [investmentStyle, setInvestmentStyle] = useState("");

  const GOALS = [
    { icon: "🏖️", label: "Retire early", val: "retire" },
    { icon: "🎓", label: "Education fund", val: "education" },
    { icon: "🏠", label: "Buy a home", val: "home" },
    { icon: "🌱", label: "Grow savings", val: "grow" },
    { icon: "⛑️", label: "Emergency fund", val: "emergency" },
    { icon: "✈️", label: "Travel & experiences", val: "travel" },
  ];

  const RISKS = [
    { icon: "🛡️", label: "Conservative", sub: "Safety first, slow growth", val: "Conservative" },
    { icon: "⚖️", label: "Balanced", sub: "Mix of safety and growth", val: "Balanced" },
    { icon: "📈", label: "Growth", sub: "More risk, more reward", val: "Growth" },
    { icon: "🚀", label: "Aggressive", sub: "Maximum growth potential", val: "Aggressive" },
  ];

  const STYLES = [
    { icon: "🐣", label: "Complete beginner", sub: "I know nothing about investing", val: "beginner" },
    { icon: "🌿", label: "Some experience", sub: "I have invested a little before", val: "some" },
    { icon: "🌳", label: "Fairly confident", sub: "I follow markets occasionally", val: "confident" },
  ];

  function handleComplete() {
    const userData = {
      ...user,
      monthlyIncome,
      riskProfile,
      primaryGoal,
      investmentStyle,
      onboardingComplete: true,
    };
    localStorage.setItem("zenith_user", JSON.stringify(userData));
    onComplete(userData);
  }

  const steps = [
    <div key={0}>
      <h2 style={{ color: "#f5f8fb", fontSize: "1.5rem", fontWeight: "700", marginBottom: "8px" }}>
        Hi {user.name}! 👋
      </h2>
      <p style={{ color: "#9fb0c0", fontSize: "0.875rem", marginBottom: "28px", lineHeight: "1.6" }}>
        Let&apos;s personalise Zenith for you. First, what&apos;s your monthly income?
      </p>
      <label style={{ color: "#9fb0c0", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "8px" }}>
        Monthly Income (after tax)
      </label>
      <input
        value={monthlyIncome}
        onChange={(e) => setMonthlyIncome(e.target.value)}
        placeholder="e.g. 3000"
        type="number"
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(141,191,232,0.18)",
          borderRadius: "8px",
          padding: "14px",
          color: "#f5f8fb",
          fontSize: "1rem",
          outline: "none",
          boxSizing: "border-box",
          marginBottom: "8px",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#8dbfe8")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(141,191,232,0.18)")}
      />
      <p style={{ color: "#9fb0c0", fontSize: "0.75rem" }}>This helps us suggest how much you should invest monthly.</p>
    </div>,
    <div key={1}>
      <h2 style={{ color: "#f5f8fb", fontSize: "1.5rem", fontWeight: "700", marginBottom: "8px" }}>
        What&apos;s your main goal? 🎯
      </h2>
      <p style={{ color: "#9fb0c0", fontSize: "0.875rem", marginBottom: "24px" }}>
        Pick the one that matters most right now.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {GOALS.map((g) => (
          <button
            key={g.val}
            type="button"
            onClick={() => setPrimaryGoal(g.val)}
            style={{
              padding: "16px 12px",
              borderRadius: "12px",
              border: primaryGoal === g.val ? "2px solid #c47a35" : "1px solid rgba(141,191,232,0.18)",
              background: primaryGoal === g.val ? "rgba(196,122,53,0.14)" : "rgba(255,255,255,0.03)",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "6px" }}>{g.icon}</div>
            <div style={{ color: primaryGoal === g.val ? "#f5f8fb" : "#9fb0c0", fontSize: "0.8rem", fontWeight: "600" }}>
              {g.label}
            </div>
          </button>
        ))}
      </div>
    </div>,
    <div key={2}>
      <h2 style={{ color: "#f5f8fb", fontSize: "1.5rem", fontWeight: "700", marginBottom: "8px" }}>
        How do you feel about risk? 📊
      </h2>
      <p style={{ color: "#9fb0c0", fontSize: "0.875rem", marginBottom: "24px", lineHeight: "1.6" }}>
        You invest $1,000. Next month it&apos;s worth $800. What do you do?
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {RISKS.map((r) => (
          <button
            key={r.val}
            type="button"
            onClick={() => setRiskProfile(r.val)}
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: riskProfile === r.val ? "2px solid #c47a35" : "1px solid rgba(141,191,232,0.18)",
              background: riskProfile === r.val ? "rgba(196,122,53,0.14)" : "rgba(255,255,255,0.03)",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>{r.icon}</span>
            <div>
              <div style={{ color: "#f5f8fb", fontSize: "0.9rem", fontWeight: "600" }}>{r.label}</div>
              <div style={{ color: "#9fb0c0", fontSize: "0.75rem", marginTop: "2px" }}>{r.sub}</div>
            </div>
            {riskProfile === r.val ? <div style={{ marginLeft: "auto", color: "#c47a35", fontSize: "1.2rem" }}>✓</div> : null}
          </button>
        ))}
      </div>
    </div>,
    <div key={3}>
      <h2 style={{ color: "#f5f8fb", fontSize: "1.5rem", fontWeight: "700", marginBottom: "8px" }}>
        How experienced are you? 🌱
      </h2>
      <p style={{ color: "#9fb0c0", fontSize: "0.875rem", marginBottom: "24px" }}>
        Be honest — this helps us explain things the right way.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {STYLES.map((s) => (
          <button
            key={s.val}
            type="button"
            onClick={() => setInvestmentStyle(s.val)}
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: investmentStyle === s.val ? "2px solid #c47a35" : "1px solid rgba(141,191,232,0.18)",
              background: investmentStyle === s.val ? "rgba(196,122,53,0.14)" : "rgba(255,255,255,0.03)",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
            <div>
              <div style={{ color: "#f5f8fb", fontSize: "0.9rem", fontWeight: "600" }}>{s.label}</div>
              <div style={{ color: "#9fb0c0", fontSize: "0.75rem", marginTop: "2px" }}>{s.sub}</div>
            </div>
            {investmentStyle === s.val ? <div style={{ marginLeft: "auto", color: "#c47a35", fontSize: "1.2rem" }}>✓</div> : null}
          </button>
        ))}
      </div>
    </div>,
  ];

  const canNext = [monthlyIncome.trim().length > 0, primaryGoal.length > 0, riskProfile.length > 0, investmentStyle.length > 0][step];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(141,191,232,0.1), transparent 30%), linear-gradient(135deg, #04101b, #071522)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ display: "flex", gap: "6px", marginBottom: "32px" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "4px",
                borderRadius: "2px",
                background: i <= step ? "#c47a35" : "rgba(141,191,232,0.18)",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>

        <div
          style={{
            background: "#0d2131",
            border: "1px solid rgba(141,191,232,0.18)",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "16px",
          }}
        >
          {steps[step]}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              style={{
                flex: 1,
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid rgba(141,191,232,0.18)",
                background: "transparent",
                color: "#9fb0c0",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => (step < 3 ? setStep((s) => s + 1) : handleComplete())}
            disabled={!canNext}
            style={{
              flex: 2,
              padding: "13px",
              borderRadius: "10px",
              border: "none",
              background: canNext ? "#c47a35" : "rgba(255,255,255,0.06)",
              color: canNext ? "white" : "#9fb0c0",
              fontWeight: "700",
              fontSize: "0.95rem",
              cursor: canNext ? "pointer" : "not-allowed",
              transition: "all 0.2s",
            }}
          >
            {step < 3 ? "Continue →" : "Enter Zenith 🚀"}
          </button>
        </div>

        <p style={{ color: "#9fb0c0", fontSize: "0.7rem", textAlign: "center", marginTop: "16px" }}>
          Step {step + 1} of 4 · Takes less than 2 minutes
        </p>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [appState, setAppState] = useState(() => {
    const saved = localStorage.getItem("zenith_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [virtualCash, setVirtualCash] = useState(10000);
  const [practiceHoldings, setPracticeHoldings] = useState({});
  const [realCash, setRealCash] = useState(10000);
  const [holdings, setHoldings] = useState({});
  const [practicePresetSymbol, setPracticePresetSymbol] = useState(null);
  const [practicePresetTradeSide, setPracticePresetTradeSide] = useState(null);
  const [directBuySymbol, setDirectBuySymbol] = useState(null);
  const [explorePresetSymbol, setExplorePresetSymbol] = useState(null);
  const [livePrices, setLivePrices] = useState({});
  const tabs = ["Home", "Explore", "Goals", "Practice", "Holdings"];

  async function fetchFinnhubPrice(symbol) {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${import.meta.env.VITE_FINNHUB_KEY}`,
      );
      const data = await res.json();
      if (data.c && data.c > 0) {
        const pc = data.pc;
        const dailyChangePct =
          pc != null && pc > 0 && Number.isFinite(pc) && Number.isFinite(data.c)
            ? ((data.c - pc) / pc) * 100
            : null;
        return {
          price: "$" + data.c.toFixed(2),
          rawPrice: data.c,
          dailyChangePct,
        };
      }
    } catch (e) {
      console.log("Finnhub error for", symbol, e);
    }
    return null;
  }

  useEffect(() => {
    const STOCKS_TO_FETCH = [
      "AAPL",
      "MSFT",
      "TSLA",
      "NVDA",
      "AMZN",
      "GOOGL",
      "META",
      "VOO",
      "QQQ",
    ];

    async function fetchAllPrices() {
      const updates = {};
      for (const sym of STOCKS_TO_FETCH) {
        const price = await fetchFinnhubPrice(sym);
        if (price) updates[sym] = price;
        await new Promise((r) => setTimeout(r, 200));
      }
      setLivePrices((prev) => ({ ...prev, ...updates }));
    }

    fetchAllPrices();
    const interval = setInterval(fetchAllPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const clearPracticePreset = useCallback(() => {
    setPracticePresetSymbol(null);
    setPracticePresetTradeSide(null);
  }, []);

  const clearDirectBuySymbol = useCallback(() => {
    setDirectBuySymbol(null);
  }, []);

  const clearExplorePreset = useCallback(() => {
    setExplorePresetSymbol(null);
  }, []);

  function handleLogout() {
    localStorage.removeItem("zenith_user");
    setAppState(null);
    setActiveTab("Home");
  }

  useEffect(() => {
    if (appState) localStorage.setItem("zenith_user", JSON.stringify(appState));
  }, [appState]);

  if (!appState) {
    return (
      <LoginPage
        onLogin={(user) => {
          if (user.onboardingComplete) {
            setAppState(user);
          } else {
            setAppState(user);
          }
        }}
      />
    );
  }

  if (!appState.onboardingComplete) {
    return (
      <OnboardingFlow
        user={appState}
        onComplete={(userData) => {
          setAppState(userData);
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      <div className="app-main-area">
        {activeTab !== "Home" ? <DashboardHeader activeTab={activeTab} /> : null}

        <main className="app-main">
          <div className="app-main__inner">
            {activeTab === "Home" && (
              <Home
                setActiveTab={setActiveTab}
                holdings={holdings}
                realCash={realCash}
                mockInvestments={EXPLORE_MOCK_INVESTMENTS}
                livePrices={livePrices}
                userName={appState.name}
              />
            )}
            {activeTab === "Explore" && (
              <div className="app-tab-panel">
                <Explore
                  setActiveTab={setActiveTab}
                  setPracticePresetSymbol={setPracticePresetSymbol}
                  setPracticePresetTradeSide={setPracticePresetTradeSide}
                  realCash={realCash}
                  setRealCash={setRealCash}
                  holdings={holdings}
                  setHoldings={setHoldings}
                  explorePresetSymbol={explorePresetSymbol}
                  clearExplorePreset={clearExplorePreset}
                  livePrices={livePrices}
                />
              </div>
            )}
            {activeTab === "Goals" && (
              <div className="app-tab-panel">
                <Goals
                  mockInvestments={EXPLORE_MOCK_INVESTMENTS}
                  setActiveTab={setActiveTab}
                  setPracticePresetSymbol={setPracticePresetSymbol}
                  setPracticePresetTradeSide={setPracticePresetTradeSide}
                  setDirectBuySymbol={setDirectBuySymbol}
                  setExplorePresetSymbol={setExplorePresetSymbol}
                  initialRiskProfile={appState.riskProfile}
                />
              </div>
            )}
            {activeTab === "Practice" && (
              <div className="app-tab-panel">
                <Practice
                  mockInvestments={EXPLORE_MOCK_INVESTMENTS}
                  virtualCash={virtualCash}
                  setVirtualCash={setVirtualCash}
                  practiceHoldings={practiceHoldings}
                  setPracticeHoldings={setPracticeHoldings}
                  practicePresetSymbol={practicePresetSymbol}
                  practicePresetTradeSide={practicePresetTradeSide}
                  clearPracticePreset={clearPracticePreset}
                />
              </div>
            )}
            {activeTab === "Holdings" && (
              <div className="app-tab-panel">
                <Holdings
                  mockInvestments={EXPLORE_MOCK_INVESTMENTS}
                  holdings={holdings}
                  realCash={realCash}
                  setRealCash={setRealCash}
                  setHoldings={setHoldings}
                  directBuySymbol={directBuySymbol}
                  clearDirectBuySymbol={clearDirectBuySymbol}
                  livePrices={livePrices}
                />
              </div>
            )}
          </div>
        </main>

        <BottomNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

const HOME_US_INDICES = [
  { name: "S&P 500", value: "5,248.49", change: "+0.62%" },
  { name: "NASDAQ", value: "16,350.42", change: "+0.88%" },
  { name: "Dow Jones", value: "38,962.80", change: "+0.15%" },
];

const HOME_US_DEMO_NEWS = [
  {
    title: "Blue-chip outlooks hinge on capex cadence into year-end",
    dek: "U.S. large caps show how spending plans can shift sentiment when rates stay elevated.",
    thumbnail: "chart",
  },
  {
    title: "Breadth watchers eye equal-weight trims vs. megacap strength",
    dek: "A narrower market can amplify headline risk even when headline indexes drift higher.",
    thumbnail: "fed",
  },
  {
    title: "Liquidity narratives meet calendar effects for equities",
    dek: "Flows and seasonal patterns appear in textbooks—Zenith snapshots stay illustrative only.",
    thumbnail: "chip",
  },
];

/** Display-only labels for news rows (layout; not portfolio state). */
const HOME_NEWS_DISPLAY_META = [
  { source: "Reuters", when: "2h ago" },
  { source: "Bloomberg", when: "4h ago" },
  { source: "Financial Times", when: "6h ago" },
];

/** Demo-only watchlist subset (major U.S. names). */
const HOME_WATCHLIST_ORDER = ["AAPL", "MSFT", "NVDA", "TSLA"];

function homeIndexChangeToNumber(changeStr) {
  const raw = parseFloat(String(changeStr).replace(/%/g, "").replace("+", ""));
  return Number.isFinite(raw) ? raw : 0;
}

function allocationBucketIsFunds(inv) {
  if (!inv) return false;
  const hay = `${inv.category ?? ""} ${inv.sector ?? ""}`.toLowerCase();
  if (/\betf\b/.test(hay)) return true;
  const s = inv.symbol;
  return s === "VOO" || s === "QQQ";
}

/** Compact sparkline for portfolio stat card (visual only). */
function buildPortfolioMiniSpark(isGain) {
  const W = 128;
  const H = 36;
  const padX = 2;
  const padY = 4;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  const pts = [];
  const n = 22;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = padX + t * innerW;
    const wobble = Math.sin(t * Math.PI * 6) * (innerH * 0.12);
    const slope = isGain ? -t * innerH * 0.62 : t * innerH * 0.62;
    const mid = padY + innerH * 0.62;
    let y = mid + wobble + slope;
    y = Math.min(Math.max(y, padY + 2), padY + innerH - 2);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return { points: pts.join(" "), stroke: isGain ? "#4ade80" : "#ef4444" };
}

function abbrevAccountTotalCenter(total) {
  const n = Number(total);
  if (!Number.isFinite(n) || n <= 0) return "—";
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M Total`;
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}K Total`;
  return `$${Math.round(n)} Total`;
}

function zenithFallbackLogoGradient(inv, name, symbol) {
  const hay = `${inv?.sector ?? ""} ${inv?.category ?? ""} ${name ?? ""} ${symbol ?? ""}`.toLowerCase();
  if (/bank|financial|lending|credit|insurance|reit\b/.test(hay)) {
    return "linear-gradient(135deg, #2563eb, #172554)";
  }
  if (/tech|technology|software|semiconductor|internet|cloud|electronics/.test(hay)) {
    return "linear-gradient(135deg, #a855f7, #4c1d95)";
  }
  if (/energy|oil|gas|petrol|utilities?/.test(hay)) {
    return "linear-gradient(135deg, #f97316, #9a3412)";
  }
  if (/health|pharma|biotech|medical|healthcare/.test(hay)) {
    return "linear-gradient(135deg, #14b8a6, #115e59)";
  }
  return "linear-gradient(135deg, #3b82f6, #1e3a8a)";
}

/** Circular brand badge for watchlist/holdings (visual only). */
function getCompanyLogo(symbol, inv) {
  const sym = String(symbol ?? "").trim().toUpperCase();
  const name = inv?.name ?? "";

  const base = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
  };

  if (sym === "AAPL") {
    return (
      <div
        className="zenith-company-logo"
        style={{
          ...base,
          background: "linear-gradient(135deg, #1c1c1e, #2c2c2e)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12.5 2C11.3 2 10 3.5 10 5c0 1.3 0.8 2.4 1.8 3C10.1 8.1 9 10 9 12c0 3.3 2.7 6 6 6 0.7 0 1.4-0.1 2-0.4 0.6 0.3 1.3 0.4 2 0.4 3.3 0 6-2.7 6-6 0-2-1.1-3.9-2.8-4.9 1-0.6 1.8-1.7 1.8-3 0-1.5-1.3-3-2.5-3-0.7 0-1.3 0.4-1.8 0.9C19.2 2.4 18.2 2 17 2c-0.5 0-0.9 0.1-1.3 0.2C15.3 2.1 14.9 2 14.5 2H12.5Z"
            fill="white"
          />
        </svg>
      </div>
    );
  }

  if (sym === "MSFT") {
    return (
      <div
        className="zenith-company-logo"
        style={{
          ...base,
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
        aria-hidden
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "8px 8px",
            gap: "2px",
          }}
          aria-hidden
        >
          <span style={{ width: 8, height: 8, background: "#f25022", display: "block" }} />
          <span style={{ width: 8, height: 8, background: "#7fba00", display: "block" }} />
          <span style={{ width: 8, height: 8, background: "#00a4ef", display: "block" }} />
          <span style={{ width: 8, height: 8, background: "#ffb900", display: "block" }} />
        </div>
      </div>
    );
  }

  if (sym === "NVDA") {
    return (
      <div
        className="zenith-company-logo"
        style={{
          ...base,
          background: "linear-gradient(135deg, #76b900, #4a7800)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
        aria-hidden
      >
        <span style={{ fontWeight: 800, fontSize: 16, color: "#fff", lineHeight: 1 }}>
          N
        </span>
      </div>
    );
  }

  if (sym === "TSLA") {
    return (
      <div
        className="zenith-company-logo"
        style={{
          ...base,
          background: "linear-gradient(135deg, #cc0000, #990000)",
          border: "1px solid rgba(255,255,255,0.14)",
        }}
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 5h-1.5c0 2-1.5 3-3.5 3v1.5h2V19h2V9.5h2V8c-2 0-3.5-1-3.5-3H12Z"
            fill="white"
            transform="translate(3,2) scale(0.85)"
          />
        </svg>
      </div>
    );
  }

  const letterSrc = String(name || symbol || "?").trim();
  const letter = letterSrc ? letterSrc.charAt(0).toUpperCase() : "?";
  const grad = zenithFallbackLogoGradient(inv, name, symbol);

  return (
    <div
      className="zenith-company-logo zenith-company-logo--fallback"
      style={{
        ...base,
        background: grad,
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#f5f8fb",
        fontWeight: 800,
        fontSize: 14,
      }}
      aria-hidden
    >
      {letter}
    </div>
  );
}

/** Market news thumbnail SVGs (72×54, visual only). */
function ZenithNewsThumbnail({ kind }) {
  switch (kind) {
    case "fed":
      return (
        <svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" width={72} height={54}>
          <rect width="72" height="54" rx="6" fill="#0b1e2e" />
          <rect
            x="10"
            y="28"
            width="52"
            height="18"
            fill="rgba(141,191,232,0.15)"
            stroke="rgba(141,191,232,0.3)"
            strokeWidth="0.8"
          />
          <rect x="14" y="32" width="6" height="14" fill="rgba(141,191,232,0.25)" />
          <rect x="24" y="32" width="6" height="14" fill="rgba(141,191,232,0.25)" />
          <rect x="34" y="32" width="6" height="14" fill="rgba(141,191,232,0.25)" />
          <rect x="44" y="32" width="6" height="14" fill="rgba(141,191,232,0.25)" />
          <rect x="54" y="32" width="6" height="14" fill="rgba(141,191,232,0.25)" />
          <polygon
            points="36,10 8,28 64,28"
            fill="rgba(141,191,232,0.2)"
            stroke="rgba(141,191,232,0.4)"
            strokeWidth="0.8"
          />
          <text
            x="29"
            y="24"
            fill="rgba(141,191,232,0.7)"
            fontSize="6"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight={700}
          >
            FED
          </text>
        </svg>
      );
    case "chip":
      return (
        <svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" width={72} height={54}>
          <rect width="72" height="54" rx="6" fill="#0f1a2e" />
          <rect
            x="22"
            y="14"
            width="28"
            height="26"
            rx="3"
            fill="rgba(196,122,53,0.2)"
            stroke="rgba(196,122,53,0.6)"
            strokeWidth="1.2"
          />
          <rect
            x="27"
            y="19"
            width="18"
            height="16"
            rx="2"
            fill="rgba(196,122,53,0.3)"
          />
          <line
            x1="22"
            y1="20"
            x2="12"
            y2="20"
            stroke="rgba(196,122,53,0.5)"
            strokeWidth="1.2"
          />
          <line
            x1="22"
            y1="27"
            x2="12"
            y2="27"
            stroke="rgba(196,122,53,0.5)"
            strokeWidth="1.2"
          />
          <line
            x1="22"
            y1="34"
            x2="12"
            y2="34"
            stroke="rgba(196,122,53,0.5)"
            strokeWidth="1.2"
          />
          <line
            x1="50"
            y1="20"
            x2="60"
            y2="20"
            stroke="rgba(196,122,53,0.5)"
            strokeWidth="1.2"
          />
          <line
            x1="50"
            y1="27"
            x2="60"
            y2="27"
            stroke="rgba(196,122,53,0.5)"
            strokeWidth="1.2"
          />
          <line
            x1="50"
            y1="34"
            x2="60"
            y2="34"
            stroke="rgba(196,122,53,0.5)"
            strokeWidth="1.2"
          />
          <text
            x="28"
            y="30"
            fill="rgba(196,122,53,0.9)"
            fontSize="5"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight={700}
          >
            AI CHIP
          </text>
        </svg>
      );
    case "chart":
    default:
      return (
        <svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" width={72} height={54}>
          <rect width="72" height="54" rx="6" fill="#0d2131" />
          <polyline
            points="4,44 14,32 24,36 36,18 48,22 60,10 68,14"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polyline
            points="4,44 14,32 24,36 36,18 48,22 60,10 68,14 68,48 4,48"
            fill="rgba(74,222,128,0.12)"
            stroke="none"
          />
          <circle cx="36" cy="18" r="2.5" fill="#4ade80" />
          <circle cx="60" cy="10" r="2.5" fill="#4ade80" />
          <text
            x="4"
            y="52"
            fill="rgba(159,176,192,0.6)"
            fontSize="5"
            fontFamily="Inter, system-ui, sans-serif"
          >
            S&amp;P 500
          </text>
        </svg>
      );
  }
}

function Home({ setActiveTab, holdings, realCash, mockInvestments, livePrices, userName }) {
  const bySymbol = new Map(mockInvestments.map((inv) => [inv.symbol, inv]));

  const holdingSymbols = Object.keys(holdings).filter(
    (s) => (holdings[s]?.quantity ?? 0) > 0,
  );

  let totalInvested = 0;
  let currentValue = 0;
  let todaysChangeDollars = 0;

  const positionRows = holdingSymbols.map((sym) => {
    const row = holdings[sym];
    const inv = bySymbol.get(sym);
    const liveData = livePrices[sym];
    const curPx =
      liveData?.rawPrice != null && Number.isFinite(liveData.rawPrice)
        ? liveData.rawPrice
        : inv
          ? parseExplorePrice(inv.price)
          : null;
    const qty = row.quantity;
    const avgPrice = row.avgPrice;
    const invested = qty * avgPrice;
    const marketValue = curPx != null ? qty * curPx : null;
    totalInvested += invested;
    if (marketValue != null) currentValue += marketValue;
    const dc = liveData?.dailyChangePct ?? inv?.dailyChangePct;
    if (marketValue != null && Number.isFinite(dc)) {
      todaysChangeDollars += marketValue * (dc / 100);
    }
    const plAmount = marketValue != null ? marketValue - invested : null;
    return {
      sym,
      inv,
      qty,
      avgPrice,
      curPx,
      invested,
      marketValue,
      plAmount,
    };
  });

  positionRows.sort(
    (a, b) => (b.marketValue ?? 0) - (a.marketValue ?? 0),
  );

  const totalPnL = currentValue - totalInvested;
  const portfolioDayPct =
    currentValue > 0 ? (todaysChangeDollars / currentValue) * 100 : null;
  const hasEquityPositions = holdingSymbols.length > 0;
  const totalAccountValue = currentValue + realCash;
  const todayChangeUsd = formatPracticeUsd(todaysChangeDollars);
  const todayPctLabel =
    portfolioDayPct != null && Number.isFinite(portfolioDayPct)
      ? `${portfolioDayPct >= 0 ? "+" : ""}${portfolioDayPct.toFixed(2)}%`
      : "—";

  const allocationSlices = [];
  if (totalAccountValue > 0 && realCash > 0) {
    allocationSlices.push({
      key: "CASH",
      label: "Cash",
      pct: (realCash / totalAccountValue) * 100,
      className: "home-alloc-bar__seg home-alloc-bar__seg--cash",
    });
  }
  let equitySegIndex = 0;
  for (const r of positionRows) {
    if (r.marketValue != null && r.marketValue > 0 && totalAccountValue > 0) {
      const parity = equitySegIndex++ % 2;
      allocationSlices.push({
        key: r.sym,
        label: r.sym,
        pct: (r.marketValue / totalAccountValue) * 100,
        className: `home-alloc-bar__seg ${parity === 0 ? "home-alloc-bar__seg--a" : "home-alloc-bar__seg--b"}`,
      });
    }
  }

  let topPct = 0;
  let topSym = "";
  for (const r of positionRows) {
    const mv = r.marketValue ?? 0;
    const p = totalAccountValue > 0 ? (mv / totalAccountValue) * 100 : 0;
    if (p > topPct) {
      topPct = p;
      topSym = r.sym;
    }
  }
  const cashPctAccount =
    totalAccountValue > 0 ? (realCash / totalAccountValue) * 100 : 100;

  let riskLabel = "Not yet modeled";
  let riskDetail =
    "Once you hold U.S. stocks in Zenith’s real portfolio, we’ll summarize concentration and volatility cues here—education only.";
  if (hasEquityPositions) {
    if (topPct >= 55) {
      riskLabel = "Concentrated";
      riskDetail = `A large share of this demo account sits in ${topSym}. Single-company risk is one reason many investors spread across several names or funds.`;
    } else if (topPct >= 35) {
      riskLabel = "Moderate tilt";
      riskDetail =
        "Your largest position represents a sizable slice of equity exposure. Tracking how correlated those names are can help you understand swings.";
    } else if (cashPctAccount >= 65) {
      riskLabel = "Cash-heavy";
      riskDetail =
        "Most of this demo balance is uninvested cash. Holding cash manages risk but may lag equities over long horizons—balancing is a personal choice.";
    } else {
      riskLabel = "Balanced-ish (demo)";
      riskDetail =
        "No extreme single-name weight jumps out in this mock snapshot—markets can still move together on macro news.";
    }
  }

  const rebalanceLines = [];
  if (!hasEquityPositions) {
    rebalanceLines.push(
      "No positions yet. When you add U.S. names, revisit how each piece fits next to cash and goals.",
    );
  } else {
    if (topPct >= 45 && topSym) {
      rebalanceLines.push(
        `Your largest line (${topSym}) is roughly ${topPct.toFixed(0)}% of the account—some investors trim gradually when one name dominates.`,
      );
    }
    if (cashPctAccount >= 50 && hasEquityPositions) {
      rebalanceLines.push(
        "Cash is a large share here. If you're aiming for growth, educators often contrast idle cash with index funds—only you decide the right mix.",
      );
    }
    if (!rebalanceLines.length) {
      rebalanceLines.push(
        "No strong demo imbalances flagged. Periodic check-ins after big moves—or life changes—are a habit many planners encourage.",
      );
    }
  }

  const fundsMvHeld = positionRows.reduce((acc, r) => {
    if (r.marketValue != null && allocationBucketIsFunds(r.inv)) {
      return acc + r.marketValue;
    }
    return acc;
  }, 0);
  const stocksMvHeld = Math.max(0, currentValue - fundsMvHeld);
  const pctOfAcct = (v) =>
    totalAccountValue > 0 && Number.isFinite(v) ? (v / totalAccountValue) * 100 : 0;
  const bucketStocksPct = pctOfAcct(stocksMvHeld);
  const bucketFundsPct = pctOfAcct(fundsMvHeld);
  const bucketCashPct = pctOfAcct(realCash);

  const watchlistItems = HOME_WATCHLIST_ORDER.map((sym) => {
    const inv = bySymbol.get(sym);
    if (!inv) return null;
    const liveData = livePrices[sym];
    return {
      symbol: inv.symbol,
      name: inv.name,
      price: liveData?.price ?? inv.price,
      dailyChangePct: liveData?.dailyChangePct ?? inv.dailyChangePct,
    };
  }).filter(Boolean);

  const ixChgPct = homeIndexChangeToNumber(HOME_US_INDICES[0]?.change ?? "0");
  const spot = HOME_US_INDICES[0];
  const spValNum = parseFloat(String(spot?.value ?? "0").replace(/,/g, ""));
  const spPtsToday =
    Number.isFinite(spValNum) && Number.isFinite(ixChgPct)
      ? (spValNum * ixChgPct) / 100
      : null;
  const portfolioMini = buildPortfolioMiniSpark(!hasEquityPositions || todaysChangeDollars >= 0);
  const riskBarWidthPct = !hasEquityPositions
    ? 0
    : Math.min(
        94,
        Math.max(24, Math.round(26 + topPct * 0.85 + (100 - Math.min(cashPctAccount, 90)) * 0.12)),
      );
  const smartAdjCount = rebalanceLines.length;
  const smartAdjLabel = `${smartAdjCount} ${smartAdjCount === 1 ? "action" : "actions"} suggested`;
  const smartAdjBody = rebalanceLines[0] ?? "";
  const holdingsTotalMv = positionRows.reduce((s, r) => s + (r.marketValue ?? 0), 0);

  return (
    <div className="home-dashboard" data-home-buckets={allocationSlices.length} data-home-nudges={rebalanceLines.length}>
      <header className="home-header">
        <div className="home-header__lead">
          <p className="home-header__greet">
            {greetingForTime()}, <span className="home-header__name">{userName || "Investor"}</span> 👋
          </p>
          <p className="home-header__overview">
            Here&apos;s an overview of your portfolio and the market.
          </p>
        </div>
        <div className="home-header__tools">
          <label className="home-header__search-wrap">
            <span className="visually-hidden">Search</span>
            <svg className="home-header__search-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
            <input
              type="search"
              className="home-header__search-input"
              placeholder="Search stocks, funds, ETFs..."
            />
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "20px",
              border: "1px solid rgba(74,222,128,0.35)",
              background: "rgba(74,222,128,0.08)",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#4ade80",
                animation: "livePulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: "700",
                color: "#4ade80",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Live
            </span>
          </div>
          <button type="button" className="home-header__notify" aria-label="Notifications">
            <span className="home-header__notify-dot" aria-hidden="true" />
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
              />
            </svg>
          </button>
          <button type="button" className="home-header__avatar" aria-label="Account">
            I
          </button>
        </div>
      </header>

      <p className="home-helper">Your real portfolio snapshot — demo prices only.</p>

      <div className="home-stats">
        <section className="home-stat-card">
          <p className="home-stat-card__label">Portfolio Value</p>
          <p className="home-stat-card__value">{formatPracticeUsd(totalAccountValue)}</p>
          <div className="home-stat-card__spark-wrap" aria-hidden="true">
            <svg className="home-stat-card__spark-svg" viewBox="0 0 128 36" preserveAspectRatio="none">
              <polyline
                points={portfolioMini.points}
                fill="none"
                stroke={portfolioMini.stroke}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          {hasEquityPositions ? (
            <p
              className={`home-stat-card__today-line ${todaysChangeDollars >= 0 ? "home-stat-card__today-line--gain" : "home-stat-card__today-line--loss"}`}
            >
              {todaysChangeDollars >= 0 ? "+" : ""}
              {formatPracticeUsd(todaysChangeDollars)} ({todayPctLabel}) today
            </p>
          ) : (
            <p className="home-stat-card__meta home-stat-card__meta--tight">
              Add positions from Explore or Holdings to see modeled daily equity moves.
            </p>
          )}
        </section>

        <section className="home-stat-card">
          <p className="home-stat-card__label">Buying Power</p>
          <p className="home-stat-card__value">{formatPracticeUsd(realCash)}</p>
          <p className="home-stat-card__meta">Available to invest</p>
        </section>

        <section className="home-stat-card">
          <p className="home-stat-card__label">Risk Level</p>
          {hasEquityPositions ? (
            <>
              <p className="home-stat-card__value home-stat-card__value--risk">{riskLabel}</p>
              <div className="home-risk-meter" aria-hidden="true">
                <div className="home-risk-meter__track">
                  <span
                    className="home-risk-meter__fill"
                    style={{ width: `${riskBarWidthPct}%` }}
                  />
                </div>
              </div>
              <p className="home-stat-card__body">{riskDetail}</p>
            </>
          ) : (
            <>
              <p className="home-stat-card__value">Not yet modeled</p>
              <p className="home-stat-card__body">
                Once you hold U.S. stocks or mutual funds, Zenith will show your concentration and
                volatility risk here.
              </p>
            </>
          )}
        </section>

        <section className="home-stat-card smart-adjustments-panel">
          <p className="home-stat-card__label">Smart Adjustments</p>
          <p className="home-stat-card__value home-stat-card__value--smart">{smartAdjLabel}</p>
          <p className="home-stat-card__body">{smartAdjBody}</p>
          <button
            type="button"
            className="home-stat-card__link"
            onClick={() => setActiveTab("Goals")}
          >
            View What-If Scenarios →
          </button>
        </section>
      </div>

      <div className="dashboard-grid">
        <section className="market-overview-panel">
          <div className="market-overview-panel__head">
            <div className="market-overview-panel__head-text">
              <h3 className="market-overview-panel__title">Market Overview</h3>
              <p className="market-overview-panel__chart-caption">
                Live chart · SPY (S&amp;P 500 proxy)
              </p>
            </div>
          </div>
          <div className="market-overview-panel__spot">
            <div className="market-overview-panel__spot-block">
              <span className="market-overview-panel__spot-name">S&amp;P 500</span>
              <span className="market-overview-panel__spot-value">{spot?.value ?? "—"}</span>
            </div>
            <span
              className={
                String(spot?.change ?? "").startsWith("-")
                  ? "market-overview-panel__spot-today market-overview-panel__spot-today--loss"
                  : "market-overview-panel__spot-today market-overview-panel__spot-today--gain"
              }
            >
              {spot?.change ?? "—"}
              {spPtsToday != null && Number.isFinite(spPtsToday) ? (
                <>
                  {" "}
                  ({spPtsToday >= 0 ? "+" : ""}
                  {spPtsToday.toFixed(2)}) today
                </>
              ) : null}
            </span>
          </div>
          <div className="market-overview-panel__chart-wrap">
            <FinnhubLiveCandleChart symbol="SPY" embedInPanel livePrices={livePrices} />
          </div>
          <ul className="market-overview-panel__indices market-overview-panel__indices--cols">
            {HOME_US_INDICES.map((ix) => (
              <li key={ix.name} className="market-overview-panel__index-row">
                <span className="market-overview-panel__index-name">{ix.name}</span>
                <span className="market-overview-panel__index-val">{ix.value}</span>
                <span
                  className={
                    ix.change.startsWith("-")
                      ? "market-overview-panel__index-chg market-overview-panel__index-chg--loss"
                      : "market-overview-panel__index-chg market-overview-panel__index-chg--gain"
                  }
                >
                  {ix.change}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="allocation-panel">
          <h3 className="allocation-panel__title">Portfolio Allocation</h3>
          {totalAccountValue <= 0 ? (
            <p className="allocation-panel__empty">No balance modeled yet.</p>
          ) : (
            <>
              <div className="allocation-panel__donut-layout">
                <div
                  className="allocation-panel__donut"
                  style={{
                    background: `conic-gradient(from -90deg, #8dbfe8 0% ${bucketStocksPct}%, #c47a35 ${bucketStocksPct}% ${bucketStocksPct + bucketFundsPct}%, #4ade80 ${bucketStocksPct + bucketFundsPct}% 100%)`,
                  }}
                  aria-hidden="true"
                >
                  <span className="allocation-panel__donut-center">{abbrevAccountTotalCenter(totalAccountValue)}</span>
                </div>
                <ul className="allocation-panel__legend">
                  <li>
                    <span className="allocation-panel__dot allocation-panel__dot--stocks" />
                    Stocks {bucketStocksPct.toFixed(0)}%
                  </li>
                  <li>
                    <span className="allocation-panel__dot allocation-panel__dot--funds" />
                    Mutual Funds {bucketFundsPct.toFixed(0)}%
                  </li>
                  <li>
                    <span className="allocation-panel__dot allocation-panel__dot--cash" />
                    Cash {bucketCashPct.toFixed(0)}%
                  </li>
                </ul>
              </div>
              <button type="button" className="allocation-panel__link" onClick={() => setActiveTab("Holdings")}>
                View full allocation →
              </button>
            </>
          )}
        </section>

        <section className="holdings-panel">
          <div className="holdings-panel__top">
            <h3 className="holdings-panel__title">Holdings</h3>
            <button type="button" className="holdings-panel__open" onClick={() => setActiveTab("Holdings")}>
              View all
            </button>
          </div>
          {!hasEquityPositions ? (
            <p className="holdings-panel__empty">
              No holdings yet. Explore investments or practice first.
            </p>
          ) : (
            <>
              <ul className="holdings-panel__list">
                {positionRows.slice(0, 6).map((r) => {
                  const plPct =
                    r.invested > 0 && r.plAmount != null
                      ? (r.plAmount / r.invested) * 100
                      : null;
                  const plPctClass =
                    plPct == null
                      ? ""
                      : plPct >= 0
                        ? " holdings-panel__pl-pct--gain"
                        : " holdings-panel__pl-pct--loss";
                  return (
                    <li key={r.sym} className="holdings-panel__list-item">
                      {getCompanyLogo(r.sym, r.inv)}
                      <div className="holdings-panel__name-group">
                        <span className="holdings-panel__co">{r.inv?.name ?? r.sym}</span>
                        <span className="holdings-panel__sym-wrap"> ({r.sym})</span>
                      </div>
                      <div className="holdings-panel__right-stack">
                        <span className="holdings-panel__mv holdings-panel__mv--row">
                          {r.marketValue != null ? formatPracticeUsd(r.marketValue) : "—"}
                        </span>
                        <span className={`holdings-panel__pl-pct${plPctClass}`}>
                          {r.plAmount != null ? formatPracticeUsd(r.plAmount) : "—"}
                          {plPct != null ? ` (${plPct >= 0 ? "+" : ""}${plPct.toFixed(2)}%)` : ""}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="holdings-panel__total-row">
                <span className="holdings-panel__total-label">Total Holdings Value</span>
                <span className="holdings-panel__total-val">{formatPracticeUsd(holdingsTotalMv)}</span>
              </div>
            </>
          )}
        </section>
      </div>

      <div className="dashboard-grid dashboard-grid--bottom">
        <section className="watchlist-panel">
          <div className="watchlist-panel__top">
            <h3 className="watchlist-panel__title">Watchlist</h3>
            <button type="button" className="watchlist-panel__open" onClick={() => setActiveTab("Explore")}>
              View all
            </button>
          </div>
          <ul className="watchlist-panel__list">
            {watchlistItems.map((w) => {
              const dc = w.dailyChangePct;
              const pctClass =
                Number.isFinite(dc) && dc >= 0 ? "watchlist-panel__pct--gain" : "watchlist-panel__pct--loss";
              const companyPlain = w.name.replace(/\s+(Inc\.|Corporation).*$/i, "").trim();
              const invForLogo = bySymbol.get(w.symbol);
              return (
                <li key={w.symbol} className="watchlist-panel__item">
                  {getCompanyLogo(w.symbol, invForLogo)}
                  <div className="watchlist-panel__name-col">
                    <span className="watchlist-panel__name">{companyPlain}</span>
                    <span className="watchlist-panel__sym">({w.symbol})</span>
                  </div>
                  <span className="watchlist-panel__price">{w.price}</span>
                  <span className={`watchlist-panel__pct ${pctClass}`}>
                    {Number.isFinite(dc) ? `${dc >= 0 ? "+" : ""}${dc.toFixed(2)}%` : "—"}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="news-panel">
          <div className="news-panel__top">
            <h3 className="news-panel__title">Market News</h3>
            <button type="button" className="news-panel__open">
              View all
            </button>
          </div>
          <div className="news-panel__rows">
            {HOME_US_DEMO_NEWS.map((row, i) => {
              const meta = HOME_NEWS_DISPLAY_META[i] ?? HOME_NEWS_DISPLAY_META[0];
              return (
                <div key={row.title} className="news-panel__row news-panel__row--media">
                  <div className="news-panel__thumb" aria-hidden="true">
                    <ZenithNewsThumbnail kind={row.thumbnail ?? "chart"} />
                  </div>
                  <div className="news-panel__text">
                    <p className="news-panel__row-title">{row.title}</p>
                    <p className="news-panel__row-meta">{meta.source} · {meta.when}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

    </div>
  );
}

function ExplorePeekCard({ investment, livePrices = {}, onSelect }) {
  const sectorLabel = investment.sector ?? investment.category ?? "";
  const liveData = livePrices[investment.symbol];
  const displayPrice = liveData?.price ?? investment.price;
  return (
    <button
      type="button"
      onClick={() => onSelect(investment.symbol)}
      className="group rounded-2xl border border-white/10 bg-[#101827]/90 p-4 text-left transition hover:-translate-y-1 hover:border-[#20C997]/35 hover:bg-[#1D2A42] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#20C997]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-snug">{investment.name}</p>
          <p className="mt-1 text-xs font-medium text-[#20C997]">{investment.symbol}</p>
          <p className="mt-1 truncate text-xs text-[#CBD5E1]">{sectorLabel}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold tabular-nums">{displayPrice}</p>
          <p className="mt-1 text-[11px] leading-tight text-[#CBD5E1]">
            {investment.risk} risk
          </p>
        </div>
      </div>
    </button>
  );
}

function ExploreArticleCard({ title, source, summary }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-xs font-semibold text-[#20C997]">{source}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">{summary}</p>
    </div>
  );
}

function formatExploreDailyChangePct(pct) {
  if (!Number.isFinite(pct)) return "—";
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

function generateExploreInsight(inv) {
  const dc = inv.dailyChangePct;
  const sector = inv.sector ?? inv.category ?? "General";
  const risk = inv.risk ?? "Medium";
  const volatileDemo =
    Boolean(inv.volatile) ||
    (Number.isFinite(dc) && Math.abs(dc) >= 2) ||
    /Very\s*High/i.test(String(risk));

  const parts = [];

  parts.push(
    `Things to consider (${sector}): headlines rarely capture supply chains, regulation, or competitive shifts—cross-check narratives before leaning on any single ticker.`,
  );

  if (Number.isFinite(dc)) {
    parts.push(
      `This demo snapshot shows a modeled daily move of ${formatExploreDailyChangePct(dc)} (not live trading data). Larger moves often coincide with headline-driven volatility.`,
    );
  }

  if (volatileDemo) {
    parts.push(
      `Key risks: volatility appears elevated relative to quieter stretches—short-term marks may swing widely even when longer horizons differ.`,
    );
  } else {
    parts.push(
      `Near-term swings look comparatively tame in this mock dataset—markets can still gap overnight on macro news.`,
    );
  }

  if (/Very\s*High/i.test(risk)) {
    parts.push(
      `Given the Very High risk label here, sizing may be suitable only if you accept outsized drawdowns and have ample timeline.`,
    );
  } else if (/High/i.test(risk) && !/Very/i.test(risk)) {
    parts.push(
      `May be suitable only alongside diversification—high-beta profiles can dominate portfolio emotion during selloffs.`,
    );
  } else if (/Low-Medium/i.test(risk)) {
    parts.push(
      `May be suitable when used as broad-market pacing sleeves rather than concentrated bets.`,
    );
  } else if (/Medium/i.test(risk)) {
    parts.push(
      `May be suitable within diversified portfolios where cyclical tech exposure fits your plan—not as an isolated wager.`,
    );
  } else {
    parts.push(
      `May be suitable when blended with broader holdings still aligned with your liquidity needs.`,
    );
  }

  parts.push(
    `Sector lens (${sector}): labor costs, rates, and regulation frequently outweigh single-stock optimism.`,
  );

  parts.push(`This is educational, not financial advice.`);

  return parts.join(" ");
}

function StockSearchResultList({ matches, onPickSymbol, livePrices = {} }) {
  return (
    <ul className="mt-3 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#101827]/70">
      {matches.map((inv) => {
        const sectorLabel = inv.sector ?? inv.category ?? "";
        const liveData = livePrices[inv.symbol];
        const displayPrice = liveData?.price ?? inv.price;
        return (
          <li key={inv.symbol}>
            <button
              type="button"
              onClick={() => onPickSymbol(inv.symbol)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-white/[0.06] focus:outline-none focus-visible:bg-white/[0.06]"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#F8FAFC]">{inv.name}</p>
                <p className="mt-0.5 text-xs font-medium text-[#20C997]">{inv.symbol}</p>
                {sectorLabel ? (
                  <p className="mt-0.5 truncate text-xs text-[#CBD5E1]">{sectorLabel}</p>
                ) : null}
              </div>
              <span className="shrink-0 text-sm font-semibold tabular-nums text-[#F8FAFC]">
                {displayPrice}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Demo sell fee model for real portfolio — illustrative only */
function computeRealSellCharges(grossSaleValue, quantity) {
  const platformFee = Math.max(0.01, Math.round(grossSaleValue * 0.0025 * 100) / 100);
  const regulatoryFee = Math.max(0.01, Math.round(quantity * 0.01 * 100) / 100);
  const estimatedNet = Math.round((grossSaleValue - platformFee - regulatoryFee) * 100) / 100;
  return {
    platformFee,
    regulatoryFee,
    estimatedNet: Math.max(0, estimatedNet),
  };
}

function evaluateRealPortfolioTrade({
  side,
  qtyInput,
  symbol,
  investment,
  realCash,
  holdings,
}) {
  const price = parseExplorePrice(investment.price);
  const qtyRaw = String(qtyInput).trim();
  const qty = Number.parseInt(qtyRaw, 10);

  if (price == null || !(price > 0)) {
    return { ok: false, message: "Could not read a demo price for this instrument." };
  }
  if (!/^[1-9]\d*$/.test(qtyRaw) || !Number.isFinite(qty) || qty <= 0) {
    return {
      ok: false,
      message: "Enter a whole number quantity greater than zero.",
    };
  }

  const lineValue = qty * price;

  if (side === "buy") {
    if (lineValue > realCash) {
      return { ok: false, message: "Insufficient cash for this purchase." };
    }
    return {
      ok: true,
      quantity: qty,
      price,
      totalCost: lineValue,
      remainingCash: realCash - lineValue,
    };
  }

  const owned = holdings[symbol]?.quantity ?? 0;
  if (qty > owned) {
    return { ok: false, message: "You cannot sell more shares than you own." };
  }

  const grossSaleValue = lineValue;
  const charges = computeRealSellCharges(grossSaleValue, qty);
  return {
    ok: true,
    quantity: qty,
    price,
    grossSaleValue,
    platformFee: charges.platformFee,
    regulatoryFee: charges.regulatoryFee,
    estimatedNet: charges.estimatedNet,
    remainingCash: realCash + charges.estimatedNet,
  };
}

/** Educational timing context per holding — not financial advice */
function generateHoldingTimingInsight(inv, lastPrice, avgPrice) {
  const parts = [];
  const dc = inv?.dailyChangePct;
  const volatile =
    Boolean(inv?.volatile) ||
    (Number.isFinite(dc) && Math.abs(dc) >= 2);

  if (!Number.isFinite(lastPrice) || !Number.isFinite(avgPrice)) {
    return (
      "Educational note: compare current demo marks to your average cost when reviewing how a position fits your plan. Not financial advice."
    );
  }

  if (lastPrice > avgPrice) {
    parts.push(
      "This holding is currently above your average buy price in Zenith’s demo data.",
    );
    parts.push(
      "If this sleeves toward a nearer-term goal, some investors pause to ask whether trimming rebalance risk makes sense for them—purely informational framing, not a recommendation.",
    );
  } else if (lastPrice < avgPrice) {
    parts.push(
      "This holding is currently below your average buy price in the mock snapshot.",
    );
    parts.push(
      "Drawdowns happen in diversified portfolios too; timelines and contribution rhythm often matter more than one quote date—educational context only.",
    );
  } else {
    parts.push("Demo last traded price matches your average cost for this position.");
  }

  if (volatile) {
    parts.push(
      "Modeled daily moves look comparatively lively—worth revisiting how this name meshes with your broader allocation assumptions.",
    );
  }

  parts.push("Educational insight only—not financial advice.");
  return parts.join(" ");
}

function HoldingsRealTradeModal({
  investment,
  initialSide,
  realCash,
  holdings,
  setRealCash,
  setHoldings,
  onClose,
}) {
  const symbol = investment.symbol;
  const [tradeSide, setTradeSide] = useState(initialSide);
  const [qtyInput, setQtyInput] = useState("");
  const [tradePreview, setTradePreview] = useState(null);
  const [tradeFeedback, setTradeFeedback] = useState("");

  useEffect(() => {
    setTradeSide(initialSide);
    setQtyInput("");
    setTradePreview(null);
    setTradeFeedback("");
  }, [investment.symbol, initialSide]);

  function runEvaluate() {
    return evaluateRealPortfolioTrade({
      side: tradeSide,
      qtyInput,
      symbol,
      investment,
      realCash,
      holdings,
    });
  }

  function handlePreviewRealTrade() {
    const result = runEvaluate();
    if (!result.ok) {
      setTradePreview(null);
      setTradeFeedback(result.message ?? "Invalid trade.");
      return;
    }
    setTradeFeedback("");
    if (tradeSide === "buy") {
      setTradePreview({
        side: "buy",
        quantity: result.quantity,
        price: result.price,
        totalCost: result.totalCost,
        remainingCash: result.remainingCash,
      });
    } else {
      setTradePreview({
        side: "sell",
        quantity: result.quantity,
        price: result.price,
        grossSaleValue: result.grossSaleValue,
        platformFee: result.platformFee,
        regulatoryFee: result.regulatoryFee,
        estimatedNet: result.estimatedNet,
        remainingCash: result.remainingCash,
      });
    }
  }

  function handleExecuteRealTrade() {
    const result = runEvaluate();
    if (!result.ok) {
      setTradeFeedback(result.message ?? "Invalid trade.");
      return;
    }

    const qty = result.quantity;
    const price = result.price;

    if (tradeSide === "buy") {
      const totalCost = result.totalCost;
      setRealCash((c) => c - totalCost);
      setHoldings((prev) => {
        const cur = prev[symbol];
        if (!cur) {
          return { ...prev, [symbol]: { quantity: qty, avgPrice: price } };
        }
        const newQty = cur.quantity + qty;
        const newAvg = (cur.quantity * cur.avgPrice + qty * price) / newQty;
        return { ...prev, [symbol]: { quantity: newQty, avgPrice: newAvg } };
      });
    } else {
      const net = result.estimatedNet;
      setRealCash((c) => c + net);
      setHoldings((prev) => {
        const cur = prev[symbol];
        if (!cur) return prev;
        const nextQ = cur.quantity - qty;
        const next = { ...prev };
        if (nextQ <= 0) delete next[symbol];
        else next[symbol] = { ...cur, quantity: nextQ };
        return next;
      });
    }

    onClose();
  }

  function backdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4"
      onClick={backdropClick}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-[#162033] p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="holdings-trade-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 id="holdings-trade-title" className="text-lg font-semibold">
              Real Portfolio · Trade
            </h3>
            <p className="mt-1 text-sm text-[#CBD5E1]">
              {investment.name} ({symbol})
            </p>
          </div>
          <button
            type="button"
            className="rounded-full px-3 py-1 text-sm text-[#CBD5E1] hover:bg-white/10 hover:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="mt-3 text-xs text-[#CBD5E1]">
          Demo pricing only. Updates real holdings and cash—not Practice.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setTradeSide("buy");
              setTradePreview(null);
              setTradeFeedback("");
            }}
            className={`trade-pill-buy${tradeSide === "buy" ? " trade-pill-buy--active" : ""}`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => {
              setTradeSide("sell");
              setTradePreview(null);
              setTradeFeedback("");
            }}
            className={`trade-pill-sell${tradeSide === "sell" ? " trade-pill-sell--active" : ""}`}
          >
            Sell
          </button>
        </div>

        <label className="mt-5 block text-sm">
          <span className="text-[#CBD5E1]">Quantity (whole shares)</span>
          <input
            type="text"
            inputMode="numeric"
            className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#20C997]"
            placeholder="e.g. 10"
            value={qtyInput}
            onChange={(e) => {
              setQtyInput(e.target.value);
              setTradePreview(null);
              setTradeFeedback("");
            }}
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/5"
            onClick={handlePreviewRealTrade}
          >
            Preview trade
          </button>
          <button
            type="button"
            className="rounded-2xl bg-[#20C997] px-5 py-3 font-semibold text-[#0B1320]"
            onClick={handleExecuteRealTrade}
          >
            Execute trade
          </button>
        </div>

        {tradeFeedback ? (
          <p className="mt-3 text-sm text-amber-300">{tradeFeedback}</p>
        ) : null}

        {tradePreview ? (
          <div className="mt-5 rounded-2xl bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#CBD5E1]">
              Trade preview
            </p>
            {tradePreview.side === "buy" ? (
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[#CBD5E1]">Action</dt>
                  <dd className="font-semibold">Buy</dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Quantity</dt>
                  <dd className="font-semibold">{tradePreview.quantity}</dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Price per share</dt>
                  <dd className="font-semibold">{formatPracticeUsd(tradePreview.price)}</dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Total cost</dt>
                  <dd className="font-semibold">{formatPracticeUsd(tradePreview.totalCost)}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[#CBD5E1]">Cash after trade</dt>
                  <dd className="font-semibold">{formatPracticeUsd(tradePreview.remainingCash)}</dd>
                </div>
              </dl>
            ) : (
              <dl className="mt-3 grid gap-2 text-sm">
                <div>
                  <dt className="text-[#CBD5E1]">Action</dt>
                  <dd className="font-semibold">Sell</dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Quantity</dt>
                  <dd className="font-semibold">{tradePreview.quantity}</dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Price per share</dt>
                  <dd className="font-semibold">{formatPracticeUsd(tradePreview.price)}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 pt-3 mt-3">
                  <dt className="text-[#CBD5E1]">Gross sale value</dt>
                  <dd className="font-semibold tabular-nums">
                    {formatPracticeUsd(tradePreview.grossSaleValue)}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-[#CBD5E1]">Platform fee (demo)</dt>
                  <dd className="font-semibold tabular-nums">
                    −{formatPracticeUsd(tradePreview.platformFee)}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-[#CBD5E1]">Regulatory fee (demo)</dt>
                  <dd className="font-semibold tabular-nums">
                    −{formatPracticeUsd(tradePreview.regulatoryFee)}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 pt-3">
                  <dt className="font-medium text-[#F8FAFC]">Estimated net amount</dt>
                  <dd className="font-semibold tabular-nums text-[#20C997]">
                    {formatPracticeUsd(tradePreview.estimatedNet)}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-[#CBD5E1]">Cash after trade</dt>
                  <dd className="font-semibold tabular-nums">
                    {formatPracticeUsd(tradePreview.remainingCash)}
                  </dd>
                </div>
              </dl>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ZenithGuardianTradeModal({
  open,
  hasReadAnalysis,
  hasViewedPrice,
  userDisplayName,
  onBackdropClick,
  onReviewFirst,
  onProceedAnyway,
}) {
  if (!open) return null;
  function backdropClose(e) {
    if (e.target === e.currentTarget) {
      onBackdropClick();
    }
  }
  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-[rgba(0,0,0,0.7)] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="zenith-guardian-title"
      onClick={backdropClose}
    >
      <div
        className="w-full max-w-[420px] rounded-2xl border-2 border-[#c47a35] bg-[#0d2131] px-8 py-8 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-4xl" aria-hidden>
          🛡️
        </p>
        <h2
          id="zenith-guardian-title"
          className="mt-3 text-center text-xl font-bold text-[#f5f8fb]"
        >
          Hold on, {userDisplayName}!
        </h2>
        <p className="mt-2 text-center text-sm leading-relaxed text-[#9fb0c0]">
          You haven&apos;t fully reviewed this investment yet. Smart investors always read before
          they buy.
        </p>
        <ul className="mt-5 space-y-2 text-sm">
          <li
            className={`flex items-center gap-2 font-medium ${hasReadAnalysis ? "text-[#4ade80]" : "text-[#ef4444]"}`}
          >
            <span aria-hidden>{hasReadAnalysis ? "✓" : "✗"}</span>
            Read AI Analysis
          </li>
          <li
            className={`flex items-center gap-2 font-medium ${hasViewedPrice ? "text-[#4ade80]" : "text-[#ef4444]"}`}
          >
            <span aria-hidden>{hasViewedPrice ? "✓" : "✗"}</span>
            Reviewed price chart
          </li>
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onReviewFirst}
            className="w-full rounded-xl bg-[#c47a35] py-3 text-sm font-bold text-[#f5f8fb] transition hover:brightness-110"
          >
            Let me review first
          </button>
          <button
            type="button"
            onClick={onProceedAnyway}
            className="w-full rounded-xl border border-[rgba(141,191,232,0.25)] bg-[rgba(4,16,27,0.75)] py-3 text-sm font-semibold text-[#CBD5E1] transition hover:bg-[rgba(4,16,27,1)]"
          >
            I understand the risk, buy anyway
          </button>
        </div>
        <p className="mt-5 text-center text-xs text-[#9fb0c0]">
          Zenith cares about your financial wellbeing 💚
        </p>
      </div>
    </div>
  );
}

function FinnhubLiveCandleChart({ symbol, embedInPanel = false, livePrices = {} }) {
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(true);
  const [activeRange, setActiveRange] = useState("1D");

  useEffect(() => {
    let cancelled = false;

    function generateMockChartData(sym, rangeKey) {
      if (cancelled) return;
      const liveData = livePrices[sym];
      const inv = EXPLORE_MOCK_INVESTMENTS.find((i) => i.symbol === sym);
      let basePrice =
        liveData?.rawPrice ??
        parseExplorePrice(inv?.price ?? "100") ??
        100;
      if (!Number.isFinite(basePrice) || basePrice <= 0) basePrice = 100;

      let points;
      let volatility;
      switch (rangeKey) {
        case "1D":
          points = 78;
          volatility = 0.004;
          break;
        case "1W":
          points = 35;
          volatility = 0.008;
          break;
        case "1M":
          points = 30;
          volatility = 0.015;
          break;
        case "3M":
          points = 90;
          volatility = 0.012;
          break;
        case "1Y":
          points = 52;
          volatility = 0.018;
          break;
        default:
          points = 78;
          volatility = 0.004;
      }

      const data = [];
      let price = basePrice * (1 - Math.random() * volatility * points * 0.5);
      const nowMs = Date.now();

      for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.47) * volatility;
        price *= 1 + change;

        let timeLabel;
        if (rangeKey === "1D") {
          const t = new Date(nowMs - (points - i) * 5 * 60000);
          timeLabel = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        } else {
          const t = new Date(nowMs - (points - i) * 86400000);
          timeLabel = t.toLocaleDateString([], { month: "short", day: "numeric" });
        }

        data.push({ time: timeLabel, price: parseFloat(price.toFixed(2)) });
      }

      data[data.length - 1].price = Number(basePrice.toFixed(2));
      if (cancelled) return;
      setChartData(data);
    }

    async function fetchChartData(sym, range) {
      setChartLoading(true);
      try {
        const now = Math.floor(Date.now() / 1000);
        let from;
        let resolution;

        switch (range) {
          case "1D":
            from = now - 86400 * 2;
            resolution = "5";
            break;
          case "1W":
            from = now - 86400 * 7;
            resolution = "15";
            break;
          case "1M":
            from = now - 86400 * 30;
            resolution = "60";
            break;
          case "3M":
            from = now - 86400 * 90;
            resolution = "D";
            break;
          case "1Y":
            from = now - 86400 * 365;
            resolution = "W";
            break;
          default:
            from = now - 86400 * 2;
            resolution = "5";
        }

        const url = `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(sym)}&resolution=${resolution}&from=${from}&to=${now}&token=${import.meta.env.VITE_FINNHUB_KEY}`;

        const res = await fetch(url);
        const data = await res.json();

        console.log("Finnhub chart response for", sym, ":", data);

        if (cancelled) return;

        if (data.s === "ok" && data.c && data.c.length > 0 && Array.isArray(data.t)) {
          const formatted = data.t.map((timestamp, i) => ({
            time:
              range === "1D"
                ? new Date(timestamp * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date(timestamp * 1000).toLocaleDateString([], { month: "short", day: "numeric" }),
            price: parseFloat(Number(data.c[i]).toFixed(2)),
            high: data.h[i],
            low: data.l[i],
            open: data.o[i],
          }));
          if (!cancelled) setChartData(formatted);
        } else if (data.s === "no_data") {
          generateMockChartData(sym, range);
        } else {
          generateMockChartData(sym, range);
        }
      } catch (e) {
        console.log("Chart fetch error:", e);
        if (!cancelled) generateMockChartData(sym, range);
      }
      if (!cancelled) setChartLoading(false);
    }

    fetchChartData(symbol, activeRange);
    return () => {
      cancelled = true;
    };
  }, [symbol, activeRange, livePrices]);

  return (
    <div
      style={{
        background: "rgba(4,16,27,0.5)",
        borderRadius: "12px",
        border: "1px solid rgba(141,191,232,0.12)",
        padding: "16px",
        marginTop: embedInPanel ? 0 : "16px",
      }}
    >
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
        {["1D", "1W", "1M", "3M", "1Y"].map((range) => (
          <button
            key={range}
            type="button"
            onClick={() => setActiveRange(range)}
            style={{
              padding: "4px 12px",
              borderRadius: "20px",
              border:
                activeRange === range
                  ? "1px solid #8dbfe8"
                  : "1px solid rgba(141,191,232,0.18)",
              background: activeRange === range ? "rgba(141,191,232,0.2)" : "transparent",
              color: activeRange === range ? "#8dbfe8" : "#9fb0c0",
              fontSize: "0.75rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {range}
          </button>
        ))}
      </div>

      {chartLoading ? (
        <div
          style={{
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              border: "3px solid rgba(141,191,232,0.2)",
              borderTopColor: "#8dbfe8",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      ) : chartData.length === 0 ? (
        <div
          style={{
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9fb0c0",
            fontSize: "0.875rem",
          }}
        >
          No chart data available
        </div>
      ) : (
        <div style={{ height: "180px", position: "relative" }}>
          {(() => {
            const prices = chartData.map((d) => d.price);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            const rangePx = max - min || 1;
            const W = 600;
            const H = 160;
            const pad = 10;
            const denom = Math.max(prices.length - 1, 1);

            const points = prices
              .map((p, i) => {
                const x = pad + (i / denom) * (W - pad * 2);
                const y = H - pad - ((p - min) / rangePx) * (H - pad * 2);
                return `${x},${y}`;
              })
              .join(" ");

            const firstPrice = prices[0];
            const lastPrice = prices[prices.length - 1];
            const isPositive = lastPrice >= firstPrice;
            const color = isPositive ? "#4ade80" : "#ef4444";
            const fillColor = isPositive ? "rgba(74,222,128,0.08)" : "rgba(239,68,68,0.08)";

            const areaPoints = `${pad},${H - pad} ${points} ${W - pad},${H - pad}`;

            const lastIdx = prices.length - 1;
            const cx = pad + (lastIdx / denom) * (W - pad * 2);
            const cy = H - pad - ((lastPrice - min) / rangePx) * (H - pad * 2);

            return (
              <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                style={{ width: "100%", height: "100%" }}
              >
                <polygon points={areaPoints} fill={fillColor} />
                <polyline
                  points={points}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <circle cx={cx} cy={cy} r="4" fill={color} />
              </svg>
            );
          })()}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              fontSize: "0.7rem",
              color: "#9fb0c0",
            }}
          >
            <span>{chartData[0]?.time}</span>
            <span
              style={{
                color:
                  chartData[chartData.length - 1]?.price >= chartData[0]?.price
                    ? "#4ade80"
                    : "#ef4444",
                fontWeight: "600",
              }}
            >
              ${chartData[chartData.length - 1]?.price?.toFixed(2)}
            </span>
            <span>{chartData[chartData.length - 1]?.time}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ExploreCompanyDetail({
  investment,
  onBack,
  onPracticeTrade,
  demoActionNotice,
  setDemoActionNotice,
  realCash,
  holdings,
  setRealCash,
  setHoldings,
  livePrices = {},
}) {
  const [guardianShown, setGuardianShown] = useState(false);
  const [guardianDismissed, setGuardianDismissed] = useState(false);

  const [realTradeSide, setRealTradeSide] = useState("buy");
  const [qtyInput, setQtyInput] = useState("");
  const [tradePreview, setTradePreview] = useState(null);
  const [tradeFeedback, setTradeFeedback] = useState("");

  const symbol = investment.symbol;
  const liveData = livePrices[investment.symbol];
  const displayPrice = liveData?.price ?? investment.price;
  const displayChangePct = liveData?.dailyChangePct ?? investment.dailyChangePct;
  const investmentForTrade = { ...investment, price: displayPrice, dailyChangePct: displayChangePct };

  useEffect(() => {
    setGuardianShown(false);
    setGuardianDismissed(false);
  }, [investment.symbol]);

  function evaluateRealTrade() {
    return evaluateRealPortfolioTrade({
      side: realTradeSide,
      qtyInput,
      symbol,
      investment: investmentForTrade,
      realCash,
      holdings,
    });
  }

  function handlePreviewRealTrade() {
    const result = evaluateRealTrade();
    if (!result.ok) {
      setTradePreview(null);
      setTradeFeedback(result.message ?? "Invalid trade.");
      return;
    }
    setTradeFeedback("");
    if (realTradeSide === "buy") {
      setTradePreview({
        side: "buy",
        quantity: result.quantity,
        price: result.price,
        totalCost: result.totalCost,
        remainingCash: result.remainingCash,
      });
    } else {
      setTradePreview({
        side: "sell",
        quantity: result.quantity,
        price: result.price,
        grossSaleValue: result.grossSaleValue,
        platformFee: result.platformFee,
        regulatoryFee: result.regulatoryFee,
        estimatedNet: result.estimatedNet,
        remainingCash: result.remainingCash,
      });
    }
  }

  function handleExecuteRealTrade() {
    // GUARDIAN — show warning ONCE if not dismissed
    if (!guardianDismissed) {
      setGuardianShown(true);
      return;
    }

    // Original trade logic
    const result = evaluateRealTrade();
    if (!result.ok) {
      setTradeFeedback(result.message ?? "Invalid trade.");
      return;
    }

    const qty = result.quantity;
    const price = result.price;

    if (realTradeSide === "buy") {
      const totalCost = result.totalCost;
      setRealCash((c) => c - totalCost);
      setHoldings((prev) => {
        const cur = prev[symbol];
        if (!cur) {
          return { ...prev, [symbol]: { quantity: qty, avgPrice: price } };
        }
        const newQty = cur.quantity + qty;
        const newAvg = (cur.quantity * cur.avgPrice + qty * price) / newQty;
        return { ...prev, [symbol]: { quantity: newQty, avgPrice: newAvg } };
      });
    } else {
      const net = result.estimatedNet;
      setRealCash((c) => c + net);
      setHoldings((prev) => {
        const cur = prev[symbol];
        if (!cur) return prev;
        const nextQ = cur.quantity - qty;
        const next = { ...prev };
        if (nextQ <= 0) delete next[symbol];
        else next[symbol] = { ...cur, quantity: nextQ };
        return next;
      });
    }

    setTradeFeedback("Trade executed — Real Portfolio updated.");
    setTradePreview(null);
    setQtyInput("");
  }

  function handleRealQtyChange(next) {
    setQtyInput(next);
    setTradePreview(null);
    setTradeFeedback("");
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-medium text-[#CBD5E1] transition hover:text-white"
      >
        ← Back to search
      </button>

      <section className="rounded-3xl bg-[#162033] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-[#CBD5E1]">Company</p>
            <h3 className="text-2xl font-bold">{investment.name}</h3>
            <p className="text-sm text-[#CBD5E1]">
              Ticker {investment.symbol} · {investment.sector ?? investment.category}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setRealTradeSide("buy");
                setTradePreview(null);
                setTradeFeedback("");
              }}
              className={`trade-pill-buy${realTradeSide === "buy" ? " trade-pill-buy--active" : ""}`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => {
                setRealTradeSide("sell");
                setTradePreview(null);
                setTradeFeedback("");
              }}
              className={`trade-pill-sell${realTradeSide === "sell" ? " trade-pill-sell--active" : ""}`}
            >
              Sell
            </button>
            <button
              type="button"
              onClick={onPracticeTrade}
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#CBD5E1] transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              Practice Trade
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setDemoActionNotice("Saved to Watchlist (demo only — no account linked).")
          }
          className="mt-3 text-left text-xs font-medium text-[#94a3b8] underline-offset-2 hover:text-[#CBD5E1] hover:underline"
        >
          Add to watchlist (demo)
        </button>
        {demoActionNotice ? (
          <p className="mt-2 text-xs text-[#CBD5E1]">{demoActionNotice}</p>
        ) : null}

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Metric label="Current price" value={displayPrice} />
          <Metric
            label="Daily change"
            value={formatExploreDailyChangePct(displayChangePct)}
          />
          <Metric label="Market cap" value={investment.marketCap} />
          <Metric label="Sector" value={investment.sector ?? investment.category} />
          <Metric label="52-week high" value={investment.week52High} />
          <Metric label="52-week low" value={investment.week52Low} />
          <Metric label="Risk level" value={investment.risk} />
        </div>

        <FinnhubLiveCandleChart symbol={investment.symbol} livePrices={livePrices} />

        <div className="mt-5 rounded-2xl bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#CBD5E1]">
            Beginner-friendly overview
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#F8FAFC]">
            {investment.beginnerSummary}
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#20C997]">
            Real Portfolio
          </p>
          <p className="mt-1 text-sm font-semibold text-[#CBD5E1]">Trade this stock</p>
          <p className="mt-1 text-xs text-[#CBD5E1]/90">
            Demo prices from Explore. Updates Real Portfolio cash and holdings only — not Practice.
          </p>

          <label className="mt-4 block text-sm">
            <span className="text-[#CBD5E1]">Quantity (whole shares)</span>
            <input
              type="text"
              inputMode="numeric"
              className="mt-1 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#20C997]"
              placeholder="e.g. 10"
              value={qtyInput}
              onChange={(e) => handleRealQtyChange(e.target.value)}
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/5"
              onClick={handlePreviewRealTrade}
            >
              Preview trade
            </button>
            <button
              type="button"
              className="rounded-2xl bg-[#20C997] px-5 py-3 font-semibold text-[#0B1320]"
              onClick={handleExecuteRealTrade}
            >
              Execute trade
            </button>
          </div>

          {tradeFeedback ? (
            <p
              className={`mt-3 text-sm ${tradeFeedback.includes("executed") ? "text-[#20C997]" : "text-amber-300"}`}
            >
              {tradeFeedback}
            </p>
          ) : null}

          {tradePreview ? (
            <div className="mt-5 rounded-2xl bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#CBD5E1]">
                Trade preview
              </p>
              {tradePreview.side === "buy" ? (
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[#CBD5E1]">Action</dt>
                    <dd className="font-semibold">Buy</dd>
                  </div>
                  <div>
                    <dt className="text-[#CBD5E1]">Quantity</dt>
                    <dd className="font-semibold">{tradePreview.quantity}</dd>
                  </div>
                  <div>
                    <dt className="text-[#CBD5E1]">Price per share</dt>
                    <dd className="font-semibold">{formatPracticeUsd(tradePreview.price)}</dd>
                  </div>
                  <div>
                    <dt className="text-[#CBD5E1]">Total cost</dt>
                    <dd className="font-semibold">{formatPracticeUsd(tradePreview.totalCost)}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[#CBD5E1]">Cash after trade</dt>
                    <dd className="font-semibold">{formatPracticeUsd(tradePreview.remainingCash)}</dd>
                  </div>
                </dl>
              ) : (
                <dl className="mt-3 grid gap-2 text-sm">
                  <div>
                    <dt className="text-[#CBD5E1]">Action</dt>
                    <dd className="font-semibold">Sell</dd>
                  </div>
                  <div>
                    <dt className="text-[#CBD5E1]">Quantity</dt>
                    <dd className="font-semibold">{tradePreview.quantity}</dd>
                  </div>
                  <div>
                    <dt className="text-[#CBD5E1]">Price per share</dt>
                    <dd className="font-semibold">{formatPracticeUsd(tradePreview.price)}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 pt-3 mt-3">
                    <dt className="text-[#CBD5E1]">Gross sale value</dt>
                    <dd className="font-semibold tabular-nums">
                      {formatPracticeUsd(tradePreview.grossSaleValue)}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-[#CBD5E1]">Platform fee (demo)</dt>
                    <dd className="font-semibold tabular-nums">
                      −{formatPracticeUsd(tradePreview.platformFee)}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-[#CBD5E1]">Regulatory fee (demo)</dt>
                    <dd className="font-semibold tabular-nums">
                      −{formatPracticeUsd(tradePreview.regulatoryFee)}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 pt-3">
                    <dt className="font-medium text-[#F8FAFC]">Estimated net amount</dt>
                    <dd className="font-semibold tabular-nums text-[#20C997]">
                      {formatPracticeUsd(tradePreview.estimatedNet)}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-[#CBD5E1]">Cash after trade</dt>
                    <dd className="font-semibold tabular-nums">
                      {formatPracticeUsd(tradePreview.remainingCash)}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          ) : null}
        </div>
      </section>

      <section className="ai-insight-section rounded-3xl border border-[#F5C542]/30 bg-[#F5C542]/10 p-5">
        <h3 className="text-lg font-semibold text-[#F5C542]">AI Investment Insight</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
          {generateExploreInsight({ ...investment, dailyChangePct: displayChangePct })}
        </p>
        <p className="mt-3 text-xs text-[#CBD5E1]">
          Educational insight only. Not financial advice.
        </p>
      </section>

      <section className="rounded-3xl bg-[#162033] p-5">
        <h3 className="mb-3 text-lg font-semibold">Related News</h3>
        <div className="space-y-3">
          {(investment.newsArticles ?? []).map((article, idx) => (
            <ExploreArticleCard
              key={`${investment.symbol}-${idx}-${article.title}`}
              title={article.title}
              source={article.source}
              summary={article.summary}
            />
          ))}
        </div>
      </section>

      {guardianShown && !guardianDismissed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#0d2131",
              border: "2px solid #c47a35",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>🛡️</div>
            <h3
              style={{
                color: "#f5f8fb",
                fontSize: "1.25rem",
                fontWeight: "700",
                margin: "0 0 12px 0",
              }}
            >
              Hold on! Read before you buy.
            </h3>
            <p
              style={{
                color: "#9fb0c0",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                margin: "0 0 24px 0",
              }}
            >
              Smart investors always review an investment before buying. Have you read the AI analysis below?
            </p>

            <div
              style={{
                background: "rgba(196,122,53,0.1)",
                border: "1px solid rgba(196,122,53,0.3)",
                borderRadius: "10px",
                padding: "14px",
                marginBottom: "24px",
                fontSize: "0.8rem",
                color: "#9fb0c0",
                lineHeight: "1.6",
                textAlign: "left",
              }}
            >
              💡 Scroll down to read the <strong style={{ color: "#f5f8fb" }}>AI Investment Insight</strong> and{" "}
              <strong style={{ color: "#f5f8fb" }}>Beginner Overview</strong> before making a decision.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                onClick={() => {
                  setGuardianShown(false);
                  document.querySelector(".ai-insight-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#c47a35",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Let me review first ✓
              </button>
              <button
                type="button"
                onClick={() => {
                  setGuardianDismissed(true);
                  setGuardianShown(false);
                  setTimeout(() => handleExecuteRealTrade(), 50);
                }}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(141,191,232,0.18)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#9fb0c0",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                I understand the risk, buy anyway
              </button>
            </div>

            <p
              style={{
                color: "#9fb0c0",
                fontSize: "0.72rem",
                marginTop: "16px",
                margin: "16px 0 0 0",
              }}
            >
              Zenith cares about your financial wellbeing 💚
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function PracticeCompanyDetail({
  investment,
  onBack,
  tradeSide,
  onSelectTradeSide,
  qtyInput,
  onQtyChange,
  tradePreview,
  tradeFeedback,
  onPreviewTrade,
  onExecuteTrade,
  formatPracticeUsd,
}) {
  const symbol = investment.symbol;

  const [hasReadAnalysis, setHasReadAnalysis] = useState(false);
  const [hasViewedPrice, setHasViewedPrice] = useState(false);
  const [showGuardianWarning, setShowGuardianWarning] = useState(false);
  const [guardianDismissed, setGuardianDismissed] = useState(false);

  const aiInsightRef = useRef(null);

  useEffect(() => {
    setHasReadAnalysis(false);
    setHasViewedPrice(false);
    setShowGuardianWarning(false);
    setGuardianDismissed(false);
  }, [symbol]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setHasViewedPrice(true);
    }, 3000);
    return () => window.clearTimeout(id);
  }, [symbol]);

  useEffect(() => {
    const el = aiInsightRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasReadAnalysis(true);
        }
      },
      { root: null, threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [symbol]);

  function runActualPracticeTrade() {
    onExecuteTrade();
  }

  function handleGuardedExecuteTrade() {
    if ((!hasReadAnalysis || !hasViewedPrice) && !guardianDismissed) {
      setShowGuardianWarning(true);
      return;
    }
    runActualPracticeTrade();
  }

  return (
    <div className="space-y-5">
      <ZenithGuardianTradeModal
        open={showGuardianWarning}
        hasReadAnalysis={hasReadAnalysis}
        hasViewedPrice={hasViewedPrice}
        userDisplayName="Investor"
        onBackdropClick={() => setShowGuardianWarning(false)}
        onReviewFirst={() => {
          setShowGuardianWarning(false);
          aiInsightRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        onProceedAnyway={() => {
          setGuardianDismissed(true);
          setShowGuardianWarning(false);
          runActualPracticeTrade();
        }}
      />

      <button
        type="button"
        onClick={onBack}
        className="text-sm font-medium text-[#CBD5E1] transition hover:text-white"
      >
        ← Back to search
      </button>

      <section className="rounded-3xl bg-[#162033] p-5">
        <div>
          <h3 className="text-2xl font-bold">{investment.name}</h3>
          <p className="mt-1 text-sm text-[#CBD5E1]">
            {investment.symbol} · {investment.sector ?? investment.category}
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Current price" value={investment.price} />
          <Metric label="Sector" value={investment.sector ?? investment.category} />
          <Metric label="Risk level" value={investment.risk} />
        </div>

        <div className="mt-5 rounded-2xl bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#CBD5E1]">
            Company overview
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#F8FAFC]">
            {investment.beginnerSummary}
          </p>
        </div>

        <section
          ref={aiInsightRef}
          className="mt-6 rounded-3xl border border-[#20C997]/35 bg-[#20C997]/10 p-5"
        >
          <h3 className="text-lg font-semibold text-[#20C997]">AI Investment Insight</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
            {generateExploreInsight(investment)}
          </p>
          <p className="mt-3 text-xs text-[#CBD5E1]">
            Educational insight only. Not financial advice.
          </p>
        </section>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm font-semibold text-[#CBD5E1]">Practice trading</p>
          <p className="mt-1 text-xs text-[#CBD5E1]/90">
            Demo prices only — same mock data as Explore.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSelectTradeSide("buy")}
              className={`trade-pill-buy${tradeSide === "buy" ? " trade-pill-buy--active" : ""}`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => onSelectTradeSide("sell")}
              className={`trade-pill-sell${tradeSide === "sell" ? " trade-pill-sell--active" : ""}`}
            >
              Sell
            </button>
          </div>

          <label className="mt-5 block text-sm">
            <span className="text-[#CBD5E1]">Quantity (whole shares)</span>
            <input
              type="text"
              inputMode="numeric"
              className="mt-1 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#20C997]"
              placeholder="e.g. 10"
              value={qtyInput}
              onChange={(e) => onQtyChange(e.target.value)}
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/5"
              onClick={onPreviewTrade}
            >
              Preview trade
            </button>
            <button
              type="button"
              className="rounded-2xl bg-[#20C997] px-5 py-3 font-semibold text-[#0B1320]"
              onClick={handleGuardedExecuteTrade}
            >
              Execute trade
            </button>
          </div>

          {tradeFeedback ? (
            <p
              className={`mt-3 text-sm ${tradeFeedback.includes("demo") ? "text-[#20C997]" : "text-amber-300"}`}
            >
              {tradeFeedback}
            </p>
          ) : null}

          {tradePreview ? (
            <div className="mt-5 rounded-2xl bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#CBD5E1]">
                Trade preview
              </p>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[#CBD5E1]">Stock</dt>
                  <dd className="font-semibold">
                    {tradePreview.stockName}{" "}
                    <span className="font-normal text-[#CBD5E1]">
                      ({tradePreview.symbol})
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Action</dt>
                  <dd className="font-semibold">{tradePreview.action}</dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Quantity</dt>
                  <dd className="font-semibold">{tradePreview.quantity}</dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Estimated price</dt>
                  <dd className="font-semibold">{formatPracticeUsd(tradePreview.estimatedPrice)}</dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Estimated total</dt>
                  <dd className="font-semibold">{formatPracticeUsd(tradePreview.estimatedTotal)}</dd>
                </div>
                <div>
                  <dt className="text-[#CBD5E1]">Remaining cash after trade</dt>
                  <dd className="font-semibold">{formatPracticeUsd(tradePreview.remainingCash)}</dd>
                </div>
              </dl>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function Explore({
  setActiveTab,
  setPracticePresetSymbol,
  setPracticePresetTradeSide,
  realCash,
  setRealCash,
  holdings,
  setHoldings,
  explorePresetSymbol,
  clearExplorePreset,
  livePrices,
}) {
  const [exploreQuery, setExploreQuery] = useState("");
  const [exploreDetailSymbol, setExploreDetailSymbol] = useState(null);
  const [demoActionNotice, setDemoActionNotice] = useState("");

  useEffect(() => {
    if (!demoActionNotice) return undefined;
    const id = window.setTimeout(() => setDemoActionNotice(""), 3200);
    return () => window.clearTimeout(id);
  }, [demoActionNotice]);

  const mockInvestments = EXPLORE_MOCK_INVESTMENTS;

  const trendingSymbols = ["AAPL", "TSLA", "NVDA", "MSFT", "AMZN"];
  const cryptoSymbols = ["BTC", "ETH"];
  const beginnerSymbols = ["VOO", "QQQ"];
  const discoveryNewsHeadlines = [
    "Tech stocks rise as investors watch AI earnings",
    "Investors monitor interest rate signals this week",
    "Crypto market remains volatile as Bitcoin moves",
  ];

  const bySymbol = new Map(mockInvestments.map((inv) => [inv.symbol, inv]));

  useEffect(() => {
    if (explorePresetSymbol == null || explorePresetSymbol === "") {
      return;
    }
    const inv = EXPLORE_MOCK_INVESTMENTS.find((i) => i.symbol === explorePresetSymbol);
    if (inv) {
      setExploreDetailSymbol(explorePresetSymbol);
      setDemoActionNotice("");
    }
    clearExplorePreset();
  }, [explorePresetSymbol, clearExplorePreset]);

  const queryRaw = typeof exploreQuery === "string" ? exploreQuery : "";
  const query = queryRaw.trim().toLowerCase();
  const hasQuery = query.length > 0;

  const searchMatches = hasQuery
    ? mockInvestments.filter((inv) => {
        const sym = inv.symbol.toLowerCase();
        const nm = inv.name.toLowerCase();
        return nm.includes(query) || sym.includes(query);
      })
    : [];

  const detailInvestment =
    exploreDetailSymbol != null ? bySymbol.get(exploreDetailSymbol) ?? null : null;

  const pickDiscovery = (symbols) =>
    symbols.map((s) => bySymbol.get(s)).filter(Boolean);

  const openExploreDetail = (symbol) => {
    setExploreDetailSymbol(symbol);
    setDemoActionNotice("");
  };

  const goPracticeTradeOnly = (symbol) => {
    setPracticePresetSymbol(symbol);
    setPracticePresetTradeSide(null);
    setActiveTab("Practice");
  };

  if (detailInvestment) {
    return (
      <ExploreCompanyDetail
        key={detailInvestment.symbol}
        investment={detailInvestment}
        onBack={() => setExploreDetailSymbol(null)}
        onPracticeTrade={() => goPracticeTradeOnly(detailInvestment.symbol)}
        demoActionNotice={demoActionNotice}
        setDemoActionNotice={setDemoActionNotice}
        realCash={realCash}
        holdings={holdings}
        setRealCash={setRealCash}
        setHoldings={setHoldings}
        livePrices={livePrices}
      />
    );
  }

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-[#162033] p-5">
        <h2 className="text-2xl font-bold">Explore Investments</h2>
        <p className="mt-1 text-sm text-[#CBD5E1]">
          Search stocks, ETFs, or crypto before you invest.
        </p>

        <input
          className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#20C997]"
          placeholder="Search company or ticker..."
          value={exploreQuery}
          onChange={(e) => setExploreQuery(e.target.value)}
          aria-label="Search stocks by company name or ticker"
        />

        {!hasQuery ? (
          <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
            Search by company name or ticker (e.g. Apple, AAPL, Tesla, TSLA).
          </p>
        ) : null}

        {hasQuery && searchMatches.length === 0 ? (
          <p className="mt-3 text-sm text-[#CBD5E1]">No matching stock found in demo data.</p>
        ) : null}

        {hasQuery && searchMatches.length > 0 ? (
          <StockSearchResultList
            matches={searchMatches}
            onPickSymbol={openExploreDetail}
            livePrices={livePrices}
          />
        ) : null}
      </section>

      {!hasQuery ? (
        <>
          <section className="rounded-3xl bg-[#162033] p-5">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Trending Stocks</h3>
              <p className="mt-1 text-xs text-[#CBD5E1]">Popular names moving markets today</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {pickDiscovery(trendingSymbols).map((inv) => (
                <ExplorePeekCard
                  key={inv.symbol}
                  investment={inv}
                  livePrices={livePrices}
                  onSelect={openExploreDetail}
                />
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[#162033] p-5">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Higher-volatility assets</h3>
              <p className="mt-1 text-xs text-[#CBD5E1]">Demo baskets with elevated swings</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {pickDiscovery(cryptoSymbols).map((inv) => (
                <ExplorePeekCard
                  key={inv.symbol}
                  investment={inv}
                  livePrices={livePrices}
                  onSelect={openExploreDetail}
                />
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[#162033] p-5">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Beginner-Friendly Picks</h3>
              <p className="mt-1 text-xs text-[#CBD5E1]">Broad ETFs for diversified exposure</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {pickDiscovery(beginnerSymbols).map((inv) => (
                <ExplorePeekCard
                  key={inv.symbol}
                  investment={inv}
                  livePrices={livePrices}
                  onSelect={openExploreDetail}
                />
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[#162033] p-5">
            <h3 className="mb-4 text-lg font-semibold">Market News</h3>
            <div className="space-y-3">
              {discoveryNewsHeadlines.map((title) => (
                <NewsCard key={title} title={title} />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

/** Anthropic Messages API URL (proxied in dev via vite.config.js). */
const ZENITH_ANTHROPIC_MESSAGES_URL = import.meta.env.DEV
  ? "/anthropic-api/v1/messages"
  : "https://api.anthropic.com/v1/messages";

const ZENITH_GOALS_WHAT_IF_SCENARIOS = [
  "Market drops 20%",
  "Inflation stays high",
  "I need money 3 months early",
  "I can save $100 more/month",
];

/** Map Suggested Allocation labels → Explore ticker (null = savings only). */
const GOALS_ALLOCATION_EXPLORE_TICKER = {
  "Broad-market ETF": "VOO",
  "Sector ETF": "QQQ",
  Cash: null,
  "Short-term bonds": "VOO",
  "Money Market Fund": "QQQ",
  Stocks: "AAPL",
  Bonds: "VOO",
  "High-growth ETF": "QQQ",
};

function zenithTickersMatchingExploreText(text, mockInvestments) {
  if (!text || !mockInvestments?.length) return [];
  const valid = new Set(mockInvestments.map((i) => i.symbol));
  const re = /\b[A-Z]{2,5}\b/g;
  const seen = new Set();
  const out = [];
  let m;
  const s = String(text);
  while ((m = re.exec(s)) !== null) {
    const t = m[0];
    if (valid.has(t) && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

function zenithExtractClaudeMessageText(payload) {
  const parts = payload?.content;
  if (!Array.isArray(parts)) return "";
  return parts
    .filter((b) => b && b.type === "text" && typeof b.text === "string")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

async function zenithCallClaudeApi(messageBody, signal) {
  const res = await fetch(ZENITH_ANTHROPIC_MESSAGES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(messageBody),
    signal,
  });
  const raw = await res.text();
  let data;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    throw new Error(
      (typeof data?.error?.message === "string" && data.error.message) ||
        raw.slice(0, 220) ||
        `Request failed (${res.status})`,
    );
  }
  return data;
}

function GoalAllocationInteractiveRow({ label, value, setActiveTab, setExplorePresetSymbol }) {
  const exploreTicker = GOALS_ALLOCATION_EXPLORE_TICKER[label];
  const canExplore = typeof exploreTicker === "string";
  const isCashTip = exploreTicker === null && label === "Cash";

  function openExplore(sym) {
    setExplorePresetSymbol(sym);
    setActiveTab("Explore");
  }

  return (
    <div
      className={`allocation-row rounded-xl px-2 py-2 -mx-2 transition-colors ${
        canExplore ? "cursor-pointer hover:bg-[rgba(141,191,232,0.06)]" : isCashTip ? "cursor-help" : ""
      }`}
      title={isCashTip ? "Keep in savings account" : undefined}
      onClick={
        canExplore
          ? () => {
              openExplore(exploreTicker);
            }
          : undefined
      }
      onKeyDown={
        canExplore
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openExplore(exploreTicker);
              }
            }
          : undefined
      }
      role={canExplore ? "button" : undefined}
      tabIndex={canExplore ? 0 : undefined}
    >
      <div className="allocation-row__head flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <span>{label}</span>
          <span>{value}</span>
        </div>
        {canExplore ? (
          <button
            type="button"
            className="shrink-0 rounded-lg border border-[rgba(141,191,232,0.28)] px-2.5 py-1 text-xs font-semibold text-[#8dbfe8] transition hover:bg-[rgba(141,191,232,0.07)]"
            onClick={(e) => {
              e.stopPropagation();
              openExplore(exploreTicker);
            }}
          >
            → View in Explore
          </button>
        ) : (
          <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-[#9fb0c0]/70">
            {isCashTip ? "●" : ""}
          </span>
        )}
      </div>
      <div className="allocation-row__track">
        <span className="allocation-row__fill" style={{ width: value }} />
      </div>
    </div>
  );
}

function Goals({
  mockInvestments,
  setActiveTab,
  setPracticePresetSymbol,
  setPracticePresetTradeSide,
  setDirectBuySymbol,
  setExplorePresetSymbol,
  initialRiskProfile,
}) {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlySavingsCapacity, setMonthlySavingsCapacity] = useState("");
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [timelineAmount, setTimelineAmount] = useState("");
  const [timelineUnit, setTimelineUnit] = useState("months");
  const [riskProfile, setRiskProfile] = useState(initialRiskProfile || "Balanced");
  const [planSnapshot, setPlanSnapshot] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showValidationHint, setShowValidationHint] = useState(false);
  const highlightClearTimeoutRef = useRef(null);

  const [aiRecLoading, setAiRecLoading] = useState(false);
  const [aiRecText, setAiRecText] = useState("");
  const [aiRecErr, setAiRecErr] = useState(null);

  const [whatIfActive, setWhatIfActive] = useState(null);
  const [whatIfLoading, setWhatIfLoading] = useState(false);
  const [whatIfText, setWhatIfText] = useState("");
  const [whatIfErr, setWhatIfErr] = useState(null);

  const [whatIfCustomInput, setWhatIfCustomInput] = useState("");
  const [whatIfCustomLoading, setWhatIfCustomLoading] = useState(false);
  const [whatIfCustomErr, setWhatIfCustomErr] = useState(null);
  const [whatIfChatHistory, setWhatIfChatHistory] = useState([]);

  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [celebrationPanel, setCelebrationPanel] = useState("main");

  const HIGHLIGHT_MS = 1400;

  useEffect(() => {
    return () => {
      if (highlightClearTimeoutRef.current != null) {
        window.clearTimeout(highlightClearTimeoutRef.current);
      }
    };
  }, []);

  const goalRiskPlans = {
    Conservative: {
      expectedAnnualReturn: 0.04,
      allocation: [
        { label: "Cash", value: "60%" },
        { label: "Short-term bonds", value: "30%" },
        { label: "Broad-market ETF", value: "10%" },
      ],
    },
    Balanced: {
      expectedAnnualReturn: 0.06,
      allocation: [
        { label: "Cash", value: "30%" },
        { label: "Broad-market ETF", value: "40%" },
        { label: "Bonds", value: "30%" },
      ],
    },
    Growth: {
      expectedAnnualReturn: 0.08,
      allocation: [
        { label: "Cash", value: "20%" },
        { label: "Broad-market ETF", value: "60%" },
        { label: "Sector ETF", value: "20%" },
      ],
    },
    Aggressive: {
      expectedAnnualReturn: 0.1,
      allocation: [
        { label: "Cash", value: "10%" },
        { label: "Stocks", value: "70%" },
        { label: "High-growth ETF", value: "20%" },
      ],
    },
  };

  const riskComfortOptions = ["Conservative", "Balanced", "Growth", "Aggressive"];

  function scheduleHighlightClear() {
    if (highlightClearTimeoutRef.current != null) {
      window.clearTimeout(highlightClearTimeoutRef.current);
    }
    highlightClearTimeoutRef.current = window.setTimeout(() => {
      setFieldErrors({});
      highlightClearTimeoutRef.current = null;
    }, HIGHLIGHT_MS);
  }

  function inputClass(fieldName) {
    const base =
      "mt-1 w-full rounded-2xl border px-4 py-3 text-white outline-none transition-[border-color,background-color] duration-300 focus:border-[#20C997]";
    const idle = "border-white/10 bg-white/5";
    const pulse = fieldErrors[fieldName] ? "goal-field-error-pop" : "";
    return `${base} ${idle} ${pulse}`.trim();
  }

  function RequiredStar() {
    return (
      <span className="text-red-400" aria-hidden="true">
        {" "}
        *
      </span>
    );
  }

  function parseGoalMoney(input) {
    const n = parseFloat(String(input).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  function parseMonthlySavingsCapacity(input) {
    const n = parseFloat(String(input).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) && n >= 0 ? n : null;
  }

  useEffect(() => {
    if (planSnapshot == null) {
      setAiRecLoading(false);
      setAiRecText("");
      setAiRecErr(null);
      setWhatIfActive(null);
      setWhatIfLoading(false);
      setWhatIfText("");
      setWhatIfErr(null);
      setWhatIfCustomInput("");
      setWhatIfCustomLoading(false);
      setWhatIfCustomErr(null);
      setWhatIfChatHistory([]);
      return;
    }

    const ac = new AbortController();

    async function fetchAiInvestmentRecommendations() {
      setAiRecLoading(true);
      setAiRecErr(null);
      setAiRecText("");
      try {
        const data = await zenithCallClaudeApi(
          {
            model: "claude-sonnet-4-20250514",
            max_tokens: 400,
            system:
              "You are a friendly financial advisor for beginners. Be warm, clear, jargon-free. Under 150 words.",
            messages: [
              {
                role: "user",
                content: `User goal: ${planSnapshot.goalName}, target: $${planSnapshot.targetNum}, timeline: ${planSnapshot.timelineAmountParsed} ${planSnapshot.timelineUnit}, risk: ${planSnapshot.riskProfile}, monthly savings: $${planSnapshot.monthlySavingsCapacity}. Give 3 specific investment recommendations to reach this goal. For each say: what to invest in, why, and what % of monthly savings to put there. Be specific and beginner-friendly.`,
              },
            ],
          },
          ac.signal,
        );
        if (ac.signal.aborted) return;
        const text = zenithExtractClaudeMessageText(data);
        setAiRecText(text || "—");
      } catch (e) {
        if (e?.name === "AbortError") return;
        setAiRecErr(String(e?.message ?? e));
      } finally {
        if (!ac.signal.aborted) {
          setAiRecLoading(false);
        }
      }
    }

    fetchAiInvestmentRecommendations();

    return () => ac.abort();
  }, [planSnapshot]);

  async function fetchWhatIfAnalysis(selectedScenario) {
    if (planSnapshot == null) return;

    setWhatIfActive(selectedScenario);
    setWhatIfLoading(true);
    setWhatIfErr(null);
    setWhatIfText("");
    try {
      const data = await zenithCallClaudeApi({
        model: "claude-sonnet-4-20250514",
        max_tokens: 400,
        system:
          "You are a beginner-friendly planner. Respond in plain English, no jargon, under 120 words.",
        messages: [
          {
            role: "user",
            content: `My goal is ${planSnapshot.goalName}, target $${planSnapshot.targetNum} in ${planSnapshot.timelineAmountParsed} ${planSnapshot.timelineUnit}, saving $${planSnapshot.monthlySavingsCapacity}/month, risk: ${planSnapshot.riskProfile}. Scenario: "${selectedScenario}". In 3 bullet points explain: 1) How this affects my goal 2) Should I change my investments? 3) What's my new realistic timeline? Be plain English, no jargon, under 120 words.`,
          },
        ],
      });
      const text = zenithExtractClaudeMessageText(data);
      setWhatIfText(text || "—");
    } catch (e) {
      setWhatIfErr(String(e?.message ?? e));
    } finally {
      setWhatIfLoading(false);
    }
  }

  async function submitWhatIfCustomQuestion() {
    if (planSnapshot == null) return;
    const customQuestion = whatIfCustomInput.trim();
    if (!customQuestion) return;

    setWhatIfCustomLoading(true);
    setWhatIfCustomErr(null);
    try {
      const data = await zenithCallClaudeApi({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        system:
          "You are Zenith AI, a friendly financial advisor for beginners. Be warm, clear, jargon-free. Under 120 words. Always end with one specific action they can take.",
        messages: [
          {
            role: "user",
            content: `My financial goal: ${goalName}, target $${targetAmount} in ${timelineAmount} ${timelineUnit}, saving $${monthlySavingsCapacity}/month, risk profile: ${riskProfile}. My what-if question: "${customQuestion}". Answer in plain English with 3 bullet points: 1) Impact on my goal 2) What I should do 3) New realistic timeline if affected.`,
          },
        ],
      });
      const text = zenithExtractClaudeMessageText(data);
      const answerText = text || "—";
      setWhatIfChatHistory((prev) => {
        const next = [...prev, { question: customQuestion, answer: answerText }];
        return next.length > 3 ? next.slice(-3) : next;
      });
      setWhatIfCustomInput("");
    } catch (e) {
      setWhatIfCustomErr(String(e?.message ?? e));
    } finally {
      setWhatIfCustomLoading(false);
    }
  }

  function resetGoalsFormAndCelebrationDemo() {
    setMonthlyIncome("");
    setMonthlySavingsCapacity("");
    setGoalName("");
    setTargetAmount("");
    setTimelineAmount("");
    setTimelineUnit("months");
    setRiskProfile("Balanced");
    setPlanSnapshot(null);
    setFieldErrors({});
    setShowValidationHint(false);
    setCelebrationOpen(false);
    setCelebrationPanel("main");
    setAiRecLoading(false);
    setAiRecText("");
    setAiRecErr(null);
    setWhatIfActive(null);
    setWhatIfLoading(false);
    setWhatIfText("");
    setWhatIfErr(null);
    setWhatIfCustomInput("");
    setWhatIfCustomLoading(false);
    setWhatIfCustomErr(null);
    setWhatIfChatHistory([]);
  }

  function formatTimelineSummary(snapshot) {
    const m = snapshot.timelineMonths;
    if (snapshot.timelineUnit === "years") {
      const a = snapshot.timelineAmountParsed;
      const yWord = a === 1 ? "year" : "years";
      return `${a} ${yWord} (${m} months)`;
    }
    const moWord = m === 1 ? "month" : "months";
    return `${m} ${moWord}`;
  }

  /** ((1+r)^n - 1) / r, or n when r === 0 */
  function annuityAccumulationFactor(monthsCount, monthlyRate) {
    const n = Number(monthsCount);
    const r = Number(monthlyRate);
    if (!Number.isFinite(n) || n <= 0 || !Number.isFinite(r)) {
      return null;
    }
    if (r === 0) {
      return n;
    }
    let pow;
    try {
      pow = (1 + r) ** n;
    } catch {
      return null;
    }
    if (!Number.isFinite(pow)) {
      return null;
    }
    const num = pow - 1;
    const factor = num / r;
    return Number.isFinite(factor) && factor > 0 ? factor : null;
  }

  function goalLooksEssential(name) {
    const n = String(name).toLowerCase();
    return ["emergency", "rent", "tuition", "medical", "bills"].some((k) =>
      n.includes(k),
    );
  }

  function allocationForProfile(profile) {
    return (
      goalRiskPlans[profile]?.allocation ?? goalRiskPlans.Balanced.allocation
    );
  }

  function handleGeneratePlan() {
    const nextErrors = {};
    if (!String(monthlyIncome).trim()) nextErrors.monthlyIncome = true;
    if (!String(monthlySavingsCapacity).trim()) nextErrors.monthlySavingsCapacity = true;
    if (!String(goalName).trim()) nextErrors.goalName = true;
    if (!String(targetAmount).trim()) nextErrors.targetAmount = true;
    if (!String(timelineAmount).trim()) nextErrors.timelineAmount = true;
    if (timelineUnit !== "months" && timelineUnit !== "years") {
      nextErrors.timelineUnit = true;
    }
    if (
      !riskProfile ||
      !riskComfortOptions.includes(riskProfile)
    ) {
      nextErrors.riskComfort = true;
    }

    if (Object.keys(nextErrors).length > 0) {
      setShowValidationHint(true);
      if (highlightClearTimeoutRef.current != null) {
        window.clearTimeout(highlightClearTimeoutRef.current);
        highlightClearTimeoutRef.current = null;
      }
      setFieldErrors({});
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFieldErrors(nextErrors);
          scheduleHighlightClear();
        });
      });
      return;
    }

    setShowValidationHint(false);
    setFieldErrors({});

    const targetNum = parseGoalMoney(targetAmount);
    const timelineMonths =
      timelineUnit === "years"
        ? Number(timelineAmount) * 12
        : Number(timelineAmount);
    const timelineAmtParsed = Number(timelineAmount);
    if (
      targetNum == null ||
      !Number.isFinite(timelineMonths) ||
      timelineMonths <= 0 ||
      !Number.isFinite(timelineAmtParsed)
    ) {
      setPlanSnapshot(null);
      return;
    }
    const months = timelineMonths;
    const plan = goalRiskPlans[riskProfile] ?? goalRiskPlans.Balanced;
    const annualReturn = plan.expectedAnnualReturn;
    const monthlyRate = annualReturn / 12;

    const factor = annuityAccumulationFactor(months, monthlyRate);
    const savingsParsed = parseMonthlySavingsCapacity(monthlySavingsCapacity);

    let projectedFV = null;
    let requiredMonthly = null;
    if (factor != null) {
      requiredMonthly = targetNum / factor;
      if (!Number.isFinite(requiredMonthly) || requiredMonthly < 0) {
        requiredMonthly = null;
      }
      if (savingsParsed != null) {
        projectedFV = savingsParsed * factor;
        if (!Number.isFinite(projectedFV)) {
          projectedFV = null;
        }
      }
    }

    setPlanSnapshot({
      goalName,
      targetNum,
      timelineMonths: months,
      timelineAmountParsed: timelineAmtParsed,
      timelineUnit,
      riskProfile,
      monthlyIncome,
      monthlySavingsCapacity,
      expectedAnnualReturn: annualReturn,
      projectedFV,
      requiredMonthly,
      isEssentialGoal: goalLooksEssential(goalName),
    });
  }

  const fmtUsd = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);

  function buildAiGoalAnalysis(snapshot, savingsParsed, projectedFV, requiredMonthly) {
    const months = snapshot.timelineMonths;
    const profile = snapshot.riskProfile;
    const targetNum = snapshot.targetNum;
    const retPct = `${Math.round(snapshot.expectedAnnualReturn * 100)}%`;

    const header = `Across ${months} months using the "${profile}" plan (${retPct} mock expected annual return converted to a monthly rate),`;

    let body;
    if (savingsParsed == null) {
      body = `Zenith cannot compare projected ending wealth to your ${fmtUsd(targetNum)} goal without a monthly savings capacity figure.`;
    } else if (projectedFV == null) {
      body = `steady contributions of ${fmtUsd(savingsParsed)} did not yield a usable projected ending balance from this simplified model.`;
    } else if (projectedFV >= targetNum) {
      body = `steady contributions of ${fmtUsd(savingsParsed)} imply a modeled ending balance of ${fmtUsd(projectedFV)}, roughly ${fmtUsd(projectedFV - targetNum)} ahead of ${fmtUsd(targetNum)} before taxes or fees under this assumption.`;
    } else {
      body = `steady contributions of ${fmtUsd(savingsParsed)} imply a modeled ending balance of ${fmtUsd(projectedFV)}, roughly ${fmtUsd(targetNum - projectedFV)} short of ${fmtUsd(targetNum)} before taxes or fees under this assumption.`;
    }

    const footer =
      requiredMonthly != null
        ? ` Under the same assumption, about ${fmtUsd(requiredMonthly)} per month would hypothetically fund the target—illustrative only. Projected returns are estimates and not guaranteed.`
        : ` Projected returns are estimates and not guaranteed.`;

    return `${header} ${body}${footer}`;
  }

  const allocations =
    planSnapshot != null ? allocationForProfile(planSnapshot.riskProfile) : [];

  const aiRecMatchedInvestments = useMemo(() => {
    if (!planSnapshot || !aiRecText) return [];
    const syms = zenithTickersMatchingExploreText(aiRecText, mockInvestments);
    const bySym = new Map(mockInvestments.map((inv) => [inv.symbol, inv]));
    return syms.map((s) => bySym.get(s)).filter(Boolean);
  }, [planSnapshot, aiRecText, mockInvestments]);

  const savingsParsedForPlan = planSnapshot
    ? parseMonthlySavingsCapacity(planSnapshot.monthlySavingsCapacity)
    : null;

  const requiredMonthlyDisplay =
    planSnapshot?.requiredMonthly != null &&
    Number.isFinite(planSnapshot.requiredMonthly)
      ? fmtUsd(planSnapshot.requiredMonthly)
      : "—";

  const fvOnTrack =
    savingsParsedForPlan != null &&
    planSnapshot?.projectedFV != null &&
    planSnapshot.projectedFV >= planSnapshot.targetNum;

  const endingGapSurplusLabel =
    planSnapshot?.projectedFV == null || savingsParsedForPlan == null
      ? "—"
      : planSnapshot.projectedFV >= planSnapshot.targetNum
        ? `Surplus ${fmtUsd(planSnapshot.projectedFV - planSnapshot.targetNum)} at goal date`
        : `Shortfall ${fmtUsd(planSnapshot.targetNum - planSnapshot.projectedFV)} at goal date`;

  const projectionAligned =
    savingsParsedForPlan != null && planSnapshot?.projectedFV != null && fvOnTrack;

  const contributionGapMonthly =
    planSnapshot?.requiredMonthly != null &&
    savingsParsedForPlan != null &&
    savingsParsedForPlan < planSnapshot.requiredMonthly
      ? planSnapshot.requiredMonthly - savingsParsedForPlan
      : null;

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-[#162033] p-5">
        <h2 className="text-2xl font-bold">Create Your First Goal</h2>
        <p className="mt-1 text-sm text-[#CBD5E1]">
          Zenith personalizes your plan based on income, timeline, and risk appetite.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            <span className="text-[#CBD5E1]">
              Monthly income
              <RequiredStar />
            </span>
            <input
              type="text"
              inputMode="decimal"
              className={inputClass("monthlyIncome")}
              placeholder="e.g. 3000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
            />
          </label>
          <label className="block text-sm">
            <span className="text-[#CBD5E1]">
              Monthly savings capacity
              <RequiredStar />
            </span>
            <input
              type="text"
              inputMode="decimal"
              className={inputClass("monthlySavingsCapacity")}
              placeholder="e.g. 250"
              value={monthlySavingsCapacity}
              onChange={(e) => setMonthlySavingsCapacity(e.target.value)}
            />
          </label>
          <label className="block text-sm md:col-span-2">
            <span className="text-[#CBD5E1]">
              Goal name
              <RequiredStar />
            </span>
            <input
              type="text"
              className={inputClass("goalName")}
              placeholder="Vacation, Emergency Fund, Car…"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
          </label>
          <label className="block text-sm md:col-span-2">
            <span className="text-[#CBD5E1]">
              Target amount
              <RequiredStar />
            </span>
            <input
              type="text"
              inputMode="decimal"
              className={inputClass("targetAmount")}
              placeholder="e.g. 10000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </label>
          <div className="block text-sm md:col-span-2">
            <span className="text-[#CBD5E1]">
              Timeline
              <RequiredStar />
            </span>
            <div className="timeline-input-group">
              <input
                className={inputClass("timelineAmount")}
                type="number"
                min={1}
                value={timelineAmount}
                onChange={(e) => setTimelineAmount(e.target.value)}
                placeholder="e.g. 6"
              />

              <select
                className={`form-select${fieldErrors.timelineUnit ? " goal-field-error-pop" : ""}`}
                value={
                  timelineUnit === "months" || timelineUnit === "years"
                    ? timelineUnit
                    : "months"
                }
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "months" || v === "years") setTimelineUnit(v);
                }}
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
          <div className="block text-sm md:col-span-2">
            <span className="text-[#CBD5E1]">
              Risk comfort
              <RequiredStar />
            </span>
            <div
              className={`mt-3 grid grid-cols-2 gap-3 rounded-2xl border border-transparent p-1 lg:grid-cols-4 ${
                fieldErrors.riskComfort ? "goal-field-error-pop" : ""
              }`}
            >
              {riskComfortOptions.map((option) => {
                const selected = riskProfile === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRiskProfile(option)}
                    className={`rounded-full border px-4 py-3 text-sm transition ${
                      selected
                        ? "border-transparent bg-[#20C997] font-semibold text-[#0B1320]"
                        : "border border-white/10 bg-white/5 text-[#CBD5E1] hover:bg-[#1D2A42]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGeneratePlan}
          className="mt-6 w-full rounded-2xl bg-[#20C997] py-3 font-semibold text-[#0B1320]"
        >
          Generate Plan
        </button>

        {showValidationHint && (
          <p className="mt-3 text-center text-sm text-red-400/95">
            Please fill in all required fields.
          </p>
        )}
      </section>

      {planSnapshot && (
        <>
          <section className="rounded-3xl bg-[#162033] p-5">
            <h3 className="text-lg font-semibold">Investment projection summary</h3>
            <p className="mt-1 text-xs text-[#CBD5E1]">
              Mock compound projection using your plan&apos;s expected annual return—not guaranteed.
            </p>
            <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4">
                <dt className="text-xs text-[#CBD5E1]">Goal name</dt>
                <dd className="mt-1 font-semibold">
                  {planSnapshot.goalName.trim() || "—"}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <dt className="text-xs text-[#CBD5E1]">Target amount</dt>
                <dd className="mt-1 font-semibold">{fmtUsd(planSnapshot.targetNum)}</dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 md:col-span-2">
                <dt className="text-xs text-[#CBD5E1]">Timeline</dt>
                <dd className="mt-1 font-semibold">
                  {formatTimelineSummary(planSnapshot)}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <dt className="text-xs text-[#CBD5E1]">Risk profile</dt>
                <dd className="mt-1 font-semibold">{planSnapshot.riskProfile}</dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 md:col-span-2">
                <dt className="text-xs text-[#CBD5E1]">Expected annual return (plan assumption)</dt>
                <dd className="mt-1 font-semibold">
                  {Math.round(planSnapshot.expectedAnnualReturn * 100)}%
                </dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 md:col-span-2">
                <dt className="text-xs text-[#CBD5E1]">Projected ending balance</dt>
                <dd className="mt-1 font-semibold">
                  {planSnapshot.projectedFV != null && savingsParsedForPlan != null
                    ? fmtUsd(planSnapshot.projectedFV)
                    : "—"}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 md:col-span-2">
                <dt className="text-xs text-[#CBD5E1]">Goal status</dt>
                <dd className="mt-1 font-semibold">
                  {savingsParsedForPlan == null || planSnapshot.projectedFV == null
                    ? "Add monthly savings capacity to compare"
                    : fvOnTrack
                      ? "On track"
                      : "Shortfall"}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 md:col-span-2">
                <dt className="text-xs text-[#CBD5E1]">Monthly contribution required (same return)</dt>
                <dd className="mt-1 font-semibold text-[#20C997]">{requiredMonthlyDisplay}</dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <dt className="text-xs text-[#CBD5E1]">Monthly savings capacity</dt>
                <dd className="mt-1 font-semibold">
                  {savingsParsedForPlan != null ? fmtUsd(savingsParsedForPlan) : "—"}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <dt className="text-xs text-[#CBD5E1]">Ending surplus / shortfall</dt>
                <dd className="mt-1 font-semibold">{endingGapSurplusLabel}</dd>
              </div>
            </dl>
          </section>

          {projectionAligned ? (
            <section className="rounded-3xl border border-[#20C997]/30 bg-[#20C997]/10 p-5">
              <p className="text-sm font-semibold leading-relaxed text-[#20C997]">
                Projected ending balance meets or beats your goal under this assumed return path.
              </p>
            </section>
          ) : savingsParsedForPlan == null || planSnapshot.projectedFV == null ? (
            <section className="rounded-3xl border border-[#F5C542]/30 bg-[#F5C542]/10 p-5">
              <p className="text-sm font-semibold leading-relaxed text-[#F5C542]">
                Enter monthly savings capacity to see whether projected ending balance reaches your
                target.
              </p>
              <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                <div className="rounded-2xl bg-[#0B1320]/40 p-4 md:col-span-2">
                  <dt className="text-xs text-[#CBD5E1]">Monthly contribution required (same return)</dt>
                  <dd className="mt-1 font-semibold text-[#F8FAFC]">{requiredMonthlyDisplay}</dd>
                </div>
              </dl>
            </section>
          ) : (
            <section className="rounded-3xl border border-[#F5C542]/30 bg-[#F5C542]/10 p-5">
              <p className="text-sm font-semibold leading-relaxed text-[#F5C542]">
                Projected ending balance is below your goal under this assumed return path.
              </p>
              <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                <div className="rounded-2xl bg-[#0B1320]/40 p-4 md:col-span-2">
                  <dt className="text-xs text-[#CBD5E1]">Estimated shortfall at goal date</dt>
                  <dd className="mt-1 font-semibold text-[#F8FAFC]">
                    {fmtUsd(planSnapshot.targetNum - planSnapshot.projectedFV)}
                  </dd>
                </div>
                <div className="rounded-2xl bg-[#0B1320]/40 p-4">
                  <dt className="text-xs text-[#CBD5E1]">Monthly savings capacity</dt>
                  <dd className="mt-1 font-semibold text-[#F8FAFC]">
                    {fmtUsd(savingsParsedForPlan)}
                  </dd>
                </div>
                <div className="rounded-2xl bg-[#0B1320]/40 p-4">
                  <dt className="text-xs text-[#CBD5E1]">Estimated gap vs required monthly</dt>
                  <dd className="mt-1 font-semibold text-[#F8FAFC]">
                    {contributionGapMonthly != null ? fmtUsd(contributionGapMonthly) : "—"}
                  </dd>
                </div>
              </dl>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
                <li>Increase monthly savings toward the required contribution shown above.</li>
                <li>Extend your timeline so the same monthly savings compounds longer.</li>
                <li>
                  If timing is tight, review risk assumptions—undershooting returns widens shortfalls.
                </li>
              </ul>
            </section>
          )}

          {planSnapshot.isEssentialGoal && (
            <section className="rounded-3xl border border-[#F5C542]/30 bg-[#F5C542]/10 p-5">
              <p className="text-sm font-semibold leading-relaxed text-[#F5C542]">
                This looks like an essential or short-term goal. Zenith suggests prioritizing
                stability over aggressive returns.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
                <li>Favor more cash reserve for liquidity.</li>
                <li>Add short-term bonds for nearer obligations.</li>
                <li>Use broad market ETFs only as a smaller sleeve—not the emergency cushion.</li>
                <li>Avoid crypto and other high-volatility sleeves for must-pay goals.</li>
              </ul>
            </section>
          )}

          <section className="rounded-3xl border border-[#20C997]/30 bg-[#20C997]/10 p-5">
            <h3 className="text-lg font-semibold text-[#20C997]">
              Suggested Allocation
            </h3>
            <div className="mt-4 space-y-3">
              {allocations.map((row) => (
                <GoalAllocationInteractiveRow
                  key={row.label}
                  label={row.label}
                  value={row.value}
                  setActiveTab={setActiveTab}
                  setExplorePresetSymbol={setExplorePresetSymbol}
                />
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#F5C542]/30 bg-[#F5C542]/10 p-5">
            <h3 className="text-lg font-semibold text-[#F5C542]">AI Goal Analysis</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
              {buildAiGoalAnalysis(
                planSnapshot,
                savingsParsedForPlan,
                planSnapshot.projectedFV,
                planSnapshot.requiredMonthly,
              )}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[#CBD5E1]/90">
              Projection is for educational purposes only and does not guarantee returns.
            </p>
          </section>

          <section className="rounded-3xl border-2 bg-[#0d2131] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.2)] [border-color:rgba(74,222,128,0.55)]">
            <h3 className="text-lg font-semibold text-[#f5f8fb]">AI Investment Recommendations</h3>
            <p className="mt-1 text-xs text-[#9fb0c0]">
              Generated with Claude (educational only; not personalized financial advice).
            </p>
            {aiRecLoading ? (
              <div className="mt-5 flex items-center gap-3 text-sm text-[#CBD5E1]">
                <span
                  className="inline-block h-7 w-7 shrink-0 animate-spin rounded-full border-2 border-[rgba(141,191,232,0.25)] border-t-[#4ade80]"
                  aria-hidden
                />
                <span>Fetching recommendations…</span>
              </div>
            ) : aiRecErr ? (
              <p className="mt-4 text-sm text-red-400/95">{aiRecErr}</p>
            ) : (
              <>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[#CBD5E1]">
                  {aiRecText || "—"}
                </p>
                {aiRecMatchedInvestments.length > 0 ? (
                  <div className="mt-5 border-t border-[rgba(141,191,232,0.15)] pt-4">
                    <h4 className="text-sm font-semibold text-[#f5f8fb]">
                      Recommended investments found in Zenith:
                    </h4>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {aiRecMatchedInvestments.map((inv) => (
                        <div
                          key={inv.symbol}
                          className="rounded-2xl border border-[rgba(141,191,232,0.18)] bg-[rgba(4,16,27,0.5)] p-4"
                        >
                          <p className="text-sm font-semibold text-[#f5f8fb]">{inv.name}</p>
                          <p className="mt-0.5 text-xs font-bold text-[#8dbfe8]">{inv.symbol}</p>
                          <p className="mt-2 text-sm tabular-nums text-[#CBD5E1]">{inv.price}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setDirectBuySymbol(inv.symbol);
                                setActiveTab("Holdings");
                              }}
                              className="rounded-lg bg-[#20C997] px-3 py-2 text-xs font-semibold text-[#0B1320]"
                            >
                              Buy Now
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setPracticePresetSymbol(inv.symbol);
                                setPracticePresetTradeSide("buy");
                                setActiveTab("Practice");
                              }}
                              className="rounded-lg border border-[rgba(141,191,232,0.35)] bg-[rgba(141,191,232,0.08)] px-3 py-2 text-xs font-semibold text-[#8dbfe8]"
                            >
                              Practice First
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </section>

          <section className="rounded-3xl border border-[rgba(141,191,232,0.18)] bg-[#0d2131] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            <h3 className="text-lg font-semibold text-[#f5f8fb]">What-If Simulator</h3>
            <p className="mt-1 text-xs text-[#9fb0c0]">
              Tap a scenario to see how it might affect your plan (illustrative only).
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {ZENITH_GOALS_WHAT_IF_SCENARIOS.map((label) => {
                const active = whatIfActive === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => fetchWhatIfAnalysis(label)}
                    disabled={whatIfLoading}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      active
                        ? "border-[#c47a35] bg-[rgba(196,122,53,0.18)] text-[#f5f8fb]"
                        : "border-[rgba(141,191,232,0.18)] bg-[rgba(4,16,27,0.45)] text-[#CBD5E1] hover:border-[rgba(141,191,232,0.35)]"
                    } ${whatIfLoading ? "opacity-70" : ""}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {(whatIfActive || whatIfLoading) && (
              <div className="mt-4 rounded-2xl border-2 bg-[rgba(4,16,27,0.35)] p-4 [border-color:rgba(196,122,53,0.65)]">
                {whatIfLoading ? (
                  <div className="flex items-center gap-3 text-sm text-[#CBD5E1]">
                    <span
                      className="inline-block h-7 w-7 shrink-0 animate-spin rounded-full border-2 border-[rgba(141,191,232,0.25)] border-t-[#c47a35]"
                      aria-hidden
                    />
                    <span>Running scenario “{whatIfActive}”…</span>
                  </div>
                ) : whatIfErr ? (
                  <p className="text-sm text-red-400/95">{whatIfErr}</p>
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#CBD5E1]">
                    {whatIfText}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 border-t border-[rgba(141,191,232,0.12)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#9fb0c0]">
                Ask your own what-if
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-stretch">
                <input
                  type="text"
                  className="min-w-0 flex-1 rounded-2xl border border-[rgba(141,191,232,0.2)] bg-[rgba(4,16,27,0.55)] px-4 py-2.5 text-sm text-[#f5f8fb] outline-none placeholder:text-[#9fb0c0]/70 focus:border-[#8dbfe8]"
                  placeholder="Ask your own what-if... e.g. What if I lose my job next month?"
                  value={whatIfCustomInput}
                  onChange={(e) => setWhatIfCustomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !whatIfCustomLoading) {
                      e.preventDefault();
                      submitWhatIfCustomQuestion();
                    }
                  }}
                  disabled={whatIfCustomLoading}
                  aria-label="Custom what-if question"
                />
                <button
                  type="button"
                  onClick={submitWhatIfCustomQuestion}
                  disabled={whatIfCustomLoading || !whatIfCustomInput.trim()}
                  className="shrink-0 rounded-2xl border border-[rgba(141,191,232,0.35)] bg-[rgba(141,191,232,0.12)] px-4 py-2.5 text-sm font-semibold text-[#f5f8fb] transition hover:bg-[rgba(141,191,232,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Ask Zenith AI
                </button>
              </div>
              {whatIfCustomLoading ? (
                <div className="mt-4 flex items-center gap-3 text-sm text-[#CBD5E1]">
                  <span
                    className="inline-block h-7 w-7 shrink-0 animate-spin rounded-full border-2 border-[rgba(141,191,232,0.25)] border-t-[#8dbfe8]"
                    aria-hidden
                  />
                  <span>Thinking about your scenario…</span>
                </div>
              ) : null}
              {whatIfCustomErr ? (
                <p className="mt-3 text-sm text-red-400/95">{whatIfCustomErr}</p>
              ) : null}
              {whatIfChatHistory.length > 0 ? (
                <div className="mt-4 space-y-3" aria-live="polite">
                  {whatIfChatHistory.map((turn, idx) => (
                    <Fragment key={`${idx}-${turn.question.slice(0, 24)}`}>
                      <div className="flex justify-end">
                        <div className="max-w-[92%] rounded-2xl border border-[rgba(141,191,232,0.15)] bg-[rgba(37,71,122,0.55)] px-4 py-3 text-sm leading-relaxed text-[#f5f8fb] shadow-sm">
                          {turn.question}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="max-w-[92%] rounded-2xl border border-[rgba(141,191,232,0.15)] border-l-4 border-l-[#c47a35] bg-[rgba(7,21,34,0.85)] px-4 py-3 text-sm leading-relaxed text-[#CBD5E1] shadow-sm">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#c47a35]">
                            Zenith AI
                          </p>
                          <p className="whitespace-pre-wrap">{turn.answer}</p>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              ) : null}
            </div>
          </section>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                setCelebrationPanel("main");
                setCelebrationOpen(true);
              }}
              className="rounded-2xl border border-[rgba(141,191,232,0.35)] bg-[#0d2131] px-6 py-3 text-sm font-semibold text-[#8dbfe8] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition hover:border-[rgba(141,191,232,0.55)]"
            >
              Simulate Goal Achieved
            </button>
          </div>

          {celebrationOpen && planSnapshot ? (
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="zenith-goal-celebration-title"
            >
              <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[rgba(141,191,232,0.18)] bg-[#0d2131] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
                <button
                  type="button"
                  onClick={() => {
                    setCelebrationOpen(false);
                    setCelebrationPanel("main");
                  }}
                  className="absolute right-3 top-3 rounded-lg border border-[rgba(141,191,232,0.2)] bg-[rgba(4,16,27,0.6)] px-2 py-1 text-xs font-semibold text-[#9fb0c0] hover:text-[#f5f8fb]"
                  aria-label="Close"
                >
                  ✕
                </button>

                {celebrationPanel === "main" ? (
                  <>
                    <p className="text-center text-4xl" aria-hidden>
                      🎉
                    </p>
                    <h2
                      id="zenith-goal-celebration-title"
                      className="mt-2 text-center text-xl font-bold text-[#f5f8fb]"
                    >
                      You reached your goal!
                    </h2>
                    <p className="mt-2 text-center text-sm text-[#9fb0c0]">
                      <span className="font-semibold text-[#f5f8fb]">
                        {planSnapshot.goalName.trim() || "Your goal"}
                      </span>
                      <br />
                      <span className="text-[#4ade80]">{fmtUsd(planSnapshot.targetNum)}</span> achieved
                      (demo)
                    </p>
                    <div className="mt-6 flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={resetGoalsFormAndCelebrationDemo}
                        className="w-full rounded-2xl bg-[#20C997] py-3 text-sm font-semibold text-[#0B1320]"
                      >
                        Start a new goal
                      </button>
                      <button
                        type="button"
                        onClick={() => setCelebrationPanel("reinvest")}
                        className="w-full rounded-2xl border border-[rgba(141,191,232,0.25)] bg-[rgba(4,16,27,0.45)] py-3 text-sm font-semibold text-[#f5f8fb]"
                      >
                        Reinvest for more growth
                      </button>
                      <button
                        type="button"
                        onClick={() => setCelebrationPanel("withdraw")}
                        className="w-full rounded-2xl border border-[rgba(141,191,232,0.25)] bg-[rgba(4,16,27,0.45)] py-3 text-sm font-semibold text-[#f5f8fb]"
                      >
                        Withdraw funds
                      </button>
                    </div>
                  </>
                ) : celebrationPanel === "reinvest" ? (
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-[#f5f8fb]">Keep growing</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                      Your funds will continue growing at the same allocation
                    </p>
                    <button
                      type="button"
                      onClick={() => setCelebrationPanel("main")}
                      className="mt-5 w-full rounded-2xl border border-[rgba(141,191,232,0.25)] py-2.5 text-sm font-semibold text-[#8dbfe8]"
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-[#f5f8fb]">Withdrawal estimate</h3>
                    <p className="mt-2 text-xs text-[#9fb0c0]">
                      Demo fee breakdown on your goal amount ({fmtUsd(planSnapshot.targetNum)}).
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-[#CBD5E1]">
                      <li className="flex justify-between gap-2">
                        <span>Platform fee (0.25%)</span>
                        <span className="font-mono tabular-nums">
                          {fmtUsd(planSnapshot.targetNum * 0.0025)}
                        </span>
                      </li>
                      <li className="flex justify-between gap-2">
                        <span>Regulatory fee (0.10%)</span>
                        <span className="font-mono tabular-nums">
                          {fmtUsd(planSnapshot.targetNum * 0.001)}
                        </span>
                      </li>
                      <li className="mt-3 flex justify-between gap-2 border-t border-[rgba(141,191,232,0.15)] pt-3 font-semibold text-[#4ade80]">
                        <span>Estimated net after fees</span>
                        <span className="font-mono tabular-nums">
                          {fmtUsd(planSnapshot.targetNum * (1 - 0.0025 - 0.001))}
                        </span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => setCelebrationPanel("main")}
                      className="mt-5 w-full rounded-2xl border border-[rgba(141,191,232,0.25)] py-2.5 text-sm font-semibold text-[#8dbfe8]"
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

const INITIAL_PRACTICE_ACCOUNT = 10000;

function formatPracticeUsd(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function Practice({
  mockInvestments,
  virtualCash,
  setVirtualCash,
  practiceHoldings,
  setPracticeHoldings,
  practicePresetSymbol,
  practicePresetTradeSide,
  clearPracticePreset,
}) {
  const [practiceSearchQuery, setPracticeSearchQuery] = useState("");
  const [practiceDetailSymbol, setPracticeDetailSymbol] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [tradeSide, setTradeSide] = useState("buy");
  const [qtyInput, setQtyInput] = useState("");
  const [tradePreview, setTradePreview] = useState(null);
  const [tradeFeedback, setTradeFeedback] = useState("");

  const bySymbol = new Map(mockInvestments.map((inv) => [inv.symbol, inv]));

  useEffect(() => {
    if (practicePresetSymbol == null) return;
    const exists = mockInvestments.some((inv) => inv.symbol === practicePresetSymbol);
    if (exists) {
      setPracticeDetailSymbol(practicePresetSymbol);
      setSelectedSymbol(practicePresetSymbol);
      if (practicePresetTradeSide === "buy" || practicePresetTradeSide === "sell") {
        setTradeSide(practicePresetTradeSide);
      }
      setTradePreview(null);
      setTradeFeedback("");
    }
    clearPracticePreset();
  }, [
    practicePresetSymbol,
    practicePresetTradeSide,
    mockInvestments,
    clearPracticePreset,
  ]);

  let portfolioValue = 0;
  for (const sym of Object.keys(practiceHoldings)) {
    const row = practiceHoldings[sym];
    const inv = bySymbol.get(sym);
    const px = inv ? parseExplorePrice(inv.price) : null;
    if (!row?.quantity || px == null) continue;
    portfolioValue += row.quantity * px;
  }

  const totalPracticeAccount = virtualCash + portfolioValue;
  const practicePnL = totalPracticeAccount - INITIAL_PRACTICE_ACCOUNT;

  function evaluateTrade() {
    const investment = bySymbol.get(selectedSymbol);
    const price = investment ? parseExplorePrice(investment.price) : null;
    const qtyRaw = String(qtyInput).trim();
    const qty = Number.parseInt(qtyRaw, 10);

    if (!investment) {
      return { ok: false, message: "Select a valid stock." };
    }
    if (price == null || !(price > 0)) {
      return { ok: false, message: "Could not read a demo price for this instrument." };
    }
    if (!/^[1-9]\d*$/.test(qtyRaw) || !Number.isFinite(qty) || qty <= 0) {
      return {
        ok: false,
        message: "Enter a whole number quantity greater than zero.",
      };
    }

    const estimatedTotal = qty * price;

    if (tradeSide === "buy") {
      if (estimatedTotal > virtualCash) {
        return { ok: false, message: "Insufficient virtual cash for this purchase." };
      }
      return {
        ok: true,
        investment,
        quantity: qty,
        estimatedPrice: price,
        estimatedTotal,
        remainingCash: virtualCash - estimatedTotal,
      };
    }

    const owned = practiceHoldings[selectedSymbol]?.quantity ?? 0;
    if (qty > owned) {
      return { ok: false, message: "You cannot sell more shares than you hold in practice." };
    }

    return {
      ok: true,
      investment,
      quantity: qty,
      estimatedPrice: price,
      estimatedTotal,
      remainingCash: virtualCash + estimatedTotal,
    };
  }

  function handlePreviewTrade() {
    const result = evaluateTrade();
    if (!result.ok) {
      setTradePreview(null);
      setTradeFeedback(result.message ?? "Invalid trade.");
      return;
    }
    setTradeFeedback("");
    setTradePreview({
      stockName: result.investment.name,
      symbol: result.investment.symbol,
      action: tradeSide === "buy" ? "Buy" : "Sell",
      quantity: result.quantity,
      estimatedPrice: result.estimatedPrice,
      estimatedTotal: result.estimatedTotal,
      remainingCash: result.remainingCash,
    });
  }

  function handleExecuteTrade() {
    const result = evaluateTrade();
    if (!result.ok) {
      setTradeFeedback(result.message ?? "Invalid trade.");
      return;
    }

    const { investment, quantity: qty, estimatedPrice: price, estimatedTotal } = result;
    const sym = investment.symbol;

    if (tradeSide === "buy") {
      setVirtualCash((c) => c - estimatedTotal);
      setPracticeHoldings((prev) => {
        const cur = prev[sym];
        if (!cur) {
          return { ...prev, [sym]: { quantity: qty, avgPrice: price } };
        }
        const newQty = cur.quantity + qty;
        const newAvg = (cur.quantity * cur.avgPrice + qty * price) / newQty;
        return { ...prev, [sym]: { quantity: newQty, avgPrice: newAvg } };
      });
    } else {
      setVirtualCash((c) => c + estimatedTotal);
      setPracticeHoldings((prev) => {
        const cur = prev[sym];
        if (!cur) return prev;
        const nextQ = cur.quantity - qty;
        const next = { ...prev };
        if (nextQ <= 0) delete next[sym];
        else next[sym] = { ...cur, quantity: nextQ };
        return next;
      });
    }

    setTradeFeedback("Trade executed (demo).");
    setTradePreview(null);
    setQtyInput("");
  }

  const holdingSymbols = Object.keys(practiceHoldings).filter(
    (s) => (practiceHoldings[s]?.quantity ?? 0) > 0,
  );

  const practiceQueryRaw =
    typeof practiceSearchQuery === "string" ? practiceSearchQuery : "";
  const practiceQuery = practiceQueryRaw.trim().toLowerCase();
  const practiceHasQuery = practiceQuery.length > 0;
  const practiceSearchMatches = practiceHasQuery
    ? mockInvestments.filter((inv) => {
        const sym = inv.symbol.toLowerCase();
        const nm = inv.name.toLowerCase();
        return nm.includes(practiceQuery) || sym.includes(practiceQuery);
      })
    : [];

  const detailInvestmentPractice =
    practiceDetailSymbol != null ? bySymbol.get(practiceDetailSymbol) ?? null : null;

  const openPracticeDetail = (symbol) => {
    setPracticeDetailSymbol(symbol);
    setSelectedSymbol(symbol);
    setTradePreview(null);
    setTradeFeedback("");
  };

  const handleSelectTradeSide = (side) => {
    setTradeSide(side);
    setTradePreview(null);
    setTradeFeedback("");
  };

  const handlePracticeQtyChange = (next) => {
    setQtyInput(next);
    setTradePreview(null);
    setTradeFeedback("");
  };

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-[#162033] p-5">
        <h2 className="text-2xl font-bold">Practice Mode</h2>
        <p className="mt-1 text-sm text-[#CBD5E1]">
          Learn trading with virtual money before risking real funds.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Virtual cash" value={formatPracticeUsd(virtualCash)} />
          <Metric label="Practice portfolio value" value={formatPracticeUsd(portfolioValue)} />
          <Metric label="Total practice account" value={formatPracticeUsd(totalPracticeAccount)} />
          <Metric label="Practice P&L" value={formatPracticeUsd(practicePnL)} />
        </div>

        <div className="mt-4 rounded-2xl border border-[#20C997]/25 bg-[#20C997]/10 p-4">
          <p className="text-sm leading-relaxed text-[#CBD5E1]">
            Practice mode uses virtual money, so users can learn without real financial risk.
          </p>
        </div>
      </section>

      {detailInvestmentPractice ? (
        <PracticeCompanyDetail
          investment={detailInvestmentPractice}
          onBack={() => {
            setPracticeDetailSymbol(null);
            setTradePreview(null);
            setTradeFeedback("");
          }}
          tradeSide={tradeSide}
          onSelectTradeSide={handleSelectTradeSide}
          qtyInput={qtyInput}
          onQtyChange={handlePracticeQtyChange}
          tradePreview={tradePreview}
          tradeFeedback={tradeFeedback}
          onPreviewTrade={handlePreviewTrade}
          onExecuteTrade={handleExecuteTrade}
          formatPracticeUsd={formatPracticeUsd}
        />
      ) : (
        <section className="rounded-3xl bg-[#162033] p-5">
          <h3 className="text-lg font-semibold">Find a stock</h3>
          <p className="mt-1 text-sm text-[#CBD5E1]">
            Search by company name or ticker, then open a stock to trade with demo cash.
          </p>

          <input
            className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#20C997]"
            placeholder="Search company or ticker..."
            value={practiceSearchQuery}
            onChange={(e) => setPracticeSearchQuery(e.target.value)}
            aria-label="Search practice stocks by company name or ticker"
          />

          {!practiceHasQuery ? (
            <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
              Search by company name or ticker (e.g. Apple, AAPL, Tesla, TSLA).
            </p>
          ) : null}

          {practiceHasQuery && practiceSearchMatches.length === 0 ? (
            <p className="mt-3 text-sm text-[#CBD5E1]">
              No matching stock found in demo data.
            </p>
          ) : null}

          {practiceHasQuery && practiceSearchMatches.length > 0 ? (
            <StockSearchResultList
              matches={practiceSearchMatches}
              onPickSymbol={openPracticeDetail}
            />
          ) : null}
        </section>
      )}

      <section className="rounded-3xl bg-[#162033] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#CBD5E1]">
          Practice Portfolio
        </p>
        <h3 className="mt-1 text-lg font-semibold">Holdings</h3>
        {holdingSymbols.length === 0 ? (
          <p className="mt-3 text-sm text-[#CBD5E1]">
            No practice positions yet. Open a stock from search and buy shares to build a demo
            portfolio.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[#CBD5E1]">
                  <th className="pb-3 pr-4 font-medium">Ticker</th>
                  <th className="pb-3 pr-4 font-medium">Company</th>
                  <th className="pb-3 pr-4 font-medium">Quantity</th>
                  <th className="pb-3 pr-4 font-medium">Avg price</th>
                  <th className="pb-3 pr-4 font-medium">Current price</th>
                  <th className="pb-3 pr-4 font-medium">Market value</th>
                  <th className="pb-3 font-medium">P&amp;L</th>
                </tr>
              </thead>
              <tbody>
                {holdingSymbols.map((sym) => {
                  const row = practiceHoldings[sym];
                  const inv = bySymbol.get(sym);
                  const curPx = inv ? parseExplorePrice(inv.price) : null;
                  const mv =
                    curPx != null && row?.quantity ? row.quantity * curPx : null;
                  const cost = row?.quantity * row?.avgPrice;
                  const pl = mv != null && Number.isFinite(cost) ? mv - cost : null;
                  return (
                    <tr key={sym} className="border-b border-white/5">
                      <td className="py-3 pr-4 font-semibold">{sym}</td>
                      <td className="py-3 pr-4">{inv?.name ?? "—"}</td>
                      <td className="py-3 pr-4">{row.quantity}</td>
                      <td className="py-3 pr-4">{formatPracticeUsd(row.avgPrice)}</td>
                      <td className="py-3 pr-4">{curPx != null ? formatPracticeUsd(curPx) : "—"}</td>
                      <td className="py-3 pr-4">{mv != null ? formatPracticeUsd(mv) : "—"}</td>
                      <td className="py-3">{pl != null ? formatPracticeUsd(pl) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-3xl bg-[#162033] p-5">
        <h3 className="text-lg font-semibold">Today’s Challenge</h3>
        <p className="mt-2 text-sm text-[#CBD5E1]">
          Build a portfolio where no single stock is more than 40% of your total investment.
        </p>
        <button className="mt-4 rounded-2xl bg-[#F5C542] px-4 py-2 font-semibold text-[#0B1320]">
          Start Challenge
        </button>
      </section>

      <section className="rounded-3xl bg-[#162033] p-5">
        <h3 className="mb-3 text-lg font-semibold">Market Bites</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <LearningCard title="What is diversification?" />
          <LearningCard title="Why do stock prices move?" />
          <LearningCard title="What is risk tolerance?" />
          <LearningCard title="Stocks vs ETFs" />
        </div>
      </section>
    </div>
  );
}

function formatHoldingsPct(pct) {
  if (!Number.isFinite(pct)) return "—";
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

function Holdings({
  mockInvestments,
  holdings,
  realCash,
  setRealCash,
  setHoldings,
  directBuySymbol,
  clearDirectBuySymbol,
  livePrices,
}) {
  const [tradeModal, setTradeModal] = useState(null);
  const [sellAdvisorSymbol, setSellAdvisorSymbol] = useState(null);
  const [sellAdvisorAdvice, setSellAdvisorAdvice] = useState("");
  const [sellAdvisorLoading, setSellAdvisorLoading] = useState(false);
  const [showSellAdvisor, setShowSellAdvisor] = useState(false);

  const bySymbol = new Map(mockInvestments.map((inv) => [inv.symbol, inv]));

  useEffect(() => {
    if (directBuySymbol == null || directBuySymbol === "") {
      return;
    }
    const ok = mockInvestments.some((i) => i.symbol === directBuySymbol);
    if (ok) {
      setTradeModal({ symbol: directBuySymbol, side: "buy" });
    }
    clearDirectBuySymbol();
  }, [directBuySymbol, mockInvestments, clearDirectBuySymbol]);

  async function fetchSellAdvice(sym, row, inv) {
    setSellAdvisorSymbol(sym);
    setSellAdvisorAdvice("");
    setSellAdvisorLoading(true);
    setShowSellAdvisor(true);

    const liveQuote = livePrices[sym];
    const curPx =
      liveQuote?.rawPrice != null && Number.isFinite(liveQuote.rawPrice)
        ? liveQuote.rawPrice
        : inv
          ? parseExplorePrice(inv.price)
          : null;
    const avgPrice = row.avgPrice;
    const qty = row.quantity;
    const pl = curPx != null ? (curPx - avgPrice) * qty : null;
    const plPct =
      curPx != null && avgPrice > 0
        ? ((curPx - avgPrice) / avgPrice) * 100
        : null;
    const dc = liveQuote?.dailyChangePct ?? inv?.dailyChangePct;
    const plPctStr = plPct != null && Number.isFinite(plPct) ? plPct.toFixed(2) : null;
    const plLine =
      pl != null && plPctStr != null
        ? pl >= 0
          ? `up $${pl.toFixed(2)} (+${plPctStr}%)`
          : `down $${Math.abs(pl).toFixed(2)} (${plPctStr}%)`
        : "holding this position — current P/L unavailable without a demo price.";
    const dcLine =
      dc != null && Number.isFinite(dc) ? `${dc >= 0 ? "+" : ""}${dc.toFixed(2)}` : "N/A";

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 350,
          system:
            "You are Zenith AI, a warm friendly financial advisor for beginners. Be direct, clear, jargon-free. Always give a clear YES or NO recommendation first, then explain why in simple terms. Under 150 words.",
          messages: [
            {
              role: "user",
              content: `I own ${qty} shares of ${inv?.name ?? sym} (${sym}). I bought at $${avgPrice?.toFixed(2)} per share. Current price is ${curPx != null ? `$${curPx.toFixed(2)}` : "unknown"}. I am ${plLine}. Today's change: ${dcLine}${
                dcLine === "N/A" ? "" : "%"
              }. Should I sell now? Give me a clear recommendation with 3 bullet points: 1) Sell or Hold and why 2) What to watch for 3) Tax consideration if I sell. Be warm and direct like a trusted friend.`,
            },
          ],
        }),
      });

      const data = await response.json();
      setSellAdvisorAdvice(
        (!response.ok
          ? data?.error?.message
          : data.content?.[0]?.text) ?? "Could not load advice.",
      );
    } catch {
      setSellAdvisorAdvice("Could not load advice.");
    } finally {
      setSellAdvisorLoading(false);
    }
  }

  const holdingSymbols = Object.keys(holdings).filter(
    (s) => (holdings[s]?.quantity ?? 0) > 0,
  );

  let totalInvested = 0;
  let currentValue = 0;
  let todaysChangeDollars = 0;

  const rows = holdingSymbols.map((sym) => {
    const row = holdings[sym];
    const inv = bySymbol.get(sym);
    const liveQuote = livePrices[sym];
    const curPx =
      liveQuote?.rawPrice != null && Number.isFinite(liveQuote.rawPrice)
        ? liveQuote.rawPrice
        : inv
          ? parseExplorePrice(inv.price)
          : null;
    const qty = row.quantity;
    const avgPrice = row.avgPrice;
    const invested = qty * avgPrice;
    const marketValue = curPx != null ? qty * curPx : null;
    totalInvested += invested;
    if (marketValue != null) currentValue += marketValue;
    const dc = liveQuote?.dailyChangePct ?? inv?.dailyChangePct;
    if (marketValue != null && Number.isFinite(dc)) {
      todaysChangeDollars += marketValue * (dc / 100);
    }
    const plAmount = marketValue != null ? marketValue - invested : null;
    const plPct =
      invested > 0 && plAmount != null ? (plAmount / invested) * 100 : null;

    return {
      sym,
      inv,
      qty,
      avgPrice,
      curPx,
      invested,
      marketValue,
      plAmount,
      plPct,
    };
  });

  const totalPnL = currentValue - totalInvested;
  const portfolioDayPct =
    currentValue > 0 ? (todaysChangeDollars / currentValue) * 100 : null;
  const todayChangeLabel = `${formatPracticeUsd(todaysChangeDollars)} · ${formatHoldingsPct(portfolioDayPct)}`;

  const hasHoldings = holdingSymbols.length > 0;

  const modalInvestment =
    tradeModal != null ? bySymbol.get(tradeModal.symbol) ?? null : null;
  const modalLive =
    tradeModal != null && modalInvestment ? livePrices[tradeModal.symbol] : null;
  const modalInvestmentForTrade =
    modalInvestment == null
      ? null
      : {
          ...modalInvestment,
          price: modalLive?.price ?? modalInvestment.price,
          dailyChangePct: modalLive?.dailyChangePct ?? modalInvestment.dailyChangePct,
        };

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-[#162033] p-5">
        <h2 className="text-2xl font-bold">Holdings</h2>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.04em] text-[#20C997]">
          Real Portfolio
        </p>
        <p className="mt-2 text-sm text-[#CBD5E1]">
          {hasHoldings
            ? "Your real portfolio positions — separate from Practice. Cash includes proceeds less demo sell fees."
            : "No holdings yet. Explore investments or practice first."}
        </p>
      </section>

      {hasHoldings ? (
        <>
          <section className="rounded-3xl bg-[#162033] p-5">
            <h3 className="text-lg font-semibold">Portfolio summary</h3>
            <p className="mt-1 text-xs text-[#CBD5E1]">
              Today&apos;s change uses each symbol&apos;s demo daily % applied to current market
              value — illustrative only.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Metric label="Total invested" value={formatPracticeUsd(totalInvested)} />
              <Metric label="Current value" value={formatPracticeUsd(currentValue)} />
              <Metric label="Today&apos;s change" value={todayChangeLabel} />
              <Metric label="Total P&amp;L" value={formatPracticeUsd(totalPnL)} />
            </div>
          </section>

          <section className="rounded-3xl bg-[#162033] p-5">
            <h3 className="text-lg font-semibold">Positions</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[#CBD5E1]">
                    <th className="pb-3 pr-4 font-medium">Ticker</th>
                    <th className="pb-3 pr-4 font-medium">Company</th>
                    <th className="pb-3 pr-4 font-medium">Quantity</th>
                    <th className="pb-3 pr-4 font-medium">Average buy price</th>
                    <th className="pb-3 pr-4 font-medium">Last traded price</th>
                    <th className="pb-3 pr-4 font-medium">Market value</th>
                    <th className="pb-3 pr-4 font-medium">Total invested</th>
                    <th className="pb-3 pr-4 font-medium">P&amp;L amount</th>
                    <th className="pb-3 pr-4 font-medium">P&amp;L %</th>
                    <th className="pb-3 pr-0 font-medium text-right">Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <Fragment key={r.sym}>
                      <tr className="border-b border-white/5 align-top">
                        <td className="py-3 pr-4 font-semibold">{r.sym}</td>
                        <td className="py-3 pr-4">{r.inv?.name ?? "—"}</td>
                        <td className="py-3 pr-4">{r.qty}</td>
                        <td className="py-3 pr-4">{formatPracticeUsd(r.avgPrice)}</td>
                        <td className="py-3 pr-4">
                          {r.curPx != null ? formatPracticeUsd(r.curPx) : "—"}
                        </td>
                        <td className="py-3 pr-4">
                          {r.marketValue != null ? formatPracticeUsd(r.marketValue) : "—"}
                        </td>
                        <td className="py-3 pr-4">{formatPracticeUsd(r.invested)}</td>
                        <td className="py-3 pr-4">
                          {r.plAmount != null ? formatPracticeUsd(r.plAmount) : "—"}
                        </td>
                        <td className="py-3 pr-4">{formatHoldingsPct(r.plPct)}</td>
                        <td className="py-3 pr-0 text-right">
                          <div className="flex flex-col items-end gap-2">
                            <button
                              type="button"
                              className="trade-pill-buy"
                              onClick={() =>
                                setTradeModal({ symbol: r.sym, side: "buy" })
                              }
                            >
                              Buy
                            </button>
                            <button
                              type="button"
                              className="trade-pill-sell"
                              onClick={() =>
                                setTradeModal({ symbol: r.sym, side: "sell" })
                              }
                            >
                              Sell
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                fetchSellAdvice(r.sym, holdings[r.sym], r.inv)
                              }
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: "44px",
                                padding: "0 14px",
                                borderRadius: "999px",
                                border: "1px solid rgba(141,191,232,0.35)",
                                background: "rgba(141,191,232,0.1)",
                                color: "#8dbfe8",
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                              }}
                            >
                              🤖 Ask AI
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td colSpan={10} className="px-0 pb-4 pt-1">
                          <div className="rounded-xl border border-[#F5C542]/25 bg-[#F5C542]/10 px-3 py-2 text-xs leading-relaxed text-[#CBD5E1]">
                            <span className="font-semibold text-[#F5C542]">
                              Timing insight ·{" "}
                            </span>
                            {generateHoldingTimingInsight(
                              r.inv
                                ? {
                                    ...r.inv,
                                    dailyChangePct:
                                      livePrices[r.sym]?.dailyChangePct ?? r.inv.dailyChangePct,
                                  }
                                : r.inv,
                              r.curPx,
                              r.avgPrice,
                            )}
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <section className="rounded-3xl border border-dashed border-[#20C997]/40 bg-[#20C997]/10 p-8 text-center">
          <h3 className="text-xl font-semibold text-[#20C997]">No holdings yet</h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#CBD5E1]">
            No holdings yet. Explore investments or practice first.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="rounded-2xl bg-[#20C997] px-5 py-3 font-semibold text-[#0B1320]">
              Explore Investments
            </button>
            <button className="rounded-2xl border border-white/10 px-5 py-3 font-semibold text-white">
              Practice First
            </button>
          </div>
        </section>
      )}

      {modalInvestmentForTrade && tradeModal ? (
        <HoldingsRealTradeModal
          investment={modalInvestmentForTrade}
          initialSide={tradeModal.side}
          realCash={realCash}
          holdings={holdings}
          setRealCash={setRealCash}
          setHoldings={setHoldings}
          onClose={() => setTradeModal(null)}
        />
      ) : null}

      <section className="rounded-3xl border border-[#F5C542]/30 bg-[#F5C542]/10 p-5">
        <h3 className="text-lg font-semibold text-[#F5C542]">
          Transparency Promise
        </h3>
        <p className="mt-2 text-sm text-[#CBD5E1]">
          Before any sale, Zenith will show estimated platform fees, regulatory fees,
          tax impact, and the net amount you may receive.
        </p>
      </section>

      {showSellAdvisor ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "0",
          }}
        >
          <div
            style={{
              background: "#0d2131",
              border: "1px solid rgba(141,191,232,0.18)",
              borderRadius: "20px 20px 0 0",
              padding: "28px",
              width: "100%",
              maxWidth: "680px",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#9fb0c0",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "4px",
                  }}
                >
                  Zenith AI · Sell Advisor
                </p>
                <h3
                  style={{
                    color: "#f5f8fb",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                  }}
                >
                  Should you sell {sellAdvisorSymbol}?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSellAdvisor(false)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(141,191,232,0.18)",
                  borderRadius: "8px",
                  color: "#9fb0c0",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                Close
              </button>
            </div>

            {sellAdvisorLoading ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "3px solid rgba(141,191,232,0.2)",
                    borderTopColor: "#8dbfe8",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    margin: "0 auto 16px",
                  }}
                ></div>
                <p style={{ color: "#9fb0c0", fontSize: "0.875rem" }}>
                  Analysing your position...
                </p>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    background: "rgba(196,122,53,0.1)",
                    border: "1px solid rgba(196,122,53,0.3)",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "16px",
                    whiteSpace: "pre-wrap",
                    color: "#f5f8fb",
                    fontSize: "0.875rem",
                    lineHeight: "1.7",
                  }}
                >
                  {sellAdvisorAdvice}
                </div>

                <p style={{ color: "#9fb0c0", fontSize: "0.75rem", marginBottom: "16px" }}>
                  Educational insight only — not financial advice. Always do your own research.
                </p>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSellAdvisor(false);
                      setTradeModal({ symbol: sellAdvisorSymbol, side: "sell" });
                    }}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "999px",
                      border: "1px solid rgba(239,68,68,0.38)",
                      background: "rgba(239,68,68,0.12)",
                      color: "#fca5a5",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                    }}
                  >
                    Sell anyway
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSellAdvisor(false)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "999px",
                      border: "1px solid rgba(74,222,128,0.38)",
                      background: "rgba(74,222,128,0.12)",
                      color: "#86efac",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                    }}
                  >
                    Hold for now ✓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BottomNav({ tabs, activeTab, setActiveTab }) {
  return (
    <nav className="app-bottom-nav" aria-label="Mobile navigation">
      <div className="app-bottom-nav__inner">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`app-bottom-nav__btn${activeTab === tab ? " app-bottom-nav__btn--active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric-tile">
      <p className="metric-tile__label">{label}</p>
      <p className="metric-tile__value">{value}</p>
    </div>
  );
}

function NewsCard({ title }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-xs text-[#CBD5E1]">2 hours ago · Market News</p>
    </div>
  );
}

function LearningCard({ title }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 text-xs text-[#CBD5E1]">60-sec learning bite</p>
    </div>
  );
}

export default App;