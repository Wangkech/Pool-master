import { useContext } from "react";
import { DialogContext } from "./DialogContext";

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }

  return {
    confirm: (config) =>
      // spread config first then force the internal dialog `type`
      // so callers cannot accidentally override the dialog kind by passing `type`.
      context.showDialog({
        ...config,
        type: "confirm",
      }),
    alert: (config) => {
      // allow callers to provide a severity via `alertType` or `type`,
      // but ensure the dialog kind remains `alert`.
      const { type: maybeType, ...rest } = config || {};
      const alertType = rest.alertType || maybeType;
      return context.showDialog({
        ...rest,
        alertType,
        type: "alert",
      });
    },
    error: (config) =>
      context.showDialog({
        ...config,
        type: "error",
      }),
    loading: (config) => {
      const promise = context.showDialog({
        type: "loading",
        ...config,
      });
      return () => {
        context.closeDialog();
      };
    },
  };
}

export default useDialog;
