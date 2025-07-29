import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ModeOfPaymentGrid from "./ModeOfPaymentGrid";
import ModeOfPaymentForm from "./ModeOfPaymentForm";
import { modeOfPaymentData } from "./temp";

export default function ModeofPayment() {
  const [form, setForm] = useState({
    ModeOfPayment: "",
    IsActive: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState({});
  const resetForm = () => {
    setForm({
      ModeOfPayment: "",
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
          Add Mode of Payment
        </Button>
      </div>
      <div>
        <ModeOfPaymentGrid dataSource={modeOfPaymentData} />
      </div>
      <ModeOfPaymentForm
        open={formVisible}
        close={() => setFormVisible(false)}
        form={form}
        setForm={setForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={error}
        inProcess={inProcess}
      />
    </Section>
  );
}
