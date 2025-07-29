import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";

export type Option = {
  [key: string]: any; // Now supports dynamic keys
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
};

export default function SingleSelectDropdown({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  fields,
  className = "w-full",
}: SingleSelectDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
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
  );
}
