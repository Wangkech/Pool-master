import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ActiveNavBarBtn({ icon, text, label, tab, setView }) {
  return (
    <button
      onClick={() => {
        setView(tab);
      }}
      aria-label={label}
      className="flex h-16.25 w-16.25 flex-col items-center justify-center rounded-[50%] border-none bg-[#121312] text-center text-2xl text-white"
    >
      <FontAwesomeIcon icon={icon} />
      {/* <img src={imgURL} alt={text} className="h-[30px] w-[30px]" /> */}
      {text && <p className="text-[0.75rem] capitalize">{text}</p>}{" "}
    </button>
  );
}
export default ActiveNavBarBtn;
