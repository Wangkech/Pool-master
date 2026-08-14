import Dialog from "./Dialog";

export function ConfirmationDialog({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDangerous = false,
}) {
  return (
    <Dialog isOpen={true} title={title} message={message}>
      <div className="dialog-actions">
        <button onClick={onCancel} className="btn btn-secondary">
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className={`btn ${isDangerous ? "btn-danger" : "btn-primary"}`}
        >
          {confirmText}
        </button>
      </div>
    </Dialog>
  );
}

export default ConfirmationDialog;
