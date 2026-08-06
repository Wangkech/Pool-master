function TabBtns() {
  return (
    <div className="row-2 flex h-full w-fit items-center justify-center justify-self-center rounded-2xl border-none bg-(--accent-bg) text-[0.875rem]">
      <button className="rounded--2xl h-full w-29 rounded-tl-2xl bg-(--accent-bg) px-2 shadow-none">
        Current
      </button>
      <button className="rounded--2xl h-full w-29 rounded-tr-2xl bg-(--primary-color) px-2 text-black">
        All Time
      </button>
    </div>
  );
}

export default TabBtns;
