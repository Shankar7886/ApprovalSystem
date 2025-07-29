import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
// import { ItemMaster } from "@/Store/features/AdminSetting/ItemMaster";
interface ItemMasterFormProps {
  formVisible: boolean;
  // form: ItemMaster;
  // setForm: React.Dispatch<React.SetStateAction<ItemMaster>>;
  form: any;
  setForm: (args: any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewPopupClose: () => void;
  handleSubmit?: (action: "next" | "submit") => void;
  isSubmitting: boolean;
  formErrors: Record<string, string>;
  UnitOfMeasurementList: any;
}
const ItemMasterForm = ({
  handleChange,
  form,
  setForm,
  formVisible,
  handleNewPopupClose,
  handleSubmit,
  isSubmitting,
  formErrors,
  UnitOfMeasurementList,
}: ItemMasterFormProps) => {
  return (
    <CustomDialog
      open={formVisible}
      onOpenChange={handleNewPopupClose}
      title="Add Item Master"
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            className="newRecordButtonCSS"
            onClick={() => handleSubmit?.("next")}
            disabled={isSubmitting}
          >
            Next
          </Button>
          <Button
            className="saveButtonCss"
            onClick={() => handleSubmit?.("submit")}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      }
    >
      <form>
        <Row className="items-center">
          <Col>
            <FloatingLabelInput
              id="ItemCode"
              label="Item Code"
              name="ItemCode"
              value={form.ItemCode}
              onChange={handleChange}
              error={formErrors.ItemCode || ""}
            />
          </Col>
          <Col>
            <FloatingLabelInput
              id="ItemName"
              label="Item Name"
              name="ItemName"
              value={form.ItemName}
              onChange={handleChange}
              error={formErrors.ItemName || ""}
            />
          </Col>
          <Col>
            <SingleSelectDropdownFloat
              id={"UnitOfMeasurementId"}
              options={UnitOfMeasurementList}
              placeholder="Select Unit Of Measurement"
              value={form.UnitOfMeasurementId}
              label="Unit Of Measurement"
              fields={{ label: "Name", value: "Name" }}
              onChange={(e) => setForm({ ...form, UnitOfMeasurementId: e })}
              error={formErrors.UnitOfMeasurementId || ""}
            />
          </Col>
          <Col>
            <Checkbox
              id="IsActive"
              checked={form.IsActive}
              label="IsActive"
              onCheckedChange={(e) => setForm({ ...form, IsActive: !!e })}
            />
          </Col>
        </Row>
      </form>
    </CustomDialog>
  );
};

export default ItemMasterForm;
