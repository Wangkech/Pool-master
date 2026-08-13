import {
  faQuestionCircle,
  faLightbulb,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SettingsTab({ setView }) {
  return (
    <main className="row-2 grid grid-rows-[3rem_1fr_4rem] py-4">
      <div className="row-2 flex h-full flex-col items-center justify-center gap-y-6 px-10 text-center">
        <h4 className="text-center capitalize"> Coming Soon... </h4>
        <FontAwesomeIcon icon={faLightbulb} className="text-7xl" />
        <p className="font text-sm">
          {" "}
          might wanna go <br />
          <span
            onClick={() => setView("home")}
            className="mx-2 rounded-lg bg-(--primary-color) px-2 text-black"
          >
            Start New Game
          </span>{" "}
        </p>
      </div>
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
