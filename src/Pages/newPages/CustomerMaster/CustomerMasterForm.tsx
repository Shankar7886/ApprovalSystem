import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface CustomerMasterFormProps {
  open: boolean;
  close: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
}
const CustomerMasterForm = ({
  open,
  close,
  form,
  setForm,
  handleChange,
  handleSubmit,
  errors,
  inProcess,
}: CustomerMasterFormProps) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Customer Master"
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            className="newRecordButtonCSS"
            onClick={() => handleSubmit("next")}
            disabled={inProcess}
          >
            Next
          </Button>
          <Button
            className="saveButtonCss"
            onClick={() => handleSubmit("submit")}
            disabled={inProcess}
          >
            Submit
          </Button>
        </div>
      }
    >
      <Row className="">
        <Col>
          <FloatingLabelInput
            id="Name"
            label="Name"
            name="Name"
            value={form.Name}
            onChange={handleChange}
            error={errors.Name}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Alias"
            label="Alias"
            name="Alias"
            value={form.Alias}
            onChange={handleChange}
            error={errors.Alias}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="GroupName"
            label="Group Name"
            name="GroupName"
            value={form.GroupName}
            onChange={handleChange}
            error={errors.GroupName}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="City"
            label="City"
            name="City"
            value={form.City}
            onChange={handleChange}
            error={errors.City}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="State"
            label="State"
            name="State"
            value={form.State}
            onChange={handleChange}
            error={errors.State}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Country"
            label="Country"
            name="Country"
            value={form.Country}
            onChange={handleChange}
            error={errors.Country}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Pincode"
            label="Pincode"
            name="Pincode"
            value={form.Pincode}
            onChange={handleChange}
            error={errors.Pincode}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="GstNo"
            label="GST Number"
            name="GstNo"
            value={form.GstNo}
            onChange={handleChange}
            error={errors.GstNo}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="PanNumber"
            label="Pan Number"
            name="PanNumber"
            value={form.PanNumber}
            onChange={handleChange}
            error={errors.PanNumber}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="ContactPersonName"
            label="Contact Person Name"
            name="ContactPersonName"
            value={form.ContactPersonName}
            onChange={handleChange}
            error={errors.ContactPersonName}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="MobileNo"
            label="Mobile Number"
            name="MobileNo"
            value={form.MobileNo}
            onChange={handleChange}
            error={errors.MobileNo}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="Email"
            label="Email"
            name="Email"
            value={form.Email}
            onChange={handleChange}
            error={errors.Email}
          />
        </Col>

        <Col>
          <Checkbox
            id="GstInRegistered"
            checked={form.GstInRegistered}
            name="GstInRegistered"
            label="GST Registered"
            onCheckedChange={(e) => setForm({ ...form, GstInRegistered: !!e })}
          />
        </Col>
        <Col>
          <Checkbox
            id="IsActive"
            checked={form.IsActive}
            name="IsActive"
            label="IsActive"
            onCheckedChange={(e) => setForm({ ...form, IsActive: !!e })}
          />
        </Col>
      </Row>
    </CustomDialog>
  );
};

export default CustomerMasterForm;
