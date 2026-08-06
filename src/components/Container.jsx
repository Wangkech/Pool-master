function Container({ child }) {
  return (
    // <div className="mt-18.75 mb-22.75 flex h-auto min-h-[500px] w-full flex-1 items-center justify-center bg-[--primary-bg]">
    <div className="mt-18.75 mb-22.75 flex h-[calc(100vh-166px)] w-full flex-1 items-center justify-center bg-[--primary-bg]">
      {child}
    </div>
  );
}
export default Container;
