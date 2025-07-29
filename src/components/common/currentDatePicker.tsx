import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { Button } from "@/components/shadcn-ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import clsx from "clsx";
import { Label } from "@/components/shadcn-ui/label";

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  minDate?: Date;
  maxDate?: Date;
  clearable?: boolean;
  id: string;
  error?:string;
}

export const DatePickerFloatLabel: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  minDate,
  maxDate,
  clearable = true,
  id,
  error
}) => {
  const [open, setOpen] = React.useState(false);
  const hasValue = Boolean(value);

  const handleDateChange = (date?: Date) => {
    onChange(date ?? null);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent popover toggle
    onChange(null);
  };

  return (
    <div id={id} className={clsx("relative")}>
      <Label
        className={clsx(
          "absolute left-2.5 px-1 text-sm text-muted-foreground bg-white transition-all duration-200 ease-in-out pointer-events-none",
          hasValue ? "top-1 text-xs scale-90" : "top-3.5"
        )}
        style={{
          marginTop: !hasValue ? "-22px" : "-12px",
          zIndex: 1,
          fontSize: "12px",
        }}
      >
        {label}
      </Label>

      <div className="relative w-full ">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full  px-3 pr-10 text-left font-normal justify-between"
            >
              {value ? (
                format(value, "PPP")
              ) : (
                <span className="text-muted-foreground">Select date</span>
              )}
              <CalendarIcon className="h-4 w-4 opacity-50 ml-auto" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <DayPicker
              mode="single"
              selected={value ?? undefined}
              onSelect={handleDateChange}
              disabled={[
                ...(minDate ? [{ before: minDate }] : []),
                ...(maxDate ? [{ after: maxDate }] : []),
              ]}
              defaultMonth={value ?? new Date()}
              captionLayout="dropdown"
              fromYear={minDate?.getFullYear() ?? 1900}
              toYear={maxDate?.getFullYear() ?? new Date().getFullYear() + 10}
            />
          </PopoverContent>
        </Popover>

        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
       {error && (
        <span className="text-red-500 ms-2 mt-0 pt-0 text-xs font-semibold block">
          {error}{" "}
        </span>
      )}
    </div>
  );
};
