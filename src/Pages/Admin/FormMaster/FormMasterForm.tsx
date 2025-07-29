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
  handleChange: (e: any) => void;
  handleSubmit: (form: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
}

const toggleKeys = [
  "IsVisible",
  "Create",
  "Alter",
  "View",
  "Approved",
  "Reset",
  "Import",
  "Export",
  "Delete",
];
const FormMasterForm = ({
  open,
  close,
  form,
  handleChange,
  handleSubmit,
  errors,
  inProcess,
}: CompanyFormProps) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Form Master"
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
            id="FormName"
            label="Form Name"
            name="FormName"
            value={form.FormName}
            onChange={handleChange}
            error={errors.FormName}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Description"
            label="Description"
            name="Description"
            value={form.Description}
            onChange={handleChange}
            error={errors.Description}
          />
        </Col>
      </Row>

      <Row>
        {toggleKeys.map((key) => (
          <Col key={key}>
            <Checkbox
              id={key}
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              checked={form[key]}
              // checked={toggles[key] || false}
              // onCheckedChange={(checked) =>
              //   handleChange({
              //     target: {
              //       name: key,
              //       type: "checkbox",
              //       checked: checked,
              //     },
              //   } as React.ChangeEvent<HTMLInputElement>)
              // }
              onCheckedChange={(checked) =>
                handleChange({
                  target: { name: key, value: checked },
                })
              }
            />
          </Col>
        ))}
      </Row>
    </CustomDialog>
  );
};

export default FormMasterForm;
