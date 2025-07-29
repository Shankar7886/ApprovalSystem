import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import CompanyGrid from "./CompanyGrid";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import {
  addCompany,
  fetchCompany,
  updateCompany,
} from "@/Store/features/Master/CompanyMaster";
import ViewCompanyModel from "./ViewCompanyModel";
import CompanyForm from "./CompanyForm";
import Loader from "@/components/common/Loader";
import {
  saveCompanyAPI,
  updateCompanyAPI,
} from "@/services/Master/Company/api";
import { toast } from "sonner";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { MESSAGE } from "@/components/common/MessageList";

const CompanyMaster = () => {
  const dispatch = useAppDispatch();
  const { data: companyList, loading } = useAppSelector(
    (state) => state.companyList
  );
  const companyRef = useRef<GridComponent>(null);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [formVisible, setFormVisible] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    CompanyName: "",
    DisplayName: "",
    LogoPath: "",
    RightsCompany: "",
    IsActive: true,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const resetForm = () => {
    setForm({
      CompanyName: "",
      DisplayName: "",
      LogoPath: "",
      RightsCompany: "",
      IsActive: true,
    });
    setError({});
    setInProcess(false);
  };
  const editSettings = {
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true,
    mode: "Batch",
  };
  const handleView = (e: any) => {
    if (e.commandColumn.buttonOption.cssClass.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
    } else {
      setShowEdit(true);
    }
  };
  const validate = () => {
    let isValid: boolean = true;
    const errors: Record<string, string> = {};
    if (form.CompanyName === "") {
      isValid = false;
      errors.CompanyName = MESSAGE.COMPANY_NAME_IS_REQUIRED;
    }
    if (form.DisplayName === "") {
      isValid = false;
      errors.DisplayName = MESSAGE.DISPLAY_NAME_IS_REQUIRED;
    }
    if (form.RightsCompany === "") {
      isValid = false;
      errors.RightsCompany = MESSAGE.RIGHTS_COMPANY_IS_REQUIRED;
    }
    if (form.LogoPath === "") {
      isValid = false;
      errors.LogoPath = MESSAGE.LOGO_PATH_IS_REQUIRED;
    }
    setError(errors);
    return isValid;
  };
  const handleSubmit = async (args: string) => {
    if (!validate()) {
      return;
    }
    setInProcess(true);
    let payload = JSON.parse(JSON.stringify(form));
    const response = await saveCompanyAPI(payload);
    if (response.IsSuccess) {
      toast.success(response.DisplayMessage, {
        duration: 2000,
        position: "top-right",
      });
      resetForm();
      let newRecord = response.Data as any;
      dispatch(addCompany(newRecord));
      const grid = companyRef.current;
      if (grid) {
        const currentData = grid.dataSource as any[];
        const updatedData = [...currentData, newRecord];
        grid.dataSource = updatedData;
        grid.refresh();
      }
    } else {
      toast.error(response.DisplayMessage, {
        duration: 2000,
        description: "Please try again.",
        position: "top-right",
      });
    }
    setInProcess(false);
    setShowEdit(false);
    args === "submit" ? setFormVisible(false) : setFormVisible(true);
  };
  const handleUpdate = () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          companyRef.current?.getBatchChanges() as {
            changedRecords?: any[];
          }
        )?.changedRecords || []
      )
    );
    if (changedRecords?.length > 0) {
      changedRecords.forEach(async (val: any) => {
        const payload = JSON.parse(JSON.stringify({ ...val }));
        const response = await updateCompanyAPI(payload, val.CompanyID);
        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          const item = companyList.find(
            (x: any) => x.CompanyID === val.CompanyID
          );
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateCompany(updatedItem));
            companyRef.current?.refresh();
          }
        } else {
          toast.error(response.DisplayMessage, {
            duration: 2000,
            description: "Please try again.",
            position: "top-right",
          });
          companyRef.current?.refresh();
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
  useEffect(() => {
    companyList.length === 0 && dispatch(fetchCompany());
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
          Add Company
        </Button>
      </div>
      <div>
        <CompanyGrid
          dataSource={companyList}
          handleView={handleView}
          editSettings={editSettings}
          gridRef={companyRef}
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
      <ViewCompanyModel
        closePopup={() => setViewModel(false)}
        open={viewModel}
        data={ViewData}
      />
      <CompanyForm
        form={form}
        setForm={setForm}
        open={formVisible}
        close={() => {
          resetForm();
          setFormVisible(false);
        }}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={error}
        inProcess={inProcess}
      />
    </Section>
  );
};

export default CompanyMaster;
