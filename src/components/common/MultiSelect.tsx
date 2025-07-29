import {  useState, useRef, KeyboardEvent } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/shadcn-ui/popover";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { Input } from "@/components/shadcn-ui/input";
import {  ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
  group?: string;
};

type MultiSelectProps = {
  options: Option[];
  placeholder?: string;
  onChange?: (selected: string[]) => void;
  value?: string[]; // for controlled mode
  groupBy?: boolean;
};

export default function MultiSelect({
  options,
  placeholder = "Select",
  onChange,
  value,
  groupBy = false,
}: MultiSelectProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const selectedValues = isControlled ? value! : internalValue;

  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleValue = (val: string) => {
    const updated = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];

    if (!isControlled) setInternalValue(updated);
    onChange?.(updated);
  };

  const clearAll = () => {
    if (!isControlled) setInternalValue([]);
    onChange?.([]);
  };

  const selectAll = () => {
    const allFilteredValues = filteredOptions.map((o) => o.value);
    const updated = Array.from(
      new Set([...selectedValues, ...allFilteredValues])
    );
    if (!isControlled) setInternalValue(updated);
    onChange?.(updated);
  };

  // const handleRemoveTag = (val: string) => {
  //   const updated = selectedValues.filter((v) => v !== val);
  //   if (!isControlled) setInternalValue(updated);
  //   onChange?.(updated);
  // };

  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const itemCount = filteredOptions.length;
    if (itemCount === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % itemCount);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
    } else if (e.key === "Enter") {
      e.preventDefault();
      toggleValue(filteredOptions[activeIndex].value);
    }
  };

  const selectedLabels = options
    .filter((opt) => selectedValues.includes(opt.value))
    .map((opt) => opt.label);

  const groupOptions = (opts: Option[]) => {
    const groups: Record<string, Option[]> = {};
    for (const opt of opts) {
      const group = opt.group || "Ungrouped";
      if (!groups[group]) groups[group] = [];
      groups[group].push(opt);
    }
    return groups;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-between">
          <div className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
            {selectedLabels.length ? (
              <>
                <span className="text-xs text-muted-foreground truncate">
                  {selectedLabels.slice(0, 2).join(", ")}
                  {selectedLabels.length > 2 &&
                    `, +${selectedLabels.length - 2} more`}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-2"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setActiveIndex(0);
          }}
          className="mb-2"
        />
        <div className="flex justify-between items-center px-1 mb-2">
          <Button variant="ghost" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear All
          </Button>
        </div>
        <div
          className="flex flex-col space-y-2 max-h-60 overflow-auto"
          ref={listRef}
        >
          {filteredOptions.length ? (
            groupBy ? (
              Object.entries(groupOptions(filteredOptions)).map(
                ([group, opts]) => (
                  <div key={group}>
                    <div className="text-xs text-muted-foreground px-1 mb-1">
                      {group}
                    </div>
                    {opts.map((opt, i) => (
                      <label
                        key={opt.value}
                        className={`flex items-center space-x-2 px-1 py-1 rounded cursor-pointer ${
                          i === activeIndex ? "bg-muted" : ""
                        }`}
                      >
                        <Checkbox
                          checked={selectedValues.includes(opt.value)}
                          onCheckedChange={() => toggleValue(opt.value)}
                        />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                )
              )
            ) : (
              filteredOptions.map((opt, i) => (
                <label
                  key={opt.value}
                  className={`flex items-center space-x-2 px-1 py-1 rounded cursor-pointer ${
                    i === activeIndex ? "bg-muted" : ""
                  }`}
                >
                  <Checkbox
                    checked={selectedValues.includes(opt.value)}
                    onCheckedChange={() => toggleValue(opt.value)}
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))
            )
          ) : (
            <p className="text-muted-foreground text-sm px-1">
              No results found.
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
