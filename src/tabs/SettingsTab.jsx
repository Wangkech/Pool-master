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
    <main className="py- row-2 grid grid-rows-[3rem_1fr]">
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

          <div className="rounded-lg bg-(--accent-bg) p-4">
            <h3 className="mb-2 text-lg font-semibold">About</h3>
            <p className="mb-2 text-sm text-gray-300">Pool Master v2.0</p>
            <p className="mb-2 text-xs text-gray-400">
              A scoring and analytics app for pool/billiards games.
            </p>
            <p className="text-xs text-gray-400">
              Wangkech &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="row-3 flex flex-col items-center justify-center gap-y-1 text-center text-[0.75rem] text-[#bebebe]">
        <p>
          <FontAwesomeIcon className="text-xl" icon={faQuestionCircle} />{" "}
          version 2.0{" "}
        </p>
        <div className="h-px w-5 bg-[#8b8b8b]"></div>
      </div> */}
    </main>
  );
}

export default SettingsTab;
