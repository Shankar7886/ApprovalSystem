import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn-ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn-ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";

const demo = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface ComboBoxProps {
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  error?: string;
  name?: string;
  onSelect?: (demoValue: any) => void;
  list?: { value: string; label: string }[];
}

export function ComboBox(props: ComboBoxProps) {
  const {
    value,
    disabled = false,
    placeholder = "Select an option",
    className,
    error = "",
    name = "",
    onSelect = () => {},
    list = demo,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [demoValue, setDemoValue] = React.useState(value || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between ${className} ${
            error && "border-red-500"
          }`}
        >
          {demoValue
            ? list.find((item) => item.value === demoValue)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[200px] p-0`}>
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentdemoValue) => {
                    setDemoValue(
                      currentdemoValue === demoValue ? "" : currentdemoValue
                    );
                    setOpen(false);
                    onSelect({
                      value:
                        currentdemoValue === demoValue ? "" : currentdemoValue,
                      label: list.find(
                        (item) => item.value === currentdemoValue
                      )?.label,
                      name: name,
                    });
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      demoValue === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {error && <span className="text-red-500 ms-2 text-sm">{error}</span>}
    </Popover>
  );
}
