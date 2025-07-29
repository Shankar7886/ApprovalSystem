import Section from "@/components/common/Section";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import Loader from "@/components/common/Loader";
import { toast } from "sonner";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import ViewProject from "./viewProjects";
import ProjectForm from "./ProjectForm";
import ProjectGrid from "./ProjectGrid";
import {
  addProjectRecord,
  fetchProjectList,
  updateProjectRecord,
} from "@/Store/features/Master/Project";
import {
  submitProjectMasterAPI,
  updateProjectMasterAPI,
} from "@/services/Master/Project";
import { fetchCompany } from "@/Store/features/Master/CompanyMaster";
import { MESSAGE } from "@/components/common/MessageList";
import { validateProjectName } from "@/utils/Constants";
type Project = {
  Id: number;
  CompanyId: string;
  ProjectName: string;
  ProjectCode: string;
  IsActive: boolean;
  IsDeleted: boolean | null;
};
const ProjectMaster = () => {
  const [formVisible, setFormVisible] = useState(false);
  const { data: project, loading } = useAppSelector(
    (state) => state.projectList
  );
  const { data: company } = useAppSelector((state) => state.companyList);
  const gridRef = useRef<GridComponent | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    // Id: 0,
    CompanyId: "",
    ProjectName: "",
    ProjectCode: "",
    IsActive: true,
    isDeleted: false,
  });
  const editSettings = {
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true,
    mode: "Batch",
  };
  const handleReset = () => {
    setForm({
      // Id: 0,
      CompanyId: "",
      ProjectName: "",
      ProjectCode: "",
      IsActive: false,
      isDeleted: false,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors: Record<string, string> = {};

    if (!form.CompanyId) {
      errors.CompanyId = MESSAGE.SELECT_COMPANY;
      isValid = false;
    }

    const projectNameError = validateProjectName(form.ProjectName);
    if (projectNameError) {
      errors.ProjectName = projectNameError;
      isValid = false;
    }

    if (!form.ProjectCode) {
      errors.ProjectCode = MESSAGE.PROJECT_CODE_IS_REQUIRED;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
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
    } else {
      setShowEdit(true);
    }
  };

  const handleNewPopupClose = () => {
    setFormVisible(false);
    handleReset();
    setFormErrors({});
  };

  const handleSubmit = async (action: "next" | "submit") => {
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const companyObj = company.find(
        (x: any) => x.CompanyName === form.CompanyId
      );

      const payload = [
        {
          ...form,
          CompanyId: companyObj?.CompanyID,
        },
      ];

      const response = await submitProjectMasterAPI(payload);

      if (response.IsSuccess) {
        toast.success(response.DisplayMessage, {
          duration: 2000,
          position: "top-right",
        });

        handleReset();

        let newRecord = response.Data as Project;
        const grid = gridRef.current;
        dispatch(addProjectRecord(newRecord));
        if (grid) {
          const currentData = grid.dataSource as Project[];
          const updatedData = [...currentData, newRecord];
          grid.dataSource = updatedData;
          grid.refresh();
        }

        if (action === "submit") {
          setFormVisible(false);
        }
      } else {
        toast.error(response.DisplayMessage || "Submission failed", {
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
  };

  const handleUpdate = () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          gridRef.current?.getBatchChanges() as {
            changedRecords?: Project[];
          }
        )?.changedRecords || []
      )
    );
    if (changedRecords.length > 0) {
      changedRecords.forEach(async (val: any) => {
        const payload = JSON.parse(JSON.stringify({ ...val }));
        // const payload = JSON.parse(JSON.stringify({ ...val, IsActive: true }));
        const response = await updateProjectMasterAPI(payload, val.Id);
        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          let item = project.find((item) => item.Id === val.Id);
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateProjectRecord(updatedItem));
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
      toast.error("No Record to Update", {
        duration: 2000,
        description: "Please try again.",
        position: "top-right",
      });
    }
    setShowEdit(false);
  };

  // useEffect(() => {
  //   company.length === 0 && dispatch(fetchCompany());
  //   project.length === 0 && dispatch(fetchProjectList());
  // }, [dispatch]);
  useEffect(() => {
    if (company.length === 0) {
      dispatch(fetchCompany()).then(() => gridRef.current?.refresh());
    }
    if (project.length === 0) {
      dispatch(fetchProjectList());
    }
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
          Add Project
        </Button>
      </div>
      <ProjectGrid
        gridRef={gridRef}
        dataSource={project}
        editSettings={editSettings}
        handleView={handleView}
        setShowEdit={setShowEdit}
        handleToolbarClick={handleToolbarClick}
      />
      <ProjectForm
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        formVisible={formVisible}
        handleNewPopupClose={handleNewPopupClose}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formErrors={formErrors}
        companyList={company}
      />
      <ViewProject
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

export default ProjectMaster;
