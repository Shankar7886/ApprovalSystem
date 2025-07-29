import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: string;
}

function Checkbox({ className, label, ...props }: CheckboxProps) {
  const isChecked = props.checked;

  return (
    <label
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-2 transition-colors",
        isChecked ? "border-green-500 bg-green-50" : "border-gray-300",
        "hover:shadow-sm cursor-pointer",
        className
      )}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer size-4 shrink-0 rounded border border-gray-300 bg-white shadow-sm outline-none transition-all",
          "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white",
          "focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current"
        >
          <CheckIcon className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}

export { Checkbox };
