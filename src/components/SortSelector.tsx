type SortSelectorProps<T extends string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
};

// components/SortSelector.tsx

function SortSelector<T extends string>({
  value,
  onChange,
  options,
  label = "정렬 기준",
}: SortSelectorProps<T>) {
  return (
    <div className="mt-4">
      <label htmlFor="sort-selector" className="mr-2 font-semibold">
        {label}:
      </label>
      <select
        id="sort-selector"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="border rounded px-2 py-1"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelector;
