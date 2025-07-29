import React, { useMemo, useCallback } from "react";
import { CustomDialog } from "@/components/common/customPopup";
import { Button } from "@/components/shadcn-ui/button";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { DatePickerFloatLabel } from "@/components/common/currentDatePicker";
import { useAppSelector } from "@/Store/reduxhook";
import { EmployeeFormData } from "./index";

interface NewEmployeeProps {
  handleChange: (args:any) => void;
  formFields: EmployeeFormData;
  openNewPopup: boolean;
  handleNewPopupClose: () => void;
  handleSubmit:  (action: "submit" | "next") => void;
  formErrors: Record<string, string>;
}

 const NewEmployeePopup: React.FC<NewEmployeeProps> = React.memo(({
  handleChange,
  formFields,
  openNewPopup,
  handleNewPopupClose,
  handleSubmit,
  formErrors,
}) => {
  const designationList = useAppSelector(
    (state) => state.employeeList.designationlist
  );
  const departmentList = useAppSelector(
    (state) => state.employeeList.departmentList
  );

  const genderOptions = useMemo(() => [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ], []);

  const onFieldChange = useCallback(
    (name: string) => (value: any) => handleChange({ name, value }),
    [handleChange]
  );

  return (
    <CustomDialog
    key="employeeDEtailsId"
      open={openNewPopup}
      onOpenChange={handleNewPopupClose}
      title="Enter Employee Details"
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button className="newRecordButtonCSS" onClick={() => handleSubmit("next")}>
            Next
          </Button>
          <Button className="saveButtonCss" onClick={() => handleSubmit("submit")}>
            Submit
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white max-h-[400px] overflow-y-auto">
          <div className="flex items-center w-full mb-4">
            <span className="text-gray-700 font-medium text-sm mr-3 whitespace-nowrap">
              Personal Details
            </span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <Row>
            <Col xl={3}>
              <FloatingLabelInput
                id="firstName"
                label="First Name"
                name="firstName"
                value={formFields.firstName}
                onChange={(e) => onFieldChange("firstName")(e.target.value)}
                error={formErrors.firstName || ""}
              />
            </Col>
            <Col xl={3}>
              <FloatingLabelInput
                id="lastName"
                label="Last Name"
                name="lastName"
                value={formFields.lastName}
                onChange={(e) => onFieldChange("lastName")(e.target.value)}
                error={formErrors.lastName || ""}
              />
            </Col>
            <Col xl={3}>
              <FloatingLabelInput
                id="employeeCode"
                label="Employee Code"
                name="employeeCode"
                value={formFields.employeeCode}
                onChange={(e) => onFieldChange("employeeCode")(e.target.value)}
                error={formErrors.employeeCode || ""}
              />
            </Col>
            <Col xl={3}>
              <SingleSelectDropdownFloat
                id="gender"
                options={genderOptions}
                placeholder="Select Gender"
                value={formFields.gender}
                label="Gender"
                fields={{ label: "label", value: "value" }}
                onChange={onFieldChange("gender")}
                className="w-full"
                error={formErrors.gender || ""}
              />
            </Col>
          </Row>

          <Row>
            <Col xl={3}>
              <DatePickerFloatLabel
                value={formFields.dob}
                onChange={onFieldChange("dob")}
                maxDate={new Date()}
                label="DOB"
                clearable
                id="dob"
                error={formErrors.dob || ""}
              />
            </Col>
            <Col xl={3}>
              <DatePickerFloatLabel
                value={formFields.doj}
                onChange={onFieldChange("doj")}
                maxDate={new Date()}
                label="Date Of Joining"
                clearable
                id="doj"
                error={formErrors.doj || ""}
              />
            </Col>
            <Col xl={3}>
              <SingleSelectDropdownFloat
                options={designationList || []}
                placeholder="Select Designation"
                value={formFields.designationID}
                label="Designation"
                fields={{ label: "DesignationName", value: "ID" }}
                onChange={onFieldChange("designationID")}
                className="w-full"
                id="designationID"
                error={formErrors.designationID || ""}
              />
            </Col>
            <Col xl={3}>
              <SingleSelectDropdownFloat
                options={departmentList || []}
                placeholder="Select Department"
                value={formFields.departmentID}
                label="Department"
                fields={{ label: "DepartmentName", value: "ID" }}
                onChange={onFieldChange("departmentID")}
                className="w-full"
                id="departmentID"
                error={formErrors.departmentID || ""}
              />
            </Col>
          </Row>
        </div>
      </div>
    </CustomDialog>
  );
});


export default NewEmployeePopup;
