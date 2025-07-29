import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import CustomerGroupGrid from "./CustomerGroupGrid";
import CustomerGroupForm from "./CustomerGroupForm";
import { useState } from "react";
import { custromerGroupData } from "./temp";

export default function CustomerGroup() {
  const [form, setForm] = useState({
    GroupName: "",
    ParentGroupID: "",
    IsActive: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const resetForm = () => {
    setForm({
      GroupName: "",
      ParentGroupID: "",
      IsActive: true,
    });
    setError({});
    setInProcess(false);
  };
  const handleSubmit = (args: any) => {
    console.log(form, args);
    resetForm();
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
          Add Customer Group
        </Button>
      </div>
      <div>
        <CustomerGroupGrid dataSource={custromerGroupData} />
      </div>
      <CustomerGroupForm
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
