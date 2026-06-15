import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/* ── Coin SVG Logo ── */
function CoinIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer ring glow */}
      <circle cx="16" cy="16" r="15" fill="url(#coinGrad)" opacity="0.15" />
      {/* Main coin face */}
      <circle cx="16" cy="16" r="13.5" fill="url(#coinGrad)" />
      {/* Inner ring */}
      <circle cx="16" cy="16" r="10.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      {/* Rp symbol */}
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fontFamily="Inter, system-ui, sans-serif"
        fill="white"
        letterSpacing="-0.5"
      >
        Rp
      </text>

      <defs>
        <linearGradient id="coinGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      {/* Brand */}
      <Link to="/" className="navbar-brand">
        {/* SVG coin logo */}
        <div className="navbar-brand-icon">
          <CoinIcon />
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{
            fontWeight: 800,
            fontSize: "1.15rem",
            letterSpacing: "-0.04em",
            color: "var(--text-primary)",
            lineHeight: 1,
          }}>
            Tabungan
            <span style={{
              marginLeft: 5,
              background: "linear-gradient(90deg, #818cf8, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Bareng
            </span>
          </span>
          <span style={{
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            lineHeight: 1,
          }}>
            Kelola Iuran Bersama
          </span>
        </div>
      </Link>

      {/* Nav items */}
      <div className="navbar-nav">
        {isAdmin ? (
          <>
            <Link
              to="/admin"
              className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
            >
              Admin
            </Link>
            <Link
              to="/history"
              className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
            >
              Riwayat
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm"
              style={{ marginLeft: 4 }}
            >
              Keluar
            </button>
          </>
        ) : (
          <>
            <Link
              to="/history"
              className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
            >
              Riwayat
            </Link>
            <Link to="/login">
              <button className="btn btn-primary btn-sm">
                Admin →
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}