import ConfirmationDialog from "./ConfirmationDialog";
import AlertDialog from "./AlertDialog";
import ErrorDialog from "./ErrorDialog";
import LoadingDialog from "./LoadingDialog";

export function DialogRenderer({ dialog, onClose }) {
  const handleConfirm = () => {
    dialog.resolve(true);
    onClose();
  };

  const handleCancel = () => {
    dialog.resolve(false);
    onClose();
  };

  const handleAction = () => {
    dialog.resolve(true);
    onClose();
  };

  if (dialog.type === "confirm") {
    return (
      <ConfirmationDialog
        title={dialog.title}
        message={dialog.message}
        confirmText={dialog.confirmText || "Confirm"}
        cancelText={dialog.cancelText || "Cancel"}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isDangerous={dialog.isDangerous || false}
      />
    );
  }

  if (dialog.type === "alert") {
    return (
      <AlertDialog
        title={dialog.title}
        message={dialog.message}
        type={dialog.alertType || "info"}
        onAction={handleAction}
        actionText={dialog.actionText || "OK"}
      />
    );
  }

  if (dialog.type === "error") {
    const handleActionClick = (action) => {
      action.onClick();
      dialog.resolve(false);
      onClose();
    };

    const actionsWithHandlers = (dialog.actions || []).map((action) => ({
      ...action,
      onClick: () => handleActionClick(action),
    }));

    return (
      <ErrorDialog
        title={dialog.title}
        message={dialog.message}
        actions={actionsWithHandlers}
      />
    );
  }

  if (dialog.type === "loading") {
    return <LoadingDialog message={dialog.message} />;
  }

  return null;
}

export default DialogRenderer;
