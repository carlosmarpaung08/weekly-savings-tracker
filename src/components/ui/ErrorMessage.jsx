export default function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <div className="error-box">
        <div className="error-icon">⚠️</div>
        <p className="error-title">Terjadi Kesalahan</p>
        <p className="error-msg">{message}</p>
      </div>
    </div>
  );
}