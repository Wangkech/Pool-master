function TabBtn({ tab, switchTab, text, activeTab }) {
  return (
    <>
      <button
        onClick={() => switchTab(tab)}
        className={`h-9 w-29 rounded-2xl px-4 shadow-none ${tab === activeTab && "bg-(--primary-color) px-2 text-black"}`}
      >
        {text}
      </button>
    </>
  );
}

export default TabBtn;
