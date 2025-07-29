import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EmployeeCard from "./EmployeeCard";
import DropZone from "./DropZone";
import { DepartmentListFake } from "./Fake";
import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn-ui/accordion";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { generateShade, hexToHSL } from "@/utils/randomColor";
import ViewHierarchy from "./ViewHierarchy";
import SaveHierarchy from "./SaveHierarchy";

export type Employee = {
  id: string;
  name: string;
  dept: string;
  empcode: string;
  ismandatory: boolean;
};

export type DragItem = {
  type: "EMPLOYEE";
  employee: Employee;
  fromLevel: number;
};

const EmployeeHierarchyPage: React.FC = () => {
  const [hierarchyLevel, setHierarchyLevel] = useState<number>(3);
  const [departmentments, setDepartments] = useState(DepartmentListFake);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [SaveModelVisible, setSaveModelVisible] = useState(false);
  const [hierarchyName, setHierarchyName] = useState<string>("");
  const [View, setView] = useState<boolean>(false);
  type SavedHierarchyItem = {
    name: string;
    hierarchy: { employees: Employee[]; level: string }[];
  };
  const [savedHierarchy, setSavedHierarchy] = useState<SavedHierarchyItem[]>(
    []
  );
  const [hierarchyData, setHierarchyData] = useState<Employee[][]>(
    Array.from({ length: 10 }, () => [])
  );
  const levelOptions = Array.from({ length: 10 }, (_, i) => ({
    label: `Level ${i + 1}`,
    value: String(i + 1),
  }));

  const handleExpandAll = () =>
    setOpenItems(departmentments.map((dept) => dept.name));

  const handleCollapseAll = () => setOpenItems([]);

  const moveEmployee = (
    employee: Employee,
    _fromLevel: number,
    toLevel: number,
    toIndex: number
  ) => {
    const updated = hierarchyData.map((levelData) => {
      // Remove employee from all levels
      return levelData.filter((e) => e.id !== employee.id);
    });

    const newList = [...updated[toLevel - 1]];
    newList.splice(toIndex, 0, employee);
    updated[toLevel - 1] = newList;

    setHierarchyData(updated);
  };
  const deleteEmployeeFromHierarchy = (employeeId: string, level: number) => {
    const updated = hierarchyData.map((levelData, idx) => {
      if (idx === level - 1) {
        return levelData.filter((e) => e.id !== employeeId);
      }
      return levelData;
    });
    setHierarchyData(updated);
  };
  const handleSaveHierarchy = () => {
    let data = hierarchyData
      .filter((level) => level.length > 0)
      .map((level) => {
        return {
          employees: level.map((emp) => ({
            id: emp.id,
            name: emp.name,
            dept: emp.dept,
            empcode: emp.empcode,
            ismandatory: emp.ismandatory,
          })),
          level: `Level ${hierarchyData.indexOf(level) + 1}`,
        };
      });
    if (data.length === 0) {
      alert("Please add employees to the hierarchy before saving.");
      return;
    }
    setSavedHierarchy((prev) => [
      ...prev,
      { name: hierarchyName, hierarchy: data },
    ]);
    setHierarchyLevel(3);
    setHierarchyData(Array.from({ length: 10 }, () => []));
    setHierarchyName("");
    setSaveModelVisible(false);
  };
  const handleReset = () => {
    setHierarchyLevel(3);
    setHierarchyData(Array.from({ length: 10 }, () => []));
    setOpenItems([]);
    setSavedHierarchy([]);
    setView(false);
    setHierarchyName("");
    setSaveModelVisible(false);
    setSavedHierarchy([]);
    setDepartments(DepartmentListFake);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Section>
        <div className="flex items-center justify-between gap-2 ps-4 pt-2">
          <div className="flex gap-2">
            <Button
              onClick={handleExpandAll}
              variant="outline"
              className="saveButtonCss"
            >
              Expand
            </Button>
            <Button
              onClick={handleCollapseAll}
              variant="outline"
              className="saveButtonCss"
            >
              Collapse
            </Button>
            <SingleSelectDropdownFloat
              className="max-w-[180px]"
              options={levelOptions}
              fields={{ label: "label", value: "value" }}
              label="Levels"
              placeholder="Select levels"
              onChange={(val) => {
                const num = Math.min(10, parseInt(val, 10));
                setHierarchyLevel(num);
                setHierarchyData(Array.from({ length: num }, () => []));
                setOpenItems([]);
              }}
              value={hierarchyLevel.toString()}
              id=""
            />
          </div>
          <div className="me-4">
            <Button
              onClick={handleReset}
              variant="outline"
              className="saveButtonCss"
            >
              Reset
            </Button>
            <Button
              onClick={() => setSaveModelVisible(true)}
              variant="outline"
              className="saveButtonCss ms-2"
            >
              Save
            </Button>
            <Button
              onClick={() => setView(true)}
              variant="outline"
              className="saveButtonCss ms-2"
            >
              View
            </Button>
          </div>
        </div>
        <div className="flex justify-between gap-6 h-[calc(100vh-130px)] p-2">
          <div className="overflow-y-auto p-2 [&::-webkit-scrollbar]:[width:0px] w-full max-w-[460px]">
            <Accordion
              type="multiple"
              className="w-full space-y-2"
              value={openItems}
              onValueChange={setOpenItems}
            >
              {departmentments.map((dept) => {
                const { h, s } = hexToHSL(dept.color);
                return (
                  <AccordionItem
                    key={dept.name}
                    value={dept.name}
                    className="data-[state=open]:border data-[state=closed]:border-b"
                    style={{ borderColor: `hsl(${h}, ${s}%, 55%)` }}
                  >
                    <AccordionTrigger
                      className="px-3 rounded-none"
                      style={{ backgroundColor: `hsl(${h}, ${s}%, 55%)` }}
                    >
                      {dept.name}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 p-2 flex flex-wrap gap-2">
                      {dept.employees.map((emp, id) => (
                        <EmployeeCard
                          key={emp.id}
                          employee={emp}
                          index={0}
                          level={0}
                          moveEmployee={moveEmployee}
                          from="department"
                          bgColor={generateShade(
                            h,
                            s,
                            dept.employees.length,
                            id
                          )}
                        />
                      ))}
                      {dept.employees.length === 0 && (
                        <div className="flex items-center justify-center w-full h-20 bg-gray-100 rounded">
                          <p className="text-gray-500">No Employees</p>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
          <div className="w-px bg-gray-100 mx-2" />
          <div className="grow flex gap-5 overflow-x-scroll">
            {Array.from({ length: hierarchyLevel }, (_, i) => (
              <DropZone
                key={i}
                level={i + 1}
                employees={hierarchyData[i]}
                moveEmployee={moveEmployee}
                onDelete={deleteEmployeeFromHierarchy}
                selectedLevel={hierarchyLevel}
              />
            ))}
          </div>
        </div>
        <ViewHierarchy
          open={View}
          close={() => setView(false)}
          hierarchy={savedHierarchy}
        />
        <SaveHierarchy
          open={SaveModelVisible}
          close={() => {
            setSaveModelVisible(false);
            setHierarchyName("");
          }}
          hierarchyName={hierarchyName}
          setHierarchyName={setHierarchyName}
          handleSubmit={handleSaveHierarchy}
        />
      </Section>
    </DndProvider>
  );
};

export default EmployeeHierarchyPage;
