import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type TrainFilter = {
  services: string[];
  age: string[];
  batch: string[];
  coachOnly: boolean;
  academyOnly: boolean;
  contacted: boolean;
  keyword: string;
};

type Props = {
  filters: TrainFilter;
  setFilters: (filters: TrainFilter) => void;
};

type DropdownFilterProps = {
  label: string;
  options: string[];
  selected: string[];
  setSelected: (val: string[]) => void;
  multi?: boolean;
};

function DropdownFilter({
  label,
  options,
  selected,
  setSelected,
  multi = false,
}: DropdownFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (multi) {
      if (selected.includes(option)) {
        setSelected(selected.filter((o) => o !== option));
      } else {
        setSelected([...selected, option]);
      }
    } else {
      setSelected([option]);
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="px-3 py-2 border rounded flex items-center gap-1 bg-white"
        onClick={() => setOpen(!open)}
      >
        {label} <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg z-10 w-56">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggleOption(opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TrainFilterBar({ filters, setFilters }: Props) {
  const serviceOptions = [
    "BADMINTON",
    "SWIMMING",
    "PICKLEBALL",
    "FOOTBALL",
    "CRICKET",
    "TENNIS",
    "PHYSIO",
    "NUTRITION",
    "YOGA",
    "FITNESS",
  ];
  const ageOptions = ["Adults", "Kids"];
  const batchOptions = ["1-on-1 Classes", "Group Classes", "Online Classes"];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Services */}
      <DropdownFilter
        label="Services"
        options={serviceOptions}
        selected={filters.services}
        setSelected={(val) => setFilters({ ...filters, services: val })}
        multi
      />

      {/* Age */}
      <DropdownFilter
        label="Age"
        options={ageOptions}
        selected={filters.age}
        setSelected={(val) => setFilters({ ...filters, age: val })}
        multi
      />

      {/* Batch */}
      <DropdownFilter
        label="Batch"
        options={batchOptions}
        selected={filters.batch}
        setSelected={(val) => setFilters({ ...filters, batch: val })}
        multi
      />

      {/* Toggles */}
      <button
        className={`px-3 py-2 border rounded ${
          filters.coachOnly ? "bg-blue-500 text-white" : "bg-white"
        }`}
        onClick={() => setFilters({ ...filters, coachOnly: !filters.coachOnly })}
      >
        Coach Only
      </button>

      <button
        className={`px-3 py-2 border rounded ${
          filters.academyOnly ? "bg-green-500 text-white" : "bg-white"
        }`}
        onClick={() =>
          setFilters({ ...filters, academyOnly: !filters.academyOnly })
        }
      >
        Academy Only
      </button>

      <button
        className={`px-3 py-2 border rounded ${
          filters.contacted ? "bg-orange-500 text-white" : "bg-white"
        }`}
        onClick={() =>
          setFilters({ ...filters, contacted: !filters.contacted })
        }
      >
        Already Contacted
      </button>
    </div>
  );
}
