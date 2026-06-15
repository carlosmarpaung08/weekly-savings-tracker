import PaymentStatusList from "../dashboard/PaymentStatusList";
import { formatRupiah } from "../../utils/helpers";

export default function ActiveWeekCard({ week }) {
  if (!week) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "40px 24px" }}>
        <div style={{ fontSize: "2rem", opacity: 0.3, marginBottom: 12 }}>📅</div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Belum ada minggu aktif
        </p>
      </div>
    );
  }

  const total   = week.paid_count + week.unpaid_count;
  const pct     = total > 0 ? Math.round((week.paid_count / total) * 100) : 0;

  return (
    <div className="card card-accent animate-fade-in-up">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div className="section-title" style={{ marginBottom: 8 }}>
            <span className="section-title-dot" />
            Minggu Aktif
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            Minggu {week.week_number}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>
            Nominal iuran: <span style={{ color: "var(--accent-bright)", fontWeight: 600 }}>{formatRupiah(week.amount)}</span>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--success)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {formatRupiah(week.total_collected)}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
            {week.paid_count} dari {total} bayar
          </p>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div className="progress-label">
          <span>Progress Pembayaran</span>
          <span className="progress-label-value">{pct}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Payment list */}
      <PaymentStatusList payments={week.payments} />
    </div>
  );
}