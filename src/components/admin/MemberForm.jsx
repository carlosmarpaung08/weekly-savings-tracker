import { useState } from "react";
import Button from "../ui/Button";

export default function MemberForm({ initial = "", onSubmit, onCancel, loading }) {
  const [name, setName] = useState(initial);

  function handleSubmit() {
    if (name.trim() === "") return;
    onSubmit(name.trim());
  }

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Nama Member</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          placeholder="Contoh: Budi Santoso"
          className="form-input"
          autoFocus
        />
      </div>
      <div className="form-actions">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          Batal
        </Button>
        <Button onClick={handleSubmit} disabled={loading || name.trim() === ""}>
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </div>
  );
}