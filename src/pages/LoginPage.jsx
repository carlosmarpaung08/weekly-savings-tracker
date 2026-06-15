import { useState }    from "react";
import { useNavigate } from "react-router-dom";
import { login }       from "../api/index";
import { useAuth }     from "../context/AuthContext";

function CoinSVG({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="15" fill="url(#loginCoinGrad)" opacity="0.18" />
      <circle cx="16" cy="16" r="13" fill="url(#loginCoinGrad)" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <text
        x="16" y="21"
        textAnchor="middle"
        fontSize="10"
        fontWeight="800"
        fontFamily="Inter, system-ui, sans-serif"
        fill="white"
        letterSpacing="-0.5"
      >Rp</text>
      <defs>
        <linearGradient id="loginCoinGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const { login: saveToken }    = useAuth();
  const navigate                = useNavigate();

  async function handleLogin() {
    if (!password) return;
    setLoading(true);
    setError("");
    const res = await login(password);
    if (res.success) {
      saveToken(res.data.token);
      navigate("/admin");
    } else {
      setError(res.error || "Password salah");
    }
    setLoading(false);
  }

  return (
    <div className="login-page">
      {/* Background glow */}
      <div className="login-bg-glow" />

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon">
            <CoinSVG size={40} />
          </div>
          <p className="login-title">
            Tabungan{" "}
            <span style={{
              background: "linear-gradient(90deg, #818cf8, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Bareng
            </span>
          </p>
          <p className="login-subtitle">Masuk sebagai Administrator</p>
        </div>

        {/* Form */}
        <div>
          {error && (
            <div className="login-error">{error}</div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Masukkan password admin"
              className="form-input"
              autoFocus
            />
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleLogin}
            disabled={loading || !password}
            style={{ marginTop: 8 }}
          >
            {loading ? "Memverifikasi..." : "Masuk sebagai Admin"}
          </button>
        </div>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.825rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font)",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text-secondary)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
          >
            ← Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}