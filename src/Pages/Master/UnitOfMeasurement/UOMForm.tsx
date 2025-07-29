import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface UOMFormProps {
  formVisible: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: Record<string, string>;
  handleSubmit: (e: string) => void;
  inProcess?: boolean;
}
const UOMForm = ({
  formVisible,
  setFormVisible,
  form,
  setForm,
  handleChange,
  error,
  handleSubmit,
  inProcess,
}: UOMFormProps) => {
  return (
    <CustomDialog
      open={formVisible}
      onOpenChange={setFormVisible}
      title="Add Unit of Measurement"
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
            id="uomCode"
            label="UOM Code"
            name="UomCode"
            value={form.UomCode}
            onChange={handleChange}
            error={error?.UomCode}
            maxLength={16}
            onKeyPress={(e) => {
              if (!/^[A-Za-z/0-9]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Name"
            label="UOM Name"
            name="Name"
            value={form.Name}
            onChange={handleChange}
            error={error?.Name}
            maxLength={100}
          />
        </Col>
        <Col>
          <Checkbox
            label="IsActive"
            checked={form.IsActive}
            onCheckedChange={(e) => setForm({ ...form, IsActive: !!e })}
          />
        </Col>
      </Row>
    </CustomDialog>
  );
};

export default UOMForm;
