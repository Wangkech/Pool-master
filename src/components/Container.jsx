function Container({ child }) {
  return (
    <main
      aria-label="home-main"
      className="row-2 flex h-[calc(100dvh-12rem)] w-full flex-1 items-center justify-center bg-[--primary-bg]"
    >
      {child}
    </main>
  );
}
export default Container;
