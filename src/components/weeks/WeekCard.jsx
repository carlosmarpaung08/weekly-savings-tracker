import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../utils/helpers";

export default function WeekCard({ week }) {
  const navigate = useNavigate();
  const total    = week.paid_count + week.unpaid_count;
  const pct      = total > 0 ? Math.round((week.paid_count / total) * 100) : 0;


  return (
    <div
      className={`week-history-card animate-fade-in-up ${week.is_active ? "is-active" : ""}`}
      onClick={() => navigate(`/week/${week.week_id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && navigate(`/week/${week.week_id}`)}
    >
      {/* Left info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <p className="week-history-num">Minggu {week.week_number}</p>
          {week.is_active && (
            <span className="badge badge-accent" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>
              Aktif
            </span>
          )}
        </div>
        <p className="week-history-amount">{formatRupiah(week.amount)} / orang</p>
        {week.week_date && (
          <p className="week-history-date">
            📅 {new Date(week.week_date).toLocaleDateString("id-ID", {
              weekday: "long",
              day:     "numeric",
              month:   "long",
              year:    "numeric",
            })}
          </p>
        )}

        {/* Mini progress */}
        <div style={{ marginTop: 10, maxWidth: 200 }}>
          <div className="progress-bar-track" style={{ height: 4 }}>
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="week-history-right">
        <p className="week-history-collected">{formatRupiah(week.total_collected)}</p>
        <p className="week-history-ratio">{week.paid_count}/{total} bayar</p>
        <p style={{ fontSize: "0.75rem", color: "var(--accent-bright)", marginTop: 8, fontWeight: 600 }}>
          Lihat Detail →
        </p>
      </div>
    </div>
  );
}