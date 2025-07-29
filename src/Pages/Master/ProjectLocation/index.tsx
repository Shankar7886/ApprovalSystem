import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProjectLocationForm from "./ProjectLocationForm";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import {
  addProjectLocation,
  fetchProjectLocationList,
  updateProjectLocationRecord,
  // ProjectLocation,
} from "@/Store/features/Master/ProjectLocation";
import Loader from "@/components/common/Loader";
import ProjectLocationGrid from "./ProjectLocationGrid";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { MESSAGE } from "@/components/common/MessageList";
import {
  submitProjectLocationMasterAPI,
  updateProjectLocationMasterAPI,
} from "@/services/Master/ProjectLocation/api";
import { toast } from "sonner";
import ViewProjectLocation from "./ViewProjectLocation";
import { fetchProjectList } from "@/Store/features/Master/Project";

type ProjectLocation = {
  ID: number;
  ProjectID: number;
  Location: string;
  IsActive: boolean;
  IsDeleted: boolean | null;
};

const Index: React.FC = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    ProjectID: "",
    Location: "",
    IsActive: true,
    IsDeleted: false,
  });
  const dispatch = useAppDispatch();
  const { data: ProjectLocation, loading } = useAppSelector(
    (state) => state.projectLocationList
  );
  const { data: project } = useAppSelector((state) => state.projectList);

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

    if (!form.Location) {
      errors.Location = MESSAGE.LOCATION_IS_REQUIRED;
      isValid = false;
    }

    if (!form.ProjectID) {
      errors.ProjectID = MESSAGE.SELECT_PROJECT;
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleReset = () => {
    setForm({
      ProjectID: "",
      Location: "",
      IsActive: true,
      IsDeleted: false,
    });
  };

  const handleSubmit = async (action: "next" | "submit") => {
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const projectidObj = project.find(
        (x: any) => x.ProjectName === form.ProjectID
      ) as any;

      const payload = JSON.parse(
        JSON.stringify({ ...form, ProjectID: projectidObj?.Id })
      );

      const response = await submitProjectLocationMasterAPI(payload);

      if (response?.IsSuccess) {
        toast.success(response.DisplayMessage, {
          duration: 2000,
          position: "top-right",
        });

        handleReset();

        let newRecord = response.Data as ProjectLocation;
        const grid = gridRef.current;
        dispatch(addProjectLocation(newRecord));
        if (grid) {
          // const newRecord = response.Data as ProjectLocation;
          const currentData = grid.dataSource as ProjectLocation[];
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
  };

  const handleUpdate = async () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          gridRef.current?.getBatchChanges() as {
            changedRecords?: ProjectLocation[];
          }
        )?.changedRecords || []
      )
    );

    if (changedRecords.length > 0) {
      for (const val of changedRecords) {
        const payload = JSON.parse(JSON.stringify({ ...val }));
        const response = await updateProjectLocationMasterAPI(payload, val.ID);
        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });

          let item = ProjectLocation.find((item) => item.ID === val.ID);
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateProjectLocationRecord(updatedItem));
          }
        } else {
          toast.error(response.DisplayMessage, {
            duration: 2000,
            description: "Please try again.",
            position: "top-right",
          });
        }
      }
    } else {
      toast.error("API Error occurred", {
        duration: 2000,
        description: "Please try again.",
        position: "top-right",
      });
    }
    setShowEdit(false);
  };

  useEffect(() => {
    project.length === 0 && dispatch(fetchProjectList());
    ProjectLocation.length === 0 &&
      dispatch(fetchProjectLocationList()).then(() =>
        gridRef.current?.refresh()
      );
  }, [dispatch]);

  // useEffect(() => {
  //   if (project.length === 0) {
  //     dispatch(fetchProjectList());
  //   }
  //   if (ProjectLocation.length === 0) {
  //     dispatch(fetchProjectLocationList());
  //   }
  // }, [dispatch]);

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
          Add Project Location
        </Button>
      </div>
      <ProjectLocationGrid
        dataSource={ProjectLocation}
        handleView={handleView}
        editSettings={editSettings}
        setShowEdit={setShowEdit}
        gridRef={gridRef}
        handleToolbarClick={handleToolbarClick}
      />
      <ProjectLocationForm
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        formVisible={formVisible}
        handleNewPopupClose={handleNewPopupClose}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formErrors={formErrors}
        projectList={project}
      />
      <ViewProjectLocation
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
