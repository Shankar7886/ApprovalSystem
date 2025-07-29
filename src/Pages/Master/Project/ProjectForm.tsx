import { CustomDialog } from "@/components/common/customPopup";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
// import { Project } from "@/Store/features/Master/Project";

interface ProjectFormProps {
  formVisible: boolean;
  // setFormVisible: (args: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: any;
  setForm: (args: any) => void;
  // form: Project;
  // setForm: React.Dispatch<React.SetStateAction<Project>>;
  handleSubmit: (args: any) => void;
  isSubmitting: boolean;
  handleNewPopupClose: () => void;
  formErrors: Record<string, string>;
  companyList: any;
}

const ProjectForm = (props: ProjectFormProps) => {
  const {
    handleChange,
    form,
    setForm,
    formVisible,
    handleNewPopupClose,
    handleSubmit,
    isSubmitting,
    formErrors,
    companyList,
  } = props;
  return (
    <CustomDialog
      open={formVisible}
      onOpenChange={handleNewPopupClose}
      title="Add Project"
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
              id={"CompanyId"}
              // name="companyId"
              options={companyList}
              placeholder="Select Company"
              value={form.CompanyId}
              label="Company"
              fields={{ label: "CompanyName", value: "CompanyName" }}
              onChange={(e) => setForm({ ...form, CompanyId: e })}
              error={formErrors.CompanyId || ""}
            />
          </Col>
          <Col>
            <FloatingLabelInput
              name="ProjectName"
              id="projectName"
              label="Project Name"
              value={form.ProjectName}
              onChange={handleChange}
              error={formErrors.ProjectName || ""}
              maxLength={50}
              onKeyPress={(e) => {
                if (!/^[A-Za-z/0-9 ]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Col>
          <Col>
            <FloatingLabelInput
              name="ProjectCode"
              id="ProjectCode"
              label="Project Code"
              value={form.ProjectCode}
              onChange={handleChange}
              error={formErrors.ProjectCode || ""}
              maxLength={50}
              onKeyPress={(e) => {
                if (!/^[A-Za-z0-9/ ]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Col>
          <Col>
            <Checkbox
              name="IsActive"
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

export default ProjectForm;
