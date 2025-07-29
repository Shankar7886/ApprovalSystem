import Section from "@/components/common/Section";
import StateGrid from "./StateGrid";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import {
  addState,
  fetchStates,
  updateState,
} from "@/Store/features/Master/Location/State";
import ViewState from "./ViewStateModel";
import Loader from "@/components/common/Loader";
import StateForm from "./StateForm";
import { fetchCountry } from "@/Store/features/Master/Location/Country";
import { SaveStateAPI, UpdateStateAPI } from "@/services/Master/Location/api";
import { toast } from "sonner";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { MESSAGE } from "@/components/common/MessageList";
import { validateStateCode, validateStateName } from "@/utils/Constants";
type State = {
  ID: number;
  StateName: string;
  StateCode: string;
  CountryID: number;
  IsActive: boolean;
  IsDeleted: boolean | null;
};
const Index = () => {
  const [formVisible, setFormVisible] = useState(false);
  const { data: states, loading } = useAppSelector((state) => state.stateList);
  const { data: country } = useAppSelector((state) => state.countryList);
  const stateRef = useRef<GridComponent | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [error, setError] = useState<Record<string, string>>({});
  const [inProcess, setInProcess] = useState(false);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    StateName: "",
    StateCode: "",
    CountryID: "",
    IsActive: true,
  });
  const editSettings = {
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true,
    mode: "Batch",
  };
  const resetForm = () => {
    setForm({
      StateName: "",
      StateCode: "",
      CountryID: "",
      IsActive: true,
    });
    setError({});
    setInProcess(false);
  };

  const Validate = () => {
    let isValid: boolean = true;
    const errors: Record<string, string> = {};
    // if (form.StateName === "") {
    //   isValid = false;
    //   errors.StateName = "Please enter state name";
    // }
    // if (form.StateCode === "") {
    //   isValid = false;
    //   errors.StateCode = "Please enter state code";
    // }

    const StateNameError = validateStateName(form.StateName);
    if (StateNameError) {
      errors.StateName = StateNameError;
      isValid = false;
    }
    const StateCodeError = validateStateCode(form.StateCode);
    if (StateCodeError) {
      errors.StateCode = StateCodeError;
      isValid = false;
    }

    if (form.CountryID === "") {
      isValid = false;
      errors.CountryID = MESSAGE.COUNTRY_CODE_IS_REQUIRED;
    }
    setError(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const handleView = (e: any) => {
    if (e.commandColumn.buttonOption.cssClass.includes("e-view")) {
      setViewModel(true);
      setViewData(e.rowData);
    } else {
      setShowEdit(true);
    }
  };
  const handleSave = async (args: string) => {
    if (!Validate()) {
      return;
    }
    setInProcess(true);
    let CountryID = country.find(
      (x: any) => x.CountryName === form.CountryID
    ) as any;
    let payload = JSON.parse(
      JSON.stringify({ ...form, CountryID: CountryID?.ID })
    );
    const response = await SaveStateAPI(payload);
    if (response.IsSuccess) {
      toast.success(response.DisplayMessage, {
        duration: 2000,
        position: "top-right",
      });
      resetForm();
      let newRecord = response.Data as State;
      dispatch(addState(newRecord));
      const grid = stateRef.current;
      if (grid) {
        const currentData = grid.dataSource as State[];
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
    args === "submit" ? setFormVisible(false) : setFormVisible(true);
  };

  const handleUpdate = () => {
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          stateRef.current?.getBatchChanges() as {
            changedRecords?: State[];
          }
        )?.changedRecords || []
      )
    );
    if (changedRecords.length > 0) {
      changedRecords.forEach(async (val: State) => {
        const payload = JSON.parse(JSON.stringify({ ...val }));
        const response = await UpdateStateAPI(payload, val.ID);
        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          const item = states.find((x: any) => x.ID === val.ID);
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateState(updatedItem));
          }
        } else {
          toast.error(response.DisplayMessage, {
            duration: 2000,
            description: "Please try again.",
            position: "top-right",
          });
          stateRef.current?.refresh();
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
    states.length === 0 && dispatch(fetchStates());
    country.length === 0 && dispatch(fetchCountry());
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
          Add State
        </Button>
      </div>
      <div>
        <StateGrid
          gridRef={stateRef}
          dataSource={states}
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
      <StateForm
        form={form}
        setForm={setForm}
        open={formVisible}
        close={() => {
          resetForm();
          setFormVisible(false);
        }}
        handleChange={handleChange}
        handleSubmit={handleSave}
        countryList={country}
        errors={error}
        inProcess={inProcess}
      />
      <ViewState
        open={viewModel}
        closePopup={() => setViewModel(false)}
        data={ViewData}
      />
    </Section>
  );
};

export default Index;
