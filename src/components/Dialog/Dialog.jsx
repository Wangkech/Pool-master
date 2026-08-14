import "./Dialog.css";

export function Dialog({
  isOpen,
  title,
  message,
  children,
  onClose,
  size = "md",
}) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className={`dialog-content dialog-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="dialog-title">{title}</h2>}
        {message && <p className="dialog-message">{message}</p>}
        {children}
      </div>
    </div>
  );
}

export default Dialog;
