import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import MultiSelect from "@/components/common/MultiSelect";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import React from "react";
interface UserManagementProps {
  showForm: boolean;
  setShowForm: () => void;
}

export const UserManagementFormUI: React.FC<UserManagementProps> = ({
  showForm,
  setShowForm,
}) => {
  return (
    <>
      <CustomDialog
        key="userManagementUiDialgKey"
        open={showForm}
        onOpenChange={() => setShowForm()}
        title="Enter User Details"
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              className="newRecordButtonCSS"
              onClick={() => console.log("next")}
            >
              Next
            </Button>
            <Button
              className="saveButtonCss"
              onClick={() => console.log("submit")}
            >
              Submit
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 ">
          <div className="bg-white max-h-[400px] overflow-y-auto">
            <Row>
              <Col xl={4}>
                <FloatingLabelInput
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  // value={formFields.firstName}
                  // onChange={(e) => onFieldChange("firstName")(e.target.value)}
                  // error={formErrors.firstName || ""}
                />
              </Col>
              <Col xl={4}>
                <FloatingLabelInput
                  id="firstName"
                  label="User Name"
                  name="firstName"
                  // value={formFields.firstName}
                  // onChange={(e) => onFieldChange("firstName")(e.target.value)}
                  // error={formErrors.firstName || ""}
                />
              </Col>
              <Col xl={4}>
                <FloatingLabelInput
                  id="firstName"
                  label="Password"
                  name="firstName"
                  // value={formFields.firstName}
                  // onChange={(e) => onFieldChange("firstName")(e.target.value)}
                  // error={formErrors.firstName || ""}
                />
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <MultiSelect
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "HR", value: "HR" },
                    { label: "Client", value: "Client" },
                  ]}
                  key={"roleUserManaKey"}
                  placeholder="Roles"
                />
              </Col>

              <Col xl={3}>
                <div className="flex gap-2 items-center h-full">
                  <Checkbox id="IsActive" checked={true} label="isAuthorized" />
                </div>
              </Col>
              <Col xl={3}>
                <div className="flex gap-2 items-center h-full">
                  <Checkbox id="IsActive" checked={true} label="isActive" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </CustomDialog>
    </>
  );
};
