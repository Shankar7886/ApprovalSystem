import React from "react";
import { CustomDialog } from "@/components/common/customPopup";
import { Button } from "@/components/shadcn-ui/button";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { Department } from "@/Store/features/Master/DepartmentMaster";

interface NewDepartmentProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: Department;
  setForm: React.Dispatch<React.SetStateAction<Department>>;
  formVisible: boolean;
  handleNewPopupClose: () => void;
  handleSubmit: (args: "next" | "submit") => void;
  isSubmitting: boolean;
  formErrors: Record<string, string>;
}

export const NewDepartments: React.FC<NewDepartmentProps> = ({
  handleChange,
  form,
  setForm,
  formVisible,
  handleNewPopupClose,
  handleSubmit,
  isSubmitting,
  formErrors,
}) => {
  return (
    <CustomDialog
      open={formVisible}
      onOpenChange={handleNewPopupClose}
      title="Add Department"
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
            <FloatingLabelInput
              id="DepartmentName"
              label="Department Name"
              name="DepartmentName"
              value={form.DepartmentName}
              onChange={handleChange}
              error={formErrors.DepartmentName || ""}
              maxLength={45}
              onKeyPress={(e) => {
                if (!/^[A-Za-z ]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Col>
          <Col>
            <FloatingLabelInput
              id="DepartmentCode"
              label="Department Code"
              name="DepartmentCode"
              value={form.DepartmentCode}
              onChange={handleChange}
              error={formErrors.DepartmentCode || ""}
              maxLength={20}
              onKeyPress={(e) => {
                if (!/^[A-Za-z/0-9]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Col>
          <Col>
            <Checkbox
              id="IsActive"
              checked={form.IsActive}
              label="IsActive"
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, IsActive: !!checked }))
              }
            />
          </Col>
        </Row>
      </form>
    </CustomDialog>
  );
};
