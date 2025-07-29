import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface ProjectLocationFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: any;
  setForm: (args: any) => void;
  formVisible: boolean;
  handleNewPopupClose: () => void;
  handleSubmit: (args: "next" | "submit") => void;
  isSubmitting: boolean;
  formErrors: Record<string, string>;
  projectList: any;
}
const ProjectLocationForm = ({
  handleChange,
  form,
  setForm,
  formVisible,
  handleNewPopupClose,
  handleSubmit,
  isSubmitting,
  formErrors,
  projectList,
}: ProjectLocationFormProps) => {
  return (
    <CustomDialog
      open={formVisible}
      onOpenChange={handleNewPopupClose}
      title="Add Project Location"
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            className="newRecordButtonCSS"
            onClick={() => handleSubmit("next")}
            disabled={isSubmitting}
          >
            Next
          </Button>
          <Button
            className="saveButtonCss"
            onClick={() => handleSubmit("submit")}
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
            <SingleSelectDropdownFloat
              id={"ProjectID"}
              options={projectList}
              placeholder="Select Project"
              value={form.ProjectID}
              label="Project"
              fields={{ label: "ProjectName", value: "ProjectName" }}
              onChange={(e) => setForm({ ...form, ProjectID: e })}
              error={formErrors.ProjectID}
            />
          </Col>
          <Col>
            <FloatingLabelInput
              id="Location"
              label="Location"
              name="Location"
              value={form.Location}
              onChange={handleChange}
              error={formErrors.Location || ""}
              maxLength={50}
            />
          </Col>
          <Col>
            <Checkbox
              id="IsActive"
              label="IsActive"
              checked={form.IsActive}
              onCheckedChange={(e) => setForm({ ...form, IsActive: !!e })}
            />
          </Col>
        </Row>
      </form>
    </CustomDialog>
  );
};

export default ProjectLocationForm;
