export default function StatCard({ label, value, sub, icon }) {
  return (
    <div className="card stat-card animate-fade-in-up">
      <p className="stat-card-label">{label}</p>
      <p className="stat-card-value">{value}</p>
      {sub && <p className="stat-card-sub">{sub}</p>}
      {icon && <div className="stat-card-icon">{icon}</div>}
    </div>
  );
}