import { useState } from "react";
import { togglePayment } from "../../api/index";
import { useAuth } from "../../context/AuthContext";
import { formatDateTime } from "../../utils/helpers";

export default function PaymentToggle({ payment, onSuccess }) {
  const { token }  = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      const res = await togglePayment(
        payment.payment_id,
        !payment.is_paid,
        token,
        payment.member_id,
        payment.week_id
      );
      if (res.success) {
        onSuccess();
      } else {
        alert("Gagal: " + (res.error || "Terjadi kesalahan pada server"));
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="payment-row">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Avatar */}
        <div style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: payment.is_paid
            ? "linear-gradient(135deg, var(--success) 0%, #059669 100%)"
            : "var(--bg-hover)",
          border: "1px solid",
          borderColor: payment.is_paid ? "var(--success-border)" : "var(--border-default)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.72rem",
          fontWeight: 700,
          color: payment.is_paid ? "#fff" : "var(--text-muted)",
          flexShrink: 0,
          transition: "all 0.25s ease",
        }}>
          {payment.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="payment-row-name">{payment.name}</p>
          {payment.is_paid && payment.paid_at && (
            <p className="payment-row-time">{formatDateTime(payment.paid_at)}</p>
          )}
        </div>
      </div>

      {/* Custom toggle button */}
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`payment-toggle-btn ${payment.is_paid ? "is-paid" : "not-paid"}`}
        aria-label={payment.is_paid ? "Tandai belum bayar" : "Tandai sudah bayar"}
      >
        {loading ? (
          <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        ) : (
          <>
            <span className="toggle-dot" />
            {payment.is_paid ? "Sudah Bayar" : "Belum Bayar"}
          </>
        )}
      </button>
    </div>
  );
}