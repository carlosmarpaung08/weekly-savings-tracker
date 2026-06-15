import Badge from "../ui/Badge";
import { formatDateTime } from "../../utils/helpers";

export default function PaymentStatusList({ payments }) {
  return (
    <div className="payment-list">
      {payments.map(p => (
        <div
          key={p.payment_id || p.member_id}
          className="payment-row"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Avatar initial */}
            <div style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: p.is_paid
                ? "linear-gradient(135deg, var(--success) 0%, #059669 100%)"
                : "var(--bg-hover)",
              border: "1px solid",
              borderColor: p.is_paid ? "var(--success-border)" : "var(--border-default)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: p.is_paid ? "#fff" : "var(--text-muted)",
              flexShrink: 0,
            }}>
              {p.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="payment-row-name">{p.name}</p>
              {p.is_paid && p.paid_at && (
                <p className="payment-row-time">{formatDateTime(p.paid_at)}</p>
              )}
            </div>
          </div>
          <Badge isPaid={p.is_paid} />
        </div>
      ))}
    </div>
  );
}