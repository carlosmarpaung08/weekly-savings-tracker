import { useParams, useNavigate }                    from "react-router-dom";
import { useState }                                   from "react";
import { useApi }                                     from "../hooks/useApi";
import { getWeekDetail, deleteWeek, togglePayment }  from "../api/index";
import { formatRupiah, formatDate, formatDateTime }   from "../utils/helpers";
import { useAuth }                                    from "../context/AuthContext";
import LoadingSpinner                                 from "../components/ui/LoadingSpinner";
import ErrorMessage                                   from "../components/ui/ErrorMessage";
import Modal                                          from "../components/ui/Modal";
import Button                                         from "../components/ui/Button";
import Badge                                          from "../components/ui/Badge";

export default function WeekDetailPage() {
  const { week_id }        = useParams();
  const navigate           = useNavigate();
  const { isAdmin, token } = useAuth();

  const { data, loading, error, refetch } = useApi(
    () => getWeekDetail(week_id),
    [week_id]
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading,   setDeleteLoading]   = useState(false);
  const [deleteError,     setDeleteError]     = useState("");
  const [togglingId,      setTogglingId]      = useState(null);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  const total  = data.payments ? data.payments.filter(p => p.is_paid).length : 0;
  const totalP = data.payments ? data.payments.length : 0;
  const pct    = totalP > 0 ? Math.round((total / totalP) * 100) : 0;

  // ── Toggle Payment ───────────────────────────────────────
  async function handleToggle(payment) {
    setTogglingId(payment.payment_id);
    const res = await togglePayment(payment.payment_id, !payment.is_paid, token);
    if (res.success) refetch();
    setTogglingId(null);
  }

  // ── Delete Week ──────────────────────────────────────────
  async function handleDeleteWeek() {
    setDeleteLoading(true);
    setDeleteError("");
    const res = await deleteWeek(week_id, token);
    if (res.success) {
      navigate("/history");
    } else {
      setDeleteError(res.error);
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <div className="page-container">

        {/* Header */}
        <div className="page-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="page-back-btn" onClick={() => navigate(-1)}>
              ← Kembali
            </button>
            <h1 className="page-title">
              Detail Minggu {data.week_number}
              {data.is_active && (
                <span style={{
                  marginLeft: 8,
                  fontSize: "0.7rem",
                  background: "var(--success-light, #dcfce7)",
                  color: "var(--success, #16a34a)",
                  padding: "2px 10px",
                  borderRadius: 999,
                  verticalAlign: "middle",
                }}>
                  Aktif
                </span>
              )}
            </h1>
          </div>

          {/* Tombol hapus — hanya admin & minggu aktif */}
          {isAdmin && data.is_active && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => { setDeleteError(""); setShowDeleteModal(true); }}
            >
              🗑️ Hapus Minggu
            </Button>
          )}
        </div>

        {/* Stats mini bento */}
        <div className="bento-grid bento-2col stagger" style={{ marginBottom: 16 }}>
          <div className="card stat-card">
            <p className="stat-card-label">Nominal Iuran</p>
            <p className="stat-card-value" style={{ fontSize: "1.5rem" }}>
              {formatRupiah(data.amount)}
            </p>
            <p className="stat-card-sub">
              {data.week_date
                ? new Date(data.week_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
                : "-"
              }
            </p>
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

          {/* Daftar Payment */}
          <div style={{ marginTop: 12 }}>
            {data.payments.map(p => (
              <div
                key={p.payment_id || p.member_id}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "space-between",
                  padding:        "12px 0",
                  borderBottom:   "1px solid var(--border, #f1f5f9)",
                }}
              >
                {/* Info member */}
                <div>
                  <p style={{ fontWeight: 600, color: "var(--text-primary, #1e293b)" }}>
                    {p.name}
                  </p>
                  {p.is_paid && p.paid_at && (
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted, #94a3b8)", marginTop: 2 }}>
                      {formatDateTime(p.paid_at)}
                    </p>
                  )}
                </div>

                {/* Admin → tombol toggle | Publik → badge */}
                {isAdmin ? (
                  <button
                    onClick={() => handleToggle(p)}
                    disabled={togglingId === p.payment_id}
                    style={{
                      fontSize:     "0.85rem",
                      fontWeight:   600,
                      padding:      "6px 16px",
                      borderRadius: 999,
                      border:       "none",
                      cursor:       togglingId === p.payment_id ? "not-allowed" : "pointer",
                      opacity:      togglingId === p.payment_id ? 0.5 : 1,
                      transition:   "background 0.15s",
                      background:   p.is_paid
                        ? "var(--success-light, #dcfce7)"
                        : "var(--gray-light, #f1f5f9)",
                      color: p.is_paid
                        ? "var(--success, #16a34a)"
                        : "var(--text-muted, #94a3b8)",
                    }}
                  >
                    {togglingId === p.payment_id
                      ? "..."
                      : p.is_paid ? "✅ Sudah" : "❌ Belum"
                    }
                  </button>
                ) : (
                  <Badge isPaid={p.is_paid} />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <Modal
          title="🗑️ Hapus Minggu Aktif"
          onClose={() => setShowDeleteModal(false)}
        >
          <p style={{ color: "var(--text-secondary, #475569)", marginBottom: 8 }}>
            Yakin ingin menghapus <strong>Minggu {data.week_number}</strong>?
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #94a3b8)", marginBottom: 6 }}>
            Tindakan ini akan:
          </p>
          <ul style={{
            fontSize:    "0.85rem",
            color:       "#ef4444",
            marginBottom: 24,
            paddingLeft: 20,
            lineHeight:  1.8,
          }}>
            <li>Menghapus seluruh data pembayaran minggu ini</li>
            <li>Menjadikan minggu sebelumnya sebagai minggu aktif</li>
          </ul>

          {deleteError && (
            <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: 12 }}>
              {deleteError}
            </p>
          )}

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={deleteLoading}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteWeek}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Menghapus..." : "Ya, Hapus Minggu"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}