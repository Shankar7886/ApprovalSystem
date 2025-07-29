import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import Loader from "@/components/common/Loader";
import ViewDepartment from "./ViewDepartment";
import DepartmentGrid from "./DepartmentGrid";
import {
  addDepartementRecord,
  fetchDepartmentList,
  updateDepartementRecord,
} from "@/Store/features/Master/DepartmentMaster";
import { NewDepartments } from "./NewDepartments";
import { toast } from "sonner";
import {
  submitDepartmentMasterAPI,
  updateDepartmentMasterAPI,
} from "@/services/Master/Department/api";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import {
  validateDepartemntName,
  validateDepartmentCode,
} from "@/utils/Constants";

type Department = {
  ID: number;
  DepartmentName: string;
  DepartmentCode: string;
  IsActive: boolean;
  // isDeleted: boolean;
};

const Index: React.FC = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<Department>({
    ID: 0,
    DepartmentName: "",
    DepartmentCode: "",
    IsActive: true,
    // isDeleted: false,
  });
  const dispatch = useAppDispatch();
  const { data: departmentList, loading } = useAppSelector(
    (state) => state.departmentList
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

    const NameError = validateDepartemntName(form.DepartmentName);
    if (NameError) {
      errors.DepartmentName = NameError;
      isValid = false;
    }

    const CodeError = validateDepartmentCode(form.DepartmentCode);
    if (CodeError) {
      errors.DepartmentCode = CodeError;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleReset = () => {
    setForm({
      ID: 0,
      DepartmentName: "",
      DepartmentCode: "",
      IsActive: true,
    });
  };

  const handleSubmit = async (action: "next" | "submit") => {
    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await submitDepartmentMasterAPI(form);

        if (response?.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });

          handleReset();
          let newRecord = response.Data as Department;
          const grid = gridRef.current;
          dispatch(addDepartementRecord(newRecord));
          if (grid) {
            // const newRecord = response.Data as ProjectLocation;
            const currentData = grid.dataSource as Department[];
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
    type department = {
      ID: number;
      DepartmentName: string;
      DepartmentCode: string;
      IsActive: boolean;
    };

    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          gridRef.current?.getBatchChanges() as {
            changedRecords?: department[];
          }
        )?.changedRecords || []
      )
    );

    if (changedRecords.length > 0) {
      changedRecords.forEach(async (val: department) => {
        const payload = JSON.parse(JSON.stringify({ ...val }));
        const response = await updateDepartmentMasterAPI(payload, val.ID);
        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          let item = departmentList.find((item) => item.ID === val.ID);
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateDepartementRecord(updatedItem));
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
    dispatch(fetchDepartmentList());
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
          Add Department
        </Button>
      </div>

      <div>
        <DepartmentGrid
          dataSource={departmentList}
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
      </div>

      <NewDepartments
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        formVisible={formVisible}
        handleNewPopupClose={handleNewPopupClose}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formErrors={formErrors}
      />

      <ViewDepartment
        closePopup={() => setViewModel(false)}
        open={viewModel}
        data={ViewData}
      />
    </Section>
  );
};

export default Index;
