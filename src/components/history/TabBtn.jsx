import ActiveTabBtn from "./ActiveTabBtn";

function TabBtn({ tab, switchTab, text, activeTab }) {
  return (
    <>
      {activeTab === tab && <ActiveTabBtn text={text} />}
      {activeTab != tab && (
        <button
          onClick={() => switchTab(tab)}
          className="h-9 w-29 rounded-2xl bg-(--accent-bg) px-4 shadow-none"
        >
          {text}
        </button>
      )}
    </>
  );
}

export default TabBtn;
