import { useNavigate }  from "react-router-dom";
import { useApi }       from "../hooks/useApi";
import { getWeeks }     from "../api/index";
import LoadingSpinner   from "../components/ui/LoadingSpinner";
import ErrorMessage     from "../components/ui/ErrorMessage";
import WeekCard         from "../components/weeks/WeekCard";

export default function HistoryPage() {
  const { data, loading, error } = useApi(getWeeks);
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate("/")}>
          ← Kembali
        </button>
        <h1 className="page-title">Riwayat Minggu</h1>
      </div>

      {/* Week list */}
      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p className="empty-state-text">Belum ada riwayat minggu</p>
        </div>
      ) : (
        <div className="space-y-3 stagger">
          {data.map(week => (
            <WeekCard key={week.week_id} week={week} />
          ))}
        </div>
      )}
    </div>
  );
}