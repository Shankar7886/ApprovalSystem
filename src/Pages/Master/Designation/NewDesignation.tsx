import React from "react";
import { CustomDialog } from "@/components/common/customPopup";
import { Button } from "@/components/shadcn-ui/button";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { Designation } from "@/Store/features/Master/DesignationMaster";

interface NewDesignationProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: Designation;
  setForm: React.Dispatch<React.SetStateAction<Designation>>;
  formVisible: boolean;
  handleNewPopupClose: () => void;
  handleSubmit: (args: "next" | "submit") => void;
  isSubmitting: boolean;
  formErrors: Record<string, string>;
}

const NewDesignation = ({
  handleChange,
  form,
  setForm,
  formVisible,
  handleNewPopupClose,
  handleSubmit,
  isSubmitting,
  formErrors,
}: NewDesignationProps) => {
  return (
    <CustomDialog
      open={formVisible}
      onOpenChange={handleNewPopupClose}
      title="Add Designation"
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
              id="DesignationName"
              label="Designation Name"
              name="DesignationName"
              value={form.DesignationName}
              onChange={handleChange}
              error={formErrors.DesignationName || ""}
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
              id="DesignationCode"
              label="Designation Code"
              name="DesignationCode"
              value={form.DesignationCode}
              onChange={handleChange}
              error={formErrors.DesignationCode || ""}
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
export default NewDesignation;
