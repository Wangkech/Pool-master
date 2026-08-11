import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SettingsTab() {
  return (
    <main className="row-2 grid grid-rows-[3rem_1fr_4rem] py-4">
      <div className="row-3 flex flex-col items-center justify-center gap-y-1 text-center text-[0.75rem] text-[#bebebe]">
        <p>
          <FontAwesomeIcon className="text-xl" icon={faQuestionCircle} />{" "}
          version 2.0{" "}
        </p>
        <div className="h-px w-5 bg-[#8b8b8b]"></div>
        <p>powered by Wangkech &copy; {new Date().getFullYear()}</p>
      </div>
    </main>
  );
}

export default SettingsTab;
