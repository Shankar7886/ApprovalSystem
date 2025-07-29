import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";

interface forminterface {
  open: boolean;
  close: () => void;
  form: any;
  setForm: (args: any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (args: any) => void;
  inProcess: boolean;
  errors: Record<string, string>;
}

const ApprovalGroupForm = (props: forminterface) => {
  const {
    open,
    close,
    form,
    setForm,
    handleChange,
    handleSubmit,
    inProcess,
    errors,
  } = props;
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Approval Group"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            className="newRecordButtonCSS"
            onClick={() => handleSubmit("next")}
            disabled={inProcess}
          >
            Next
          </Button>
          <Button
            className="saveButtonCss"
            onClick={() => handleSubmit("submit")}
            disabled={inProcess}
          >
            Submit
          </Button>
        </div>
      }
    >
      <Row>
        <Col>
          <FloatingLabelInput
            id="GroupName"
            label="Group Name"
            name="GroupName"
            value={form.GroupName}
            onChange={handleChange}
            error={errors.GroupName}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Description"
            label="Description"
            name="Description"
            value={form.Description}
            onChange={handleChange}
            error={errors.Description}
          />
        </Col>
        <Col>
          <Checkbox
            id="IsActive"
            checked={form.IsActive}
            label="IsActive"
            onCheckedChange={(e) => setForm({ ...form, IsActive: !!e })}
          />
        </Col>
      </Row>
    </CustomDialog>
  );
};

export default ApprovalGroupForm;
