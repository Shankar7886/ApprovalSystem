import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogClose,
} from "@/components/shadcn-ui/dialog";
import { Button } from "@/components/shadcn-ui/button";
// import { XCircle } from "lucide-react";

interface PopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onNext?: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
}

export function Popup({
  open,
  onOpenChange,
  title = "Title",
  description,
  onNext,
  onSubmit,
  children,
}: PopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[420px] md:max-w-[600px] hideCloseButton"
        // hideCloseButton
      >
        {/* <DialogClose asChild>
          <button
            className="absolute right-4 top-4 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Close"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </DialogClose> */}
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onNext}>
            Next
          </Button>
          <Button type="submit" className="saveButtonCss" onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
