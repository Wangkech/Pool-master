function Container({ child }) {
  return (
    <div className="row-2 flex h-[calc(100dvh-12rem)] w-full flex-1 items-center justify-center bg-[--primary-bg]">
      {child}
    </div>
  );
}
export default Container;
