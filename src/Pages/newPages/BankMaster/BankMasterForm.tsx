import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface BankMasterFormProps {
  open: boolean;
  close: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
}
const BankMasterForm = ({
  open,
  close,
  form,
  setForm,
  handleChange,
  handleSubmit,
  errors,
  inProcess,
}: BankMasterFormProps) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Bank Master"
      size="lg"
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
      <Row className="">
        <Col>
          <FloatingLabelInput
            id="BankName"
            label="Bank Name"
            name="BankName"
            value={form.BankName}
            onChange={handleChange}
            error={errors.BankName}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Branch"
            label="Branch Name"
            name="Branch"
            value={form.Branch}
            onChange={handleChange}
            error={errors.Branch}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="IFSC"
            label="IFSC Code"
            name="IFSC"
            value={form.IFSC}
            onChange={handleChange}
            error={errors.IFSC}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="SWIFT"
            label="SWIFT Code"
            name="SWIFT"
            value={form.SWIFT}
            onChange={handleChange}
            error={errors.SWIFT}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Address"
            label="Address"
            name="Address"
            value={form.Address}
            onChange={handleChange}
            error={errors.Address}
          />
        </Col>
        <Col>
          <Checkbox
            id="IsActive"
            checked={form.IsActive}
            name="IsActive"
            label="IsActive"
            onCheckedChange={(e) => setForm({ ...form, IsActive: !!e })}
          />
        </Col>
      </Row>
    </CustomDialog>
  );
};

export default BankMasterForm;
