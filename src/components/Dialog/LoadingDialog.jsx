import Dialog from "./Dialog";

export function LoadingDialog({ message = "Loading..." }) {
  return (
    <Dialog isOpen={true} message={message}>
      <div className="dialog-loading">
        <div className="spinner"></div>
      </div>
    </Dialog>
  );
}

export default LoadingDialog;
