import React from "react";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { FloatingLabelInput } from "@/components/common/InputComponent";
interface ShowFormType {
  RoleId: string;
  MenuId: string;
  IsActive: boolean;
}

interface RoleFormUIProps {
  currentMode: string;
  rolesList: any[];
  menuList: any[];
  showForm: ShowFormType;
  setShowForm: (showForm: ShowFormType) => void;
}

export const RoleFormUI: React.FC<RoleFormUIProps> = ({
  currentMode,
  rolesList,
  menuList,
  showForm,
  setShowForm,
}) => {
  // const roleList = [
  //   { label: "Admin", id: "1" },
  //   { label: "Distributor", id: "2" },
  //   { label: "Client", id: "3" },
  //   { label: "Tester", id: "4" },
  //   { label: "Developer", id: "5" },
  //   { label: "Customer", id: "6" },
  // ];

  return (
    <>
      <Row>
        <Col xl={3}>
          {currentMode === "Add Mode" ? (
            <FloatingLabelInput
              id="LogoPath"
              label="Role"
              name="Role"
              value={""}
              onChange={() => console.log("jkvj")}
              error={""}
            />
          ) : (
            <SingleSelectDropdownFloat
              options={rolesList || []}
              placeholder="Select Role"
              value={showForm.RoleId}
              onChange={(value) => setShowForm({ ...showForm, RoleId: value })}
              label="Role"
              fields={{ label: "RoleName", value: "RoleId" }}
              className="w-full"
              id="roleList"
              error={""}
            />
          )}
        </Col>
        <Col xl={3}>
          <SingleSelectDropdownFloat
            options={menuList || []}
            placeholder="Select Menu"
            value={showForm.MenuId}
            label="Menu"
            onChange={(value) => setShowForm({ ...showForm, MenuId: value })}
            fields={{ label: "MenuName", value: "MenuId" }}
            className="w-full"
            id="menuList"
            error={""}
          />
        </Col>
        <Col xl={3}>
          <div className="flex gap-2 items-center h-full">
            <Checkbox
              id="IsActive"
              checked={showForm.IsActive}
              label="isActive"
              onCheckedChange={(value) =>
                setShowForm({ ...showForm, IsActive: value === true })
              }
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
