import { useParams, useNavigate } from "react-router-dom";
import { useApi }                 from "../hooks/useApi";
import { getWeekDetail }          from "../api/index";
import { formatRupiah, formatDate } from "../utils/helpers";
import LoadingSpinner             from "../components/ui/LoadingSpinner";
import ErrorMessage               from "../components/ui/ErrorMessage";
import PaymentStatusList          from "../components/dashboard/PaymentStatusList";

export default function WeekDetailPage() {
  const { week_id } = useParams();
  const navigate    = useNavigate();
  const { data, loading, error } = useApi(() => getWeekDetail(week_id), [week_id]);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  const total = data.payments ? data.payments.filter(p => p.is_paid).length : 0;
  const totalP = data.payments ? data.payments.length : 0;
  const pct = totalP > 0 ? Math.round((total / totalP) * 100) : 0;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
        <h1 className="page-title">Detail Minggu {data.week_number}</h1>
      </div>

      {/* Stats mini bento */}
      <div className="bento-grid bento-2col stagger" style={{ marginBottom: 16 }}>
        <div className="card stat-card">
          <p className="stat-card-label">Nominal Iuran</p>
          <p className="stat-card-value" style={{ fontSize: "1.5rem" }}>
            {formatRupiah(data.amount)}
          </p>
          <p className="stat-card-sub">{formatDate(data.created_at)}</p>
          <div className="stat-card-icon">💵</div>
        </div>
        <div className="card stat-card">
          <p className="stat-card-label">Total Terkumpul</p>
          <p className="stat-card-value" style={{ fontSize: "1.5rem", color: "var(--success)" }}>
            {formatRupiah(data.total_collected)}
          </p>
          <p className="stat-card-sub">{total}/{totalP} anggota bayar</p>
          <div className="stat-card-icon">✅</div>
        </div>
      </div>

      {/* Payment detail card */}
      <div className="card card-accent animate-fade-in-up">
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

        <div className="divider" />

        {/* List */}
        <PaymentStatusList payments={data.payments} />
      </div>
    </div>
  );
}