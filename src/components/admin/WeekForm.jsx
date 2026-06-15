import { useState } from "react";
import Button from "../ui/Button";
import { formatRupiah } from "../../utils/helpers";

export default function WeekForm({ initial = "", label = "Buat Minggu Baru", onSubmit, onCancel, loading }) {
  const [amount, setAmount] = useState(initial);

  function handleSubmit() {
    const num = Number(amount);
    if (!num || num <= 0) return;
    onSubmit(num);
  }

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Nominal Iuran (Rp)</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          placeholder="Contoh: 50000"
          className="form-input"
          autoFocus
        />
        {amount > 0 && (
          <p className="form-hint">{formatRupiah(Number(amount))}</p>
        )}
      </div>
      <div className="form-actions">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Batal
        </Button>
        <Button onClick={handleSubmit} disabled={loading || !amount || Number(amount) <= 0}>
          {loading ? "Menyimpan..." : label}
        </Button>
      </div>
    </div>
  );
}