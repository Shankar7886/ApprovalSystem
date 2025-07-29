import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface ModeOfPaymentFormProps {
  open: boolean;
  close: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
}
const ModeOfPaymentForm = ({
  open,
  close,
  form,
  setForm,
  handleChange,
  handleSubmit,
  errors,
  inProcess,
}: ModeOfPaymentFormProps) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Division"
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
            id="ModeOfPayment"
            label="Mode Of Payment"
            name="ModeOfPayment"
            value={form.ModeOfPayment}
            onChange={handleChange}
            error={errors.ModeOfPayment}
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

export default ModeOfPaymentForm;
