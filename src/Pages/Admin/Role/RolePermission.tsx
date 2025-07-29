import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Eye, Pencil, Plus } from "lucide-react";
import { RoleFormUI } from "./RoleForm";
import { RoleDetailGrid } from "./RoleGrid";
import {useState } from "react";
import { Save } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs";
import { useAppSelector } from "@/Store/reduxhook";

interface RolePermissionProps {
  setPageType: (args: string) => void;
  pageType: string;
}
const RolePermission = ({ setPageType, pageType }: RolePermissionProps) => {
  const [currentMode, setCurrentMode] = useState<string>("View Mode");
  const { data: rolesList } = useAppSelector((state) => state.rolesList);
  const { data: menuList } = useAppSelector((state) => state.menuList);

  const [Form, setForm] = useState({
    RoleId: "",
    MenuId: "",
    IsActive: true,
  });
  const handleModeChange = (args: string) => {
    setCurrentMode(args);
  };
 
  return (
    <>
      <div className="block sm:flex justify-between items-center mb-4">
        <Tabs defaultValue={pageType}>
          <TabsList>
            <TabsTrigger
              value="rolePermission"
              className="cursor-pointer"
              onClick={() => setPageType("rolePermission")}
            >
              Role Permission
            </TabsTrigger>
            <TabsTrigger
              value="createRole"
              onClick={() => setPageType("createRole")}
              className="cursor-pointer"
            >
              Create Role
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Current Mode Indicator */}
          <div
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-white shadow-sm rounded-full cursor-pointer"
            style={{ background: "#6c757d" }}
          >
            <Eye className="w-4 h-4" />
            <span className="font-medium">{currentMode}</span>
          </div>

          {/* Add Button */}
          {currentMode !== "Add Mode" && (
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border-gray-300 shadow-sm hover:bg-gray-100 transition"
              onClick={() => handleModeChange("Add Mode")}
            >
              <Plus className="w-4 h-4" /> Add New Role
            </Button>
          )}

          {/* Edit Button */}
          {currentMode !== "Edit Mode" && (
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border-gray-300 shadow-sm hover:bg-gray-100 transition"
              onClick={() => handleModeChange("Edit Mode")}
            >
              <Pencil className="w-4 h-4" /> Edit Role
            </Button>
          )}

          {/* Reset Button */}
          {currentMode !== "View Mode" && (
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl shadow-sm transition"
              style={{ background: "#dc3545", color: "white" }}
              onClick={() => handleModeChange("View Mode")}
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
          )}

          {/* Save Button */}
          {currentMode !== "View Mode" && (
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border-green-600 text-green-700 shadow-sm hover:bg-green-50 transition"
              onClick={() => handleModeChange("View Mode")}
            >
              <Save className="w-4 h-4" /> Save
            </Button>
          )}
        </div>
      </div>

      <Section>
        <RoleFormUI
          currentMode={currentMode}
          rolesList={rolesList}
          menuList={menuList}
          showForm={Form}
          setShowForm={setForm}
        />
        <RoleDetailGrid />
      </Section>
    </>
  );
};

export default RolePermission;
