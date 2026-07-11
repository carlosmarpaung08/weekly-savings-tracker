import { useState } from "react";
import Button from "../ui/Button";
import { formatRupiah } from "../../utils/helpers";

/**
 * Kembalikan string YYYY-MM-DD untuk hari Sabtu berikutnya setelah `fromDateStr`.
 * Jika `fromDateStr` sudah Sabtu, tambah 7 hari (Sabtu berikutnya).
 * Jika tidak ada `fromDateStr`, kembalikan Sabtu terdekat dari hari ini.
 */
function suggestNextSaturday(fromDateStr) {
  let base;
  if (fromDateStr) {
    base = new Date(fromDateStr);
    // fromDateStr adalah Sabtu → tambah 7 hari
    base.setDate(base.getDate() + 7);
  } else {
    base = new Date();
    const day = base.getDay(); // 0=Sun, 6=Sat
    const daysUntilSat = (6 - day + 7) % 7 || 7;
    base.setDate(base.getDate() + daysUntilSat);
  }
  // Format YYYY-MM-DD (local date)
  const y = base.getFullYear();
  const m = String(base.getMonth() + 1).padStart(2, "0");
  const d = String(base.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isSaturday(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return d.getDay() === 6;
}

export default function WeekForm({
  initial = "",
  initialDate = "",   // tanggal awal (YYYY-MM-DD), untuk mode edit
  suggestedDate = "", // tanggal saran (week_date minggu terakhir)
  label = "Buat Minggu Baru",
  onSubmit,
  onCancel,
  loading,
  showDateField = true, // false saat form hanya edit nominal
}) {
  const [amount, setAmount]   = useState(initial);
  const [weekDate, setWeekDate] = useState(
    initialDate || (showDateField ? suggestNextSaturday(suggestedDate) : "")
  );
  const [dateError, setDateError] = useState("");

  function handleSubmit() {
    const num = Number(amount);
    if (!num || num <= 0) return;

    if (showDateField) {
      if (!weekDate) {
        setDateError("Tanggal iuran wajib diisi");
        return;
      }
      if (!isSaturday(weekDate)) {
        setDateError("Tanggal iuran harus jatuh pada hari Sabtu");
        return;
      }
      setDateError("");
    }

    onSubmit(num, weekDate || null);
  }

  return (
    <div>
      {/* Input nominal */}
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

      {/* Input tanggal — hanya tampil jika showDateField = true */}
      {showDateField && (
        <div className="form-group" style={{ marginTop: 14 }}>
          <label className="form-label">
            Tanggal Iuran{" "}
            <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.78rem" }}>
              (harus hari Sabtu)
            </span>
          </label>
          <input
            type="date"
            value={weekDate}
            onChange={e => { setWeekDate(e.target.value); setDateError(""); }}
            className={`form-input${dateError ? " input-error" : ""}`}
          />
          {dateError && (
            <p style={{ color: "var(--danger, #ef4444)", fontSize: "0.78rem", marginTop: 4 }}>
              ⚠️ {dateError}
            </p>
          )}
          {weekDate && !dateError && isSaturday(weekDate) && (
            <p className="form-hint" style={{ color: "var(--success, #16a34a)" }}>
              ✅ Sabtu, {new Date(weekDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
          {weekDate && !dateError && !isSaturday(weekDate) && (
            <p style={{ color: "var(--warning, #f59e0b)", fontSize: "0.78rem", marginTop: 4 }}>
              ⚠️ Bukan hari Sabtu — silakan pilih tanggal Sabtu
            </p>
          )}
        </div>
      )}

      <div className="form-actions">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Batal
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            loading ||
            !amount ||
            Number(amount) <= 0 ||
            (showDateField && (!weekDate || !isSaturday(weekDate)))
          }
        >
          {loading ? "Menyimpan..." : label}
        </Button>
      </div>
    </div>
  );
}