import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MenuGroupGrid from "./MenuGroupGrid";
import MenuGroupForm from "./MenuGroupForm";
import ViewMenuGroup from "./ViewMenuGroup";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import { fetchMenuGroupList } from "@/Store/features/AdminSetting/MenuGroup";
import {
  submitMenuGroupAPI,
  updateMenuGroupAPI,
} from "@/services/AdminSetting/MenuGroup/api";
import { toast } from "sonner";

const Index = () => {
  const [form, setForm] = useState({
    GroupName: "",
    DisplayOrder: 1,
    Icon: "",
    IsActive: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [error, setError] = useState<Record<string, string>>({});
  const [showEdit, setShowEdit] = useState(false);
  const menuGroupRef = useRef<any>(null);
  let editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Batch",
  };
  const dispatch = useAppDispatch();
  const { data: menuGroupList } = useAppSelector(
    (state) => state.menuGroupList
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const validate = () => {
    let errors: Record<string, string> = {};
    if (!form.GroupName) {
      errors.GroupName = "Group Name is required";
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
    let payload = JSON.parse(JSON.stringify(form));
    let response = await submitMenuGroupAPI(payload);
    if (response.IsSuccess) {
      resetForm();
      dispatch(fetchMenuGroupList());
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
      GroupName: "",
      DisplayOrder: 1,
      Icon: "",
      IsActive: true,
    });
    setError({});
    setInProcess(false);
  };

  const handleUpdate = () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          menuGroupRef.current?.getBatchChanges() as {
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

        const response = await updateMenuGroupAPI(payload, val.MenuGroupId);

        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          dispatch(fetchMenuGroupList());
        } else {
          toast.error(response.DisplayMessage, {
            duration: 2000,
            description: "Please try again.",
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

  const handleView = (e: any) => {
    if (e.commandColumn.buttonOption.cssClass.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
    }
  };
  useEffect(() => {
    menuGroupList.length === 0 && dispatch(fetchMenuGroupList());
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
          Add Menu Group
        </Button>
      </div>
      <div>
        <MenuGroupGrid
          dataSource={menuGroupList}
          gridRef={menuGroupRef}
          handleView={handleView}
          setShowEdit={setShowEdit}
          editSettings={editSettings}
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
        <MenuGroupForm
          open={formVisible}
          close={() => {
            setFormVisible(false);
            resetForm();
          }}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={error}
          inProcess={inProcess}
          setForm={setForm}
        />
      </div>
      <ViewMenuGroup
        open={viewModel}
        closePopup={() => {
          setViewModel(false);
          setViewData({});
        }}
        data={ViewData}
      />
    </Section>
  );
};

export default Index;
