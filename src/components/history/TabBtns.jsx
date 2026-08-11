import TabBtn from "./TabBtn";

function TabBtns({ setActiveTab, activeTab }) {
  function switchTab(tab) {
    setActiveTab(tab);
  }
  return (
    <div className="row-1 flex h-full w-fit items-center justify-center justify-self-center rounded-2xl border-none bg-(--accent-bg) px-2 text-[0.875rem]">
      <TabBtn
        activeTab={activeTab}
        tab="round"
        text="current"
        switchTab={switchTab}
      />
      <TabBtn
        activeTab={activeTab}
        tab="sessions"
        text="All Time"
        switchTab={switchTab}
      />
    </div>
  );
}

export default TabBtns;
