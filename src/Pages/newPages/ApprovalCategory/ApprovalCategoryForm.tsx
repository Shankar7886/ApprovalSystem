import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface ApprovalCategoryFormProps {
  open: boolean;
  close: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
}
const ApprovalCategoryForm = ({
  open,
  close,
  form,
  setForm,
  handleChange,
  handleSubmit,
  errors,
  inProcess,
}: ApprovalCategoryFormProps) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Approval Category"
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
            id="CategoryName"
            label="Category Name"
            name="CategoryName"
            value={form.CategoryName}
            onChange={handleChange}
            error={errors.CategoryName}
          />
        </Col>
        <Col>
          <SingleSelectDropdownFloat
            id="ParentID"
            label="Parent Name"
            name="ParentID"
            value={form.ParentID}
            onChange={(e) => setForm({ ...form, ParentID: e })}
            error={errors.ParentID}
            fields={{
              label: "CategoryName",
              value: "CategoryID",
            }}
            options={[
              {
                CategoryName: "Parent 1",
                CategoryID: "1",
              },
              {
                CategoryName: "Parent 2",
                CategoryID: "2",
              },
            ]}
            placeholder="Select Parent"
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

export default ApprovalCategoryForm;
