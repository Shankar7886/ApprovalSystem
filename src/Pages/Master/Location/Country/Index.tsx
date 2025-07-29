import Section from "@/components/common/Section";
import {  useRef, useState } from "react";
import CountryGrid from "./CountryGrid";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import ViewCountry from "./ViewCountryModel";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import {
  addCountry,
  
  updateCountry,
} from "@/Store/features/Master/Location/Country";

import { GridComponent } from "@syncfusion/ej2-react-grids";
import { saveCountry, UpdateCountryAPI } from "@/services/Master/Location/api";
import { toast } from "sonner";
import CountryForm from "./CountryForm";
import { validateCountryCode, validateCountryName } from "@/utils/Constants";

const CountryMaster = () => {
  const [form, setForm] = useState({
    CountryName: "",
    CountryCode: "",
    IsActive: true,
  });
  const CountryGridRef = useRef<GridComponent | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const { data: countryList } = useAppSelector(
    (state) => state.countryList
  );
  const [formVisible, setFormVisible] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [ViewData, setViewData] = useState({});
  const [inProcess, setInProcess] = useState(false);
  const editSettings = {
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true,
    mode: "Batch",
  };
  const formReset = () => {
    setForm({
      CountryName: "",
      CountryCode: "",
      IsActive: true,
    });
    setError({});
    setInProcess(false);
  };
  const validate = () => {
    let isValid: boolean = true;
    const errors: Record<string, string> = {};

    const CountryNameError = validateCountryName(form.CountryName);
    if (CountryNameError) {
      errors.CountryName = CountryNameError;
      isValid = false;
    }

    const CountryCodeError = validateCountryCode(form.CountryCode);
    if (CountryCodeError) {
      errors.CountryCode = CountryCodeError;
      isValid = false;
    }

    setError(errors);
    return isValid;
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSave = async (args: any) => {
    type Country = {
      ID: number;
      CountryName: string;
      CountryCode: string;
      IsActive: boolean;
      IsDeleted: boolean | null;
    };
    if (!validate()) {
      return;
    }
    setInProcess(true);
    let payload = JSON.parse(JSON.stringify({ ...form }));
    const response = await saveCountry(payload);
    if (response.IsSuccess) {
      toast.success(response.DisplayMessage, {
        duration: 2000,
        position: "top-right",
      });
      let newRecord = response.Data as Country;
      const grid = CountryGridRef.current;
      dispatch(addCountry(newRecord));
      if (grid) {
        const currentData = grid.dataSource as Country[];
        const updatedData = [...currentData, newRecord];
        grid.dataSource = updatedData;
        grid.refresh();
      }
      formReset();
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
    type Country = {
      ID: number;
      CountryName: string;
      CountryCode: string;
      IsActive: boolean;
    };
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          CountryGridRef.current?.getBatchChanges() as {
            changedRecords?: Country[];
          }
        )?.changedRecords || []
      )
    );

    if (changedRecords.length > 0) {
      changedRecords.forEach(async (val: Country) => {
        const payload = {
          CountryName: val.CountryName,
          CountryCode: val.CountryCode,
          IsActive: val.IsActive,
        };
        try {
          const response = await UpdateCountryAPI(payload, val.ID);
          if (response.IsSuccess) {
            toast.success(response.DisplayMessage, {
              duration: 2000,
              position: "top-right",
            });
            let item = countryList.find((item) =>
              item.ID === val.ID ? { ...item, ...val } : null
            );
            if (item) {
              let updatedItem = { ...item, ...val };
              dispatch(updateCountry(updatedItem));
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
          CountryGridRef.current?.refresh();
        }
      });
    } else {
      toast.error("No record to update", {
        duration: 2000,
        description: "Please try again later.",
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
          Add Country
        </Button>
      </div>
      <div>
        <CountryGrid
          gridRef={CountryGridRef}
          dataSource={countryList}
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
      <CountryForm
        form={form}
        setForm={setForm}
        open={formVisible}
        close={() => {
          formReset();
          setFormVisible(false);
        }}
        handleInputChange={handleInputChange}
        handleSubmit={handleSave}
        errors={error}
        inProcess={inProcess}
      />
      <ViewCountry
        open={viewModel}
        data={ViewData}
        closePopup={() => setViewModel(false)}
      />
    </Section>
  );
};

export default CountryMaster;
