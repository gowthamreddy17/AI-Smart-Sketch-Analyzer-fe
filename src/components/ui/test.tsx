
interface TestComponentProps {
  lineWidth: number; // Specify the type for lineWidth
  setLineWidth: (value: number) => void; // Specify the type for setLineWidth function
}

export default function TestComponent({ lineWidth, setLineWidth }: TestComponentProps) {
  return (
    <div className="flex items-center">
      <label htmlFor="lineWidth" className="mr-2 text-white">
        Brush Size:
      </label>
      <input
        type="range"
        id="lineWidth"
        min="1"
        max="20"
        value={lineWidth}
        onChange={(e) => setLineWidth(Number(e.target.value))}
        className="slider w-32"
      />
      <span className="ml-3 text-white">{lineWidth}</span>
    </div>
  );
}
