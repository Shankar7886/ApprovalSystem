import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormMasterGrid from "./FormMasterGrid";
import FormMasterForm from "./FormMasterForm";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import { fetchFormMasterList } from "@/Store/features/AdminSetting/FormMaster";
import {
  saveFormMasterAPI,
  updateFormMasterAPI,
} from "@/services/AdminSetting/FormMaster";
import { toast } from "sonner";
import ViewFormMaster from "./ViewFormMaster";

const Index = () => {
  const [form, setForm] = useState({
    FormName: "",
    Description: "",
    IsVisible: true,
    Create: true,
    Alter: true,
    View: true,
    Approved: true,
    Reset: true,
    Import: true,
    Export: true,
    Delete: true,
    Print: true,
  });

  const [formVisible, setFormVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [inProcess, setInProcess] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [viewData, setViewData] = useState({});
  const dispatch = useAppDispatch();
  const { data: formMasterList } = useAppSelector(
    (state) => state.formMasterList
  );
  const formMasterRef = useRef<any>(null);
  let editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Batch",
  };
  const validate = () => {
    let error = {};
    if (form.FormName === "") {
      error = { ...error, FormName: "Form Name is required" };
    }
    if (form.Description === "") {
      error = { ...error, Description: "Description is required" };
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const resetForm = () => {
    setForm({
      FormName: "",
      Description: "",
      IsVisible: true,
      Create: true,
      Alter: true,
      View: true,
      Approved: true,
      Reset: true,
      Import: true,
      Export: true,
      Delete: true,
      Print: true,
    });
    setErrors({});
    setInProcess(false);
  };
  const handleSubmit = async (args: string) => {
    if (!validate()) {
      return;
    }
    setInProcess(true);
    let payload = JSON.parse(JSON.stringify(form));
    let response = await saveFormMasterAPI(payload);
    if (response.IsSuccess) {
      resetForm();
      dispatch(fetchFormMasterList());
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
  const handleUpdate = () => {
    const changedRecords =
      formMasterRef.current?.getBatchChanges()?.changedRecords;
    if (changedRecords.length > 0) {
      changedRecords.forEach(async (item: any) => {
        const payload = {
          ...item,
        };
        let response = await updateFormMasterAPI(payload, item.FormId);
        if (response.IsSuccess) {
          dispatch(fetchFormMasterList());
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

  const handleView = (e: any) => {
    if (e?.commandColumn?.buttonOption?.cssClass?.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
    } else {
      setShowEdit(true);
    }
  };

  useEffect(() => {
    formMasterList.length === 0 && dispatch(fetchFormMasterList());
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
          Add Form Master
        </Button>
      </div>
      <div>
        <FormMasterGrid
          dataSource={formMasterList}
          gridRef={formMasterRef}
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
              <Plus />
              Update Your Changes
            </Button>
          </div>
        )}
      </div>
      <div>
        <FormMasterForm
          form={form}
          open={formVisible}
          close={() => {
            setFormVisible(false);
            resetForm();
          }}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          inProcess={inProcess}
        />
      </div>
      <ViewFormMaster
        open={viewModel}
        closePopup={() => setViewModel(false)}
        data={viewData}
      />
    </Section>
  );
};

export default Index;
