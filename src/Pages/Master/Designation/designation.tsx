import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DesignationGrid from "./DesignationGrid";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import Loader from "@/components/common/Loader";
import {
  addDesignationRecord,
  fetchDesignationList,
  updateDesignationRecord,
} from "@/Store/features/Master/DesignationMaster";
import ViewDesignation from "./ViewDesignationModal";
import {
  submitDesignationMasterAPI,
  updateDesignationMasterAPI,
} from "@/services/Master/Designation/api";
import { toast } from "sonner";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import NewDesignation from "./NewDesignation";
import {
  validateDesignationCode,
  validateDesignationName,
} from "@/utils/Constants";

export interface Designation {
  ID: number;
  DesignationName: string;
  DesignationCode: string;
  IsActive: boolean;
  IsDeleted: boolean;
}
const Index = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    ID: 0,
    DesignationName: "",
    DesignationCode: "",
    IsActive: true,
    IsDeleted: false,
  });
  const dispatch = useAppDispatch();
  const { data: designationList, loading } = useAppSelector(
    (state) => state.designationList
  );

  const editSettings = {
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true,
    mode: "Batch",
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleToolbarClick = (args: any) => {
    if (args.item.id === "unitmaster_id_excelexport") {
      gridRef.current?.excelExport();
    }
  };
  const handleView = (e: any) => {
    if (e.commandColumn.buttonOption.cssClass.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
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

    const NameError = validateDesignationName(form.DesignationName);
    if (NameError) {
      errors.DesignationName = NameError;
      isValid = false;
    }

    const CodeError = validateDesignationCode(form.DesignationCode);
    if (CodeError) {
      errors.DesignationCode = CodeError;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  const handleReset = () => {
    setForm({
      ID: 0,
      DesignationName: "",
      DesignationCode: "",
      IsActive: false,
      IsDeleted: false,
    });
  };

  const handleSubmit = async (action: "next" | "submit") => {
    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await submitDesignationMasterAPI(form);

        if (response?.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          // dispatch(fetchDesignationList());
          handleReset();

          let newRecord = response.Data as Designation;
          const grid = gridRef.current;
          dispatch(addDesignationRecord(newRecord));
          if (grid) {
            const currentData = grid.dataSource as Designation[];
            const updatedData = [...currentData, newRecord];
            grid.dataSource = updatedData;
            grid.refresh();
          }
          if (action === "submit") {
            setFormVisible(false);
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
    type designationRecord = {
      ID: number;
      DesignationName: string;
      DesignationCode: string;
      IsActive: boolean;
    };

    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          gridRef.current?.getBatchChanges() as {
            changedRecords?: designationRecord[];
          }
        )?.changedRecords || []
      )
    );

    if (changedRecords.length > 0) {
      changedRecords.forEach(async (val: designationRecord) => {
        const payload = {
          ...val,
        };

        try {
          const response = await updateDesignationMasterAPI(payload, val.ID);
          if (response.IsSuccess) {
            toast.success(response.DisplayMessage, {
              duration: 2000,
              position: "top-right",
            });
            let item = designationList.find((item) => item.ID === val.ID);
            if (item) {
              let updatedItem = { ...item, ...val };
              dispatch(updateDesignationRecord(updatedItem));
            }
          } else {
            toast.error(response.DisplayMessage, {
              duration: 2000,
              description: "Please try again.",
              position: "top-right",
            });
          }
        } catch (error) {
          toast.error("API Error occurred.", {
            duration: 2000,
            description: "Please try again later.",
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
    dispatch(fetchDesignationList());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Section>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          className="newRecordButtonCSS"
          onClick={() => setFormVisible(true)}
        >
          <Plus />
          Add Designation
        </Button>
      </div>
      <DesignationGrid
        dataSource={designationList}
        handleView={handleView}
        editSettings={editSettings}
        setShowEdit={setShowEdit}
        gridRef={gridRef}
        handleToolbarClick={handleToolbarClick}
      />
      <NewDesignation
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        formVisible={formVisible}
        handleNewPopupClose={handleNewPopupClose}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formErrors={formErrors}
      />
      <ViewDesignation
        closePopup={() => setViewModel(false)}
        open={viewModel}
        data={ViewData}
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
    </Section>
  );
};

export default Index;
