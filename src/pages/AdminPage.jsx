import { useNavigate }        from "react-router-dom";
import { useState }           from "react";
import { useApi }             from "../hooks/useApi";
import { getDashboard, createWeek, updateWeekAmount } from "../api/index";
import { useAuth }            from "../context/AuthContext";
import { formatRupiah }       from "../utils/helpers";
import LoadingSpinner         from "../components/ui/LoadingSpinner";
import ErrorMessage           from "../components/ui/ErrorMessage";
import StatCard               from "../components/dashboard/StatCard";
import MemberSummaryTable     from "../components/dashboard/MemberSummaryTable";
import PaymentToggle          from "../components/admin/PaymentToggle";
import MemberTable            from "../components/admin/MemberTable";
import WeekForm               from "../components/admin/WeekForm";
import Modal                  from "../components/ui/Modal";
import Button                 from "../components/ui/Button";

export default function AdminPage() {
  const { isAdmin, token } = useAuth();
  const navigate           = useNavigate();
  const { data, loading, error, refetch } = useApi(getDashboard);

  const [modal,       setModal]       = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError,   setFormError]   = useState("");

  // Redirect jika bukan admin
  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  const week = data.active_week;

  async function handleCreateWeek(amount) {
    setFormLoading(true);
    setFormError("");
    const res = await createWeek(amount, token);
    if (res.success) { refetch(); setModal(null); }
    else setFormError(res.error);
    setFormLoading(false);
  }

  async function handleEditAmount(amount) {
    setFormLoading(true);
    setFormError("");
    const res = await updateWeekAmount(week.week_id, amount, token);
    if (res.success) { refetch(); setModal(null); }
    else setFormError(res.error);
    setFormLoading(false);
  }

  const paidCount   = week ? week.paid_count : 0;
  const unpaidCount = week ? week.unpaid_count : 0;
  const totalCount  = paidCount + unpaidCount;
  const pct         = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;

  return (
    <>
      <div className="page-container">

        {/* Stat bento */}
        <div className="bento-grid bento-2col stagger" style={{ marginBottom: 16 }}>
          <StatCard
            label="Total Terkumpul"
            value={formatRupiah(data.group_total_savings)}
            sub={`${data.total_weeks} minggu berjalan`}
            icon="💰"
          />
          <StatCard
            label="Total Member"
            value={`${data.total_members} Orang`}
            sub="anggota aktif"
            icon="👥"
          />
        </div>

        {/* Minggu Aktif — Admin view */}
        <div className="card card-accent animate-fade-in-up" style={{ marginBottom: 16 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div className="section-title" style={{ marginBottom: 8 }}>
                <span className="section-title-dot" />
                Minggu Aktif
              </div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                {week ? `Minggu ${week.week_number}` : "Belum Ada Minggu Aktif"}
              </h2>
              {week && (
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>
                  Nominal iuran: <span style={{ color: "var(--accent-bright)", fontWeight: 600 }}>{formatRupiah(week.amount)}</span>
                </p>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {week && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setFormError(""); setModal("editAmount"); }}
                >
                  Edit Nominal
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => { setFormError(""); setModal("createWeek"); }}
              >
                + Minggu Baru
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          {week && (
            <div style={{ marginBottom: 20 }}>
              <div className="progress-label">
                <span>Progress Pembayaran</span>
                <span className="progress-label-value">{pct}%</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontSize: "0.72rem", color: "var(--success)" }}>
                  {paidCount} sudah bayar
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--danger)" }}>
                  {unpaidCount} belum bayar
                </span>
              </div>
            </div>
          )}

          {/* Payment toggles */}
          {week ? (
            <div className="payment-list">
              {week.payments.map(p => (
                <PaymentToggle key={p.payment_id || p.member_id} payment={p} onSuccess={refetch} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <p className="empty-state-text">
                Buat minggu baru untuk mulai mencatat pembayaran
              </p>
            </div>
          )}
        </div>

        {/* Rekap Member */}
        <div style={{ marginBottom: 16 }}>
          <MemberSummaryTable members={data.members_summary} />
        </div>

        {/* Kelola Member */}
        <div style={{ marginBottom: 24 }}>
          <MemberTable members={data.members_summary} onSuccess={refetch} />
        </div>

        {/* Riwayat link */}
        <div style={{ textAlign: "center" }}>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/history")}
          >
            📋 Lihat Riwayat Minggu
          </button>
        </div>

      </div>

      {/* Modal Buat Minggu Baru */}
      {modal === "createWeek" && (
        <Modal title="Buat Minggu Baru" onClose={() => setModal(null)}>
          {formError && <div className="login-error" style={{ marginBottom: 16 }}>{formError}</div>}
          <WeekForm
            label="Buat Minggu Baru"
            onSubmit={handleCreateWeek}
            onCancel={() => setModal(null)}
            loading={formLoading}
          />
        </Modal>
      )}

      {/* Modal Edit Nominal */}
      {modal === "editAmount" && week && (
        <Modal title="Edit Nominal Minggu" onClose={() => setModal(null)}>
          {formError && <div className="login-error" style={{ marginBottom: 16 }}>{formError}</div>}
          <WeekForm
            initial={week.amount}
            label="Simpan Perubahan"
            onSubmit={handleEditAmount}
            onCancel={() => setModal(null)}
            loading={formLoading}
          />
        </Modal>
      )}
    </>
  );
}