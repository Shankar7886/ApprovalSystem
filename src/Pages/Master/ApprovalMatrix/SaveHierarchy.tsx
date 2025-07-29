import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import { Button } from "@/components/shadcn-ui/button";
interface SaveHierarchyProps {
  open: boolean;
  close: () => void;
  handleSubmit?: () => void;
  hierarchyName: string;
  setHierarchyName: React.Dispatch<React.SetStateAction<string>>;
}

export default function SaveHierarchy({
  open,
  close,
  handleSubmit,
  hierarchyName,
  setHierarchyName,
}: SaveHierarchyProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Save Hierarchy"
      size="sm"
      footer={
        <Button type="submit" onClick={handleSubmit}>
          Save changes
        </Button>
      }
    >
      <>
        <FloatingLabelInput
          label="Enter Hierarchy Name"
          id="saveHierarchyName"
          value={hierarchyName}
          onChange={(e) => setHierarchyName(e.target.value)}
        />
      </>
    </CustomDialog>
  );
}
