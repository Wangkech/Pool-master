function Timestamp({ timestamp }) {
  return (
    <div className="bg-green800 gap- flex rounded py-1 text-[0.75rem]">
      <span className="rounded-l bg-[#47474552] px-1">
        {" "}
        {`${timestamp.date}/${timestamp.month}/${timestamp.year} `}
      </span>{" "}
      <span className="rounded-r bg-green-800 px-1 text-white">
        {" "}
        {`${timestamp.hour}: ${timestamp.minutes}`}
      </span>{" "}
    </div>
  );
}

export default Timestamp;
