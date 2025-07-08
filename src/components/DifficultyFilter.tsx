type FilterItem = {
  label: string;
  value: string;
};

type DifficultyFilterProps = {
  filterItems: FilterItem[];
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue?: string;
};

export function DifficultyFilter({
  filterItems,
  name,
  onChange,
  selectedValue,
}: DifficultyFilterProps) {
  return (
    <div>
      {filterItems.map(({ label, value }, idx) => (
        <div
          key={`${label}-${value}-${idx}`}
          className="flex items-center gap-2"
        >
          <input
            type="radio"
            id={value}
            name={name}
            value={value}
            onChange={onChange}
            checked={selectedValue === value}
          />
          <label htmlFor={value}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
}
