import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface CustomerGroupFormProps {
  open: boolean;
  close: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
}
const CustomerGroupForm = ({
  open,
  close,
  form,
  setForm,
  handleChange,
  handleSubmit,
  errors,
  inProcess,
}: CustomerGroupFormProps) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Customer Group"
      size="md"
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
            id="GroupName"
            label="Group Name"
            name="GroupName"
            value={form.GroupName}
            onChange={handleChange}
            error={errors.GroupName}
          />
        </Col>
        <Col>
          <SingleSelectDropdownFloat
            id="ParentGroupID"
            label="Parent Group"
            options={[
              { GroupID: "1", GroupName: "Group 1" },
              { GroupID: "2", GroupName: "Group 2" },
            ]}
            fields={{
              value: "GroupID",
              label: "GroupName",
            }}
            name="ParentGroupID"
            value={form.ParentGroupID}
            onChange={(e) => setForm({ ...form, ParentGroupID: e })}
            error={errors.ParentGroupID}
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

export default CustomerGroupForm;
