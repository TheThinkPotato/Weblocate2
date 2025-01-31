type BarGraphProps = {
  value: number; // Expect a value between 0 - 100
  colour?: string;
};

const BarGraph = ({ value, colour = "bg-blue-500" }: BarGraphProps) => {
  // Clamp value between 0 and 100 to avoid unexpected behavior
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full max-w-xs bg-gray-200 overflow-hidden relative h-5">
      <div
        className={`h-full ${colour} transition-all duration-300 ease-in-out`}
        style={{ width: `${clampedValue}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-black font-medium">
        {clampedValue}%
      </span>
    </div>
  );
};

export default BarGraph;
