import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import { Label } from "@/components/shadcn-ui/label";
import clsx from "clsx";

export type Option = {
  [key: string]: any;
};

type Fields = {
  label: string;
  value: string;
};

type SingleSelectDropdownProps = {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  fields: Fields;
  label: string;
  id: string;
  error?: string;
  name?: string;
};

export default function SingleSelectDropdownFloat({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  fields,
  className = "w-full",
  label,
  id,
  error,
  name,
}: SingleSelectDropdownProps) {
  const hasValue = Boolean(value);

  return (
    <div
      id={id}
      className={clsx("relative", className)}
      style={{ width: "100%" }}
    >
      {/* Floating Label */}
      <Label
        className={clsx(
          "absolute left-2.5 px-1 bg-white transition-all duration-200 ease-in-out pointer-events-none text-[12px] text-gray-500",
          hasValue ? "top-1 scale-90" : "top-3.5"
        )}
        style={{ marginTop: !hasValue ? "-22px" : "-12px" }}
      >
        {label}
      </Label>

      {/* Dropdown Trigger */}
      <Select value={value} onValueChange={onChange} name={name}>
        <SelectTrigger
          className={clsx(
            "mt-2 h-12 px-3 border border-input bg-white rounded-md text-sm placeholder-transparent w-full",
            "focus:outline-none focus:ring-2 focus:ring-ring w-full min-w-[180px]"
          )}
          style={{ marginTop: "0px" }}
          aria-label={label}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        {/* Dropdown Content */}
        <SelectContent>
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem key={opt[fields.value]} value={opt[fields.value]}>
                {opt[fields.label]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <span className="text-red-500 ms-2 mt-0 pt-0 text-xs font-semibold block">
          {error}{" "}
        </span>
      )}
    </div>
  );
}
