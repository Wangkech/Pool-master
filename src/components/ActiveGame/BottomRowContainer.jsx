function BottomRowContainer() {
  return (
    <div className="flex items-center justify-around">
      <button className="rounded-2xl bg-black p-2 px-4">End Session</button>
      <button className="rounded-2xl bg-white px-4 py-2 text-black">
        Next Round
      </button>
    </div>
  );
}

export default BottomRowContainer;
