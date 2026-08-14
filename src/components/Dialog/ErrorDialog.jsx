import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Dialog from "./Dialog";

export function ErrorDialog({ title, message, actions = [] }) {
  return (
    <Dialog isOpen={true} title={title} message={message}>
      <div className="dialog-icon dialog-icon-error">{faTimes}</div>
      <div className="dialog-actions">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`btn ${index === 0 ? "btn-primary" : "btn-secondary"}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </Dialog>
  );
}

export default ErrorDialog;
