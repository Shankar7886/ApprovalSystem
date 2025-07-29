import Col from "@/components/common/Col";
import { CustomDialog } from "@/components/common/customPopup";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { FloatingLabelInput } from "@/components/common/InputComponent";
import Row from "@/components/common/Row";
import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
interface CompanyFormProps {
  open: boolean;
  close: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: any) => void;
  errors: Record<string, string>;
  inProcess: boolean;
  FormMasterList: { FormId: number; FormName: string }[];
  menuGroupList: { MenuGroupId: number; GroupName: string }[];
  menuList: { MenuId: number; MenuName: string }[];
  setError: React.Dispatch<React.SetStateAction<any>>;
}
const MenuForm = ({
  open,
  close,
  form,
  setForm,
  handleChange,
  handleSubmit,
  errors,
  inProcess,
  FormMasterList,
  menuGroupList,
  menuList,
  setError,
}: CompanyFormProps) => {
  return (
    <CustomDialog
      open={open}
      onOpenChange={close}
      title="Add Menu"
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
            id="MenuName"
            label="Menu Name"
            name="MenuName"
            value={form.MenuName}
            onChange={handleChange}
            error={errors.MenuName}
          />
        </Col>
        <Col>
          <FloatingLabelInput
            id="URL"
            label="Menu URL"
            name="URL"
            value={form.URL}
            onChange={handleChange}
            error={errors.URL}
          />
        </Col>
        {/* <Col>
          <FloatingLabelInput
            id="Icon"
            label="Menu Icon"
            name="Icon"
            value={form.Icon}
            onChange={handleChange}
            error={errors.Icon}
          />
        </Col> */}
        <Col>
          <SingleSelectDropdownFloat
            id="FormId"
            label="Form ID"
            name="FormId"
            value={form.FormId}
            onChange={(value) => {
              setForm((prev: any) => ({ ...prev, FormId: value }));
              setError((prev: any) => ({ ...prev, FormId: "" }));
            }}
            error={errors.FormId}
            options={FormMasterList}
            placeholder="Select Form Form ID"
            fields={{
              label: "FormName",
              value: "FormId",
            }}
          />
        </Col>
        <Col>
          <SingleSelectDropdownFloat
            id="ParentMenuId"
            label="Parent Menu"
            name="ParentMenuId"
            value={form.ParentMenuId}
            onChange={(value) => {
              setForm((prev: any) => ({ ...prev, ParentMenuId: value }));
              setError((prev: any) => ({ ...prev, ParentMenuId: "" }));
            }}
            error={errors.ParentMenuId}
            options={menuList}
            placeholder="Select Parent Menu ID"
            fields={{
              label: "MenuName",
              value: "MenuId",
            }}
          />
        </Col>
        <Col>
          <SingleSelectDropdownFloat
            className="w-full"
            id="MenuGroupId"
            label="Menu Group"
            name="MenuGroupId"
            value={form.MenuGroupId}
            onChange={(value) => {
              setForm((prev: any) => ({ ...prev, MenuGroupId: value }));
              setError((prev: any) => ({ ...prev, MenuGroupId: "" }));
            }}
            error={errors.MenuGroupId}
            options={menuGroupList}
            placeholder="Select Menu Group"
            fields={{
              label: "GroupName",
              value: "MenuGroupId",
            }}
          />
          {/* <FloatingLabelInput
            id="FormMenuGroupID"
            label="Form Menu Group ID"
            name="FormMenuGroupID"
            value={form.FormMenuGroupID}
            onChange={handleChange}
            error={errors.FormMenuGroupID}
          /> */}
        </Col>
        <Col>
          <FloatingLabelInput
            id="DisplayOrder"
            label="Display Order"
            name="DisplayOrder"
            value={form.DisplayOrder}
            onChange={handleChange}
            error={errors.DisplayOrder}
          />
        </Col>
        <Col>
          <Checkbox
            id="IsActive"
            name="IsActive"
            label="IsActive"
            checked={form.IsActive}
            onCheckedChange={(checked) =>
              setForm((prev: any) => ({ ...prev, IsActive: checked }))
            }
          />
        </Col>
      </Row>
    </CustomDialog>
  );
};

export default MenuForm;
