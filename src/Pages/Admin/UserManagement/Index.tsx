import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import { Plus } from "lucide-react";
import { UserManagementGrid } from "./UserManagementGrid";
import { UserManagementFormUI } from "./UserManagementFormUI";
import {useState} from "react";

const Index = () => {

  const [showForm,setShowForm]=useState<boolean>(false);

  const handleOff =()=>{
    setShowForm(false)
  }
  return (
    <>
      <div className="flex justify-end mb-2">
        <Button variant="outline" className="newRecordButtonCSS"onClick={()=>setShowForm(true)}>
          <Plus /> Add User
        </Button>
      </div>
      <Section>
       <UserManagementGrid/>
       <UserManagementFormUI showForm={showForm} setShowForm={handleOff}/>
      </Section>
    </>
  );
};

export default Index;
