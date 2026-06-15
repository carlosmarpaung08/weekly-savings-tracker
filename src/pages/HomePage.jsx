import { useNavigate } from "react-router-dom";
import { useApi }               from "../hooks/useApi";
import { getDashboard }         from "../api/index";
import { formatRupiah }         from "../utils/helpers";
import LoadingSpinner           from "../components/ui/LoadingSpinner";
import ErrorMessage             from "../components/ui/ErrorMessage";
import StatCard                 from "../components/dashboard/StatCard";
import ActiveWeekCard           from "../components/dashboard/ActiveWeekCard";
import MemberSummaryTable       from "../components/dashboard/MemberSummaryTable";

export default function HomePage() {
  const { data, loading, error } = useApi(getDashboard);
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div className="page-container">
      {/* Bento Grid - top stats */}
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

      {/* Minggu Aktif */}
      <div style={{ marginBottom: 16 }}>
        <ActiveWeekCard week={data.active_week} />
      </div>

      {/* Rekap Member */}
      <div style={{ marginBottom: 24 }}>
        <MemberSummaryTable members={data.members_summary} />
      </div>

      {/* Tombol Riwayat */}
      <div style={{ textAlign: "center" }}>
        <button
          className="btn btn-outline"
          onClick={() => navigate("/history")}
        >
          📋 Lihat Riwayat Minggu
        </button>
      </div>
    </div>
  );
}