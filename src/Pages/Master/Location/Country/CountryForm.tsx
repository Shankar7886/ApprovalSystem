import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface CountryFormProps {
  open: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
}

const CountryForm = (props: CountryFormProps) => {
  const {
    open,
    close,
    form,
    setForm,
    handleInputChange,
    handleSubmit,
    errors,
    inProcess,
  } = props;
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Country Master"
      className="w-[85%] md:w-[50%]"
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
            id="CountryName"
            label="Country Name"
            name="CountryName"
            value={form.CountryName}
            onChange={handleInputChange}
            error={errors.CountryName}
            maxLength={100}
            onKeyPress={(e) => {
              if (!/^[A-Za-z\s]*$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="CountryCode"
            label="Country Code"
            name="CountryCode"
            value={form.CountryCode}
            onChange={handleInputChange}
            error={errors.CountryCode}
            // pattern="[A-Za-z]{2}"
            maxLength={3}
            onKeyPress={(e) => {
              if (!/^[A-Za-z]*$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Col>
        <Col>
          <Checkbox
            checked={form?.IsActive}
            title="Active"
            label="IsActive"
            onCheckedChange={(e) => {
              setForm((prev: any) => ({ ...prev, IsActive: !!e }));
            }}
            id="IsActive"
          />
        </Col>
      </Row>
    </CustomDialog>
  );
};

export default CountryForm;
