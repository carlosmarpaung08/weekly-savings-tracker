import { useState } from "react";
import { createMember, updateMember, deleteMember } from "../../api/index";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import MemberForm from "./MemberForm";
import { formatRupiah } from "../../utils/helpers";

export default function MemberTable({ members, onSuccess }) {
  const { token }          = useAuth();
  const [modal,    setModal]    = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  function openAdd()          { setError(""); setModal("add");    setSelected(null); }
  function openEdit(member)   { setError(""); setModal("edit");   setSelected(member); }
  function openDelete(member) { setError(""); setModal("delete"); setSelected(member); }
  function closeModal()       { setModal(null); setSelected(null); }

  async function handleAdd(name) {
    setLoading(true);
    const res = await createMember(name, token);
    if (res.success) { onSuccess(); closeModal(); }
    else setError(res.error);
    setLoading(false);
  }

  async function handleEdit(name) {
    setLoading(true);
    const res = await updateMember(selected.member_id, name, token);
    if (res.success) { onSuccess(); closeModal(); }
    else setError(res.error);
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    const res = await deleteMember(selected.member_id, token);
    if (res.success) { onSuccess(); closeModal(); }
    else setError(res.error);
    setLoading(false);
  }

  return (
    <>
      <div className="card animate-fade-in-up">
        <div className="section-header">
          <div className="section-title">
            <span className="section-title-dot" />
            Kelola Member
          </div>
          <Button size="sm" onClick={openAdd}>+ Tambah</Button>
        </div>

        {members.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p className="empty-state-text">Belum ada member. Tambahkan member pertama!</p>
          </div>
        ) : (
          <div className="member-list">
            {members.map(member => (
              <div key={member.member_id} className="member-row">
                <div className="member-avatar">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div className="member-info">
                  <p className="member-name">{member.name}</p>
                  <p className="member-stat">
                    {member.paid_weeks}/{member.paid_weeks + member.unpaid_weeks} minggu bayar
                  </p>
                </div>
                <span className="member-savings">
                  {formatRupiah(member.total_savings)}
                </span>
                <div className="member-actions">
                  <Button size="sm" variant="ghost" onClick={() => openEdit(member)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => openDelete(member)}>
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Tambah */}
      {modal === "add" && (
        <Modal title="Tambah Member" onClose={closeModal}>
          {error && <div className="login-error" style={{ marginBottom: 16 }}>{error}</div>}
          <MemberForm onSubmit={handleAdd} onCancel={closeModal} loading={loading} />
        </Modal>
      )}

      {/* Modal Edit */}
      {modal === "edit" && selected && (
        <Modal title="Edit Member" onClose={closeModal}>
          {error && <div className="login-error" style={{ marginBottom: 16 }}>{error}</div>}
          <MemberForm
            initial={selected.name}
            onSubmit={handleEdit}
            onCancel={closeModal}
            loading={loading}
          />
        </Modal>
      )}

      {/* Modal Hapus */}
      {modal === "delete" && selected && (
        <Modal title="Hapus Member" onClose={closeModal}>
          <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
            Yakin ingin menghapus <strong style={{ color: "var(--text-primary)" }}>{selected.name}</strong>?
          </p>
          <p style={{ fontSize: "0.825rem", color: "var(--danger)", marginBottom: 24 }}>
            Seluruh riwayat pembayaran member ini akan ikut terhapus.
          </p>
          {error && <div className="login-error" style={{ marginBottom: 16 }}>{error}</div>}
          <div className="form-actions">
            <Button variant="ghost" onClick={closeModal} disabled={loading}>Batal</Button>
            <Button variant="danger" onClick={handleDelete} disabled={loading}>
              {loading ? "Menghapus..." : "Ya, Hapus"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}