type FilterItem = {
  id: string;
  value: string;
};

type DifficultyFilterProps = {
  filterItems: FilterItem[];
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue?: string;
};

export function DifficultyFilter({ filterItems, name, onChange, selectedValue }: DifficultyFilterProps) {
  return (
    <div>
      {filterItems.map(({ id, value }) => (
        <div key={id} className="flex items-center gap-2">
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            checked={selectedValue === value}
          />
          <label htmlFor={id}>{value.charAt(0).toUpperCase() + value.slice(1)}</label>
        </div>
      ))}
    </div>
  );
}
