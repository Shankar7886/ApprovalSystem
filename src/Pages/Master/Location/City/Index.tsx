import Section from "@/components/common/Section";
import CityGrid from "./CityGrid";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import {
  addCity,
  fetchCities,
  updateCity,
} from "@/Store/features/Master/Location/City";
import ViewCity from "./ViewCityModel";
import Loader from "@/components/common/Loader";
import CityForm from "./CityForm";
import { fetchStates } from "@/Store/features/Master/Location/State";
import { SaveCityAPI, UpdateCityAPI } from "@/services/Master/Location/api";
import { toast } from "sonner";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { MESSAGE } from "@/components/common/MessageList";
import { validateCityName } from "@/utils/Constants";

const Index = () => {
  const cityRef = useRef<GridComponent | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const [inProcess, setInProcess] = useState(false);
  const [form, setForm] = useState({
    CityName: "",
    CityCode: "",
    StateID: "",
    IsActive: true,
  });
  const editSettings = {
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true,
    mode: "Batch",
  };
  const { data: cityList, loading } = useAppSelector((state) => state.cityList);
  const { data: stateList } = useAppSelector((state) => state.stateList);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const resetForm = () => {
    setForm({
      CityName: "",
      CityCode: "",
      StateID: "",
      IsActive: true,
    });
    setError({});
    setInProcess(false);
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

    const CityNameError = validateCityName(form.CityName);
    if (CityNameError) {
      errors.CityName = CityNameError;
      isValid = false;
    }
    const CityCodeError = validateCityName(form.CityCode);
    if (CityCodeError) {
      errors.CityCode = CityCodeError;
      isValid = false;
    }

    if (form.StateID === "") {
      isValid = false;
      errors.StateID = MESSAGE.STATE_IS_REQUIRED;
    }
    setError(errors);
    return isValid;
  };
  const handleSave = async (args: string) => {
    if (!validate()) {
      return;
    }
    setInProcess(true);
    let stateId = stateList.find((x: any) => x.StateName === form.StateID);
    let payload = JSON.parse(JSON.stringify({ ...form, StateID: stateId?.ID }));
    const response = await SaveCityAPI(payload);
    if (response.IsSuccess) {
      toast.success(response.DisplayMessage, {
        duration: 2000,
        position: "top-right",
      });
      let newRecord = response.Data as any;
      newRecord && dispatch(addCity(newRecord));
      resetForm();
      const grid = cityRef.current;
      if (grid) {
        let newRecord = response.Data as any;
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
          cityRef.current?.getBatchChanges() as {
            changedRecords?: any[];
          }
        )?.changedRecords || []
      )
    );
    if (changedRecords?.length > 0) {
      changedRecords.forEach(async (val: any) => {
        const payload = JSON.parse(JSON.stringify({ ...val }));
        const response = await UpdateCityAPI(payload, val.ID);
        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          const item = cityList.find((x: any) => x.ID === val.ID);
          if (item) {
            let selectedState = stateList.find(
              (x: any) => x.ID === val.StateID
            );
            let updatedItem = {
              ...item,
              ...val,
              StateName: selectedState?.StateName,
            };
            dispatch(updateCity(updatedItem));
          }
        } else {
          toast.error(response.DisplayMessage, {
            duration: 2000,
            description: "Please try again.",
            position: "top-right",
          });
          // cityRef.current?.refresh();
        }
      });
    } else {
      toast.error("No Record to Update", {
        duration: 2000,
        position: "top-right",
      });
    }
    setShowEdit(false);
  };

  useEffect(() => {
    cityList.length === 0 && dispatch(fetchCities());
    stateList.length === 0 && dispatch(fetchStates());
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
          Add City
        </Button>
      </div>
      <div>
        <CityGrid
          gridRef={cityRef}
          dataSource={cityList}
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
      <CityForm
        form={form}
        setForm={setForm}
        open={formVisible}
        close={() => {
          resetForm();
          setFormVisible(false);
        }}
        handleChange={handleChange}
        handleSubmit={handleSave}
        stateList={stateList}
        errors={error}
        inProcess={inProcess}
      />
      <ViewCity
        closePopup={() => setViewModel(false)}
        open={viewModel}
        data={ViewData}
      />
    </Section>
  );
};

export default Index;
