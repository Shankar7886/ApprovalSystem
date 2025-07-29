import { CustomDialog } from "@/components/common/customPopup";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";

interface CityFormProps {
  open: boolean;
  close: (visible: boolean) => void;
  form: any;
  setForm: (form: any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: any) => void;
  stateList: any;
  errors: Record<string, string>;
  inProcess: boolean;
}
const CityForm = (props: CityFormProps) => {
  const {
    open,
    close,
    form,
    setForm,
    handleChange,
    handleSubmit,
    stateList,
    errors,
    inProcess,
  } = props;
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add City"
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
            id="CityName"
            label="City Name"
            name="CityName"
            value={form.CityName}
            onChange={handleChange}
            error={errors.CityName}
            maxLength={100}
            onKeyPress={(e) => {
              if (!/^[A-Za-z ]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="CityCode"
            label="City Code"
            name="CityCode"
            value={form.CityCode}
            onChange={handleChange}
            error={errors.CityCode}
            maxLength={2}
            onKeyPress={(e) => {
              if (!/^[A-Za-z]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Col>
        <Col sm={3}>
          <SingleSelectDropdownFloat
            id={"StateList"}
            options={stateList}
            placeholder="Select State"
            value={form.StateID}
            label="State"
            fields={{ label: "StateName", value: "StateName" }}
            onChange={(e) => setForm({ ...form, StateID: e })}
            error={errors.StateID}
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

export default CityForm;
