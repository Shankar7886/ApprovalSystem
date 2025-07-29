import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CustomerGroupGrid from "../CustomerGroup/CustomerGroupGrid";
import CustomerMasterForm from "./CustomerMasterForm";
import { CustomerMasterData } from "./temp";

export default function CustomerMaster() {
  const [form, setForm] = useState({
    Name: "",
    Alias: "",
    GroupName: "",
    City: "",
    State: "",
    Country: "",
    Pincode: "",
    Address: "",
    GstInRegistered: false,
    GstNo: "",
    PanNumber: "",
    ContactPersonName: "",
    MobileNo: "",
    Email: "",
    IsActive: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState({});
  const resetForm = () => {
    setForm({
      Name: "",
      Alias: "",
      GroupName: "",
      City: "",
      State: "",
      Country: "",
      Pincode: "",
      Address: "",
      GstInRegistered: false,
      GstNo: "",
      PanNumber: "",
      ContactPersonName: "",
      MobileNo: "",
      Email: "",
      IsActive: true,
    });
    setError({});
    setInProcess(false);
  };
  const handleSubmit = (args: any) => {
    console.log(form, args);
    resetForm();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
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
          Add Customer Master
        </Button>
      </div>
      <div>
        <CustomerGroupGrid dataSource={CustomerMasterData} />
      </div>

      <CustomerMasterForm
        form={form}
        setForm={setForm}
        open={formVisible}
        close={() => {
          setFormVisible(false);
          resetForm();
        }}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={error}
        inProcess={inProcess}
      />
    </Section>
  );
}
