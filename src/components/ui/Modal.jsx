export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button
            onClick={onClose}
            className="modal-close"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}