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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}
const MenuGroupForm = ({
  open,
  close,
  form,
  handleChange,
  handleSubmit,
  errors,
  inProcess,
  setForm,
}: CompanyFormProps) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Menu Group"
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
            name="GroupName"
            label="Group Name"
            value={form.GroupName}
            onChange={handleChange}
            error={errors.GroupName}
            required
          />
        </Col>
        <Col sm={3}>
          <FloatingLabelInput
            id="DisplayOrder"
            name="DisplayOrder"
            label="Display Order"
            value={form.DisplayOrder}
            onChange={handleChange}
            error={errors.DisplayOrder}
            required
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Icon"
            name="Icon"
            label="Icon"
            value={form.Icon}
            onChange={handleChange}
            error={errors.Icon}
            required
          />
        </Col>
        <Col>
          <Checkbox
            id="IsActive"
            name="IsActive"
            label="IsActive"
            checked={form.IsActive}
            onCheckedChange={(checked) =>
              setForm((prev: any) => ({ ...prev, IsActive: checked }))
            }
          />
        </Col>
      </Row>
    </CustomDialog>
  );
};

export default MenuGroupForm;
