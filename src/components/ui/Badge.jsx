export default function Badge({ isPaid }) {
  return isPaid ? (
    <span className="badge badge-success">
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', flexShrink: 0 }} />
      Sudah Bayar
    </span>
  ) : (
    <span className="badge badge-danger">
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--danger)', flexShrink: 0 }} />
      Belum Bayar
    </span>
  );
}