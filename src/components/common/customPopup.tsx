import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/shadcn-ui/dialog";

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string; // <-- New optional prop
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  key?:string
}

const sizeClassMap: Record<NonNullable<CustomDialogProps["size"]>, string> = {
  xs: "w-[15%]",
  sm: "w-[30%]",
  md: "w-[50%]",
  lg: "w-[70%]",
  xl: "w-[90%]",
};

export function CustomDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
  key
}: CustomDialogProps) {
  return (
    <Dialog key={key} open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={description ? undefined : undefined} // still needed if no DialogDescription
        className={`p-6 ${sizeClassMap[size]} ${className ?? ""} !max-w-none`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          {(title || description) && (
            <DialogHeader>
              {title && (
                <DialogTitle style={{ color: "#08018b" }}>{title}</DialogTitle>
              )}
              {/* {description && (
                <DialogDescription>{description}</DialogDescription>
              )} */}
            </DialogHeader>
          )}
          <DialogClose asChild />
        </div>

        {/* Body */}
        <div className="mb-6">{children}</div>

        {/* Footer */}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
