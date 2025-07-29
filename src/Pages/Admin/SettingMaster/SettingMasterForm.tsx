import React from "react";
import { CustomDialog } from "@/components/common/customPopup";
import { Button } from "@/components/shadcn-ui/button";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { Label } from "@/components/shadcn-ui/label";
import { SettingMaster } from "@/Store/features/AdminSetting/SettingMaster";

interface NewSettingMasterProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: SettingMaster;
  setForm: React.Dispatch<React.SetStateAction<SettingMaster>>;
  formVisible: boolean;
  handleNewPopupClose: () => void;
  handleSubmit?: (action: "next" | "submit") => void;
  isSubmitting: boolean;
  formErrors: Record<string, string>;
}

export const SettingMasterForm: React.FC<NewSettingMasterProps> = ({
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
              id="SettingKey"
              label="Setting Key"
              name="SettingKey"
              value={form.SettingKey}
              onChange={handleChange}
              error={formErrors.SettingKey || ""}
            />
          </Col>
          <Col>
            <FloatingLabelInput
              id="SettingValue"
              label="Setting Value"
              name="SettingValue"
              value={form.SettingValue}
              onChange={handleChange}
              error={formErrors.SettingValue || ""}
            />
          </Col>
          <Col>
            <FloatingLabelInput
              id="SettingType"
              label="Setting Type"
              name="SettingType"
              value={form.SettingType}
              onChange={handleChange}
              error={formErrors.SettingType || ""}
            />
          </Col>
          <Col>
            <FloatingLabelInput
              id="Application"
              label="Application"
              name="Application"
              value={form.Application}
              onChange={handleChange}
              error={formErrors.Application || ""}
            />
          </Col>
          <Col>
            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id="IsActive"
                checked={form.IsActive}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, IsActive: Boolean(checked) }))
                }
              />
              <Label htmlFor="IsActive">Active</Label>
            </div>
          </Col>
        </Row>
      </form>
    </CustomDialog>
  );
};
