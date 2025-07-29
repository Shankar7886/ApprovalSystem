import { CustomDialog } from "@/components/common/customPopup";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
interface StateFormProps {
  open: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: any;
  setForm: (args: any) => void;
  handleSubmit: (args: string) => void;
  countryList: any;
  errors: Record<string, string>;
  inProcess: boolean;
}

const StateForm = (props: StateFormProps) => {
  const {
    open,
    form,
    handleChange,
    close,
    setForm,
    handleSubmit,
    countryList,
    errors,
    inProcess,
  } = props;
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add State"
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
            name="StateName"
            id="StateName"
            label="State Name"
            value={form.StateName}
            onChange={handleChange}
            error={errors.StateName}
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
            name="StateCode"
            id="StateCode"
            label="State Code"
            value={form.StateCode}
            onChange={handleChange}
            error={errors.StateCode}
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
            id={"Country"}
            options={countryList}
            placeholder="Select Country"
            value={form.CountryID}
            label="Country"
            fields={{ label: "CountryName", value: "CountryName" }}
            onChange={(e) => setForm({ ...form, CountryID: e })}
            error={errors.CountryID}
          />
        </Col>
        <Col>
          <Checkbox
            name="IsActive"
            id="IsActive"
            label="isActive"
            checked={form.IsActive}
            onCheckedChange={(e) => setForm({ ...form, IsActive: !!e })}
          />
        </Col>
      </Row>
    </CustomDialog>
  );
};

export default StateForm;
