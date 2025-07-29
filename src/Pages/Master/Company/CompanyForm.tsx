import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface CompanyFormProps {
  open: boolean;
  close: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
}
const CompanyForm = ({
  open,
  close,
  form,
  setForm,
  handleChange,
  handleSubmit,
  errors,
  inProcess,
}: CompanyFormProps) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Company"
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
            id="CompanyName"
            label="Company Name"
            name="CompanyName"
            value={form.CompanyName}
            onChange={handleChange}
            error={errors.CompanyName}
            maxLength={100}
            onKeyPress={(e) => {
              if (!/^[A-Za-z/0-9 ]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="DisplayName"
            label="Display Name"
            name="DisplayName"
            value={form.DisplayName}
            onChange={handleChange}
            error={errors.DisplayName}
            maxLength={100}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="LogoPath"
            label="Logo Path"
            name="LogoPath"
            value={form.LogoPath}
            onChange={handleChange}
            error={errors.LogoPath}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="RightsCompany"
            label="Rights Company"
            name="RightsCompany"
            value={form.RightsCompany}
            onChange={handleChange}
            error={errors.RightsCompany}
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

export default CompanyForm;
