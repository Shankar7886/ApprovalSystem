import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/reduxhook";
import { toast } from "sonner";
import { MESSAGE } from "@/components/common/MessageList";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import ViewItemMaster from "./ViewItemMaster";
import ItemMasterForm from "./ItemMasterForm";
import ItemMasterGrid from "./ItemMasterGrid";
import {
  fetchItemMasterList,
  updateItemMasterRecord,
} from "@/Store/features/AdminSetting/ItemMaster";
import {
  submitItemMasterAPI,
  updateItemMasterAPI,
} from "@/services/AdminSetting/ItemMaster";
import Loader from "@/components/common/Loader";
import { fetchUnitOfMeasurementList } from "@/Store/features/Master/UOM";
import { validateItemName } from "@/utils/Constants";

type ItemMaster = {
  Id: number;
  ItemCode: string;
  ItemName: string;
  UnitOfMeasurementId: number;
  IsActive: boolean;
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
    Id: 0,
    ItemCode: "",
    ItemName: "",
    UnitOfMeasurementId: 0,
    IsActive: true,
  });
  const dispatch = useAppDispatch();
  const { data: itemMasterList, loading } = useAppSelector(
    (state) => state.itemMasterList
  );
  const { data: UnitOfMeasurementList } = useAppSelector(
    (state) => state.unitOfMeasurementList
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

    if (!form.ItemCode) {
      errors.ItemCode = MESSAGE.ITEM_CODE_IS_REQUIRED;
      isValid = false;
    }
    // if (!form.ItemName) {
    //   errors.ItemName = MESSAGE.ITEM_NAME_IS_REQUIRED;
    //   isValid = false;
    // }

    const NameError = validateItemName(form.ItemName);
    if (NameError) {
      errors.ItemName = NameError;
      isValid = false;
    }

    if (!form.UnitOfMeasurementId) {
      errors.UnitOfMeasurementId = MESSAGE.UNIT_OF_MEASUREMENT_IS_REQUIRED;
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleReset = () => {
    setForm({
      Id: 0,
      ItemCode: "",
      ItemName: "",
      UnitOfMeasurementId: 0,
      IsActive: false,
    });
  };

  const handleSubmit = async (args: string) => {
    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        let UnitOfMeasurementId = UnitOfMeasurementList.find(
          (x: any) => x.Name === form.UnitOfMeasurementId
        ) as any;
        let payload = JSON.parse(
          JSON.stringify({
            ...form,
            UnitOfMeasurementId: UnitOfMeasurementId?.Id,
          })
        );
        const response = await submitItemMasterAPI(payload);

        if (response?.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          dispatch(fetchItemMasterList());
          handleReset();
          if (args === "submit") {
            handleNewPopupClose();
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
    const changedRecords = JSON.parse(
      JSON.stringify(
        (
          gridRef.current?.getBatchChanges() as {
            changedRecords?: ItemMaster[];
          }
        )?.changedRecords || []
      )
    );

    if (changedRecords.length > 0) {
      changedRecords.forEach(async (val: ItemMaster) => {
        const payload = JSON.parse(JSON.stringify({ ...val }));

        const response = await updateItemMasterAPI(payload, val.Id);

        if (response.IsSuccess) {
          toast.success(response.DisplayMessage, {
            duration: 2000,
            position: "top-right",
          });
          let item = itemMasterList.find((item) => item.Id === val.Id);
          if (item) {
            let updatedItem = { ...item, ...val };
            dispatch(updateItemMasterRecord(updatedItem));
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
    if (UnitOfMeasurementList.length === 0) {
      dispatch(fetchUnitOfMeasurementList()).then(() =>
        gridRef.current?.refresh()
      );
    }
    if (itemMasterList.length === 0) {
      dispatch(fetchItemMasterList());
    }
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
          Add Item Master
        </Button>
      </div>

      <ItemMasterGrid
        dataSource={itemMasterList}
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

      <ItemMasterForm
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        formVisible={formVisible}
        handleNewPopupClose={handleNewPopupClose}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formErrors={formErrors}
        UnitOfMeasurementList={UnitOfMeasurementList}
      />

      <ViewItemMaster
        closePopup={() => setViewModel(false)}
        open={viewModel}
        data={ViewData}
      />
    </Section>
  );
};

export default Index;
