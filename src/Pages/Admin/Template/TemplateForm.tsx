import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { Template } from "@/Store/features/AdminSetting/Template";
interface TemplateFormProps {
  formVisible: boolean;
  form: Template;
  setForm: React.Dispatch<React.SetStateAction<Template>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewPopupClose: () => void;
  handleSubmit?: (action: "next" | "submit") => void;
  isSubmitting: boolean;
  formErrors: Record<string, string>;
}
const TemplateForm = ({
  handleChange,
  form,
  setForm,
  formVisible,
  handleNewPopupClose,
  handleSubmit,
  isSubmitting,
  formErrors,
}: TemplateFormProps) => {
  return (
    <CustomDialog
      open={formVisible}
      onOpenChange={handleNewPopupClose}
      title="Add Item Master"
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            className="newRecordButtonCSS"
            onClick={() => handleSubmit?.("next")}
            disabled={isSubmitting}
          >
            Next
          </Button>
          <Button
            className="saveButtonCss"
            onClick={() => handleSubmit?.("submit")}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      }
    >
      <form>
        <Row className="items-center">
          <Col>
            <FloatingLabelInput
              id="TemplateName"
              label="Template Name"
              name="TemplateName"
              value={form.TemplateName}
              onChange={handleChange}
              error={formErrors.TemplateName || ""}
              maxLength={60}
              onKeyPress={(e) => {
                if (!/^[A-Za-z ]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Col>
          <Col>
            <FloatingLabelInput
              id="Description"
              label="Description"
              name="Description"
              value={form.Description}
              onChange={handleChange}
              error={formErrors.Description || ""}
              maxLength={250}
            />
          </Col>
          <Col>
            <Checkbox
              id="IsActive"
              checked={form.IsActive}
              label="IsActive"
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, IsActive: Boolean(checked) }))
              }
            />
          </Col>
        </Row>
      </form>
    </CustomDialog>
  );
};

export default TemplateForm;
