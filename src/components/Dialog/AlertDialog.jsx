import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationCircle,
  faTriangleExclamation,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import Dialog from "./Dialog";

export function AlertDialog({
  title,
  message,
  type = "info",
  onAction,
  actionText = "OK",
}) {
  const iconMap = {
    success: faCheck,
    info: faExclamationCircle,
    warning: faTriangleExclamation,
    error: faTimes,
  };

  const icon = iconMap[type] || "✓";

  return (
    <Dialog isOpen={true} title={title} message={message}>
      <div className={`dialog-icon dialog-icon-${type}`}>
        {" "}
        <FontAwesomeIcon icon={icon} />{" "}
      </div>
      <div className="dialog-actions">
        <button onClick={onAction} className="btn btn-primary full-width">
          {actionText}
        </button>
      </div>
    </Dialog>
  );
}

export default AlertDialog;
