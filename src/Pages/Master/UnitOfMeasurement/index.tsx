import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import UOMGrid from "./UomGrid";
import { useEffect, useRef, useState } from "react";
import UOMForm from "./UOMForm";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import {
  addUnitOfMeasurement,
  fetchUnitOfMeasurementList,
  updateUnitOfMeasurement,
} from "@/Store/features/Master/UOM";
import {
  saveUnitOfMeasurementAPI,
  updateUnitOfMeasurementAPI,
} from "@/services/Master/UOM/api";
import { toast } from "sonner";
import ViewUOM from "./ViewUOM";
import { validateUomCode, validateUomName } from "@/utils/Constants";

const Index = () => {
  const [form, setForm] = useState({
    UomCode: "",
    Name: "",
    IsActive: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState({});
  const UOMGridRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [viewModel, setViewModel] = useState(false);
  const [viewData, setViewData] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const { data: unitOfMeasurementList } = useAppSelector(
    (state) => state.unitOfMeasurementList
  );
  const editSettings = {
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true,
    mode: "Batch",
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const resetForm = () => {
    setForm({
      UomCode: "",
      Name: "",
      IsActive: true,
    });
    setError({});
  };
  const validate = () => {
    let isValid = true;
    const newError: any = {};
    // if (!form.UomCode) {
    //   newError.UomCode = MESSAGE.UOM_CODE_IS_REQUIRED;
    //   isValid = false;
    // }
    // if (!form.Name) {
    //   newError.Name = MESSAGE.UOM_NAME_IS_REQUIRED;
    //   isValid = false;
    // }

    const UOMCodeError = validateUomCode(form.UomCode);
    if (UOMCodeError) {
      newError.UomCode = UOMCodeError;
      isValid = false;
    }

    const UOMNameError = validateUomName(form.Name);
    if (UOMNameError) {
      newError.Name = UOMNameError;
      isValid = false;
    }

    setError(newError);
    return isValid;
  };
  const handleView = (e: any) => {
    if (e.commandColumn.buttonOption.cssClass.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
    }
  };

  const handleSubmit = async (args: any) => {
    if (!validate()) {
      return;
    }
    setInProcess(true);
    const payload = JSON.parse(JSON.stringify(form));
    const response = await saveUnitOfMeasurementAPI(payload);
    if (response.IsSuccess) {
      toast.success(response.DisplayMessage, {
        duration: 2000,
        position: "top-right",
      });
      resetForm();
      const newRecord = response.Data;
      dispatch(addUnitOfMeasurement(newRecord));
      const grid = UOMGridRef.current;
      if (grid) {
        const currentData = grid.dataSource;
        const updatedData = [...currentData, newRecord];
        grid.dataSource = updatedData;
        grid.refresh();
      }
    } else {
      toast.error(response.Message, {
        duration: 2000,
        position: "top-right",
      });
    }
    setInProcess(false);
    args === "submit" ? setFormVisible(false) : setFormVisible(true);
  };
  const handleUpdate = () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          UOMGridRef.current?.getBatchChanges() as {
            changedRecords?: any[];
          }
        )?.changedRecords || []
      )
    );
    if (changedRecords.length > 0) {
      changedRecords.forEach(async (val: any) => {
        const payload = JSON.parse(JSON.stringify({ ...val }));
        const response = await updateUnitOfMeasurementAPI(payload, val.Id);
        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          const item = unitOfMeasurementList.find((x: any) => x.Id === val.Id);
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateUnitOfMeasurement(updatedItem));
            UOMGridRef.current?.refresh();
          }
        } else {
          toast.error(response.DisplayMessage, {
            duration: 2000,
            description: "Please try again.",
            position: "top-right",
          });
          UOMGridRef.current?.refresh();
        }
      });
    } else {
      toast.error("No changes to update", {
        duration: 2000,
        position: "top-right",
      });
    }
    setShowEdit(false);
  };

  useEffect(() => {
    unitOfMeasurementList.length === 0 &&
      dispatch(fetchUnitOfMeasurementList());
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
          Add unit of measurement
        </Button>
      </div>
      <div>
        <UOMGrid
          dataSource={unitOfMeasurementList}
          gridRef={UOMGridRef}
          editSettings={editSettings}
          handleView={handleView}
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
      <UOMForm
        form={form}
        setForm={setForm}
        formVisible={formVisible}
        setFormVisible={() => {
          setFormVisible(false);
          resetForm();
        }}
        handleChange={handleChange}
        error={error}
        handleSubmit={handleSubmit}
        inProcess={inProcess}
      />
      <ViewUOM
        closePopup={() => setViewModel(false)}
        open={viewModel}
        data={viewData}
      />
    </Section>
  );
};

export default Index;
