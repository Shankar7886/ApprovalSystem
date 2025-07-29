import { CustomDialog } from "@/components/common/customPopup";
import { Button } from "@/components/shadcn-ui/button";
interface SaveHierarchyProps {
  open: boolean;
  close: () => void;
  handleSubmit?: (args: string) => void;
  message?: string;
}
export default function SaveHierarchy(props: SaveHierarchyProps) {
  const { open, close, handleSubmit = () => {}, message } = props;
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Save Hierarchy"
      size="sm"
      footer={
        <>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => handleSubmit("no")}
            style={{
              display: message?.startsWith("System") ? "none" : "inherit",
            }}
          >
            No
          </Button>
          <Button
            type="submit"
            onClick={() =>
              handleSubmit(message?.startsWith("System") ? "okay" : "yes")
            }
          >
            {message?.startsWith("System") ? "Okay" : "Yes"}
          </Button>
        </>
      }
    >
      <p className="text-sm font-medium">{message}</p>
    </CustomDialog>
  );
}
