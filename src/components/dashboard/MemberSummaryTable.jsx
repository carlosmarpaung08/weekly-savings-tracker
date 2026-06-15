import { formatRupiah } from "../../utils/helpers";

export default function MemberSummaryTable({ members }) {
  return (
    <div className="card animate-fade-in-up">
      <div className="section-header">
        <div className="section-title">
          <span className="section-title-dot" />
          Rekap Per Member
        </div>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          {members.length} anggota
        </span>
      </div>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th style={{ textAlign: "right" }}>Total Tabungan</th>
            <th style={{ textAlign: "right" }}>Minggu Bayar</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, idx) => (
            <tr key={member.member_id}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="member-avatar" style={{ width: 28, height: 28, fontSize: "0.7rem" }}>
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="summary-td-name">{member.name}</span>
                </div>
              </td>
              <td className="summary-td-value">
                {formatRupiah(member.total_savings)}
              </td>
              <td className="summary-td-count">
                {member.paid_weeks}/{member.paid_weeks + member.unpaid_weeks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}