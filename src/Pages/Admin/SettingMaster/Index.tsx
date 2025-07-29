import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import { toast } from "sonner";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import ViewSettingMaster from "./ViewSettingMaster";
import SettingMasterGrid from "./SettingMasterGrid";
import { SettingMasterForm } from "./SettingMasterForm";
import {
  fetchSettingMasterList,
  updateSettingRecord,
} from "@/Store/features/AdminSetting/SettingMaster";
import {
  submitSettingMasterAPI,
  updateSettingMasterAPI,
} from "@/services/AdminSetting/SettingMaster";
import Loader from "@/components/common/Loader";

type SettingMaster = {
  SettingId: number;
  SettingKey: string;
  SettingValue: string;
  SettingType: string;
  Application: string;
  IsActive: boolean;
};

const Index: React.FC = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<SettingMaster>({
    SettingId: 0,
    SettingKey: "",
    SettingValue: "",
    SettingType: "",
    Application: "",
    IsActive: true,
  });
  const dispatch = useAppDispatch();
  const { data: settingMasterList, loading } = useAppSelector(
    (state) => state.settingMasterList
  );

  // const toolbarOptions = ["Search", "ExcelExport"];
  const editSettings = {
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true,
    mode: "Batch",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleToolbarClick = (args: any) => {
    if (args.item.id === "unitmaster_id_excelexport") {
      gridRef.current?.excelExport();
    }
  };

  const handleView = (e: any) => {
    if (e?.commandColumn?.buttonOption?.cssClass?.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
    } else {
      setShowEdit(true);
    }
  };

  const handleNewPopupClose = () => {
    setFormVisible(false);
    handleReset();
    setFormErrors({});
  };

  const validateForm = () => {
    let isValid = true;
    const errors: Record<string, string> = {};

    if (!form.SettingKey) {
      errors.SettingKey = "Setting Key is required";
      isValid = false;
    }
    if (!form.SettingValue) {
      errors.SettingValue = "Setting Value is required";
      isValid = false;
    }
    if (!form.SettingType) {
      errors.SettingType = "Setting Type is required";
      isValid = false;
    }
    if (!form.Application) {
      errors.Application = "Application is required";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleReset = () => {
    setForm({
      SettingId: 0,
      SettingKey: "",
      SettingValue: "",
      SettingType: "",
      Application: "",
      IsActive: false,
    });
  };

  const handleSubmit = async (args: string) => {
    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await submitSettingMasterAPI(form);

        if (response?.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          dispatch(fetchSettingMasterList());
          handleReset();
          if (args === "submit") {
            handleNewPopupClose();
          }
        } else {
          toast.error(response?.DisplayMessage || "Submission failed", {
            duration: 2000,
            description: "Please try again.",
            position: "top-right",
          });
        }
      } catch (error) {
        toast.error("An error occurred", {
          duration: 2000,
          description: "Please try again.",
          position: "top-right",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleUpdate = () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          gridRef.current?.getBatchChanges() as {
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

        const response = await updateSettingMasterAPI(payload, val.SettingId);

        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          let item = settingMasterList.find(
            (item) => item.SettingId === val.SettingId
          );
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateSettingRecord(updatedItem));
          }
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
        description: "Please try again.",
        position: "top-right",
      });
    }

    setShowEdit(false);
  };

  useEffect(() => {
    dispatch(fetchSettingMasterList());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Section>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          className="newRecordButtonCSS"
          onClick={() => setFormVisible(true)}
        >
          <Plus />
          Add Setting Master
        </Button>
      </div>

      <SettingMasterGrid
        dataSource={settingMasterList}
        handleView={handleView}
        editSettings={editSettings}
        setShowEdit={setShowEdit}
        gridRef={gridRef}
        handleToolbarClick={handleToolbarClick}
        // toolbarOptions={toolbarOptions}
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

      <SettingMasterForm
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        formVisible={formVisible}
        handleNewPopupClose={handleNewPopupClose}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formErrors={formErrors}
      />

      <ViewSettingMaster
        closePopup={() => setViewModel(false)}
        open={viewModel}
        data={ViewData}
      />
    </Section>
  );
};

export default Index;
