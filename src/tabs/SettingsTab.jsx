import {
  faQuestionCircle,
  faLightbulb,
} from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDialog } from "../context/useDialog";
import { useGameContext } from "../context/useGameContext";

function SettingsTab({ setView }) {
  const { confirm, alert } = useDialog();
  const { clearAllData } = useGameContext();

  const handleClearData = async () => {
    const confirmed = await confirm({
      title: "Clear All Data?",
      message:
        "This will permanently delete all game history and statistics. This cannot be undone.",
      confirmText: "Clear All Data",
      cancelText: "Cancel",
      isDangerous: true,
    });

    if (confirmed) {
      clearAllData();
      await alert({
        title: "Data Cleared",
        message: "All game history has been removed.",
        alertType: "success",
      });
      setView("home");
    }
  };

  return (
    <main className="py- row-2 grid grid-rows-[3rem_1fr] overflow-hidden">
      <div className="row-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold capitalize">Settings</h1>
      </div>
      <div className="justify- row-2 flex h-full flex-col items-center gap-y-6 px-10 text-center">
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-lg bg-(--accent-bg) p-4">
            <h4 className="mb-4 font-semibold">Data Management</h4>
            <button
              onClick={handleClearData}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              <FontAwesomeIcon icon={faTrash} />
              Clear All Data
            </button>
          </div>

          <div className="h-full overflow-y-auto rounded-lg bg-(--accent-bg) p-4">
            <h3 className="mb-2 text-lg font-semibold">About</h3>
            <p className="mb-2 text-sm text-gray-300">Pool Master v2.0</p>
            <p className="mb-2 text-xs text-gray-400">
              Pool Master is an installable offline-first scorekeeping app built
              for local pool sessions. Designed to make multi-round games simple
              to manage, with automatic player ordering, foul handling, session
              history, and persistent storage that works even without an
              internet connection.
            </p>
            <p className="text-xs text-gray-400">
              Wangkech &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SettingsTab;
