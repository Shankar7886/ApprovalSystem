import Section from "@/components/common/Section";
import { Plus, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import RoleCompGrid from "./RoleCompGrid";
import {  useRef, useState } from "react";
import Row from "@/components/common/Row";
import Col from "@/components/common/Col";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import { fetchRolesList } from "@/Store/features/AdminSetting/Roles";
import {
  saveRolesAdmin,
  updateRolesAdmin,
} from "@/services/AdminSetting/Roles";
import { toast } from "sonner";
import { GridComponent } from "@syncfusion/ej2-react-grids";
interface rolesProps {
  setPageType: (args: string) => void;
  pageType: string;
}
export default function Role({ pageType, setPageType }: rolesProps) {
  const [form, setForm] = useState({
    RoleName: "",
    Description: "",
    IsActive: true,
  });
  const [error, setError] = useState<Record<string, string>>({});
  const [formVisible, setFormVisible] = useState(false);
  const { data: rolesList } = useAppSelector((state) => state.rolesList);
  // const [inProcess, setInProcess] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const RoleGridRef = useRef<GridComponent>(null);

  const dispatch = useAppDispatch();
  let editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Batch",
  };
  const handleChange = (e: any) => {
    const { name, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name == "IsActive" ? checked : value,
    }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const handleReset = () => {
    setForm({
      RoleName: "",
      Description: "",
      IsActive: true,
    });
    setFormVisible(false);
    setViewData({});
    console.log(ViewData)
    setViewModel(false);
    setShowEdit(false);
    console.log(viewModel)
  };
  const validate = () => {
    let errors: Record<string, string> = {};
    if (!form.RoleName) {
      errors.RoleName = "Role Name is required";
    }
    if (!form.Description) {
      errors.Description = "Description is required";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };
  const handleView = (e: any) => {
    if (e.commandColumn.buttonOption.cssClass.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
    }
  };
  const handleUpdate = () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          RoleGridRef.current?.getBatchChanges() as {
            changedRecords?: any[];
          }
        )?.changedRecords || []
      )
    );
    if (changedRecords.length > 0) {
      changedRecords.forEach(async (val: any) => {
        const payload = {
          ...val,
        };
        const response = await updateRolesAdmin(payload, val.RoleId);
        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            position: "top-right",
          });
          dispatch(fetchRolesList());
          handleReset();
        } else {
          toast.error(response.DisplayMessage, {
            position: "top-right",
          });
        }
      });
    } else {
      toast.error("No Changes Found To Process", {
        duration: 2000,
        position: "top-right",
      });
      setShowEdit(false);
    }
  };
  const handleSave = async () => {
    if (!validate()) {
      return;
    }
    let response = await saveRolesAdmin(form);
    if (response.IsSuccess) {
      toast.success(response.DisplayMessage, {
        position: "top-right",
      });
      dispatch(fetchRolesList());
      handleReset();
    } else {
      toast.error(response.DisplayMessage, {
        position: "top-right",
      });
    }
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
              className="cursor-pointer"
              onClick={() => setPageType("createRole")}
            >
              Create Role
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border-gray-300 shadow-sm hover:bg-gray-100 transition"
            onClick={() => setFormVisible(true)}
          >
            <Plus className="w-4 h-4" /> Add New Role
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl shadow-sm transition"
            style={{ background: "#dc3545", color: "white" }}
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border-green-600 text-green-700 shadow-sm hover:bg-green-50 transition"
            onClick={handleSave}
          >
            <Save className="w-4 h-4" /> Save
          </Button>
        </div>
      </div>
      <Section>
        {formVisible && (
          <Row>
            <Col>
              <FloatingLabelInput
                id="RoleName"
                label="Role Name"
                name="RoleName"
                value={form.RoleName}
                onChange={handleChange}
                error={error.RoleName}
              />
            </Col>
            <Col>
              <FloatingLabelInput
                id="Description"
                label="Description"
                name="Description"
                value={form.Description}
                onChange={handleChange}
                error={error.Description}
              />
            </Col>
            <Col>
              <Checkbox
                label="IsActive"
                checked={form.IsActive}
                onCheckedChange={(e) =>
                  handleChange({ target: { name: "IsActive", checked: e } })
                }
              />
            </Col>
          </Row>
        )}
        {/* {loading && <div>Loading...</div>} */}
        {/* {!loading && ( */}
        <RoleCompGrid
          dataSource={rolesList}
          gridRef={RoleGridRef}
          handleView={handleView}
          setShowEdit={setShowEdit}
          editSettings={editSettings}
        />
        {/* )} */}
        {showEdit && (
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              className="saveButtonCss"
              onClick={() => handleUpdate()}
            >
              <Save />
              Update Your Changes
            </Button>
          </div>
        )}
      </Section>
    </>
  );
}
