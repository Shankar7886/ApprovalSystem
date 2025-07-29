import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import BankMasterGrid from "./BankMasterGrid";
import BankMasterForm from "./BankMasterForm";
import { BankMasterData } from "./temp";

export default function BankMaster() {
  const [form, setForm] = useState({
    BankName: "",
    Address: "",
    Branch: "",
    IFSC: "",
    SWIFT: "",
    IsActive: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState({});
  const resetForm = () => {
    setForm({
      BankName: "",
      Address: "",
      Branch: "",
      IFSC: "",
      SWIFT: "",
      IsActive: true,
    });
    setError({});
    setInProcess(false);
  };
  const handleSubmit = (args: any) => {
    console.log(form, args);
    resetForm();
  };
  const handleChange = (e: any) => {
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
          Add Bank Master
        </Button>
      </div>
      <div>
        <BankMasterGrid dataSource={BankMasterData} />
      </div>
      <BankMasterForm
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
