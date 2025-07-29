import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import {  useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import ViewApprovalGroup from "./ViewApprovalGroup";
import ApprovalGroupGrid from "./ApprovalGroupGrid";
import {
  addApprovalGroup,
  updateApprovalGroup,
} from "@/Store/features/Master/ApprovalGroup";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import ApprovalGroupForm from "./approvalGroupForm";
import {
  saveApprovalGroupAPI,
  UpdateApprovalGroupAPI,
} from "@/services/Master/ApprovalGroup/api";
import { toast } from "sonner";

const Index = () => {
  const [formVisible, setFormVisible] = useState(false);
  const approvalGroupRef = useRef<GridComponent>(null);
  const [viewModel, setViewModel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    GroupName: "",
    Description: "",
    IsActive: true,
  });
  const editSettings = {
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true,
    mode: "Batch",
  };
  const { data: approvalGroupList } = useAppSelector(
    (state) => state.approvalGroupList
  );
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleView = (e: any) => {
    if (e.commandColumn.buttonOption.cssClass.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
    } else {
      setShowEdit(true);
    }
  };
  const resetForm = () => {
    setForm({
      GroupName: "",
      Description: "",
      IsActive: true,
    });
    setError({});
    setInProcess(false);
  };
  const validate = () => {
    let isValid: boolean = true;
    const errors: Record<string, string> = {};
    if (form.GroupName === "") {
      isValid = false;
      errors.GroupName = "Please enter group name";
    }
    if (form.Description === "") {
      isValid = false;
      errors.Description = "Please enter description";
    }
    setError(errors);
    return isValid;
  };
  const handleSubmit = async (args: string) => {
    if (!validate()) {
      return;
    }
    setInProcess(true);
    const payload = JSON.parse(JSON.stringify(form));
    const response = await saveApprovalGroupAPI(payload);
    if (response.IsSuccess) {
      toast.success(response.DisplayMessage, {
        duration: 2000,
        position: "top-right",
      });
      resetForm();
      const grid = approvalGroupRef.current;
      let newRecord = response.Data as any;
      dispatch(addApprovalGroup(newRecord));
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
      setInProcess(false);
    }
    setShowEdit(false);
    args === "submit" ? setFormVisible(false) : setFormVisible(true);
  };
  const handleUpdate = () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          approvalGroupRef.current?.getBatchChanges() as {
            changedRecords?: any[];
          }
        )?.changedRecords || []
      )
    );
    if (changedRecords?.length > 0) {
      changedRecords.forEach(async (val: any) => {
        const payload = JSON.parse(JSON.stringify({ ...val }));
        const response = await UpdateApprovalGroupAPI(payload, val.ID);
        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          let item = approvalGroupList.find((item: any) => item.ID === val.ID);
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateApprovalGroup(updatedItem));
            approvalGroupRef.current?.refresh();
          }
        } else {
          toast.error(response.DisplayMessage, {
            duration: 2000,
            description: "Please try again.",
            position: "top-right",
          });
          approvalGroupRef.current?.refresh();
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

 

 
  return (
    <Section>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          className="newRecordButtonCSS"
          onClick={() => setFormVisible(true)}
        >
          <Plus />
          Add Approval Group
        </Button>
      </div>
      <div>
        <ApprovalGroupGrid
          gridRef={approvalGroupRef}
          dataSource={approvalGroupList}
          handleView={handleView}
          editSettings={editSettings}
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
      <ApprovalGroupForm
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
      <ViewApprovalGroup
        closePopup={() => setViewModel(false)}
        open={viewModel}
        data={ViewData}
      />
    </Section>
  );
};

export default Index;
