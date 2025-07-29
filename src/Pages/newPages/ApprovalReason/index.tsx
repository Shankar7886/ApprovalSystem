import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ApprovalReasonGrid from "./ApprovalReasonGrid";
import ApprovalReasonForm from "./ApprovalReasonForm";
import { ApprovalReasonData } from "./temp";

export default function ApprovalReason() {
  const [form, setForm] = useState({
    ApprovalReasonName: "",
    IsActive: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  // const [viewModel, setViewModel] = useState(false);
  // const [ViewData, setViewData] = useState({});
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const resetForm = () => {
    setForm({
      ApprovalReasonName: "",
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
          Add Approval Reason
        </Button>
      </div>
      <div>
        <ApprovalReasonGrid dataSource={ApprovalReasonData} />
      </div>
      <ApprovalReasonForm
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
