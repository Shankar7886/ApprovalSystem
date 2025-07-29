import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ApprovalCategoryGrid from "./ApprovalCategoryGrid";
import ApprovalCategoryForm from "./ApprovalCategoryForm";
import { approvalCategoryData } from "./temp";

export default function ApprovalCatgeory() {
  const [form, setForm] = useState({
    CategoryName: "",
    ParentID: "",
    IsActive: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  // const [viewModel, setViewModel] = useState(false);
  // const [ViewData, setViewData] = useState({});
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState({});
  // const [showEdit, setShowEdit] = useState(false);
  // const dispatch = useAppDispatch();
  const resetForm = () => {
    setForm({
      CategoryName: "",
      ParentID: "",
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
          Add Approval Category
        </Button>
      </div>
      <div>
        <ApprovalCategoryGrid dataSource={approvalCategoryData} />
      </div>
      <ApprovalCategoryForm
        form={form}
        setForm={setForm}
        open={formVisible}
        close={() => {
          setFormVisible(false);
          resetForm();
        }}
        errors={error}
        inProcess={inProcess}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Section>
  );
}
