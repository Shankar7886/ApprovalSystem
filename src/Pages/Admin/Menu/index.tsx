import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MenuGrid from "./MenuGrid";
import MenuForm from "./MenuForm";
import ViewMenuMaster from "./MenuView";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import { fetchFormMasterList } from "@/Store/features/AdminSetting/FormMaster";
import { fetchMenuGroupList } from "@/Store/features/AdminSetting/MenuGroup";
import { fetchMenuList } from "@/Store/features/AdminSetting/Menu";
import { saveMenuAPI, updateMenuAPI } from "@/services/AdminSetting/Menu/api";
import { toast } from "sonner";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { Regex } from "@/utils/Constants";

const Index = () => {
  const [form, setForm] = useState({
    MenuName: "",
    URL: "",
    Icon: "",
    ParentMenuId: "",
    MenuGroupId: "",
    DisplayOrder: 1,
    FormId: "",
    IsActive: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  const { data: FormMasterList } = useAppSelector(
    (state) => state.formMasterList
  );
  const { data: menuGroupList } = useAppSelector(
    (state) => state.menuGroupList
  );
  const { data: menuList } = useAppSelector((state) => state.menuList);
  const menuGridRef = useRef<GridComponent | null>(null);
  const [inProcess, setInProcess] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const validate = () => {
    let errors: Record<string, string> = {};
    if (!form.MenuName) {
      errors.MenuName = "Menu Name is required";
    }
    if (!form.URL) {
      errors.URL = "URL is required";
    } else {
      if (Regex.onlyLetters.test(form.URL) === false) {
        errors.URL = "URL must be in alphabets without space only.";
      }
    }

    if (!form.ParentMenuId) {
      errors.ParentMenuId = "Parent Menu is required";
    }
    if (!form.MenuGroupId) {
      errors.MenuGroupId = "Menu Group is required";
    }
    if (!form.FormId) {
      errors.FormId = "Form is required";
    }
    if (!form.DisplayOrder) {
      errors.DisplayOrder = "Display Order is required";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (args: string) => {
    if (!validate()) {
      return;
    }
    setInProcess(true);
    let response = await saveMenuAPI(form);
    if (response.IsSuccess) {
      resetForm();
      dispatch(fetchMenuList());
      toast.success(response.DisplayMessage, {
        position: "top-right",
      });
    } else {
      toast.error(response.DisplayMessage, {
        position: "top-right",
      });
    }
    setInProcess(false);
    args === "next" ? setFormVisible(true) : setFormVisible(false);
  };
  const resetForm = () => {
    setForm({
      MenuName: "",
      URL: "",
      Icon: "",
      ParentMenuId: "",
      MenuGroupId: "",
      DisplayOrder: 1,
      FormId: "",
      IsActive: true,
    });
    setError({});
    setFormVisible(false);
    setInProcess(false);
  };
  const handleView = (e: any) => {
    if (e.commandColumn.buttonOption.cssClass.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
    } else {
      setShowEdit(true);
    }
  };
  const handleUpdate = () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          menuGridRef.current?.getBatchChanges() as {
            changedRecords?: any[];
          }
        )?.changedRecords || []
      )
    );

    if (changedRecords.length > 0) {
      changedRecords.forEach(async (item: any) => {
        const payload = {
          ...item,
        };
        let response = await updateMenuAPI(payload, item.MenuId);
        if (response.IsSuccess) {
          dispatch(fetchMenuList());
          toast.success(response.DisplayMessage, {
            position: "top-right",
          });
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
    }
    setShowEdit(false);
  };
  useEffect(() => {
    FormMasterList.length === 0 && dispatch(fetchFormMasterList());
    menuGroupList.length === 0 && dispatch(fetchMenuGroupList());
    menuList.length === 0 && dispatch(fetchMenuList());
  }, [dispatch]);
  return (
    <Section>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          className="newRecordButtonCSS"
          onClick={() => setFormVisible(true)}
        >
          <Plus />
          Add Menu
        </Button>
      </div>
      <div>
        <MenuGrid
          gridRef={menuGridRef}
          handleView={handleView}
          dataSource={menuList}
          menuList={menuList}
          menuGroupList={menuGroupList}
          formMasterList={FormMasterList}
          editSettings={{
            allowAdding: true,
            allowDeleting: true,
            allowEditing: true,
            mode: "Batch",
          }}
          setShowEdit={setShowEdit}
        />
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
      </div>
      <div>
        <MenuForm
          open={formVisible}
          close={() => {
            setFormVisible(false);
            resetForm();
          }}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={error}
          inProcess={inProcess}
          FormMasterList={FormMasterList}
          menuGroupList={menuGroupList}
          menuList={menuList}
          setError={setError}
        />
      </div>
      <ViewMenuMaster
        closePopup={() => {
          setViewModel(false);
          setViewData({});
        }}
        open={viewModel}
        data={ViewData}
      />
    </Section>
  );
};

export default Index;
