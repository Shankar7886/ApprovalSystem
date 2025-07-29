import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import { toast } from "sonner";
import { MESSAGE } from "@/components/common/MessageList";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import ViewTemplate from "./ViewTemplate";
import TemplateForm from "./TemplateForm";
import TemplateGrid from "./TemplateGrid";
import {
  submitTemplateAPI,
  updateTemplateAPI,
} from "@/services/AdminSetting/Template";
import {
  addTemplateRecord,
  fetchTemplateList,
  Template,
  updateTemplateRecord,
} from "@/Store/features/AdminSetting/Template";
import Loader from "@/components/common/Loader";

export interface SettingMaster {
  TemplateId: number;
  TemplateName: string;
  Description: string;
  IsActive: boolean;
}

const Index: React.FC = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<SettingMaster>({
    TemplateId: 0,
    TemplateName: "",
    Description: "",
    IsActive: true,
  });
  const dispatch = useAppDispatch();
  const { data: templateList, loading } = useAppSelector(
    (state) => state.templateList
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

    if (!form.TemplateName) {
      errors.TemplateName = MESSAGE.TEMPLATE_IS_REQUIRED;
      isValid = false;
    }
    if (!form.Description) {
      errors.Description = MESSAGE.DESCRIPTION_IS_REQUIRED;
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleReset = () => {
    setForm({
      TemplateId: 0,
      TemplateName: "",
      Description: "",
      IsActive: true,
    });
  };

  const handleSubmit = async (args: string) => {
    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await submitTemplateAPI(form);

        if (response?.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          dispatch(fetchTemplateList());
          handleReset();
          let newRecord = response.Data as Template;
          const grid = gridRef.current;
          dispatch(addTemplateRecord(newRecord));
          if (grid) {
            const currentData = grid.dataSource as Template[];
            const updatedData = [...currentData, newRecord];
            grid.dataSource = updatedData;
            grid.refresh();
          }
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

        const response = await updateTemplateAPI(payload, val.TemplateId);

        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          let item = templateList.find(
            (item) => item.TemplateId === val.TemplateId
          );
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateTemplateRecord(updatedItem));
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
    dispatch(fetchTemplateList());
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
          Add Template
        </Button>
      </div>

      <TemplateGrid
        dataSource={templateList}
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

      <TemplateForm
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        formVisible={formVisible}
        handleNewPopupClose={handleNewPopupClose}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formErrors={formErrors}
      />

      <ViewTemplate
        closePopup={() => setViewModel(false)}
        open={viewModel}
        data={ViewData}
      />
    </Section>
  );
};

export default Index;
