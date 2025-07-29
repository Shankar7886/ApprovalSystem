import Section from "@/components/common/Section";
import { Button } from "@/components/shadcn-ui/button";
import Departments from "./Departments";
import SingleSelectDropdownFloat from "@/components/common/floatDropdown";
import { useState } from "react";
import DropZone from "./DropZone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DepartmentListFake } from "../ApprovalMatrix/Fake";
import SaveHierarchy from "./SaveHierarchy";
import ViewHierarchy from "./ViewHierarchy";
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
type SavedHierarchyItem = {
  name: string;
  hierarchy: { employees: Employee[]; level: string }[];
};

export default function index() {
  const [departments, setDepartments] =
    useState<typeof DepartmentListFake>(DepartmentListFake);
  const [hierarchyLevel, setHierarchyLevel] = useState<number>(3);
  const [message, setMessage] = useState("");
  const [saveAlert, setSaveAlert] = useState(false);
  const [ViewHierarchyVisible, setViewHierarchyVisible] = useState(false);
  const [savedHierarchy, setSavedHierarchy] = useState<SavedHierarchyItem[]>(
    []
  );
  const [hierarchyData, setHierarchyData] = useState<any[][]>(
    Array.from({ length: 10 }, () => [])
  );
  const levelOptions = Array.from({ length: 10 }, (_, i) => ({
    label: `Level ${i + 1}`,
    value: String(i + 1),
  }));
  const moveEmployee = (
    employee: any,
    fromLevel: number,
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
    if (fromLevel === 0) {
      // let updatedData = ;
      setDepartments((prev) =>
        prev.map((dept) => {
          if (dept.name === employee.dept) {
            return {
              ...dept,
              employees: dept.employees.filter(
                (emp: any) => emp.id !== employee.id
              ),
            };
          }
          return dept;
        })
      );
    }
  };
  const onDepartmentDrop = (item: any) => {
    if (item.fromlevel !== 0) {
      let exist = departments
        .find((dept: any) => dept.name === item.employee.dept)
        ?.employees.filter((emp: any) => emp.id === item.employee.id);
      if (exist?.length === 0) {
        setDepartments((prev) =>
          prev.map((dept) =>
            dept.name === item.employee.dept
              ? {
                  ...dept,
                  employees: [...dept.employees, item.employee],
                }
              : dept
          )
        );
        setHierarchyData((prev) =>
          prev.map((level, idx) =>
            idx === item.fromLevel - 1
              ? level.filter((emp: any) => emp.id !== item.employee.id)
              : level
          )
        );
      }
    }
  };
  const handleDepartmentDrop = (employees: any[], level: number) => {
    const updated = employees.filter((employee: any) => {
      const exist = hierarchyData[level - 1].find(
        (emp: any) => emp.id === employee.id
      );
      return !exist;
    });
    setHierarchyData((prev) =>
      prev.map((lev: any, idx) =>
        idx === level - 1 ? [...lev, ...updated] : lev
      )
    );
    setDepartments((prev) =>
      prev.map((dept) => {
        const filteredEmployees = dept.employees.filter(
          (emp) => !updated.some((rem) => rem.id === emp.id)
        );

        return {
          ...dept,
          employees: filteredEmployees,
        };
      })
    );
  };
  const deleteEmployeeFromHierarchy = (employee: any, level: number) => {
    // const updated = hierarchyData.map((levelData, idx) => {
    //   if (idx === level - 1) {
    //     return levelData.filter((e) => e.id !== employee.id);
    //   }
    //   return levelData;
    // });
    setHierarchyData((prev) =>
      prev.map((levelData, idx) => {
        if (idx === level - 1) {
          return levelData.filter((e) => e.id !== employee.id);
        }
        return levelData;
      })
    );

    setDepartments((prev) =>
      prev.map((dept) => {
        if (dept.name === employee.dept) {
          return {
            ...dept,
            employees: [
              ...dept.employees.filter((emp: any) => emp.id !== employee.id),
              { ...employee, ismandatory: false },
            ],
          };
        }
        return dept;
      })
    );
  };

  const handleCheckBox = (employee: any, level: number) => {
    setHierarchyData((prev) =>
      prev.map((lev, idx) =>
        idx === level - 1
          ? [
              ...lev.filter((emp: any) => emp.id !== employee.id),
              { ...employee, ismandatory: !employee.ismandatory },
            ]
          : lev
      )
    );
  };

  const handleReset = () => {
    setHierarchyLevel(3);
    setHierarchyData(Array.from({ length: 10 }, () => []));
    setDepartments(DepartmentListFake);
    setSavedHierarchy([]);
    setMessage("");
  };
  const validate = () => {
    const numberOfLevels = hierarchyData.reduce((count, level) => {
      return level.length > 0 ? count + 1 : count;
    }, 0);
    const valid = numberOfLevels === hierarchyLevel;
    return valid;
  };
  const alertDialog = (arg: string) => {
    switch (arg) {
      case "yes": {
        setSaveAlert(false);
        setMessage("");
        break;
      }
      case "no": {
        setMessage(
          "System will Auto Adjust Levels and will Remove NOT Filled-in Levels"
        );
        setSavedHierarchy([]);
        break;
      }
      case "okay": {
        setSaveAlert(false);
        setMessage("");
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
        if (data.length == 0) {
          alert("Please add employees to the hierarchy before saving.");
          return;
        }
        setSavedHierarchy((prev) => [
          ...prev,
          { name: "temp", hierarchy: data },
        ]);
        setViewHierarchyVisible(true);
        break;
      }
    }
  };
  const handleSave = () => {
    if (!validate()) {
      setMessage(
        "One or more Level(s) are not Filled in. Would you Like to Fill those Levels ?"
      );
      setSaveAlert(true);
      return;
    }
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
    if (data.length == 0) {
      alert("Please add employees to the hierarchy before saving.");
      return;
    }
    setSavedHierarchy((prev) => [...prev, { name: "temp", hierarchy: data }]);
    alert("Saved Successfully.");
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Section>
        <div className="flex flex-col h-[calc(100dvh-90px)]">
          <div
            className="mb-2 flex justify-between gap-2 flex-col sm:flex-row"
            id="approvalMatrix"
          >
            <div>
              <SingleSelectDropdownFloat
                className="w-full sm:max-w-[180px]"
                options={levelOptions}
                fields={{ label: "label", value: "value" }}
                label="Levels"
                placeholder="Select levels"
                onChange={(val) => {
                  const num = Math.min(10, parseInt(val, 10));
                  setHierarchyLevel(num);
                  setHierarchyData(Array.from({ length: 10 }, () => []));
                  setDepartments(DepartmentListFake);
                }}
                value={hierarchyLevel.toString()}
                id=""
              />
            </div>
            <div className="">
              <Button
                variant="outline"
                className="bg-red-300 hover:bg-red-400 ms-0 sm:ms-2"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button variant="outline" className=" ms-2" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="outline"
                className=" ms-2"
                onClick={() => {
                  if (savedHierarchy.length == 0) {
                    alert("No Hierarchy to View");
                  } else {
                    setViewHierarchyVisible(true);
                  }
                }}
              >
                View
              </Button>
            </div>
          </div>
          <Departments
            moveEmployee={moveEmployee}
            departmentList={departments}
            onDepartmentDrop={onDepartmentDrop}
          />
          <div className="bg-gray-50 grow p-2 rounded shadow border h-[54%]">
            <div className="grow flex gap-3 overflow-x-scroll h-full">
              {Array.from({ length: hierarchyLevel }, (_, i) => (
                <DropZone
                  key={i}
                  level={i + 1}
                  employees={hierarchyData[i]}
                  moveEmployee={moveEmployee}
                  onDelete={deleteEmployeeFromHierarchy}
                  selectedLevel={hierarchyLevel}
                  handleDepartmentDrop={handleDepartmentDrop}
                  handleCheckBox={handleCheckBox}
                />
              ))}
            </div>
          </div>
        </div>
        <SaveHierarchy
          open={saveAlert}
          close={() => setSaveAlert(false)}
          handleSubmit={alertDialog}
          message={message}
        />
        <ViewHierarchy
          hierarchy={savedHierarchy}
          open={ViewHierarchyVisible}
          close={() => setViewHierarchyVisible(false)}
        />
      </Section>
    </DndProvider>
  );
}
